
"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";
import { ContentTab } from "@/app/page";
import ShapeBlur from "@/components/ui/shape-blur";

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
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary blur-[200px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center">
        {/* Main Content Container with ShapeBlur Background */}
        <div className="relative w-full max-w-6xl py-24 px-6 md:px-16 flex flex-col items-center justify-center group">
          
          {/* ShapeBlur Background Effect - Expanded container */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-1000 scale-110 md:scale-125">
            <ShapeBlur
              variation={0}
              shapeSize={1.8}
              roundness={0.7}
              borderSize={0.03}
              circleSize={0.25}
              circleEdge={0.6}
            />
          </div>
          
          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Logo Area */}
            <div className="w-full h-[10rem] md:h-[14rem] flex items-center justify-center cursor-default">
              <TextHoverEffect text="IRGG" />
            </div>
            
            {/* Text Content */}
            <div className="mt-8 text-center space-y-6 max-w-2xl animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl font-headline text-foreground leading-tight uppercase tracking-tighter">
                {current.title}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-lg mx-auto font-light opacity-80">
                {current.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
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

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[9px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
