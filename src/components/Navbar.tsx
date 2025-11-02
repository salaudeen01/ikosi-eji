/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "./ui/dropdown";
import { useAuth } from "@/store/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <nav className="bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] sticky top-0 z-50">
      <div className="px-4">
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

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[hsl(var(--foreground))]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="w-full block md:w-auto" id="navbar-default">
              <Dropdown user={user || {}} onLogout={logout} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
