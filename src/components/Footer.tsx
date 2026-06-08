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
    <footer className="bg-primary-light mt-16 py-12 border-t border-border-color">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4 flex gap-1 items-center">
            <img
              src={'/images/assets/logo.jpeg'}
              alt={'logo'}
              className="w-10 h-auto"
            />
            Ikosi-Ejinrin LCDA
            </h3>
            <p className="text-sm text-text-muted ">
              Nigeria&apos;s leading business and financial news platform. Stay
              informed with the latest market insights and economic analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-text-muted ">
              {categories?.map((e)=>(
                <li key={e?.id}>
                  <Link href={`/category/${e.slug}` || "#"} className="hover:text-primary transition-colors">
                    {e?.name}
                  </Link>
                </li>
                  
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-muted ">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-text-muted  mb-4">
              Get daily business insights delivered to your inbox.
            </p>
            {(!token || !isAuthenticated) &&
              <Button onClick={openLogin} className="flex bg-primary text-surface hover:bg-[hsl(var(--news-hover))]">
                Login
              </Button>
            }
            {/* <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-border-color rounded-md bg-surface-alt"
              />
              <button className="px-4 py-2 text-sm font-medium bg-primary text-surface rounded-md hover:bg-[hsl(var(--news-hover))]  transition-colors">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border-color text-center text-sm text-text-muted ">
          <p>© 2026 Ikosi-Ejinrin LCDA. All rights reserved.</p>
        </div>
      </div>
  </footer>
  )
}

export default Footer