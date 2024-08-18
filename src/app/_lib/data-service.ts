import { createClient } from "../utils/supabase/client";
const supabase = createClient();
export async function getProducts() {
  let { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getCartItemByProductAndUserId(
  productId: number,
  userId: number
) {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", productId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
  } else {
  }
  return data;
}

export async function updateQuantity(cartId: number, newQuantity: number) {
  // First, fetch the current quantity
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity: newQuantity })
    .eq("id", cartId);
  if (error) {
    console.error(error);
    throw new Error("User not found");
  }
  return data;
}
export async function deleteCartRow(productId: number, userId: number) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", userId);

  if (error) throw new Error("Cart Item could not be deleted");
}
export async function getUser(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error(error);
    throw new Error("User not found");
  }

  return data;
}

export async function getCartProducts(id: number) {
  const { data, error } = await supabase
    .from("cart")
    .select("quantity, products(*)")
    .eq("user_id", id)
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("There is some error while fetching data");
  }

  return data;
}

// CREATE

export async function createUser(newUser: any) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}
export async function getCartItems(id: number) {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", id)
    .order("id");
  if (error) {
    console.error(error);
    throw new Error("There is some error while fetching data");
  }
  return data;
}

export async function addItemInCart(productId: number, userId: number) {
  const { data, error } = await supabase
    .from("cart")
    .insert([{ product_id: productId, user_id: userId, quantity: 1 }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("There is some problem while adding item in cart");
  }
  return data;
}
export async function insertProducts() {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: "4K Ultra HD TV",
        description: "55-inch 4K Ultra HD TV with smart features.",
        price: 59999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/sony-bravia.jpg?t=2024-08-18T05%3A03%3A45.913Z",
      },
      {
        name: "Digital Camera",
        description: "Compact digital camera with 20MP resolution.",
        price: 29999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/Sony-camera.jpeg?t=2024-08-18T05%3A04%3A01.068Z",
      },
      {
        name: "Tablet",
        description: "10-inch tablet with HD display and long battery life.",
        price: 19999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/ipad.webp?t=2024-08-18T05%3A04%3A15.154Z",
      },
      {
        name: "Gaming Mouse",
        description:
          "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
        price: 5999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/Gaming-Mouse.jpg?t=2024-08-18T05%3A04%3A33.534Z",
      },
      {
        name: "VR Headset",
        description: "Immersive VR headset with high-resolution display.",
        price: 29999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/vr-headset.jpg?t=2024-08-18T05%3A04%3A47.253Z",
      },
      {
        name: "Drone",
        description: "Compact drone with HD camera and GPS functionality.",
        price: 39999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/drone.jpeg",
      },
      {
        name: "Portable Charger",
        description:
          "High-capacity portable charger with fast charging support.",
        price: 2999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/portable-charger.png?t=2024-08-18T05%3A05%3A17.433Z",
      },
      {
        name: "Action Camera",
        description: "Waterproof action camera with 4K video recording.",
        price: 19999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/action-camera.webp?t=2024-08-18T05%3A05%3A30.958Z",
      },
      {
        name: "Mechanical Keyboard",
        description:
          "Durable mechanical keyboard with customizable RGB backlighting.",
        price: 8999,
        image:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/keyboard.webp?t=2024-08-18T05%3A05%3A51.135Z",
      },
      {
        name: "Wireless Charger",
        description:
          "https://zkunrokuupyyqjydqrzu.supabase.co/storage/v1/object/public/product-images/wireless-charger.jpeg?t=2024-08-18T05%3A06%3A03.434Z",
        price: 2499,
        image: "https://images.unsplash.com/photo-1551234250-8a9dd4c57df9",
      },
    ])
    .select();

  if (error) {
    throw new Error("Mass update error");
  }
  return data;
}
