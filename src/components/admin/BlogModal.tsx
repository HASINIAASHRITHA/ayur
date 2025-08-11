import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFirestore, BlogPost } from '@/hooks/useFirestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  editingPost?: BlogPost | null;
}

const BlogModal: React.FC<BlogModalProps> = ({ open, onClose, editingPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    imageUrl: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addBlogPost, updateBlogPost, uploadImage } = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title || '',
        content: editingPost.content || '',
        excerpt: editingPost.excerpt || '',
        author: editingPost.author || '',
        imageUrl: editingPost.imageUrl || '',
        category: (editingPost as any).category || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        imageUrl: '',
        category: ''
      });
    }
    setImageFile(null);
  }, [editingPost, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        imageUrl,
        category: formData.category
      };

      if (editingPost?.id) {
        await updateBlogPost(editingPost.id, postData);
        toast({
          title: "Blog Post Updated",
          description: "Blog post has been updated successfully",
        });
      } else {
        await addBlogPost(postData);
        toast({
          title: "Blog Post Added",
          description: "New blog post has been added successfully",
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold text-deep-brown">
            {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </DialogTitle>
          <DialogDescription>
            {editingPost ? 'Update blog post content' : 'Create a new blog post for your website'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., The Benefits of Ayurvedic Medicine"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Ayurvedic Medicine, Lifestyle"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of the blog post"
              required
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full blog post content"
              required
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g., Dr. Basavaiah"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Image URL</Label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
              <div className="text-center text-sm text-muted-foreground">or</div>
              <div>
                <Label className="text-sm">Upload File</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            {formData.imageUrl && !imageFile && (
              <p className="text-sm text-muted-foreground">Current image will be used</p>
            )}
            {imageFile && (
              <p className="text-sm text-herbal-primary">New image selected: {imageFile.name}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                editingPost ? 'Update Post' : 'Add Post'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;