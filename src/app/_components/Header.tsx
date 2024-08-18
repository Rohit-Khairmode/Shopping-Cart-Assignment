import { auth } from "../_lib/auth";
import { getCartItems } from "../_lib/data-service";
import Navigation from "./Navigation";

async function Header() {
  const session = await auth();
  return (
    <div className="bg-accent-50">
      <Navigation session={session} />
    </div>
  );
}

export default Header;
