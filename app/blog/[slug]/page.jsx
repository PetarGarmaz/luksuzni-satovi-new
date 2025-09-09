'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import { blogStore } from '@/stores/BlogStore';

const BlogDetailClient = observer(({ params }) => {
  const post = blogStore.posts.find(p => p.slug === params?.slug);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6">
        <BlogPost post={post} showBackButton={true} showFullContent={true} />
      </main>

      <Footer />
    </div>
  );
});

export default BlogDetailClient;