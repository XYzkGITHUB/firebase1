
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { LogIn, ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LuxuryLoader } from "@/components/ui/luxury-loader";

export default function LoginPage() {
  const [view, setView] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const typingTexts = [
    "Керамогранит премиум-класса",
    "Эксклюзивная сантехника",
    "Прямые поставки из Индии",
    "Ламинат и SPS коллекции",
    "Логистика под ключ",
    "IRGG"
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Backend functionality removed
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Система входа временно отключена.",
      });
      setIsLoading(false);
    }, 800);
  };

  const handleStartReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ variant: "destructive", title: "Ошибка", description: "Введите email." });
      return;
    }

    setIsLoading(true);
    // Backend functionality removed
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Функция восстановления пароля недоступна.",
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <LuxuryLoader isVisible={isLoading} />
      
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center text-muted-foreground hover:text-primary transition-colors gap-2 uppercase tracking-widest text-[10px] font-bold"
        >
          <ArrowLeft size={16} /> Назад на сайт
        </Link>
      </div>

      <Card className="w-full max-w-md glass-panel border-border shadow-2xl overflow-hidden">
        <div className="bg-primary/10 py-3 px-6 text-center border-b border-border">
          <TypingAnimation 
            words={typingTexts} 
            loop
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
          />
        </div>

        {view === "login" && (
          <>
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
                    className="bg-background/50 border-border h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Пароль</label>
                    <button 
                      type="button" 
                      onClick={() => setView("forgot")}
                      className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline transition-all"
                    >
                      Забыли пароль?
                    </button>
                  </div>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 border-border h-12 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
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
          </>
        )}

        {view === "forgot" && (
          <>
            <CardHeader className="space-y-4 text-center pt-8">
              <CardTitle className="text-3xl font-headline tracking-tighter uppercase">Восстановление</CardTitle>
              <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
                Введите email для получения ссылки для сброса пароля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStartReset} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-border h-12"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs"
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Отправить ссылку
                </Button>
                <button 
                  type="button"
                  onClick={() => setView("login")}
                  className="w-full text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  Вернуться ко входу
                </button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
