import NavigationMenu from "./navigation-menu";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex relative z-50">
      <nav className="flex justify-between items-center w-full fixed top-0 left-0 right-0 bg-white p-6">
        <Link href="/" className="cursor-pointer">
          <Image src="/logo.webp" alt="Axiom Renovation" width={50} height={50} />
        </Link>
        <NavigationMenu />
      </nav>
    </header>
  );
}
