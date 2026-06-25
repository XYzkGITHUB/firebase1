"use client";
import React, { useState } from "react";
import { createYookassaPayment } from "@/app/actions/yookassa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SplitText from "@/components/ui/split-text";

export function PaymentModule() {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите корректную сумму для оплаты.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await createYookassaPayment(numAmount, "Оплата услуг RION Luxe Surface");
      // Redirect the user to YooKassa
      window.location.href = result.confirmationUrl;
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка оплаты",
        description: error.message || "Не удалось инициировать платеж.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SplitText
            text="Оплата услуг онлайн"
            tag="h2"
            className="text-4xl md:text-5xl font-headline mb-4 uppercase tracking-tighter"
            textAlign="center"
          />
          <p className="text-muted-foreground text-lg font-light">
            Безопасная оплата через YooKassa. Введите сумму для формирования счета.
          </p>
        </div>

        <Card className="glass-panel border-white/10 overflow-hidden shadow-2xl">
          <CardHeader className="bg-primary/10 border-b border-white/5 py-8">
            <CardTitle className="text-xl font-headline flex items-center justify-center gap-3 uppercase tracking-widest">
              <CreditCard className="text-primary" /> Платежный шлюз
            </CardTitle>
            <CardDescription className="text-center text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
              RION Global Logistics & Materials
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground block text-center">
                Сумма к оплате (₽)
              </label>
              <div className="relative max-w-sm mx-auto">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-20 text-4xl text-center font-headline bg-background/50 border-white/5 rounded-none focus:ring-primary pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-headline text-muted-foreground">₽</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isLoading || !amount}
              className="w-full h-20 bg-primary text-white font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:bg-primary/90 transition-all shadow-xl"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-3 h-5 w-5" />
              ) : (
                <CheckCircle2 className="mr-3 h-5 w-5" />
              )}
              {isLoading ? "Подготовка..." : "Перейти к оплате"}
            </Button>

            <div className="flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default pt-4">
              <span className="text-[9px] font-bold uppercase tracking-widest">VISA</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">MasterCard</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">МИР</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">YooKassa</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
