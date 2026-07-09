
"use client";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { ContentTab } from "@/app/page";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Dynamically load StoreView only when needed
const StoreView = dynamic(() => import('./StoreView'), {
  loading: () => <div className="fixed inset-0 z-[110] bg-background/95 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>,
  ssr: false
});

interface HeroProps {
  activeTab: ContentTab;
  isStoreOpen: boolean;
  setIsStoreOpen: (open: boolean) => void;
  externalFilter?: string[];
  onFilterChange?: (filters: string[]) => void;
}

export function Hero({ 
  activeTab, 
  isStoreOpen, 
  setIsStoreOpen, 
  externalFilter = [],
  onFilterChange
}: HeroProps) {
  const isMobile = useIsMobile();
  
  // Star Rating Animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const jitter = (Math.random() - 0.5) * 0.05;
    const value = latest + (latest < 4.6 && latest > 0 ? jitter : 0);
    return Math.min(4.6, Math.max(0, value)).toFixed(1);
  });
  const [starsFill, setStarsFill] = useState(0);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  // Decorative images for shop soul
  const soulImages = useMemo(() => ({
    left: PlaceHolderImages.find(img => img.id === "tiles-secondary"),
    right: PlaceHolderImages.find(img => img.id === "sanitary-secondary"),
  }), []);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (isStoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isStoreOpen]);

  useEffect(() => {
    const seen = sessionStorage.getItem('irgg_hero_rating_seen');
    if (seen) {
      count.set(4.6);
      setStarsFill(92);
      setAnimationPlayed(true);
      return;
    }

    if (activeTab === 'contacts' && !isStoreOpen && !animationPlayed) {
      const numberAnimation = animate(count, 4.6, {
        duration: 2,
        ease: "easeOut",
      });

      const starAnimation = animate(0, 92, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setStarsFill(latest),
      });

      sessionStorage.setItem('irgg_hero_rating_seen', 'true');
      setAnimationPlayed(true);

      return () => {
        numberAnimation.stop();
        starAnimation.stop();
      };
    }
  }, [activeTab, isStoreOpen, animationPlayed, count]);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackerLogin = () => {
    window.location.href = "https://irgg.ru/";
  };

  const toggleStore = () => {
    setIsStoreOpen(!isStoreOpen);
  };

  const currentContent = {
    main: { title: "", desc: "" },
    keramogranit: { title: "КЕРАМОГРАНИТ ПОД КЛЮЧ", desc: "Подбираем материал от производителей по всему миру и доставляем на объект точно в срок." },
    laminate_sps: { title: "ЛАМИНАТ И SPS", desc: "Стабильные поставки напрямую с фабрик Китая и Индии." },
    sanitary: { title: "ЭКСКЛЮЗИВНАЯ САНТЕХНИКА", desc: "Прямые поставки санфаянса и мебели для ванных комнат от ведущих мировых брендов." },
    delivery: { title: "ЛОГИСТИКА БЕЗ ГРАНИЦ", desc: "Бережная доставка ваших материалов из Индии (25 дней) и Китая (35 дней) с полной страховкой." },
    contacts: { title: "БОЛЬШЕ ОБ IRGG", desc: "Чеченская Республика, с. Бено-Юрт. Мы всегда на связи для решения ваших задач." }
  }[activeTab];

  // Star Generator
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.max(0, Math.min(100, (starsFill - i * 20) * 5));
    return (
      <svg key={i} width="24" height="24" viewBox="0 0 24 24" className="mr-1">
        <defs>
          <linearGradient id={`star-gradient-${i}`}>
            <stop offset={`${fillPercentage}%`} stopColor="black" />
            <stop offset={`${fillPercentage}%`} stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
        </defs>
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill={`url(#star-gradient-${i})`} stroke="black" strokeWidth="1.5" />
      </svg>
    );
  });

  if (activeTab === "main" && !isStoreOpen) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 md:pt-48 pb-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]" style={{ backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <AnimatePresence mode="wait">
        {!isStoreOpen ? (
          <motion.div key="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center">
            <div className="relative w-full max-w-6xl py-12 md:py-24 px-4 md:px-16 flex flex-col items-center justify-center">
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-full h-[8rem] md:h-[14rem] flex items-center justify-center cursor-default">
                  <TextHoverEffect text="IRGG" disableInteraction={isMobile} />
                </div>
                <div className="mt-8 text-center space-y-6 max-w-4xl">
                  <div className="min-h-[100px] flex items-center justify-center">
                    <BlurText text={currentContent.title} animateBy="words" direction="top" className="text-3xl md:text-5xl lg:text-7xl font-headline text-foreground leading-tight uppercase tracking-tighter" />
                  </div>
                  <div className="min-h-[60px]">
                    <BlurText text={currentContent.desc} animateBy="words" direction="bottom" className="text-base text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto font-light" />
                  </div>

                  {activeTab === 'contacts' && (
                    <div className="flex flex-col items-center gap-2 pt-8">
                      <div className="flex items-center gap-6">
                        <div className="flex">{stars}</div>
                        <div className="text-2xl md:text-3xl font-headline font-bold text-black tabular-nums flex items-baseline gap-1">
                          <motion.span>{rounded}</motion.span>
                          <span className="text-sm md:text-base opacity-40">/ 5</span>
                        </div>
                      </div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground opacity-60">Рейтинг удовлетворенности партнеров</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                    <Button onClick={scrollToContact} size="lg" className="h-16 px-10 rounded-none font-bold group bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all w-full sm:w-auto">
                      Связаться с менеджером
                      <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Button>
                    {activeTab !== "contacts" && (
                      <>
                        {activeTab === 'delivery' ? (
                          <ShineButton label="Вход в трекер" size="lg" bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)" onClick={handleTrackerLogin} className="w-full sm:w-auto" />
                        ) : (
                          <ShineButton 
                            label="Открыть магазин" 
                            size="lg" 
                            variant="outline" 
                            onClick={toggleStore} 
                            className="w-full sm:w-auto" 
                            icon={<ShoppingBag className="w-5 h-5 mr-2" />}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <StoreView 
            key="store-view"
            onClose={() => setIsStoreOpen(false)}
            externalFilter={externalFilter}
            onFilterChange={onFilterChange}
            soulImages={soulImages}
          />
        )}
      </AnimatePresence>

      {!isStoreOpen && (activeTab !== "main") && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      )}
    </section>
  );
}
