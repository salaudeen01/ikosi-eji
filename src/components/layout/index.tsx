import React from 'react'
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useClientCategories } from '@/hooks/mutatiion/clients/useCategories';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    icon?: string;
  }

const  Layout = ({ children }: LayoutProps) => {


  const { data: categories, isLoading, isError } = useClientCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load admins</p>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]" suppressHydrationWarning>
      <Navigation categories={categories || []} />
      <main className=''>
        {children}
      </main>
      <Footer categories={categories || []} />
    </div>
  )
}

export default Layout