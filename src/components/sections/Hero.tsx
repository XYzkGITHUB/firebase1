
"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";
import { ContentTab } from "@/app/page";
import FloatingLines from "@/components/ui/floating-lines";

interface HeroProps {
  activeTab: ContentTab;
}

export function Hero({ activeTab }: HeroProps) {
  const content = {
    keramogranit: {
      title: "Керамогранит под ключ",
      desc: "Подбираем материал от производителей по всему миру и доставляем на объект точно в срок."
    },
    laminate_sps: {
      title: "ЛАМИНАТ И SPS",
      desc: "Стабильные поставки напрямую с фабрик Китая и Индии."
    }
  };

  const current = content[activeTab];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 md:pt-48 pb-40">
      {/* Dynamic Background Lines - Background layer that should receive events */}
      <div className="absolute inset-0 z-0 opacity-15">
        <FloatingLines 
          linesGradient={['#8B5E3C', '#C9C3BC', '#4A3728']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          animationSpeed={0.3}
          mixBlendMode="normal"
        />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary blur-[200px] rounded-full" />
      </div>

      {/* Content Layer - Added pointer-events-none to allow events to pass to background */}
      <div className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center pointer-events-none">
        <div className="relative w-full max-w-6xl py-24 px-6 md:px-16 flex flex-col items-center justify-center">
          
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Text hover effect should still be interactive if needed, but here we prioritize background for demo */}
            <div className="w-full h-[10rem] md:h-[14rem] flex items-center justify-center cursor-default pointer-events-auto">
              <TextHoverEffect text="IRGG" />
            </div>
            
            <div className="mt-8 text-center space-y-6 max-w-2xl animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline text-foreground leading-tight uppercase tracking-tighter">
                {current.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-lg mx-auto font-light opacity-80">
                {current.desc}
              </p>
              
              {/* Buttons must have pointer-events-auto to remain clickable */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 pointer-events-auto">
                <Button size="lg" className="h-16 px-10 rounded-none font-bold group bg-primary hover:bg-primary/90 text-[11px] uppercase tracking-[0.3em] text-white shadow-2xl transition-all">
                  Связаться с менеджером
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-none border-white/10 hover:bg-white/5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all bg-transparent backdrop-blur-sm">
                  <Box className="mr-3 h-4 w-4" />
                  Вход в трекер
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
