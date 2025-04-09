import { Outlet } from "react-router";
import { Nav } from "../../components/Nav";
import { CartProvider } from "../../provider/CartProvider";

export const Layout = () => {
  return (
    <>
      <CartProvider>
        <header>
          <Nav />
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </CartProvider>
    </>
  );
};
