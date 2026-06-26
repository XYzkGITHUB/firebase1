
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, ShoppingBag, Grid3X3, Layers, Bath, Lightbulb, Layout, X, Filter, Trash2, ArrowLeft, Star } from "lucide-react";
import { ContentTab } from "@/app/page";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NumberTicker from "@/components/ui/number-ticker";

interface HeroProps {
  activeTab: ContentTab;
  isStoreOpen: boolean;
  setIsStoreOpen: (open: boolean) => void;
}

const categories = [
  { id: "keramogranit", name: "Керамогранит", icon: <Grid3X3 className="w-6 h-6" /> },
  { id: "laminate", name: "Ламинат", icon: <Layers className="w-6 h-6" /> },
  { id: "sanitary", name: "Сантехника", icon: <Bath className="w-6 h-6" /> },
  { id: "lights", name: "Люстры", icon: <Lightbulb className="w-6 h-6" /> },
  { id: "carpets", name: "Ковры", icon: <Layout className="w-6 h-6" /> },
];

const mockProducts = [
  { id: 1, cat: "keramogranit", name: "Royal Marble White", price: "2 400 ₽/м²" },
  { id: 2, cat: "keramogranit", name: "Antislip Grey Stone", price: "1 950 ₽/м²" },
  { id: 3, cat: "laminate", name: "Oak Natural Classic", price: "1 200 ₽/м²" },
  { id: 4, cat: "laminate", name: "Dark Walnut SPS", price: "2 100 ₽/м²" },
  { id: 5, cat: "sanitary", name: "Minimalist Sink V2", price: "15 600 ₽" },
  { id: 6, cat: "sanitary", name: "Eco Flush Toilet", price: "28 900 ₽" },
  { id: 7, cat: "lights", name: "Crystal Cascade Chandelier", price: "45 000 ₽" },
  { id: 8, cat: "carpets", name: "Silk Touch Beige", price: "12 000 ₽" },
];

export function Hero({ activeTab, isStoreOpen, setIsStoreOpen }: HeroProps) {
  const isMobile = useIsMobile();
  const [storeView, setStoreView] = useState<"selection" | "catalog">("selection");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [hasSeenRating, setHasSeenRating] = useState(false);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  
  useEffect(() => {
    const seen = sessionStorage.getItem('rion_hero_rating_seen');
    if (seen) {
      setHasSeenRating(true);
    } else {
      sessionStorage.setItem('rion_hero_rating_seen', 'true');
    }
    setIsSessionLoaded(true);
  }, []);

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
    } else {
      setIsStoreOpen(true);
      setStoreView("selection");
      setSelectedCats([]);
    }
  };

  const storeTitle = useMemo(() => {
    if (selectedCats.length === 0) return "Весь ассортимент";
    const names = categories
      .filter(c => selectedCats.includes(c.id))
      .map(c => c.name);
    
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
    if (names.length === 3) return `${names[0]}, ${names[1]} & ${names[2]}`;
    return "Коллекции RION";
  }, [selectedCats]);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setStoreView("catalog");
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setStoreView("catalog");
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

      <AnimatePresence mode="wait">
        {!isStoreOpen ? (
          <motion.div 
            key="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center"
          >
            <div className="relative w-full max-w-6xl py-12 md:py-24 px-4 md:px-16 flex flex-col items-center justify-center">
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-full h-[8rem] md:h-[14rem] flex items-center justify-center cursor-default">
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

                  {/* Rating Decoration - Positioned right above the buttons */}
                  {isSessionLoaded && (
                    <div className="flex flex-col items-center gap-2 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.div
                              key={star}
                              initial={hasSeenRating ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ 
                                delay: hasSeenRating ? 0 : 0.8 + star * 0.1, 
                                type: "spring", 
                                stiffness: 260, 
                                damping: 20 
                              }}
                            >
                              <Star 
                                className={cn(
                                  "w-5 h-5 md:w-7 md:h-7",
                                  star <= 4 ? "fill-primary text-primary" : "text-primary/20"
                                )} 
                              />
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-4xl md:text-5xl font-headline font-bold text-primary tabular-nums">
                          <NumberTicker value={4.6} decimalPlaces={1} delay={hasSeenRating ? 0 : 1} />
                        </div>
                      </div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground opacity-60">
                        Рейтинг удовлетворенности партнеров
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
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
                          <ShineButton 
                            label="Открыть магазин" 
                            size="lg" 
                            icon={<ShoppingBag className="h-4 w-4" />}
                            variant="outline"
                            onClick={toggleStore}
                            className="w-full sm:w-auto"
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
          <motion.div 
            key="store-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="z-50 fixed inset-0 bg-background/95 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
              <button 
                onClick={toggleStore}
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={16} /> Назад
              </button>
              <button 
                onClick={toggleStore}
                className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {storeView === "selection" ? (
                <motion.div 
                  key="selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col p-8 md:p-16 max-w-7xl mx-auto w-full"
                >
                  <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-6xl font-headline uppercase tracking-tighter mb-4">
                      Куда вы хотите перейти?
                    </h2>
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold opacity-60">
                      Выберите интересующую категорию материалов RION
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-6 p-8 border-2 border-foreground/15 bg-card/40 text-left relative overflow-hidden rounded-none shadow-sm hover:bg-foreground/5 transition-all group"
                        onClick={() => toggleCategory(cat.id)}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
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
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="catalog"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col h-full overflow-hidden"
                >
                  <div className="p-8 border-b border-white/10 bg-background/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl md:text-5xl font-headline uppercase tracking-tighter text-foreground">
                        {storeTitle}
                      </h2>
                      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-2">
                        Каталог товаров RION
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        className="h-14 px-8 rounded-none border-foreground/20 uppercase tracking-[0.2em] text-[10px] font-bold"
                        onClick={() => setStoreView("selection")}
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Фильтр {selectedCats.length > 0 && `(${selectedCats.length})`}
                      </Button>
                      
                      {selectedCats.length > 0 && (
                        <Button 
                          variant="ghost" 
                          className="h-14 px-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold text-muted-foreground hover:text-primary"
                          onClick={clearFilters}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Очистить
                        </Button>
                      )}
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-20 pb-20">
                      {categories
                        .filter(c => selectedCats.length === 0 || selectedCats.includes(c.id))
                        .map(cat => (
                          <div key={cat.id} className="space-y-8">
                            <div className="flex items-center gap-6">
                              <div className="h-[1px] flex-1 bg-primary/20" />
                              <h3 className="text-2xl md:text-3xl font-headline uppercase tracking-tight text-primary">
                                {cat.name}
                              </h3>
                              <div className="h-[1px] flex-1 bg-primary/20" />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {mockProducts
                                .filter(p => p.cat === cat.id)
                                .map(prod => (
                                  <div 
                                    key={prod.id} 
                                    className="glass-panel p-6 border-white/5 hover:bg-foreground/5 transition-all group"
                                  >
                                    <div className="aspect-square bg-muted/20 mb-6 flex items-center justify-center relative overflow-hidden">
                                      {cat.icon}
                                      <div className="absolute bottom-4 right-4">
                                        <Badge variant="outline" className="bg-background/80 border-primary/20 text-[9px] uppercase tracking-widest">In Stock</Badge>
                                      </div>
                                    </div>
                                    <h4 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{prod.name}</h4>
                                    <p className="text-primary font-headline font-bold text-xl">{prod.price}</p>
                                    <Button className="w-full mt-6 rounded-none bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all font-bold uppercase tracking-widest text-[10px] h-12">
                                      Подробнее
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!isStoreOpen && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      )}
    </section>
  );
}
