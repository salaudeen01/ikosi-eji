/* eslint-disable @next/next/no-img-element */
import { Category } from '@/api/clients';
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { useAuthStore } from '@/store/clients/useAuthStore';
import { useLoginModalStore } from '@/store/useLoginModalStore';

interface NavItem {
  label?: string;
  href?: string;
  children?: { label: string; href: string }[];
  categories: Category[];
}

const Footer = ({categories}: NavItem) => {
  const { token, isAuthenticated } = useAuthStore();
  const { openLogin } = useLoginModalStore();
  return (
    <footer className="bg-[hsl(var(--secondary))] mt-16 py-12 border-t border-[hsl(var(--border))]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[hsl(var(--primary))] mb-4 flex gap-1 items-center">
            <img
              src={'/images/assets/econo.png'}
              alt={'logo'}
              className="w-10 h-auto"
            />
            conoNetrics
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] ">
              Nigeria&apos;s leading business and financial news platform. Stay
              informed with the latest market insights and economic analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))] ">
              {categories?.map((e)=>(
                <li key={e?.id}>
                  <Link href={`/category/${e.slug}` || "#"} className="hover:text-[hsl(var(--primary))] transition-colors">
                    {e?.name}
                  </Link>
                </li>
                  
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))] ">
              <li>
                <Link href="#" className="hover:text-[hsl(var(--primary))] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[hsl(var(--primary))] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[hsl(var(--primary))] transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[hsl(var(--primary))] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))]  mb-4">
              Get daily business insights delivered to your inbox.
            </p>
            {(!token || !isAuthenticated) &&
              <Button onClick={openLogin} className="flex bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--news-hover))]">
                Login
              </Button>
            }
            {/* <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
              />
              <button className="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--news-hover))]  transition-colors">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[hsl(var(--border))] text-center text-sm text-[hsl(var(--muted-foreground))] ">
          <p>© 2025 EconoNetrics. All rights reserved.</p>
        </div>
      </div>
  </footer>
  )
}

export default Footer