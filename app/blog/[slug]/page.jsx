'use client';

import { observer } from 'mobx-react-lite';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import { blogStore } from '@/stores/BlogStore';
import Head from 'next/head';

const BlogDetailClient = observer(({ params }) => {
  const post = blogStore.posts.find(p => p.slug === params?.slug);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image || '/og_logo.png'} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image || '/og_logo.png'} />
      </Head>

      <Header />

      <main className="pt-32 pb-16 px-4 sm:px-6">
        <BlogPost post={post} showBackButton={true} showFullContent={true} />
      </main>

      <Footer />
    </div>
  );
});

export default BlogDetailClient;
