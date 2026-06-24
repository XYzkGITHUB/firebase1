'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // In development, we want to see the full error in the console
      // The Next.js error overlay will catch uncaught errors, but we can also toast it
      console.error(error);
      
      toast({
        variant: "destructive",
        title: "Security Rule Error",
        description: `Permission denied at ${error.context?.path}. Check your security rules.`,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
