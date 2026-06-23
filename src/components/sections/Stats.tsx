
"use client";
import React from "react";
import { Handshake, Construction, ShieldCheck, Layers, Package, TrendingUp, Factory } from "lucide-react";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";

interface StatsProps {
  activeTab: ContentTab;
}

export function Stats({ activeTab }: StatsProps) {
  const keramogranitAdv = [
    {
      icon: <Layers className="w-10 h-10 text-primary" />,
      title: "800 000 м² керамогранита",
      desc: "Опыт работы с крупными и этапными поставками для масштабных жилых комплексов.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-primary" />,
      title: "Прямые заводские контракты",
      desc: "Работаем без посредников напрямую с производителями, обеспечивая лучшие цены.",
    },
    {
      icon: <Construction className="w-10 h-10 text-primary" />,
      title: "Проверенные производства",
      desc: "Подбираем производителя под объем и специфику вашего проекта из пула лучших фабрик.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Стабильные условия поставки",
      desc: "Фиксируем параметры, сроки и артикулы заранее, исключая любые сюрпризы.",
    },
  ];

  const laminateAdv = [
    {
      icon: <Package className="w-10 h-10 text-primary" />,
      title: "Опыт работы с крупными поставками",
      desc: "Работаем с регулярными и этапными отгрузками для разных типов проектов.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Выстроенная система поставок",
      desc: "Контролируем стабильные условия работы и отгрузок на всех этапах.",
    },
    {
      icon: <Factory className="w-10 h-10 text-primary" />,
      title: "Проверенные производства",
      desc: "Подбираем производителя под объем и специфику вашего проекта.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Контроль качества продукции",
      desc: "Проверяем соответствие материалов перед каждой поставкой на склад.",
    },
  ];

  const currentAdv = activeTab === 'keramogranit' ? keramogranitAdv : laminateAdv;

  return (
    <section className="py-32 px-8 bg-card/10 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 text-center">
          <SplitText
            text="Наши главные преимущества"
            tag="h2"
            className="text-4xl md:text-5xl font-headline max-w-5xl mx-auto leading-tight uppercase tracking-tighter"
            textAlign="center"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {currentAdv.map((adv, idx) => (
            <div key={idx} className="relative p-12 border border-white/5 bg-card/30 hover:bg-card/50 hover:border-primary/40 transition-all duration-700 group overflow-hidden">
              <div className="mb-10 transform transition-transform group-hover:scale-110 duration-500">{adv.icon}</div>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground leading-tight">{adv.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
