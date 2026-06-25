"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LuxuryLoader } from "@/components/ui/luxury-loader";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    "RION"
  ];

  const handleBackToSite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim().includes(" ")) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, укажите фамилию!",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }

      setTimeout(() => {
        toast({
          title: "Регистрация успешна",
          description: `Добро пожаловать, ${name}!`,
        });
        router.push("/");
      }, 300);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: error.message || "Не удалось создать аккаунт.",
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

      <Card className="w-full max-w-md glass-panel border-border shadow-2xl overflow-hidden">
        <div className="bg-primary/10 py-3 px-6 text-center border-b border-border">
          <TypingAnimation 
            texts={typingTexts} 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
          />
        </div>
        <CardHeader className="space-y-4 text-center pt-8">
          <CardTitle className="text-4xl font-headline tracking-tighter uppercase">Регистрация</CardTitle>
          <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
            Станьте партнером RION
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Полное имя</label>
              <Input 
                type="text" 
                placeholder="Иван Иванов" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border h-12"
                required
              />
            </div>
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
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Пароль</label>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Подтвердите пароль</label>
              <div className="relative">
                <Input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-background/50 border-border h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs mt-4"
              disabled={isLoading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Создать аккаунт
            </Button>
            <div className="text-center pt-2">
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
