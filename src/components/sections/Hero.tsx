
"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Layers, Layout, Filter, ArrowLeft, ShoppingBag, LampCeiling, Bath, X } from "lucide-react";
import { ContentTab } from "@/app/page";
import { cn } from "@/lib/utils";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface HeroProps {
  activeTab: ContentTab;
  isStoreOpen: boolean;
  setIsStoreOpen: (open: boolean) => void;
  externalFilter?: string[];
  onFilterChange?: (filters: string[]) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  keramogranit: <Grid3X3 className="w-6 h-6" />,
  laminate: <Layers className="w-6 h-6" />,
  carpets: <Layout className="w-6 h-6" />,
  lyustri: <LampCeiling className="w-6 h-6" />,
  sanitary: <Bath className="w-6 h-6" />,
};

const categoriesWithIcons = CATEGORIES.map(cat => ({
  ...cat,
  icon: categoryIcons[cat.id] || <ShoppingBag className="w-6 h-6" />
}));

export function Hero({ 
  activeTab, 
  isStoreOpen, 
  setIsStoreOpen, 
  externalFilter = [],
  onFilterChange
}: HeroProps) {
  const isMobile = useIsMobile();
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isStoreScrolled, setIsStoreScrolled] = useState(false);
  
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
    bottom: PlaceHolderImages.find(img => img.id === "store-random"),
  }), []);

  // Sync external filter with internal state
  useEffect(() => {
    if (externalFilter.length > 0) {
      setSelectedCats(externalFilter);
    }
  }, [externalFilter]);

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
    if (isStoreOpen) {
      setIsStoreOpen(false);
      setIsStoreScrolled(false);
      setShowFilterMenu(false);
    } else {
      setIsStoreOpen(true);
      setSelectedCats([]);
    }
  };

  const storeTitle = useMemo(() => {
    if (selectedCats.length === 0) return "Весь ассортимент";
    const names = CATEGORIES
      .filter(c => selectedCats.includes(c.id))
      .map(c => c.name);
    
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
    return "Коллекции IRGG";
  }, [selectedCats]);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => {
      const next = prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id];
      onFilterChange?.(next);
      return next;
    });
  };

  const handleStoreScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    if (scrollPos > 40) {
      if (!isStoreScrolled) setIsStoreScrolled(true);
    } else {
      if (isStoreScrolled) setIsStoreScrolled(false);
    }
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
      <button data-shop-trigger="true" className="hidden" onClick={() => setIsStoreOpen(true)} />
      
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
          <motion.div key="store-content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="z-[110] fixed inset-0 bg-background/95 backdrop-blur-3xl flex flex-col">
            {/* Decorative Architectural "Soul" Images */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden xl:block">
              {soulImages.left && (
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="absolute -left-20 top-0 bottom-0 w-[400px] border-r border-primary/10"
                >
                  <Image src={soulImages.left.imageUrl} alt="Texture Left" fill className="object-cover grayscale" unoptimized />
                </motion.div>
              )}
              {soulImages.right && (
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute -right-20 top-0 bottom-0 w-[400px] border-l border-primary/10"
                >
                  <Image src={soulImages.right.imageUrl} alt="Texture Right" fill className="object-cover grayscale" unoptimized />
                </motion.div>
              )}
            </div>

            <div className={cn(
              "flex justify-between items-center px-4 md:px-8 py-6 md:py-10 border-b border-white/10 bg-background/50 relative z-10 transition-all duration-300",
              isMobile && isStoreScrolled ? "h-14 py-2" : ""
            )}>
              <button 
                onClick={toggleStore} 
                className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={18} /> <span className={cn(isMobile && isStoreScrolled ? "hidden" : "inline")}>Назад</span>
              </button>
              
              {/* On mobile when scrolled, the back button is alone, filter floats */}
              {isMobile && isStoreScrolled && (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary animate-in fade-in slide-in-from-top-2">
                   {storeTitle}
                 </span>
              )}
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
              <motion.div 
                className={cn(
                  "border-b border-white/10 bg-background/50 flex flex-col transition-all duration-500",
                  isMobile 
                    ? (isStoreScrolled ? "h-0 p-0 overflow-hidden border-none opacity-0" : "p-12 sm:p-16 gap-8") 
                    : "p-8 md:p-12 md:flex-row md:items-center md:justify-between md:gap-10"
                )}
              >
                <div className="text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-headline uppercase tracking-tighter text-foreground">{storeTitle}</h2>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-3 md:mt-3 opacity-60">Каталог товаров IRGG</p>
                </div>
                
                <div className={cn(
                  "flex items-center gap-4 md:gap-6",
                  isMobile ? "justify-center" : "justify-end"
                )}>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="h-16 md:h-16 px-10 md:px-10 rounded-none border-foreground/20 uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-bold bg-background/50 hover:bg-primary hover:text-white transition-all shadow-xl" 
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                      <Filter className="mr-3 h-5 w-5" />
                      Фильтр {selectedCats.length > 0 && `(${selectedCats.length})`}
                    </Button>
                    
                    <AnimatePresence>
                      {showFilterMenu && !isMobile && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 bg-background border border-border shadow-2xl p-6 min-w-[240px] z-[60] flex flex-col gap-3">
                          {categoriesWithIcons.map((cat) => (
                            <button 
                              key={cat.id} 
                              onClick={() => toggleCategory(cat.id)} 
                              className={cn(
                                "flex items-center justify-between px-6 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors text-left", 
                                selectedCats.includes(cat.id) ? "bg-primary text-white" : "hover:bg-muted"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                {cat.icon}
                                <span>{cat.name}</span>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {selectedCats.length > 0 && (
                    <Button variant="ghost" className="h-16 md:h-16 px-6 md:px-10 rounded-none uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-bold text-muted-foreground hover:text-primary" onClick={() => { setSelectedCats([]); onFilterChange?.([]); }}>
                      Очистить
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Floating Filter / Mobile Filter Menu */}
              <AnimatePresence>
                {/* Floating Button appears when scrolled or menu active on mobile */}
                {(isMobile && (isStoreScrolled || showFilterMenu)) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0, opacity: 0 }} 
                    className="fixed top-2 right-4 z-[130]"
                  >
                    <button 
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white shadow-2xl border border-white/20 transition-all active:scale-90",
                        selectedCats.length > 0 ? "ring-2 ring-primary ring-offset-2" : ""
                      )}
                    >
                      {showFilterMenu ? <X size={18} /> : <Filter size={18} />}
                      {selectedCats.length > 0 && !showFilterMenu && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-[9px] font-bold rounded-full flex items-center justify-center border border-primary">
                          {selectedCats.length}
                        </div>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Mobile Full Screen Filter Menu */}
                {isMobile && showFilterMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-0 top-14 z-[125] bg-background/95 backdrop-blur-2xl p-8 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-10 border-b border-border pb-6">
                       <h3 className="text-2xl font-headline uppercase tracking-tight">Категории</h3>
                       {selectedCats.length > 0 && (
                         <button onClick={() => { setSelectedCats([]); onFilterChange?.([]); }} className="text-[10px] font-bold text-primary uppercase tracking-widest underline underline-offset-4">Сбросить все</button>
                       )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {categoriesWithIcons.map((cat) => (
                        <button 
                          key={cat.id} 
                          onClick={() => toggleCategory(cat.id)} 
                          className={cn(
                            "flex items-center gap-6 px-6 py-6 text-xs font-bold uppercase tracking-[0.2em] transition-all border border-border/50", 
                            selectedCats.includes(cat.id) ? "bg-primary text-white border-primary shadow-xl" : "hover:bg-muted"
                          )}
                        >
                          <div className={cn("shrink-0", selectedCats.includes(cat.id) ? "text-white" : "text-primary")}>
                            {cat.icon}
                          </div>
                          <span>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                    <Button 
                      className="w-full h-16 mt-12 bg-primary text-white font-bold uppercase tracking-widest text-[10px]" 
                      onClick={() => setShowFilterMenu(false)}
                    >
                      Показать товары
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scroll-smooth"
                onScroll={handleStoreScroll}
              >
                <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-32 pb-32">
                  {categoriesWithIcons
                    .filter(cat => selectedCats.length === 0 || selectedCats.includes(cat.id))
                    .map(cat => {
                      const categoryProducts = PRODUCTS.filter(p => p.cat === cat.id);
                      if (categoryProducts.length === 0) return null;
                      return (
                        <div key={cat.id} className="space-y-8 md:space-y-12">
                          <div className="flex items-center gap-6 md:gap-10">
                            <div className="h-[1px] flex-1 bg-primary/20" />
                            <h3 className="text-2xl md:text-4xl font-headline uppercase tracking-tight text-primary whitespace-nowrap">{cat.name}</h3>
                            <div className="h-[1px] flex-1 bg-primary/20" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                            {categoryProducts.map(prod => (
                                <div key={prod.id} className="glass-panel p-6 md:p-10 border-white/5 hover:bg-foreground/5 transition-all group">
                                  <div className="aspect-square bg-muted/20 mb-6 md:mb-8 flex items-center justify-center relative overflow-hidden">
                                    {prod.image && (
                                      <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                                    )}
                                    <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                                      <Badge variant="outline" className="bg-background/80 border-primary/20 text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1">В наличии</Badge>
                                    </div>
                                  </div>
                                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{prod.name}</h4>
                                  <p className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest font-bold mb-4">{prod.sub}</p>
                                  <p className="text-primary font-headline font-bold text-xl md:text-2xl">{prod.price}</p>
                                  <Button className="w-full mt-6 md:mt-8 rounded-none bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 font-bold uppercase tracking-widest text-[10px] md:text-[11px] h-12 md:h-14">Подробнее</Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </motion.div>
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
