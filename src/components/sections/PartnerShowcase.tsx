
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/partners";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function PartnerShowcase() {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="relative w-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 md:w-64 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 md:w-64 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
        <motion.div 
          className="flex gap-16 md:gap-40 items-center whitespace-nowrap w-fit"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 40, 
            ease: "linear",
            repeatDelay: 0
          }}
        >
          {tickerPartners.map((partner, idx) => (
            <div 
              key={`${partner.id}-${idx}`} 
              className="flex items-center justify-center shrink-0"
            >
              <div className="h-16 md:h-32 w-auto relative">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  height={120}
                  width={240}
                  className={cn(
                    "h-full w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500",
                    partner.id === '77' && "scale-[1.3] md:scale-[1.4]"
                  )}
                  unoptimized
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
            className="rounded-none border-foreground/10 bg-card/40 backdrop-blur-md px-8 md:px-12 h-14 md:h-16 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] font-bold hover:bg-primary hover:text-white transition-all shadow-xl relative z-10"
          >
            Все партнеры <ExternalLink className="ml-3 w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-[95vw] md:w-full bg-background/98 backdrop-blur-3xl border-border rounded-none p-0 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <DialogHeader className="p-6 md:p-10 border-b border-border bg-card/10 relative shrink-0">
            <DialogTitle className="text-2xl md:text-4xl font-headline uppercase tracking-tighter text-center pr-8 md:pr-0">
              Стратегические партнеры IRGG
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {PARTNERS.map((partner) => (
                <div 
                  key={partner.id}
                  className="aspect-square glass-panel relative border-foreground/5 transition-all flex items-center justify-center p-4 md:p-8"
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className={cn(
                        "object-contain",
                        partner.id === '77' && "scale-[1.6] md:scale-[2.0]"
                      )}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-4 md:p-8 text-center border-t border-border shrink-0">
             <DialogClose asChild>
               <button 
                 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-primary/60 hover:text-primary transition-colors"
               >
                 Закрыть список
               </button>
             </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
