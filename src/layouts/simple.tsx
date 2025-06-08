import { Image } from "@heroui/image";
import { Link } from "react-router-dom";

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="flex-grow ">
        <div className="flex no-wrap h-full">
          <div className="flex-[4] bg-pattern h-full w-full hidden md:block">
            <div className="p-10">
              <Link to="/" className="inline-block">
                <Image
                  src="/images/logo-icon.png"
                  alt="Noema Finance"
                  className="w-[50px] rounded-none"
                />
              </Link>
            </div>
          </div>
          <div className="flex-1 lg:flex-[3] md:flex-[4] px-2 py-6 lg:p-6 max-h-screen overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
