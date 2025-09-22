import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogStore } from '@/stores/BlogStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const LatestPosts = observer(() => {
  const latestPosts = blogStore.latestPosts;
  const { language } = useLanguage();
  const t = translations[language];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scrollLeft = () => {
    const container = document.getElementById('post-scroll');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('post-scroll');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase">{t.latestPosts.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.latestPosts.subtitle}
          </p>
        </div>

        {latestPosts.length > 0 ? (
		  <div className="relative">
	      {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute max-lg:hidden left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute max-lg:hidden right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ marginTop: '-2rem' }}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
          <div id="post-scroll" className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max px-16">
              {latestPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-96 max-lg:w-72">
                  <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative">
                    <img
                      src={post.image || 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          {t.latestPosts.featured}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm max-lg:text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl max-lg:text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 max-lg:text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
					  <Link href={`/blog/${post.slug}`}>
					  
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 p-0"
                      >
                        {t.latestPosts.readMore}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
					  </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
		  </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {t.latestPosts.noPosts}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

export default LatestPosts;