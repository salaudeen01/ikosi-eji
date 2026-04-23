import React from 'react';
import Layout from '@/components/layout';
import { useHomeData } from '@/hooks/mutatiion/clients/useHomeData';
import { useHomeStore } from '@/store/clients/useHomeStore';
import ArticleSkeleton from '@/components/ArticleSkeleton';

// Import New Sections
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import AboutSection from '@/components/sections/AboutSection';
import ChairmanMessage from '@/components/sections/ChairmanMessage';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import NewsSection from '@/components/sections/NewsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import EmergencyBanner from '@/components/ui/EmergencyBanner';

const HomeIndex = () => {
  const { isLoading } = useHomeData();
  const { projects, breakingNews, newsData, categories } = useHomeStore();
  
  const recentNews = newsData?.slice(0, 4) || breakingNews?.slice(0, 4);
  const activeProjects = projects?.filter(p => true) || []; // Could be filtered by status if data supports it

  if (isLoading) return <ArticleSkeleton />;
  
  return (
    <Layout>
      <main className="flex flex-col font-sans w-full overflow-x-hidden">
        {/* Pass the first news item to Hero for the floating news card */}
        <HeroSection latestNews={recentNews?.[0]} />
        
        <StatsBar />
        
        <AboutSection />
        
        <ChairmanMessage />
        
        {/* Assuming categories or a tailored logic can populate services, else generic mapped array */}
        <ServicesSection />
        
        {/* Pass fetched projects down. The section handles the mapping internally. */}
        <ProjectsSection projects={activeProjects.length > 0 ? activeProjects : undefined} />
        
        <NewsSection newsData={recentNews.length > 0 ? recentNews : undefined} />
        
        {/* <GallerySection /> */}
        
        <ContactSection />
        
        <EmergencyBanner />
      </main>
    </Layout>
  );
};

export default HomeIndex;