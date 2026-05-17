'use client';

import { Share2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shareToFacebook, shareToTwitter, shareToWhatsApp, shareViaEmail, shareToTikTok, copyToClipboard } from '@/lib/share';
import { toast } from 'sonner';

interface ShareButtonsProps {
  tourTitle: string;
}

export function ShareButtons({ tourTitle }: ShareButtonsProps) {
  return (
    <div className="bg-muted/50 border-b border-border/50 px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Share this tour:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => shareToFacebook(typeof window !== 'undefined' ? window.location.href : '', tourTitle)}
            className="h-8 px-3 text-xs"
          >
            Facebook
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => shareToTwitter(typeof window !== 'undefined' ? window.location.href : '', tourTitle)}
            className="h-8 px-3 text-xs"
          >
            Twitter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => shareToWhatsApp(typeof window !== 'undefined' ? window.location.href : '', tourTitle)}
            className="h-8 px-3 text-xs"
          >
            WhatsApp
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => shareToTikTok(typeof window !== 'undefined' ? window.location.href : '', tourTitle)}
            className="h-8 px-3 text-xs"
          >
            TikTok
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => shareViaEmail(typeof window !== 'undefined' ? window.location.href : '', tourTitle)}
            className="h-8 px-3 text-xs"
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              const copied = await copyToClipboard(typeof window !== 'undefined' ? window.location.href : '');
              if (copied) {
                toast.success('Tour link copied to clipboard!');
              } else {
                toast.error('Failed to copy link');
              }
            }}
            className="h-8 px-3 text-xs"
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}
