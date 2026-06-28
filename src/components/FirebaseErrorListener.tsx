
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // Log internally for development, but don't show technical details to users
      console.error('Security Rule Violation:', error.context?.path);
      
      toast({
        variant: "destructive",
        title: "Ошибка доступа",
        description: "Недостаточно прав для выполнения операции. Пожалуйста, обратитесь в поддержку.",
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
