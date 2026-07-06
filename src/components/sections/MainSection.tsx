"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Grid3X3, Layers, Bath, Truck, Info, ShoppingBag } from "lucide-react";
import { ContentTab } from "@/app/page";
import TrueFocus from "@/components/ui/TrueFocus";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PartnerShowcase } from "./PartnerShowcase";
import { cn } from "@/lib/utils";

interface MainSectionProps {
  setActiveTab: (tab: ContentTab) => void;
  setIsStoreOpen: (open: boolean) => void;
}

const navItems = [
  { id: "keramogranit", title: "Керамогранит", icon: <Grid3X3 size={24} />, desc: "Премиальные коллекции плитки" },
  { id: "laminate_sps", title: "Ламинат & SPS", icon: <Layers size={24} />, desc: "Напольные покрытия под ключ" },
  { id: "sanitary", title: "Сантехника", icon: <Bath size={24} />, desc: "Дизайнерские решения для ванных" },
  { id: "delivery", title: "Логистика", icon: <Truck size={24} />, desc: "Поставки из Индии и Китая" },
  { id: "contacts", title: "О компании", icon: <Info size={24} />, desc: "Наш офис и контакты" },
];

export function MainSection({ setActiveTab, setIsStoreOpen }: MainSectionProps) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Parallax values for decorative images
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  const images = {
    tiles: PlaceHolderImages.find(i => i.id === "tiles-primary"),
    laminate: PlaceHolderImages.find(i => i.id === "laminat-primary"),
    showroom: PlaceHolderImages.find(i => i.id === "store-faraway"),
  };

  return (
    <section 
      className="min-h-screen pt-40 pb-20 px-6 bg-background relative overflow-hidden flex flex-col items-center"
    >
      {/* Decorative Architectural Elements */}
      <motion.div 
        style={{ y: y1, rotate: -5 }}
        className="absolute -right-20 top-20 w-[400px] h-[600px] opacity-20 pointer-events-none hidden lg:block"
      >
        <div className="relative w-full h-full border border-primary/20 p-4">
          <div className="relative w-full h-full overflow-hidden" style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}>
            {images.tiles && (
              <Image 
                src={images.tiles.imageUrl} 
                alt="Texture" 
                fill 
                className="object-cover grayscale brightness-125"
                unoptimized
              />
            )}
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2, rotate: 10 }}
        className="absolute -left-32 bottom-20 w-[350px] h-[500px] opacity-15 pointer-events-none hidden xl:block"
      >
        <div className="relative w-full h-full border border-primary/10 p-2">
          <div className="relative w-full h-full overflow-hidden" style={{ clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0 100%)" }}>
            {images.laminate && (
              <Image 
                src={images.laminate.imageUrl} 
                alt="Texture 2" 
                fill 
                className="object-cover"
                unoptimized
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/15 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-20">
          <div className="mb-6 h-auto min-h-[120px] flex items-center justify-center">
            <TrueFocus 
              sentence="Быстрая навигация IRGG"
              manualMode={false}
              blurAmount={5}
              borderColor="hsl(var(--primary))"
              glowColor="hsl(var(--primary) / 0.5)"
              animationDuration={0.4}
              pauseBetweenAnimations={1.5}
              className="text-5xl md:text-8xl font-headline uppercase tracking-tighter"
            />
          </div>
          <p className="text-muted-foreground text-lg md:text-xl font-light uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Международные поставки строительных материалов. <br/>
            <span className="text-primary/60 text-sm font-bold mt-2 block tracking-[0.3em]">Выберите интересующий раздел</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative w-full">
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => {
                setActiveTab(item.id as ContentTab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group p-10 bg-card/60 border border-foreground/5 backdrop-blur-md text-left hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="text-primary" />
              </div>
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500 rounded-none">
                {item.icon}
              </div>
              <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-2">{item.title}</h3>
              <p className="text-muted-foreground font-light text-sm tracking-wide leading-relaxed">{item.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-foreground/5">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary/60 group-hover:text-primary transition-colors">
                  Открыть раздел
                </span>
              </div>
              
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 -rotate-45 translate-x-12 translate-y-12 transition-transform group-hover:scale-150" />
            </motion.button>
          ))}

          {/* Special Store Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-1 p-10 bg-primary text-white flex flex-col justify-between hover:bg-primary/90 transition-all cursor-pointer shadow-2xl relative overflow-hidden group min-h-[300px]"
            onClick={() => setIsStoreOpen(true)}
          >
             <div className="absolute inset-0 opacity-20 transition-transform duration-1000 group-hover:scale-110 pointer-events-none">
               {images.showroom && (
                 <Image 
                    src={images.showroom.imageUrl} 
                    alt="Store Preview" 
                    fill 
                    className="object-cover mix-blend-overlay"
                    unoptimized
                 />
               )}
             </div>
             
             <div className="absolute -right-20 -bottom-20 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <ShoppingBag size={320} />
             </div>
             
             <div className="relative z-10">
               <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-8">
                 <ShoppingBag size={24} className="text-white" />
               </div>
               <h3 className="text-3xl font-headline font-bold uppercase tracking-tight mb-2">Весь ассортимент</h3>
               <p className="text-white/70 font-light text-sm tracking-wide">Исследуйте полный каталог товаров IRGG онлайн</p>
             </div>
             <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center gap-3">
               <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Начать покупки</span>
               <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
             </div>
          </motion.div>
        </div>

        {/* Partners Showcase under cards */}
        <div className="w-full mt-24">
           <PartnerShowcase />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}