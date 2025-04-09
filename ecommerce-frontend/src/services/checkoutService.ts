import axios from "axios"; 

export const getOrCreateCustomer = async (customerData: any) => {
  try {
    const existing = await axios.get(`/customers/email/${customerData.email}`);
    return existing.data.id;
  } catch {
    const created = await axios.post("/customers", customerData);
    return created.data.id;
  }
};

export const createOrder = async (customerId: number, cart: any[]) => {
  const orderItems = cart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const response = await axios.post("/orders", {
    customer_id: customerId,
    order_items: orderItems,
    payment_status: "Unpaid",
    payment_id: "",
    order_status: "Pending",
  });

  return response.data;
};

export const createStripeSession = async (cart: any[], orderId: number) => {
  const line_items = cart.map((item) => ({
    price_data: {
      currency: "sek",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const res = await axios.post("/create-checkout-session", {
    line_items,
    order_id: orderId,
  });

  return res.data; 
};

export const updateOrderWithStripeSession = async (orderId: number, sessionId: string) => {
  await axios.put(`/orders/${orderId}`, {
    payment_id: sessionId,
    payment_status: "Unpaid",
    order_status: "Pending",
  });
};