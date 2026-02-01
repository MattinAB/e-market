import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignoutButton from "./signout-button";
import { CiShoppingCart } from "react-icons/ci";
import "./nav.css";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import NavHeightSync from "./nav-height-sync";

export default async function NavigationBar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div
      data-site-nav
      className="sticky top-0 w-full bg-neutral-100/80 shadow-[2px_2px_10px_rgba(0,0,0,0.3)] z-50"
    >
      <div className="sm:p-2 px-2.5  ">
        <Link href="/">E-Market Logo</Link>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap w-full  sm:py-4  p-4 lg:justify-start lg:gap-8 lg:px-6 justify-between items-center">
        <nav className="lg:order-1">
          <ul className="flex space-x-0.5 sm:space-x-5">
            <li>
              <Button asChild>
                <Link href="/Dashboard/mens">Mens</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/Dashboard/womans">Womans</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/Dashboard/kids">Kids</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="flex order-3 lg:order-2 lg:flex-1 lg:justify-center mt-1.5 mx-auto  box-border gap-2 justify-center items-center rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.3)]">
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
        <div className="flex lg:order-3 gap-1 sm:p-2 p-0 rounded-md shadow-[2px_2px_10px_rgba(0,0,0,0.3)]">
          <Button asChild>
            <Link
              className="hover:bg-slate-100 hover:text-black hover:scale-[1.1] transition-all duration-300 ease-in-out"
              href="/"
            >
              <CiShoppingCart size={24} />
            </Link>
          </Button>

          {!session ? (
            <Button asChild>
              <Link
                className="hover:bg-slate-100 hover:text-black hover:scale-[1.1] transition-all duration-300 ease-in-out"
                href="/auth"
              >
                SignIn
              </Link>
            </Button>
          ) : (
            <SignoutButton />
          )}
        </div>
      </div>
      <NavHeightSync />
    </div>
  );
}
