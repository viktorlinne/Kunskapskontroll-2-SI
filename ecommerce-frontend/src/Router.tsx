import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layouts/Layout";
import { NotFound } from "./pages/NotFound";
import { ManageProducts } from "./pages/Admin/ManageProducts";
import { AdminLayout } from "./pages/Layouts/AdminLayout";
import { Shop } from "./pages/Shop/Shop";
import { Search } from "./pages/Shop/Search";
import { ManageOrders } from "./pages/Admin/ManageOrders";
import { UpdateProduct } from "./pages/Admin/UpdateProduct";
import { UpdateOrder } from "./pages/Admin/UpdateOrder";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { UpdateCustomer } from "./pages/Admin/UpdateCustomer";
import { ManageCustomers } from "./pages/Admin/ManageCustomers";
import { CreateCustomer } from "./pages/Admin/CreateCutsomer";
import { Product } from "./pages/Shop/Product";
import { Cart } from "./components/Cart";
import { Checkout } from "./pages/Shop/Checkout";
import { Confirmation } from "./pages/Shop/Confirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/:id",
        element: <Product />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "confirmation",
        element: <Confirmation />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "update-order/:id",
        element: <UpdateOrder />,
      },
      {
        path: "manage-customers",
        element: <ManageCustomers />,
      },
      {
        path: "create-customer",
        element: <CreateCustomer />,
      },
      {
        path: "update-customer/:id",
        element: <UpdateCustomer />,
      },
    ],
  },
]);
