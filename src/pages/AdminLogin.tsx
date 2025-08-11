import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      await login(email, password);
      console.log('Login successful, redirecting to dashboard...');
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.code === 'auth/user-not-found' 
        ? "No user found with this email address"
        : error?.code === 'auth/wrong-password'
        ? "Incorrect password"
        : error?.code === 'auth/invalid-email'
        ? "Invalid email format"
        : error?.code === 'auth/too-many-requests'
        ? "Too many failed attempts. Please try again later"
        : `Authentication failed: ${error?.message || 'Unknown error'}`;
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-premium">
        <CardHeader className="space-y-1 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4 mx-auto">
            <Lock className="w-8 h-8 text-deep-brown" />
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-deep-brown">
            Admin Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Access the hospital management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-deep-brown font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@basavaiahayurveda.com"
                required
                disabled={loading}
                className="border-herbal-primary/20 focus:border-herbal-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-deep-brown font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="border-herbal-primary/20 focus:border-herbal-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              variant="hero"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;