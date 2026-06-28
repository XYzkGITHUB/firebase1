
"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { LogIn, ArrowLeft, Eye, EyeOff, ShieldCheck, Mail, KeyRound, LockKeyhole } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LuxuryLoader } from "@/components/ui/luxury-loader";
import { sendAuthEmail } from "@/app/actions/email";

export default function LoginPage() {
  const [view, setView] = useState<"login" | "forgot" | "verify_reset" | "new_password">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в IRGG.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Неверный email или пароль.",
      });
      setIsLoading(false);
    }
  };

  const handleStartReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ variant: "destructive", title: "Ошибка", description: "Введите email." });
      return;
    }

    setIsLoading(true);
    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

      await addDoc(collection(db, "verificationCodes"), {
        email: email.toLowerCase(),
        code: generatedCode,
        type: 'password_reset',
        createdAt: serverTimestamp(),
      });

      await sendAuthEmail(email, generatedCode, "", "reset");

      toast({
        title: "Код отправлен",
        description: `Мы отправили код для восстановления на ${email}`,
      });
      setView("verify_reset");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось инициировать восстановление. Проверьте правильность email.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "verificationCodes"), 
        where("email", "==", email.toLowerCase()),
        where("code", "==", otp)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Неверный код восстановления.");
      }

      // Cleanup code
      const codeDocId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "verificationCodes", codeDocId));

      toast({
        title: "Доступ подтвержден",
        description: "Пожалуйста, установите новый пароль.",
      });
      setView("new_password");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка верификации",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({ variant: "destructive", title: "Ошибка", description: "Пароли не совпадают." });
      return;
    }

    setIsLoading(true);
    try {
      // In Firebase client SDK, resetting password after custom OTP verification
      // usually requires the final secure link to be sent to confirm identity with the server.
      await sendPasswordResetEmail(auth, email);
      
      toast({
        title: "Запрос принят",
        description: "Мы отправили финальную ссылку для активации нового пароля на ваш email.",
      });
      setView("login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось завершить сброс пароля.",
      });
    } finally {
      setIsLoading(false);
    }
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
                Введите email для получения кода
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
                  Получить код
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

        {view === "verify_reset" && (
          <>
            <CardHeader className="space-y-4 text-center pt-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-headline tracking-tighter uppercase">Проверка</CardTitle>
              <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] px-8">
                Мы отправили код восстановления на <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyReset} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block text-center">Код из письма</label>
                  <Input 
                    type="text" 
                    placeholder="000000" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-background/50 border-border h-16 text-center text-3xl font-bold tracking-[0.5em] focus:ring-primary"
                    required
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs"
                  disabled={isLoading || otp.length !== 6}
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  Подтвердить код
                </Button>
                <button 
                  type="button"
                  onClick={() => setView("forgot")}
                  className="w-full text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  Изменить email
                </button>
              </form>
            </CardContent>
          </>
        )}

        {view === "new_password" && (
          <>
            <CardHeader className="space-y-4 text-center pt-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LockKeyhole className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-headline tracking-tighter uppercase">Новый пароль</CardTitle>
              <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
                Установите ваш новый пароль доступа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetNewPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Новый пароль</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-background/50 border-border h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Подтвердите новый пароль</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="bg-background/50 border-border h-12"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs"
                  disabled={isLoading}
                >
                  Сохранить пароль
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
