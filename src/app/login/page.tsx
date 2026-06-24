
"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LuxuryLoader } from "@/components/ui/luxury-loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const typingTexts = [
    "Керамогранит премиум-класса",
    "Эксклюзивная сантехника",
    "Прямые поставки из Индии",
    "Ламинат и SPS коллекции",
    "Логистика под ключ",
    "IRGG Luxe Surface"
  ];

  const handleBackToSite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в IRGG Luxe Surface.",
        });
        router.push("/");
      }, 500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Неверный email или пароль.",
      });
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <LuxuryLoader isVisible={isLoading} />
      
      <div className="absolute top-8 left-8">
        <button 
          onClick={handleBackToSite}
          className="flex items-center text-muted-foreground hover:text-primary transition-colors gap-2 uppercase tracking-widest text-[10px] font-bold bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} /> Назад на сайт
        </button>
      </div>

      <Card className="w-full max-w-md glass-panel border-white/5 shadow-2xl overflow-hidden">
        <div className="bg-primary/10 py-3 px-6 text-center border-b border-white/5">
          <TypingAnimation 
            texts={typingTexts} 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
          />
        </div>
        <CardHeader className="space-y-4 text-center pt-8">
          <CardTitle className="text-4xl font-headline tracking-tighter uppercase">Вход</CardTitle>
          <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
            Личный кабинет партнера IRGG
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
              <LogIn className="mr-2 h-4 w-4" />
              Войти
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link href="/register" className="text-primary hover:underline font-bold">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
