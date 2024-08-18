import Cart from "../_components/Cart";
import { auth } from "../_lib/auth";
import { getCartProducts } from "../_lib/data-service";

async function page() {
  const session = await auth();
  let userId = Number(session?.user?.id);
  let cartProducts = await getCartProducts(userId);
  let products = cartProducts?.map((product) => {
    const obj = {
      product: product.products,
      quantity: product.quantity,
    };
    return obj;
  });
  return <Cart products={products} userId={userId} />;
}

export default page;
