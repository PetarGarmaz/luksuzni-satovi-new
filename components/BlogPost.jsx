'use client';

import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const BlogPost = ({ post, showBackButton = true, showFullContent = true }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-light text-gray-900 mb-4">Članak nije pronađen</h1>
        <p className="text-gray-600 mb-8">Članak koji tražite ne postoji ili je uklonjen.</p>
        <Link href="/">
          <Button 
            className="text-white hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#bd890f'}}
          >
            Povratak na početnu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {showBackButton && (
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Povratak na početnu
          </Link>
        </div>
      )}

      {/* Featured Image */}
      <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-8">
        <img
          src={post.image || 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {post.featured && (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-4">
            {t.latestPosts.featured}
          </Badge>
        )}
        
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          {showFullContent && post.content && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{estimateReadingTime(post.content)} min čitanja</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-700 leading-relaxed mb-8 font-light">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Article Content */}
      {showFullContent && post.content && (
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Objavio:</p>
            <p className="font-medium text-gray-900">{post.author}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </footer>

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Zainteresirani za luksuzne satove?
        </h3>
        <p className="text-gray-600 mb-4">
          Pogledajte našu kolekciju pažljivo odabranih luksuznih satova
        </p>
        <Link href="/prodaja-satova">
          <Button 
            className="text-white hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#bd890f'}}
          >
            Pogledaj Satove
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;