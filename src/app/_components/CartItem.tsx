"use client";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { deleteCartItem, updateCartQuantity } from "../_lib/actions";
import { formatCurrency } from "../utils/helpers";

function CartItem({ item, userId }: any) {
  const [isPending, startTransition] = useTransition(); //to show loading indicator
  const {
    product: { id, image, name, price, description },
    quantity,
  } = item;
  function handleCartItemUpdate(increment: boolean) {
    startTransition(() => updateCartQuantity(id, userId, increment));
    toast.success(
      `${name} product quantity become ${
        increment ? quantity + 1 : quantity - 1
      }`,
      {
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
      }
    );
  }
  return (
    <div className="grid  grid-cols-[1.5fr,2fr] border-3 hover:scale-105 hover:drop-shadow-lg hover:bg-slate-100 p-2 ease-in duration-300 ">
      <div className="relative">
        <Image src={image} alt={`${name} image`} fill />
      </div>
      <div className="flex flex-col gap-1 justify-evenly px-3">
        <h3 className="text-primary-600 font-bold">{`${name}`}</h3>
        <p className="text-primary-200 font-medium text-sm">{`${description}`}</p>
        <strong>{`${formatCurrency(price)}`}</strong>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center">
              <button
                disabled={isPending || quantity <= 1}
                className={`${
                  isPending || quantity <= 1
                    ? "hover:cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={() => handleCartItemUpdate(false)}
              >
                <MinusCircleIcon className="size-5 hover:text-accent-400" />
              </button>
              <strong className="border-2 p-1">{`${quantity}`}</strong>
              <button
                disabled={isPending}
                className={`${
                  isPending
                    ? "hover:cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
              >
                <PlusCircleIcon
                  className="size-5 hover:text-accent-400"
                  onClick={() => handleCartItemUpdate(true)}
                />
              </button>
            </div>
          </div>
          <button
            disabled={isPending}
            className={`bg-primary-900 text-amber-50  p-1 text-sm hover:bg-accent-400 ${
              isPending
                ? "hover:cursor-not-allowed opacity-50"
                : "hover:cursor-pointer"
            } `}
            onClick={() => {
              startTransition(() => deleteCartItem(id, userId));
              toast.success("Item Deleted Successfully", {
                style: {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              });
            }}
          >
            {!isPending ? (
              <TrashIcon className="size-5" />
            ) : (
              <div className="spinner-mini"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
