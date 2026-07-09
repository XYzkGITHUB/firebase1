
"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Filter, X, ArrowUp, ShoppingBag, Grid3X3, Layers, Layout, LampCeiling, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { useIsMobile } from "@/hooks/use-mobile";

interface StoreViewProps {
  onClose: () => void;
  externalFilter?: string[];
  onFilterChange?: (filters: string[]) => void;
  soulImages: {
    left: any;
    right: any;
  };
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

export default function StoreView({ onClose, externalFilter = [], onFilterChange, soulImages }: StoreViewProps) {
  const isMobile = useIsMobile();
  const [selectedCats, setSelectedCats] = useState<string[]>(externalFilter);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isStoreScrolled, setIsStoreScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const storeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalFilter.length > 0) {
      setSelectedCats(externalFilter);
    }
  }, [externalFilter]);

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
    setIsStoreScrolled(scrollPos > 100);
    setShowScrollTop(scrollPos > 400);
  };

  const handleScrollToTop = () => {
    storeScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.02 }} 
      className="z-[110] fixed inset-0 bg-background/95 backdrop-blur-3xl flex flex-col overflow-hidden overscroll-none touch-none"
    >
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

      <div className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 border-b border-white/10 bg-background/50 relative z-[120]">
        <button 
          onClick={onClose} 
          className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} /> <span>Назад</span>
        </button>
        
        {isMobile && isStoreScrolled && (
           <span className="text-[10px] font-bold uppercase tracking-widest text-primary absolute left-1/2 -translate-x-1/2">
             {storeTitle}
           </span>
        )}
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 touch-auto">
        {!isMobile && (
          <motion.div className="p-8 md:p-12 border-b border-white/10 bg-background/50 flex flex-row items-center justify-between gap-10">
            <div>
              <h2 className="font-headline uppercase tracking-tighter text-foreground leading-tight text-4xl md:text-6xl">{storeTitle}</h2>
              <p className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-2 opacity-60">Каталог товаров IRGG</p>
            </div>
            <div className="flex items-center gap-6 justify-end">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="h-16 px-10 rounded-none border-foreground/20 uppercase tracking-[0.2em] text-[11px] font-bold bg-background/50 hover:bg-primary hover:text-white transition-all shadow-xl" 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter className="mr-3 h-5 w-5" />
                  Фильтр {selectedCats.length > 0 && `(${selectedCats.length})`}
                </Button>
                <AnimatePresence>
                  {showFilterMenu && (
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
                <Button variant="ghost" className="h-16 px-10 rounded-none uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground hover:text-primary" onClick={() => { setSelectedCats([]); onFilterChange?.([]); }}>
                  Очистить
                </Button>
              )}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {isMobile && showFilterMenu && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 top-0 z-[125] bg-background/98 backdrop-blur-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10 border-b border-border pb-6 pt-12">
                 <h3 className="text-3xl font-headline uppercase tracking-tight">Категории</h3>
                 <button onClick={() => setShowFilterMenu(false)} className="p-2 text-muted-foreground"><X size={24}/></button>
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
              <Button className="w-full h-16 mt-12 bg-primary text-white font-bold uppercase tracking-widest text-[11px]" onClick={() => setShowFilterMenu(false)}>Показать товары</Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={storeScrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth" onScroll={handleStoreScroll}>
          <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-32 pb-32">
            {isMobile && (
              <div className="py-10 px-4 flex flex-col items-center text-center border-b border-white/5 bg-card/10 -mx-6 -mt-6 mb-12">
                <h2 className="text-3xl font-headline uppercase tracking-tighter text-foreground leading-tight">{storeTitle}</h2>
                <Button variant="outline" className="mt-8 w-full max-w-[240px] h-12 rounded-none border-foreground/10 uppercase tracking-[0.3em] text-[10px] font-bold" onClick={() => setShowFilterMenu(true)}>
                  <Filter className="mr-3 h-4 w-4" /> Фильтр
                </Button>
              </div>
            )}

            {categoriesWithIcons
              .filter(cat => selectedCats.length === 0 || selectedCats.includes(cat.id))
              .map(cat => {
                const categoryProducts = PRODUCTS.filter(p => p.cat === cat.id);
                if (categoryProducts.length === 0) return null;
                return (
                  <div key={cat.id} className="space-y-8 md:space-y-12">
                    <div className="flex items-center gap-6">
                      <div className="h-[1px] flex-1 bg-primary/20" />
                      <h3 className="text-2xl md:text-4xl font-headline uppercase tracking-tight text-primary">{cat.name}</h3>
                      <div className="h-[1px] flex-1 bg-primary/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {categoryProducts.map(prod => (
                          <div key={prod.id} className="glass-panel p-6 border-white/5 hover:bg-foreground/5 transition-all group">
                            <div className="aspect-square bg-muted/20 mb-6 flex items-center justify-center relative overflow-hidden">
                              {prod.image && (
                                <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                              )}
                            </div>
                            <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{prod.name}</h4>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-4">{prod.sub}</p>
                            <p className="text-primary font-headline font-bold text-xl">{prod.price}</p>
                            <Button variant="outline" className="w-full mt-6 rounded-none text-[10px] uppercase tracking-widest h-12">Подробнее</Button>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleScrollToTop}
              className="fixed bottom-10 right-6 md:right-12 z-[140] w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
