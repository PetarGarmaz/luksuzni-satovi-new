'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Collection from '@/components/Collection';
import PopularBrands from '@/components/PopularBrands';
import Catalogue from '@/components/Catalogue';
import LatestPosts from '@/components/LatestPosts';
import Recommendations from '@/components/Recommendations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <SectionDivider />
      <Collection />
      <SectionDivider />
      <LatestPosts />
      <SectionDivider />
      <Recommendations />
      <SectionDivider />
      <Contact />
      <Footer />
    </div>
  );
}