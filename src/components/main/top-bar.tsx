'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const dismissed = localStorage.getItem('topBarDismissed');
    if (dismissed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('topBarDismissed', 'true');
    } catch (error) {
      console.error('Failed to update localStorage', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative flex h-10 w-full items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground">
      <span className="text-center">50% off until diwali</span>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-primary/80"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
}
