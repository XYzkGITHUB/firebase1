
"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { UserPlus, ArrowLeft, Eye, EyeOff, ShieldCheck, Mail } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LuxuryLoader } from "@/components/ui/luxury-loader";
import { sendVerificationEmail } from "@/app/actions/email";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function RegisterPage() {
  const [step, setStep] = useState<"details" | "verify">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const typingTexts = [
    "Прямые поставки из Индии",
    "Керамогранит премиум-класса",
    "Логистика под ключ",
    "Личный кабинет партнера",
    "IRGG"
  ];

  const handleStartRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Ошибка", description: "Пароли не совпадают." });
      return;
    }

    setIsLoading(true);
    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      const codeData = {
        email: email.toLowerCase(),
        code: generatedCode,
        type: 'registration',
        createdAt: serverTimestamp(),
      };

      const codesRef = collection(db, "verificationCodes");
      addDoc(codesRef, codeData).catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: codesRef.path,
          operation: 'create',
          requestResourceData: codeData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

      await sendVerificationEmail(email.toLowerCase(), generatedCode, name);

      toast({
        title: "Код отправлен",
        description: `Мы отправили 6-значный код на почту ${email}`,
      });
      
      setStep("verify");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось отправить код подтверждения.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const codesRef = collection(db, "verificationCodes");
      const q = query(
        codesRef, 
        where("email", "==", email.toLowerCase()),
        where("code", "==", otp)
      );
      
      const querySnapshot = await getDocs(q).catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: codesRef.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw err;
      });

      if (querySnapshot.empty) {
        throw new Error("Неверный код подтверждения.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      const codeDocId = querySnapshot.docs[0].id;
      deleteDoc(doc(db, "verificationCodes", codeDocId));

      toast({
        title: "Регистрация успешна",
        description: `Добро пожаловать, ${name}!`,
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка верификации",
        description: error.message || "Не удалось создать аккаунт.",
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

        {step === "details" ? (
          <>
            <CardHeader className="space-y-4 text-center pt-8">
              <CardTitle className="text-4xl font-headline tracking-tighter uppercase">Регистрация</CardTitle>
              <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">
                Станьте партнером IRGG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStartRegistration} className="space-y-4">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Подтвердите пароль</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-background/50 border-border h-12"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest text-xs mt-4"
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Получить код
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
          </>
        ) : (
          <>
            <CardHeader className="space-y-4 text-center pt-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-3xl font-headline tracking-tighter uppercase">Подтверждение</CardTitle>
              <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] px-8">
                Мы отправили 6-значный код на <strong>{email}</strong>. Пожалуйста, введите его ниже.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyAndRegister} className="space-y-6">
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
                  <UserPlus className="mr-2 h-4 w-4" />
                  Завершить регистрацию
                </Button>
                <button 
                  type="button"
                  onClick={() => setStep("details")}
                  className="w-full text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  Изменить email или пароль
                </button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
