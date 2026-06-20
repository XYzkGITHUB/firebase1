
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ContentTab } from "@/app/page";

interface ProductExplorerProps {
  activeTab: ContentTab;
}

export function ProductExplorer({ activeTab }: ProductExplorerProps) {
  const keramogranitCheck = [
    { title: "Материал под проект", desc: "Подбор форматов, фактур и технических параметров." },
    { title: "Предсказуемый результат", desc: "Соответствие согласованному решению." },
    { title: "Поставка по России", desc: "Доставка до объекта в рамках графика." },
    { title: "Контроль сроков", desc: "Берём на себя производство, логистику и контроль поставки." },
    { title: "Снижение рисков закупки", desc: "Исключаем замену и несоответствие материала." },
  ];

  const laminateCheck = [
    { title: "Ламинат и SPS под разные сегменты", desc: "Покрытия для жилых, коммерческих и инвестиционных проектов." },
    { title: "Прогнозируемые условия поставки", desc: "Понятные сроки, партии и планирование закупок." },
    { title: "Работа с регулярными объёмами", desc: "Поддержка постоянных поставок без перебоев." },
    { title: "Снижение рисков закупки", desc: "Исключаем замену и несоответствие материала." },
  ];

  const currentCheck = activeTab === 'keramogranit' ? keramogranitCheck : laminateCheck;

  return (
    <section className="py-32 px-8 bg-background">
      <div className="max-w-[1600px] mx-auto">
        {/* Checklist Section */}
        <div className="mb-40">
          <h2 className="text-4xl md:text-5xl font-headline mb-20 uppercase tracking-tighter">Что вы получаете, выбирая нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
            {currentCheck.map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Check className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/5 mb-32" />

        {/* Catalogue Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
             <div className="space-y-6">
               <div className="h-40 cursor-default">
                 <TextHoverEffect text="IRGG" duration={0.2} />
               </div>
               <h2 className="text-5xl md:text-7xl font-headline leading-[0.9] uppercase tracking-tighter">
                 {activeTab === 'keramogranit' ? 'Выбор керамогранита' : 'Ламинат и SPS-покрытия'}
               </h2>
               <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
                 {activeTab === 'keramogranit' 
                   ? 'Мы поставляем керамогранит практически без ограничений по формату и дизайну под ваши требования.' 
                   : 'Под проекты любого масштаба — от регулярных заказов до комплексных поставок.'}
               </p>
             </div>
             <Button variant="outline" className="h-20 px-12 rounded-none border-primary/50 text-primary hover:bg-primary hover:text-white transition-all font-bold uppercase tracking-[0.3em] text-[12px]">
               <Download className="mr-3 h-6 w-6" />
               Скачать каталог {activeTab === 'keramogranit' ? 'керамогранита' : ''} (PDF)
             </Button>
          </div>
          <div className="aspect-square bg-card/30 border border-white/5 flex flex-col items-center justify-center text-muted-foreground relative group overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <HelpCircle className="w-24 h-24 mb-6 opacity-20 group-hover:scale-110 transition-transform duration-700" />
             <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold">Image is coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
