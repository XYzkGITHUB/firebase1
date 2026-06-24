
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, HelpCircle, Truck, ShieldCheck, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";

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

  const deliveryCheck = [
    { title: "25 дней из Индии", desc: "Налаженные морские маршруты из портов Мундра и Нава-Шева." },
    { title: "35 дней из Китая", desc: "Прямые контейнерные перевозки из основных производственных хабов." },
    { title: "Полная материальная ответственность", desc: "Мы отвечаем за каждый квадратный метр вашего груза." },
    { title: "Таможенная очистка", desc: "Профессиональное оформление всех разрешительных документов." },
    { title: "Трекинг 24/7", desc: "Вы всегда знаете, где находится ваш груз в режиме реального времени." },
  ];

  const getCheck = () => {
    if (activeTab === 'keramogranit') return keramogranitCheck;
    if (activeTab === 'laminate_sps') return laminateCheck;
    return deliveryCheck;
  }

  const currentCheck = getCheck();

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 lg:mb-40">
          <SplitText
            text={activeTab === 'delivery' ? "Что мы гарантируем при доставке" : "Что вы получаете, выбирая нас"}
            tag="h2"
            className="text-3xl lg:text-5xl font-headline mb-16 lg:mb-20 uppercase tracking-tighter"
            textAlign="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12">
            {currentCheck.map((item, i) => (
              <div key={i} className="flex items-start gap-4 lg:gap-6 group">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Check className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-lg lg:text-xl mb-2 tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/5 mb-24 lg:mb-32" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 lg:space-y-12">
             <div className="space-y-4 lg:space-y-6">
               <div className="h-32 lg:h-40 cursor-default overflow-hidden">
                 <TextHoverEffect text="IRGG" />
               </div>
               <SplitText
                 text={activeTab === 'delivery' ? 'Надежная доставка грузов' : (activeTab === 'keramogranit' ? 'Выбор керамогранита' : 'Ламинат и SPS-покрытия')}
                 tag="h2"
                 className="text-4xl lg:text-7xl font-headline leading-[1] lg:leading-[0.9] uppercase tracking-tighter"
                 textAlign="left"
               />
               <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
                 {activeTab === 'delivery' 
                   ? 'Мы берем на себя полную ответственность за ваш груз. От завода в Индии или Китае до вашего склада в России.' 
                   : (activeTab === 'keramogranit' 
                     ? 'Мы поставляем керамогранит практически без ограничений по формату и дизайну под ваши требования.' 
                     : 'Под проекты любого масштаба — от регулярных заказов до комплексных поставок.')}
               </p>
             </div>
             <Button variant="outline" className="h-16 lg:h-20 px-8 lg:px-12 rounded-none border-primary/50 text-primary hover:bg-primary hover:text-white transition-all font-bold uppercase tracking-[0.3em] text-[10px] lg:text-[12px] w-full md:w-auto">
               <Download className="mr-3 h-5 w-5 lg:h-6 lg:w-6" />
               {activeTab === 'delivery' ? 'Прайс-лист на логистику' : `Скачать каталог ${activeTab === 'keramogranit' ? 'керамогранита' : ''} (PDF)`}
             </Button>
          </div>
          <div className="aspect-square bg-card/30 border border-white/5 flex flex-col items-center justify-center text-muted-foreground relative group overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             {activeTab === 'delivery' ? <Truck className="w-16 h-16 lg:w-24 lg:h-24 mb-6 opacity-20 group-hover:scale-110 transition-transform duration-700" /> : <HelpCircle className="w-16 h-16 lg:w-24 lg:h-24 mb-6 opacity-20 group-hover:scale-110 transition-transform duration-700" />}
             <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold">Image is coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
