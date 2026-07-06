"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/partners";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PartnerShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  // Duplicate the list once for a perfect percentage-based infinite loop
  const tickerPartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="w-full py-12 md:py-20 flex flex-col items-center gap-12 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-2 px-6">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
          <ShieldCheck size={14} />
          Нам доверяют лидеры рынка
        </div>
      </div>

      {/* Infinite Ticker */}
      <div className="relative w-full before:absolute before:left-0 before:top-0 before:bottom-0 before:w-40 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-40 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
        <motion.div 
          className="flex gap-16 md:gap-32 items-center whitespace-nowrap w-fit"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 40, 
            ease: "linear",
            // This ensures it doesn't wait to start
            repeatDelay: 0
          }}
        >
          {tickerPartners.map((partner, idx) => (
            <div 
              key={`${partner.id}-${idx}`} 
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default shrink-0"
            >
              <div className="h-12 md:h-20 w-auto relative">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  height={80}
                  width={160}
                  className="h-full w-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Action Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-none border-foreground/10 bg-card/40 backdrop-blur-md px-10 h-14 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-primary hover:text-white transition-all shadow-xl"
          >
            Все партнеры <ExternalLink className="ml-3 w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-3xl border-border rounded-none p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-8 border-b border-border bg-card/10">
            <DialogTitle className="text-3xl font-headline uppercase tracking-tighter text-center">
              Стратегические партнеры IRGG
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] p-8 md:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
              {PARTNERS.map((partner) => (
                <motion.div 
                  key={partner.id}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square glass-panel relative group border-foreground/5 hover:border-primary/40 transition-all cursor-default overflow-hidden flex items-center justify-center p-4"
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      unoptimized
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="bg-primary/5 p-6 text-center">
             <button 
               onClick={() => setIsOpen(false)}
               className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 hover:text-primary transition-colors"
             >
               Закрыть список
             </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}