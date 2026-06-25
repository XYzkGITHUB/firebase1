"use client";
import React, { useState } from "react";
import { materialRecommendationAssistant, type MaterialRecommendationAssistantOutput } from "@/ai/flows/material-recommendation-assistant-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SplitText from "@/components/ui/split-text";

export function AIAssistant() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MaterialRecommendationAssistantOutput | null>(null);

  const handleRecommend = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const res = await materialRecommendationAssistant({ projectDescription: query });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-card/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary uppercase tracking-[0.2em] px-4 py-1">AI Assistant</Badge>
            <SplitText
              text="Умный подбор покрытия"
              tag="h2"
              className="text-4xl md:text-6xl font-headline mb-8 uppercase tracking-tighter leading-none"
              textAlign="left"
            />
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
              Наш ИИ-эксперт анализирует тысячи вариантов коллекций керамогранита и ламината, чтобы подобрать идеальное решение под ваш стиль, бюджет и технические требования объекта.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 border border-white/5 bg-card/40">
                <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">Анализ стиля</h4>
                <p className="text-sm text-muted-foreground">Сопоставление фактур с вашим интерьерным решением.</p>
              </div>
              <div className="p-6 border border-white/5 bg-card/40">
                <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">Технический расчет</h4>
                <p className="text-sm text-muted-foreground">Проверка износостойкости и пригодности под тип помещения.</p>
              </div>
            </div>
          </div>

          <Card className="glass-panel border-white/10 p-2">
            <CardHeader>
              <CardTitle className="text-2xl font-headline uppercase tracking-tight">Запрос на подбор</CardTitle>
              <CardDescription className="text-muted-foreground/60 italic">Опишите ваш проект: площадь, назначение, желаемые цвета или текстуры.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea 
                placeholder="Пример: Гостиная 60м2 в стиле минимализм, нужны серые тона, керамогранит под бетон, теплый пол..."
                className="min-h-[180px] bg-background/50 border-white/5 text-lg p-6 focus:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.3em] text-[12px] shadow-2xl transition-all group" 
                onClick={handleRecommend}
                disabled={isLoading || !query}
              >
                {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Sparkles className="mr-3 h-5 w-5 transition-transform group-hover:scale-125" />}
                Запустить нейросеть
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4 border border-white/5 bg-card/20 backdrop-blur-sm">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-code text-sm uppercase tracking-widest animate-pulse">Сканирование коллекций RION...</p>
            </div>
          )}

          {result && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="p-10 border-l-4 border-primary bg-primary/5">
                <h3 className="font-headline text-3xl mb-4 uppercase tracking-tighter">Заключение ИИ-дизайнера</h3>
                <p className="text-lg leading-relaxed text-foreground/80 font-light">{result.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.recommendations.map((rec, i) => (
                  <Card key={i} className="glass-panel group hover:border-primary/50 transition-all duration-500 flex flex-col">
                    <div className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-secondary/50 text-foreground text-[10px] uppercase tracking-widest">{rec.category.replace('_', ' ')}</Badge>
                        <div className="flex items-center text-primary font-bold">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span>{rec.suitabilityScore}%</span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight uppercase">{rec.productName}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{rec.description}</p>
                      <div className="pt-6 border-t border-white/5">
                         <p className="text-[11px] text-foreground/50 uppercase tracking-widest font-bold mb-2">Почему это подходит:</p>
                         <div className="text-sm italic text-foreground/80 bg-white/5 p-4 rounded">
                           {rec.reasoning}
                         </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
