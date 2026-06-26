"use client";
import React, { useState } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, ShoppingBag, Star, Grid3X3, Layers, Bath, LampCeiling, Square } from "lucide-react";
import { ContentTab } from "@/app/page";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";
import NumberTicker from "@/components/ui/number-ticker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface HeroProps {
  activeTab: ContentTab;
}

export function Hero({ activeTab }: HeroProps) {
  const isMobile = useIsMobile();
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  
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
    sanitary: {
      title: "ЭКСКЛЮЗИВНАЯ САНТЕХНИКА",
      desc: "Прямые поставки санфаянса и мебели для ванных комнат от ведущих мировых брендов."
    },
    delivery: {
      title: "ЛОГИСТИКА БЕЗ ГРАНИЦ",
      desc: "Бережная доставка ваших материалов из Индии (25 дней) и Китая (35 дней) с полной страховкой."
    },
    contacts: {
      title: "БОЛЬШЕ О RION",
      desc: "Чеченская Республика, с. Бено-Юрт. Мы всегда на связи для решения ваших задач."
    }
  };

  const categories = [
    { name: "Керамогранит", icon: <Grid3X3 className="w-6 h-6" /> },
    { name: "Ламинат", icon: <Layers className="w-6 h-6" /> },
    { name: "Сантехника", icon: <Bath className="w-6 h-6" /> },
    { name: "Люстры", icon: <LampCeiling className="w-6 h-6" /> },
    { name: "Ковры", icon: <Square className="w-6 h-6" /> },
  ];

  const current = content[activeTab] || content.keramogranit;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 md:pt-48 pb-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary blur-[200px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center pointer-events-none">
        <div className="relative w-full max-w-6xl py-12 md:py-24 px-4 md:px-16 flex flex-col items-center justify-center">
          
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-full h-[8rem] md:h-[14rem] flex items-center justify-center cursor-default pointer-events-auto">
              <TextHoverEffect text="RION" disableInteraction={isMobile} />
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

              {activeTab === 'contacts' && (
                <div className="flex flex-col items-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                      <div className="relative w-5 h-5">
                         <Star className="absolute inset-0 w-5 h-5 text-primary opacity-20" />
                         <div className="absolute inset-0 overflow-hidden w-[60%]">
                           <Star className="w-5 h-5 fill-primary text-primary" />
                         </div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <NumberTicker 
                        value={4.6} 
                        decimalPlaces={1} 
                        className="text-3xl font-headline font-bold text-foreground"
                      />
                      <span className="text-lg text-muted-foreground font-light">/ 5</span>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground opacity-40">Рейтинг доверия партнеров</span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 pointer-events-auto">
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="h-16 px-10 rounded-none font-bold group bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all w-full sm:w-auto"
                >
                  Связаться с менеджером
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
                
                {activeTab !== "contacts" && (
                  <>
                    {activeTab === 'delivery' ? (
                      <ShineButton 
                        label="Вход в трекер" 
                        size="lg" 
                        icon={<Box className="h-4 w-4" />}
                        bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)" 
                        onClick={handleTrackerLogin}
                        className="w-full sm:w-auto"
                      />
                    ) : (
                      <Dialog open={isStoreOpen} onOpenChange={setIsStoreOpen}>
                        <DialogTrigger asChild>
                          <div>
                            <ShineButton 
                              label="Открыть магазин" 
                              size="lg" 
                              icon={<ShoppingBag className="h-4 w-4" />}
                              variant="outline"
                              className="w-full sm:w-auto"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden rounded-none">
                          <div className="p-8 md:p-12">
                            <DialogHeader className="mb-10 text-center">
                              <DialogTitle className="text-3xl md:text-5xl font-headline uppercase tracking-tighter mb-4 h-[1.2em] flex items-center justify-center">
                                <TypingAnimation typeSpeed={20} showCursor={true} blinkCursor={true}>
                                  Куда вы хотите перейти?
                                </TypingAnimation>
                              </DialogTitle>
                              <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold opacity-60">
                                Выберите интересующую категорию материалов RION
                              </p>
                            </DialogHeader>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <AnimatePresence>
                                {categories.map((cat, idx) => (
                                  <motion.button
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                      delay: idx * 0.1,
                                      type: "spring",
                                      stiffness: 260,
                                      damping: 20
                                    }}
                                    className="flex items-center gap-6 p-6 border-2 border-foreground/15 bg-card/40 text-left relative overflow-hidden rounded-none shadow-sm cursor-pointer"
                                    onClick={() => setIsStoreOpen(false)}
                                  >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      {cat.icon}
                                    </div>
                                    <div className="relative z-10">
                                      <div className="font-headline text-xl font-bold uppercase tracking-tight">
                                        {cat.name}
                                      </div>
                                      <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-1 font-bold">
                                        Смотреть каталог
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </AnimatePresence>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </>
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
