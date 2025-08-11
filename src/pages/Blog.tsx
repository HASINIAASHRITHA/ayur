import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/hooks/useFirestore';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const { blogPosts, fetchBlogPosts, loading } = useFirestore();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <div className="pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
            Ayurveda Blog
          </h1>
          <p className="text-xl text-deep-brown/80 max-w-3xl mx-auto leading-relaxed">
            Discover the ancient wisdom of Ayurveda through our expert insights, 
            health tips, and traditional healing knowledge.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group hover-lift animate-fade-up bg-pure-white border-gold-soft/20 shadow-soft hover:shadow-gold transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {post.imageUrl && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  
                  <CardTitle className="font-heading text-xl font-bold text-deep-brown group-hover:text-herbal-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </CardDescription>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-herbal-primary group-hover:text-pure-white transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-pure-white rounded-2xl p-8 shadow-premium">
          <h3 className="font-heading text-2xl font-bold text-deep-brown mb-4">
            Stay Updated with Ayurvedic Wisdom
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on natural healing, 
            wellness tips, and Ayurvedic lifestyle guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-herbal-primary/20 rounded-lg focus:outline-none focus:border-herbal-primary"
            />
            <Button variant="hero">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;