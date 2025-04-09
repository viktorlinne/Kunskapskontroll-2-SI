import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB, db } from "./config/db";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { VercelRequest, VercelResponse } from "@vercel/node";

interface RawRequest extends Request {
  body: Buffer;
}

dotenv.config();
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: RawRequest, res: any) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.client_reference_id;
      const paymentId = session.id;

      try {
        const [result] = await db.execute(
          `UPDATE orders SET payment_status = ?, payment_id = ?, order_status = ? WHERE id = ?`,
          ["Paid", paymentId, "Received", orderId]
        );

        const [orderItems] = await db.execute(
          `SELECT product_id, quantity FROM order_items WHERE order_id = ?`,
          [orderId]
        );

        for (const item of orderItems as any[]) {
          const { product_id, quantity } = item;

          await db.execute(
            `UPDATE products SET stock = stock - ? WHERE id = ?`,
            [quantity, product_id]
          );
        }

        console.log("Order and stock updated successfully:", result);
      } catch (error) {
        console.error("Failed to update order or stock:", error);
        return res.status(500).send("Internal error during update");
      }
    }

    res.status(200).end();
  }
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
    credentials: true, // ✅ Allows cookies
  })
);

app.post(
  "/stripe/create-checkout-session-embedded",
  async (req: Request, res: Response) => {
    const { cartItems, orderId } = req.body;
    console.log("cartItems", cartItems, "orderId", orderId);
    try {
      try {
        const line_items = cartItems.map((item) => ({
          price_data: {
            currency: "sek",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }));

        console.log("line_items", line_items);
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: line_items,
          ui_mode: "embedded",
          return_url: `http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          client_reference_id: orderId,
        });

        console.log("session", session);
        res.json({ client_secret: session.client_secret });
      } catch (err) {
        console.error("Failed to create embedded checkout session:");
      }
    } catch (error) {
      console.error("Stripe session error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  }
);

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import stripeRouter from "./routes/stripe";
import authRouter from "./routes/auth";

app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);
app.use("/stripe", stripeRouter);
app.use("/auth", authRouter);

// Attempt to connect to the database
connectDB();
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
