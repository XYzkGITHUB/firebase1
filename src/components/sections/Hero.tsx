"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";
import { ContentTab } from "@/app/page";
import Beams from "@/components/ui/beams";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";

interface HeroProps {
  activeTab: ContentTab;
}

export function Hero({ activeTab }: HeroProps) {
  const isMobile = useIsMobile();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackerLogin = () => {
    window.location.href = "https://irgg.ru/";
  };

  const content = {
    keramogranit: {
      title: "КЕРАМОГРАНИТ ПОД КЛЮЧ",
      desc: "Подбираем материал от производителей по всему миру и доставляем на объект точно в срок."
    },
    laminate_sps: {
      title: "ЛАМИНАТ И SPS",
      desc: "Стабильные поставки напрямую с фабрик Китая и Индии."
    },
    delivery: {
      title: "ЛОГИСТИКА БЕЗ ГРАНИЦ",
      desc: "Бережная доставка ваших материалов из Индии (25 дней) и Китая (35 дней) с полной страховкой."
    },
    contacts: {
      title: "НАШИ КОНТАКТЫ",
      desc: "Чеченская Республика, с. Бено-Юрт. Мы всегда на связи для решения ваших задач."
    }
  };

  const current = content[activeTab] || content.keramogranit;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 md:pt-48 pb-40">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#8B5E3C"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary blur-[200px] rounded-full" />
      </div>

      {/* Content Layer */}
      <div className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center pointer-events-none">
        <div className="relative w-full max-w-6xl py-12 md:py-24 px-4 md:px-16 flex flex-col items-center justify-center">
          
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Logo */}
            <div className="w-full h-[8rem] md:h-[14rem] flex items-center justify-center cursor-default pointer-events-auto">
              <TextHoverEffect text="IRGG" disableInteraction={isMobile} />
            </div>
            
            <div className="mt-8 text-center space-y-6 max-w-4xl">
              <div className="min-h-[100px] flex items-center justify-center">
                <BlurText 
                  text={current.title}
                  animateBy="words"
                  direction="top"
                  delay={10}
                  stepDuration={0.2}
                  className="text-3xl md:text-5xl lg:text-7xl font-headline text-foreground leading-tight uppercase tracking-tighter"
                />
              </div>
              
              <div className="min-h-[60px]">
                <BlurText 
                  text={current.desc}
                  animateBy="words"
                  direction="bottom"
                  delay={10}
                  stepDuration={0.15}
                  className="text-base text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto font-light"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 pointer-events-auto">
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="h-16 px-10 rounded-none font-bold group bg-primary hover:bg-primary/90 text-[11px] uppercase tracking-[0.3em] text-white shadow-2xl transition-all w-full sm:w-auto"
                >
                  Связаться с менеджером
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
                
                {activeTab !== "contacts" && (
                  <ShineButton 
                    label="Вход в трекер" 
                    size="lg" 
                    icon={<Box className="h-4 w-4" />}
                    bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)" 
                    onClick={handleTrackerLogin}
                    className="w-full sm:w-auto"
                  />
                )}
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