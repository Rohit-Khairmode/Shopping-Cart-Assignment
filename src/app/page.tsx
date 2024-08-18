import { getProducts } from "./_lib/data-service";
import ProductCard from "./_components/ProductCard";
import { auth } from "./_lib/auth";
import Header from "./_components/Header";
import Uploader from "./_components/Uploader";

export default async function Home() {
  const products = await getProducts();
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <>
      <main className="grid gap-4 px-4 lp:gap-8 md:gap-6 my-5 auto-rows-max grid-cols-1 sm:grid-cols-2 lp:grid-cols-3   justify-between items-center max-w-7xl mx-auto transition-all  lp:px-10 md:px-8 ">
        {products?.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            userId={Number(userId)}
          />
        ))}
      </main>
    </>
  );
}
