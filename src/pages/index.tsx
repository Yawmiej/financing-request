import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Image } from "@heroui/image";

import DefaultLayout from "@/layouts/default";
import { links } from "@/config/links";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col lg:flex-row gap-10 min-h-[calc(100vh-200px)] w-full">
          <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
            <h1 className="text-4xl lg:text-6xl leading-tight font-bold">
              A Smarter Way to Finance Your Projects
            </h1>
            <p className=" text-lg mt-4 text-foreground/80">
              Whether you are a global enterprise or a growing SME, our platform makes it easy to
              request project financing - quickly, securely, and from anywhere in the world.
            </p>
            <Button
              as={Link}
              className="mt-4 bg-primary text-white"
              size="lg"
              to={links.financingRequest}
            >
              Submit Financing Request
            </Button>
          </div>
          <div className="flex-1">
            <Image src="/images/hero.png" alt="Noema Finance" />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
