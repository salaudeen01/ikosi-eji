import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Economy",
      href: "/category/economy",
    },
    {
      label: "Tech Sector",
      href: "/category/tech-sector",
    },
  ];

  return (
    <nav className="bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:text-[hsl(var(--news-hover))] transition-colors">
                EconoNetrics
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              <Link key={item.label} href={item.href || "#"}>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:bg-transparent"
                >
                  {item.label}
                </Button>
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[hsl(var(--foreground))]">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[hsl(var(--foreground))]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button className="hidden md:flex bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[hsl(var(--border))]">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="space-y-2">
                    <div className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
