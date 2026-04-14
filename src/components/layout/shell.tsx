import React from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import ProtectedRoute from '../ProtectedRoute';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    icon?: string;
  }

const  Layout = ({ children }: LayoutProps) => {

  return (
    // <ProtectedRoute>
      <div className="min-h-screen bg-[hsl(var(--background))]" suppressHydrationWarning>
      <Navbar />
      <Sidebar />
      {/* className='container mx-auto px-4 my-6' */}
      <main className='p-4 pt-10 sm:ml-64'>
          {children}
      </main>
      </div>
    // </ProtectedRoute>
  )
}

export default Layout