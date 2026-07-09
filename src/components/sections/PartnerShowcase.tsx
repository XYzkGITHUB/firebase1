
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/partners";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function PartnerShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Дублируем список для бесконечной ленты
  const tickerPartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="w-full py-16 md:py-24 flex flex-col items-center gap-12 md:gap-16 overflow-hidden relative">
      <div className="flex flex-col items-center text-center gap-3 px-6 relative z-10">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.5em] text-[10px] md:text-[11px]">
          <ShieldCheck size={16} />
          Нам доверяют лидеры рынка
        </div>
      </div>

      {/* Бесконечная лента */}
      <div className="relative w-full">
        <motion.div 
          className="flex gap-16 md:gap-40 items-center whitespace-nowrap w-fit"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: isMobile ? 30 : 40, // Чуть быстрее на мобилках для плавности
            ease: "linear",
            repeatDelay: 0
          }}
        >
          {tickerPartners.map((partner, idx) => (
            <div 
              key={`${partner.id}-${idx}`} 
              className="flex items-center justify-center shrink-0"
            >
              <div className="h-12 md:h-32 w-auto relative">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  height={120}
                  width={240}
                  className={cn(
                    "h-full w-auto object-contain transition-all duration-500",
                    partner.id === '77' && "scale-[1.3] md:scale-[1.4]"
                  )}
                  priority={idx < 5} // Загружаем первые логотипы быстрее
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Кнопка открытия всех партнеров */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-none border-primary/20 bg-background px-8 md:px-12 h-14 md:h-16 uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold hover:bg-primary hover:text-white transition-all shadow-xl relative z-10"
          >
            Все партнеры <ExternalLink className="ml-3 w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent 
          className={cn(
            "max-w-5xl bg-background border-border rounded-none p-0 overflow-hidden shadow-2xl flex flex-col",
            "w-[95vw] md:w-full",
            // Высота 70% на мобильных, авто на десктопе
            "max-h-[70vh] md:max-h-[85vh]",
            // Центрирование
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        >
          <DialogHeader className="p-6 md:p-12 border-b border-border bg-background relative shrink-0">
            <DialogTitle className="text-xl md:text-5xl font-headline uppercase tracking-tighter text-center pr-8 md:pr-0 text-foreground">
              Стратегические партнеры <span className="text-primary">IRGG</span>
            </DialogTitle>
          </DialogHeader>
          
          {/* Нативный скролл для мобильных вместо тяжелых компонентов */}
          <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-background/50 scrollbar-hide">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {PARTNERS.map((partner) => (
                <div 
                  key={partner.id}
                  className="aspect-square bg-white border border-border/50 hover:border-primary/30 transition-all flex items-center justify-center p-4 md:p-10 group"
                >
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                    <Image 
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className={cn(
                        "object-contain transition-all",
                        partner.id === '77' && "scale-[1.6] md:scale-[2.0]"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background p-4 md:p-10 text-center border-t border-border shrink-0">
             <DialogClose asChild>
               <button 
                 className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-primary/60 hover:text-primary transition-colors py-2"
               >
                 Вернуться на сайт
               </button>
             </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
