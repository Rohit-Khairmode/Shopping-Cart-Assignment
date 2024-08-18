"use client";
import { useEffect } from "react";
import { formatCurrency } from "../utils/helpers";
import CartItem from "./CartItem";
import { useCart } from "../_contexts/cartItems";

function Cart({ products, userId }: any) {
  let items = 0;
  const { setCartItems } = useCart();
  useEffect(
    function () {
      setCartItems(items);
    },

    [items, setCartItems]
  );
  let price = products.reduce((acc: number, product: any) => {
    acc += Number(product.product.price) * Number(product.quantity);
    items += product.quantity;
    return acc;
  }, 0.0);
  price = Number(price.toFixed(2));
  const discount = Number((price * 0.1).toFixed(2));
  const delivery = 250;

  return (
    <div className="max-w-7xl mx-auto my-5 justify-center px-4   grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
      <main className="grid gap-5 border-2 p-4 bg-accent-20">
        {products?.map((cartItem: any) => (
          <CartItem
            key={cartItem.id + Math.random()}
            item={cartItem}
            userId={userId}
          />
        ))}
      </main>
      <aside className="flex flex-col gap-3 border-2 p-3 bg-accent-20 self-start">
        <h2 className="border-b-2 text-primary-600 font-bold ">
          PRICE DETAILS
        </h2>
        <div className="flex flex-col gap-2 pb-2 border-b-2 text-primary-200 font-medium">
          <div className="flex justify-between">
            <p>Price ({items} items)</p>
            <p>{formatCurrency(price)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount(10%)</p>
            <p>{formatCurrency(discount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p>{formatCurrency(delivery)}</p>
          </div>
        </div>
        <div className="flex justify-between border-b-2">
          <strong>Total Amount</strong>
          <strong>{formatCurrency(price - discount)}</strong>
        </div>
        <div className="text-accent-400 font-semibold">
          You will save {formatCurrency(discount)} on this order
        </div>
      </aside>
    </div>
  );
}

export default Cart;
