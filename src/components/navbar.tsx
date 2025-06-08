import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Image } from "@heroui/image";

import { ThemeSwitch } from "@/components/theme-switch";
import { links } from "@/config/links";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="py-2" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" color="foreground" to="/">
            <Image src="/images/logo-white.png" alt="logo" className="hidden dark:block w-40" />
            <Image
              src="/images/logo-dark.png"
              alt="logo"
              className="block dark:hidden w-40 rounded-none"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            className="text-md font-medium text-white bg-primary"
            to={links.financingRequest}
            variant="flat"
          >
            Submit Financing Request
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
