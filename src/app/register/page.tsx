
"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { UserPlus, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в команду IRGG.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: error.message || "Не удалось создать аккаунт.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors gap-2 uppercase tracking-widest text-[10px] font-bold">
          <ArrowLeft size={16} /> Назад на сайт
        </Link>
      </div>

      <Card className="w-full max-w-md glass-panel border-white/5 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-4xl font-headline tracking-tighter uppercase">Регистрация</CardTitle>
          <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
            Станьте партнером IRGG Luxe Surface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-white/5 h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Пароль</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-white/5 h-12"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Создать аккаунт
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-primary hover:underline font-bold">
                  Войти
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
