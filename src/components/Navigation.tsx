/* eslint-disable @next/next/no-img-element */
import { Category } from "@/api/clients";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "./ui/dropdown";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import AuthModal from "./authModal";
import { useAuthStore } from "@/store/clients/useAuthStore";

interface NavItem {
  label?: string;
  href?: string;
  children?: { label: string; href: string }[];
  categories: Category[];
}

const Navigation = ({categories}: NavItem) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, isAuthenticated, logout, user } = useAuthStore();
  const { openLogin } = useLoginModalStore();

  return (
    <nav className="bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1">
              <img
                src={'/images/assets/econo.png'}
                alt={'logo'}
                className="w-10 h-auto"
              />
              <h1 className="text-2xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:text-[hsl(var(--news-hover))] transition-colors">
                cometrics
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((item) =>
              <Link key={item.name} href={`/category/${item.slug}` || "#"}>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:bg-transparent"
                >
                  {item.name}
                </Button>
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link href={'/article/search'}>
              <Button variant="ghost" size="icon" className="text-[hsl(var(--foreground))]">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[hsl(var(--foreground))]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {(!token || !isAuthenticated) ?
              <div className="flex items-center gap-2">

                <Button onClick={openLogin} variant="outline" className="hidden md:flex">
                  Login
                </Button>
                {/* <Button className="hidden md:flex bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
                  Register
                </Button> */}
              </div>:
              <div className="w-full block md:w-auto" id="navbar-default">
                <Dropdown user={user || {}} onLogout={logout} type={'clients'} />
              </div>
             }

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[hsl(var(--border))]">
            <div className="flex flex-col space-y-3">
              {categories.map((item) =>
                <Link
                  key={item.name}
                  href={`/category/${item.slug}` || "#"}
                  className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <AuthModal />
    </nav>
  );
};

export default Navigation;
