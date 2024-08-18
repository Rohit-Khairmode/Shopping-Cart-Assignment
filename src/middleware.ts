import { auth } from "./app/_lib/auth";
export const middleware = auth; //this will redirect unauthorized user to signin page and if authorized user access this route then extend session

export const config = {
  matcher: ["/cart"],
};
