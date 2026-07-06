"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/partners";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function PartnerShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  // Duplicate the list once for a perfect percentage-based infinite loop
  const tickerPartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="w-full py-16 md:py-24 flex flex-col items-center gap-16 overflow-hidden relative">
      <div className="flex flex-col items-center text-center gap-3 px-6 relative z-10">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.5em] text-[11px]">
          <ShieldCheck size={16} />
          Нам доверяют лидеры рынка
        </div>
      </div>

      {/* Infinite Ticker */}
      <div className="relative w-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-64 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-64 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
        <motion.div 
          className="flex gap-20 md:gap-40 items-center whitespace-nowrap w-fit"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 50, 
            ease: "linear",
            repeatDelay: 0
          }}
        >
          {tickerPartners.map((partner, idx) => (
            <div 
              key={`${partner.id}-${idx}`} 
              className="flex items-center justify-center transition-all duration-700 cursor-default shrink-0"
            >
              <div className="h-24 md:h-40 w-auto relative">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  height={160}
                  width={320}
                  className={cn(
                    "h-full w-auto object-contain transition-transform duration-700",
                    partner.id === '77' && "scale-[1.4]"
                  )}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Action Button */}
      <Dialog open={isOpen} onOpenChange={setOpen => {
        setIsOpen(setOpen);
      }}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-none border-foreground/10 bg-card/40 backdrop-blur-md px-12 h-16 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-primary hover:text-white transition-all shadow-xl relative z-10"
          >
            Все партнеры <ExternalLink className="ml-3 w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl bg-background/95 backdrop-blur-3xl border-border rounded-none p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-10 border-b border-border bg-card/10">
            <DialogTitle className="text-4xl font-headline uppercase tracking-tighter text-center">
              Стратегические партнеры IRGG
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[75vh] p-8 md:p-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
              {PARTNERS.map((partner) => (
                <div 
                  key={partner.id}
                  className="aspect-square glass-panel relative border-foreground/5 transition-all cursor-default overflow-hidden flex items-center justify-center p-8"
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className={cn(
                        "object-contain transition-all duration-700",
                        partner.id === '77' && "scale-[2.0]"
                      )}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="bg-primary/5 p-8 text-center">
             <button 
               onClick={() => setIsOpen(false)}
               className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary/60 hover:text-primary transition-colors"
             >
               Закрыть список
             </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
