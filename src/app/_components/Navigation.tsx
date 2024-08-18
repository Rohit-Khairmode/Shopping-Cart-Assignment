"use client";
import {
  ArrowRightCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../_contexts/cartItems";
import { signOutAction } from "../_lib/actions";
import { useState } from "react";

function Navigation({ session }: any) {
  const { cartItems, setCartItems } = useCart();
  if (!session) setCartItems(0);
  const [signingOff, setSigningOff] = useState(false);

  return (
    <nav className="flex justify-between items-center max-w-7xl h-[60px]  mx-auto transition-all px-3 ">
      <Link href="/" aria-label="Home">
        <Image
          src="https://p1.edge.duggup.com/logo/profile-transparent-blue.svg"
          alt="Profile.fyl logo"
          width={80}
          height={80}
        />
      </Link>
      <ul className="flex gap-2 justify-center items-center">
        <li className="relative">
          <Link href="/cart">
            <ShoppingCartIcon className="size-6 text-primary-500 hover:text-accent-400 active:text-accent-400" />
            {cartItems != 0 ? (
              <span className="bg-accent-500 text-slate-50 font-bold rounded-[50%]  absolute top-0 translate-y-[-30%] left-[60%] translate-x-[-50%] px-0.5 text-sm ">
                {cartItems >= 10 ? "9+" : cartItems}
              </span>
            ) : null}
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <button className="hover:text-accent-400 transition-colors flex items-center gap-1">
              <img
                className="h-6 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>You</span>
            </button>
          ) : (
            <Link
              href="/cart"
              className="hover:text-accent-400 transition-colors"
            >
              Profile
            </Link>
          )}
        </li>
        {session && !signingOff && (
          <li
            onClick={() => {
              signOutAction();
              setSigningOff(true);
            }}
            className="items-center flex  hover:cursor-pointer hover:text-accent-400"
          >
            Logout
            <ArrowRightCircleIcon className="size-6" />
          </li>
        )}
        {session && signingOff && (
          <li>
            <div className="spinner-mini"></div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
