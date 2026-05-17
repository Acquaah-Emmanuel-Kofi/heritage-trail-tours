'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Since we don't have a newsletter API yet, we'll just show a success message
      // In production, this would send the email to your email service
      toast.success('Thanks for subscribing! Check your email for exclusive offers.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 overflow-hidden p-8 sm:p-12">
          <div className="flex items-center justify-center mb-6 h-12 w-12 rounded-lg bg-primary/20 mx-auto">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-3">
            Discover Hidden Gems
          </h2>

          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive tour offers, travel tips, cultural insights, and early access to new destinations. We send updates once a week — no spam, we promise!
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex gap-3 flex-col sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-background/80 border-border/50"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="group whitespace-nowrap sm:w-auto"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>

          {/* Social Proof */}
          <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">5,000+</p>
              <p className="text-xs text-muted-foreground">Subscribers</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">15+</p>
              <p className="text-xs text-muted-foreground">Countries</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">98%</p>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
