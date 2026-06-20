
"use client";
import React, { useState } from "react";
import { estimateDeliveryDate, type DeliveryDateEstimatorOutput } from "@/ai/flows/delivery-date-estimator-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Ship, Calendar, ShieldCheck, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function LogisticsAI() {
  const [reqs, setReqs] = useState("");
  const [method, setMethod] = useState<"sea" | "air">("sea");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DeliveryDateEstimatorOutput | null>(null);

  const handleEstimate = async () => {
    if (!reqs.trim()) return;
    setIsLoading(true);
    try {
      const res = await estimateDeliveryDate({ materialRequirements: reqs, deliveryMethod: method });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary font-code text-sm tracking-widest uppercase mb-4 block">Smart Logistics</span>
          <h2 className="text-4xl md:text-5xl font-headline mb-6">Прогнозирование сроков поставки</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Наш ИИ анализирует глобальные логистические маршруты, таможенные условия и специфику груза, чтобы дать вам максимально точную оценку прибытия материалов на объект.
          </p>
          
          <div className="space-y-6">
            <div className="p-6 glass-panel rounded-2xl space-y-4 border-white/5">
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Параметры груза</label>
                <Textarea 
                  placeholder="Опишите объем и тип материала (например: 500м2 керамогранита из Китая)"
                  className="bg-background/50"
                  value={reqs}
                  onChange={(e) => setReqs(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Способ доставки</label>
                <div className="flex gap-4">
                  <Button 
                    variant={method === "sea" ? "default" : "outline"} 
                    className="flex-1 h-12 rounded-lg"
                    onClick={() => setMethod("sea")}
                  >
                    <Ship className="mr-2 h-4 w-4" /> Море
                  </Button>
                  <Button 
                    variant={method === "air" ? "default" : "outline"} 
                    className="flex-1 h-12 rounded-lg"
                    onClick={() => setMethod("air")}
                  >
                    <Plane className="mr-2 h-4 w-4" /> Авиа
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full h-14 bg-primary text-white font-bold" 
                onClick={handleEstimate}
                disabled={isLoading || !reqs}
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Calendar className="mr-2 h-4 w-4" />}
                Рассчитать срок
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <Card className="relative glass-panel border-white/10 p-8 min-h-[400px] flex flex-col justify-center">
            {!result && !isLoading && (
              <div className="text-center space-y-4">
                <Calendar className="w-16 h-16 text-muted-foreground/20 mx-auto" />
                <p className="text-muted-foreground italic">Введите данные для прогноза</p>
              </div>
            )}
            
            {isLoading && (
              <div className="text-center space-y-6">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-xl font-headline animate-pulse">Анализируем морские линии...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="text-center space-y-2">
                  <span className="text-primary font-code text-sm">Estimated Date</span>
                  <div className="text-6xl font-headline font-bold text-foreground">{result.estimatedDeliveryDate}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1 text-primary" /> Confidence Score
                    </span>
                    <span className="font-bold text-primary">{result.confidenceScore}%</span>
                  </div>
                  <Progress value={result.confidenceScore} className="h-2 bg-white/5" />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-sm text-foreground/80 leading-relaxed">
                  "{result.reasoning}"
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border border-white/5 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-tighter">Производство</div>
                    <div className="text-sm font-bold">14-20 дн</div>
                  </div>
                  <div className="p-3 border border-white/5 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-tighter">Таможня</div>
                    <div className="text-sm font-bold">3-5 дн</div>
                  </div>
                  <div className="p-3 border border-white/5 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-tighter">Доставка</div>
                    <div className="text-sm font-bold">~{method === 'sea' ? '35' : '7'} дн</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
