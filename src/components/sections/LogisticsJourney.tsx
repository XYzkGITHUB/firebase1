
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Building, ClipboardCheck, Factory, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentTab } from "@/app/page";
import { cn } from "@/lib/utils";

interface LogisticsJourneyProps {
  activeTab: ContentTab;
}

const stepsData = [
  {
    id: 1,
    title: "1. Подбор производства",
    desc: "Выбираем завод под объем и сроки проекта. Анализируем лучшие фабрики мира, учитывая технические требования и бюджет заказчика.",
    icon: <Building className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    id: 2,
    title: "2. Фиксация заказа",
    desc: "Размещаем заказ у производителя и запускаем производство после всех согласований, обеспечивая бронирование мощностей завода.",
    icon: <ClipboardCheck className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    id: 3,
    title: "3. Контроль изготовления",
    desc: "Контролируем выпуск партии на каждом этапе, гарантируя строгое соответствие техническому заданию и эталонным образцам.",
    icon: <Factory className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    id: 4,
    title: "4. Логистика и доставка на объект",
    desc: "Организуем поставку в согласованные сроки до вашего объекта, беря на себя все вопросы таможенного оформления и фрахта.",
    icon: <Truck className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
];

function StepItem({ step, index, progress }: { step: any, index: number, progress: any }) {
  const thresholds = [0, 0.25, 0.5, 0.7];
  const stepThreshold = thresholds[index];
  
  const opacity = useTransform(progress, [stepThreshold, stepThreshold + 0.1], [0.3, 1]);
  const scale = useTransform(progress, [stepThreshold, stepThreshold + 0.1], [0.95, 1]);
  const iconBg = useTransform(progress, [stepThreshold, stepThreshold + 0.05], ["#1a1715", "#ffffff"]);
  const iconColor = useTransform(progress, [stepThreshold, stepThreshold + 0.05], ["#4b4b4b", "hsl(var(--primary))"]);

  return (
    <motion.div 
      className={cn(
        "relative flex items-center gap-8 lg:gap-16 w-full",
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      )}
      style={{ opacity, scale }}
    >
      {/* Indicator Circle - perfectly aligned */}
      <motion.div 
        className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center z-30 shadow-2xl border border-white/5"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {step.icon}
      </motion.div>

      {/* Content Card */}
      <div className={cn(
        "w-full md:w-1/2 pl-16 md:pl-0",
        index % 2 === 0 ? "md:pr-20 lg:pr-24 md:text-right" : "md:pl-20 lg:pl-24 md:text-left"
      )}>
        <div className="p-6 lg:p-10 border border-white/5 bg-card/20 hover:border-primary/40 transition-all duration-500 shadow-2xl backdrop-blur-sm">
          <h3 className="text-xl lg:text-2xl font-headline font-bold mb-4 tracking-tight uppercase leading-none">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed font-light">
            {step.desc}
          </p>
        </div>
      </div>

      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}

export function LogisticsJourney({ activeTab }: LogisticsJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 lg:py-40 px-6 lg:px-8 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24 lg:mb-40 space-y-4 lg:space-y-6">
          <h2 className="text-3xl lg:text-4xl font-headline uppercase tracking-tighter">
            {activeTab === 'keramogranit' ? 'Один партнер вместо десяти подрядчиков' : 'Как организована поставка'}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            {activeTab === 'keramogranit' 
              ? 'IRGG работает с застройщиками и девелоперами, поставляя материалы под ключ с полной логистикой до объекта.'
              : 'Мы берем на себя весь цикл ВЭД, чтобы вы получили качественный материал без лишних сложностей.'}
          </p>
        </div>

        <div className="relative min-h-[1000px] lg:min-h-[1200px]">
          {/* Progress Line - thicker and aligned */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[3px] bg-primary -translate-x-1/2 origin-top z-10"
            style={{ scaleY: pathProgress }}
          />

          <div className="space-y-48 lg:space-y-64 relative z-20">
            {stepsData.map((step, index) => (
              <StepItem key={step.id} step={step} index={index} progress={pathProgress} />
            ))}
          </div>
        </div>

        <div className="mt-32 lg:mt-48 text-center">
           <Button className="h-16 lg:h-20 px-10 lg:px-16 bg-primary text-white font-bold uppercase tracking-[0.4em] text-[10px] lg:text-[11px] rounded-none hover:bg-primary/90 shadow-2xl transition-all w-full md:w-auto">
             Связаться с менеджером
           </Button>
        </div>
      </div>
    </section>
  );
}
