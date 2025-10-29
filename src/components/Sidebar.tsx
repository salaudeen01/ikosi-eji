"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChartBarBig, LayoutDashboard, Newspaper, ShieldUser, Users, Wallpaper } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: { label: string; href: string, icon: React.ReactNode; }[];
}

const Sidebar: React.FC = () => {
  const location = usePathname();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard /> },
    { label: "categories", href: "/admin/category", icon: <ChartBarBig /> },
    { label: "Articles", href: "/admin/article", icon: <Newspaper /> },
    { label: "Admins", href: "/admin/admins", icon: <ShieldUser />},
    // { label: "Features", href: "/admin/features", icon: <Wallpaper /> },
    { label: "Users", href: "/admin/users", icon: <Users /> },
  ];

  return (
    <aside
      id="logo-sidebar"
      className="fixed w-64 h-screen pt-8 transition-transform -translate-x-full sm:translate-x-0 bg-[hsl(var(--background))] border-r border-[hsl(var(--border))]"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-[hsl(var(--background))] border-r border-[hsl(var(--border))]">
        <ul className="space-y-4 font-medium">
          {navItems?.map((items)=>(
            <li key={items.label}>
              <a
                href={items.href}
                className={`${
                  location === items.href ? "border-[hsl(var(--primary))] border bg-[hsl(var(--primary))] text-white" : "text-gray-600 "
                } flex items-center p-3 rounded-lg hover:bg-[hsl(var(--primary))] hover:text-white group`}
              >
                {items.icon}
                <span className="ms-3 font-semibold text-base">{items.label}</span>
              </a>
            </li>
          ))}
            <li>
              <a
                href={`/admin/activity-log`}
                className={`${
                  location === `/admin/activity-log` ? "border-[hsl(var(--primary))] border bg-[hsl(var(--primary))] text-white" : "text-gray-600 "
                } flex items-center p-3 rounded-lg hover:bg-[hsl(var(--primary))] hover:text-white group`}
              >
                <Wallpaper />
                <span className="ms-3 font-semibold text-base">{`Activity Log`}</span>
              </a>
            </li>
          {/* <li>
            <a
              href="/admin/categories"
              className={`${
                location === "/admin/categories" ? "border-gray-400 border" : ""
              } flex items-center p-3 rounded-lg text-gray-600 hover:bg-[hsl(var(--primary))] hover:text-white group`}
            >
              <span className="ms-3">Categories</span>
            </a>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
