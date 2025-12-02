import React from 'react'
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useClientCategories } from '@/hooks/mutatiion/clients/useCategories';
import { Skeleton } from '../ui/skeleton';
import { ErrorState } from '../ui/error-state';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    icon?: string;
  }

const  Layout = ({ children }: LayoutProps) => {

  const Loader =()=>(
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Title */}
      <Skeleton className="h-8 w-3/4 mb-4" />
  
      {/* Meta Info */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
  
      {/* Image */}
      <Skeleton className="h-64 w-full rounded-lg mb-6" />
  
      {/* Paragraph lines */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-8/12" />
      </div>
    </div>
  )

  const { data: categories, isLoading, isError, refetch } = useClientCategories();

  if (isLoading) return <Loader />;
  if (isError) return (
    <ErrorState
      message="Failed to fetch article details."
      onRetry={() => refetch()}
    />
  );
  // if (isError) return <p>Failed to load admins</p>;
  

  return (
    <div className="min-h-screen conta bg-[hsl(var(--background))]" suppressHydrationWarning>
      <Navigation categories={categories || []} />
      <main className=''>
        {children}
      </main>
      <Footer categories={categories || []} />
    </div>
  )
}

export default Layout