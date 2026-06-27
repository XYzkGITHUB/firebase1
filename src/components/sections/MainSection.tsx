"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Grid3X3, Layers, Bath, Truck, Info, ShoppingBag } from "lucide-react";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";

interface MainSectionProps {
  setActiveTab: (tab: ContentTab) => void;
}

const navItems = [
  { id: "keramogranit", title: "Керамогранит", icon: <Grid3X3 size={24} />, desc: "Премиальные коллекции плитки" },
  { id: "laminate_sps", title: "Ламинат & SPS", icon: <Layers size={24} />, desc: "Напольные покрытия под ключ" },
  { id: "sanitary", title: "Сантехника", icon: <Bath size={24} />, desc: "Дизайнерские решения для ванных" },
  { id: "delivery", title: "Логистика", icon: <Truck size={24} />, desc: "Поставки из Индии и Китая" },
  { id: "contacts", title: "О компании", icon: <Info size={24} />, desc: "Наш офис и контакты" },
];

export function MainSection({ setActiveTab }: MainSectionProps) {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <div className="text-center mb-20">
          <SplitText
            text="Быстрая навигация IRGG"
            tag="h1"
            className="text-5xl md:text-8xl font-headline uppercase tracking-tighter mb-6"
            textAlign="center"
          />
          <p className="text-muted-foreground text-lg md:text-xl font-light uppercase tracking-widest">
            Выберите интересующий раздел для перехода
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setActiveTab(item.id as ContentTab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group p-10 bg-card/40 border border-foreground/5 backdrop-blur-sm text-left hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="text-primary" />
              </div>
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-2">{item.title}</h3>
              <p className="text-muted-foreground font-light text-sm tracking-wide">{item.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-foreground/5">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary/60 group-hover:text-primary transition-colors">
                  Перейти в раздел
                </span>
              </div>
            </motion.button>
          ))}

          {/* Special Store Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 p-10 bg-primary text-white flex flex-col justify-between hover:bg-primary/90 transition-all cursor-pointer shadow-2xl relative overflow-hidden group"
            onClick={() => {
              const openShopBtn = document.querySelector('[data-shop-trigger="true"]');
              if (openShopBtn) (openShopBtn as HTMLElement).click();
            }}
          >
             <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
               <ShoppingBag size={240} />
             </div>
             <div className="relative z-10">
               <ShoppingBag size={32} className="mb-8" />
               <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-2">Весь ассортимент</h3>
               <p className="text-white/70 font-light text-sm tracking-wide">Открыть онлайн-магазин IRGG</p>
             </div>
             <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center gap-3">
               <span className="text-[9px] uppercase tracking-[0.4em] font-bold">За покупками</span>
               <ArrowRight size={14} />
             </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8px] uppercase tracking-[1em] text-muted-foreground font-bold">Scrooll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
