import React from 'react'
import Navigation from '../Navigation';
import Footer from '../Footer';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    icon?: string;
  }

const  Layout = ({ children }: LayoutProps) => {

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]" suppressHydrationWarning>
      <Navigation />
      <main className=''>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout