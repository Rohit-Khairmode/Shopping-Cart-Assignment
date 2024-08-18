"use client";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import NotFoundImage from "../../../public/Image-not-found.png";
import { updateCartQuantity } from "../_lib/actions";
import { formatCurrency } from "../utils/helpers";
import { useCartItemsQuantity } from "../_contexts/cartItemsQuantity";

function ProductCard({
  product: { id, image, name, description, price },
  userId,
}: any) {
  const [isPending, startTransition] = useTransition();
  const { cartItems, setCartItems } = useCartItemsQuantity();
  const AddToCartHandler = () => {
    startTransition(async () => {
      updateCartQuantity(id, userId, true);
      setCartItems(cartItems + 1);
    });
  };
  return (
    <div className=" grid gap-2 grid-rows-[2fr,1fr] h-full border bg-accent-20 hover:scale-105 ease-in duration-300 p-2 hover:bg-slate-100 hover:drop-shadow-lg transition-all">
      <div className="relative">
        {image ? (
          <Image src={image} alt={`${name} image`} fill />
        ) : (
          <Image src={NotFoundImage} alt={`image Not found for ${name} `} />
        )}
      </div>
      <div className=" flex flex-col  p-2 gap-3">
        <h3 className="text-primary-600 font-bold">{name}</h3>
        <p className=" text-primary-200 font-medium md:text-base">
          {description}
        </p>
        <div className="flex justify-between  items-center mt-auto ">
          <strong className="">{formatCurrency(price)}</strong>
          <Link
            href={"/cart"}
            className="bg-primary-900 text-amber-50 uppercase px-3 py-3 hover:bg-accent-400 "
            onClick={AddToCartHandler}
          >
            {!isPending ? "add to cart" : <div className="spinner-mini"></div>}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
