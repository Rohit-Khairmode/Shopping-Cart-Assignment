"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import {
  addItemInCart,
  deleteCartRow,
  getCartItemByProductAndUserId,
  insertProducts,
  updateQuantity,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/cart" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function deleteCartItem(productId: number, userId: number) {
  deleteCartRow(productId, userId);
  revalidatePath("/account/reservations");
}
export async function updateCartQuantity(
  productId: number,
  userId: number,
  increment: boolean
) {
  const cartItem = await getCartItemByProductAndUserId(productId, userId);
  console.log(cartItem);
  console.log("Hey There");
  if (cartItem) {
    if (increment)
      await updateQuantity(Number(cartItem.id), Number(cartItem.quantity + 1));
    else
      await updateQuantity(Number(cartItem.id), Number(cartItem.quantity - 1));
  } else {
    await addItemInCart(productId, userId);
  }
  revalidatePath("/cart");
  redirect("/cart");
  return cartItem.quantity;
}

export async function insertMultipleProducts() {
  return await insertProducts();
}
