import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirestore } from '@/hooks/useFirestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const { blogPosts, fetchBlogPosts } = useFirestore();
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<any>(null);

  useEffect(() => {
    const loadBlog = async () => {
      await fetchBlogPosts();
      setLoading(false);
    };
    loadBlog();
  }, [fetchBlogPosts]);

  useEffect(() => {
    if (!loading && blogPosts.length > 0) {
      const post = blogPosts.find(post => post.id === blogId);
      setBlogPost(post || null);
    }
  }, [blogId, blogPosts, loading]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <div className="pt-32 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herbal-primary mx-auto mb-4"></div>
            <p className="text-deep-brown/60">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="font-heading text-2xl font-bold text-deep-brown mb-4">Blog Post Not Found</h1>
          <Link to="/blog">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/blog">
              <Button variant="outline" className="mb-4 text-deep-brown border-deep-brown hover:bg-herbal-primary hover:text-pure-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Blog Header */}
          <Card className="shadow-premium bg-pure-white mb-8">
            <CardHeader className="pb-2">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-brown mb-4">
                {blogPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blogPost.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blogPost.author}
                </div>
                {blogPost.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {blogPost.category}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {Math.ceil(blogPost.content.length / 1000)} min read
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Featured Image */}
          {blogPost.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8 shadow-premium">
              <img 
                src={blogPost.imageUrl} 
                alt={blogPost.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog Content */}
          <Card className="shadow-premium bg-pure-white mb-8">
            <CardContent className="pt-6">
              <div className="prose prose-stone max-w-none">
                {blogPost.content.split('\n').map((paragraph: string, index: number) => (
                  paragraph.trim() ? 
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p> : 
                    <br key={index} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Author Section */}
          <Card className="shadow-premium bg-pure-white mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-deep-brown" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-deep-brown mb-1">About the Author</h3>
                  <h4 className="text-lg mb-2">{blogPost.author}</h4>
                  <p className="text-muted-foreground">
                    Dr. Basavaiah Ayurveda Hospital's expert practitioner with extensive knowledge in traditional Ayurvedic treatments and modern wellness approaches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts Section (placeholder) */}
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              Continue Reading
            </h2>
            <Link to="/blog">
              <Button variant="hero">
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
