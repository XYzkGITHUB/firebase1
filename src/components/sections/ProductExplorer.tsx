"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, HelpCircle, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { motion } from "framer-motion";
import { BorderGlow } from "@/components/ui/border-glow";

interface ProductExplorerProps {
  activeTab: ContentTab;
  setActiveTab?: (tab: ContentTab) => void;
}

function InteractiveImage({ primaryImage, secondaryImage, label }: { primaryImage: any; secondaryImage: any; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[4/3] group cursor-default overflow-hidden border-[0.5px] border-foreground/10 bg-card shadow-lg"
    >
      {/* Primary Image (Base Layer) */}
      <div className="absolute inset-0">
        {primaryImage?.imageUrl && (
          <Image 
            src={primaryImage.imageUrl}
            alt={label}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>
      
      {/* Secondary Image (Hover Layer) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 z-10"
      >
        {secondaryImage?.imageUrl && (
          <Image 
            src={secondaryImage.imageUrl}
            alt={`${label} hover view`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </motion.div>

      {/* Label Overlay */}
      <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white bg-primary px-4 py-2 shadow-xl">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function ProductExplorer({ activeTab, setActiveTab }: ProductExplorerProps) {
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
    { title: "Полная ответственность", desc: "Мы отвечаем за каждый квадратный метр вашего груза." },
    { title: "Таможенная очистка", desc: "Профессиональное оформление всех разрешительных документов." },
    { title: "Трекинг 24/7", desc: "Вы всегда знаете, где находится ваш груз в режиме реального времени." },
  ];

  const contactsCheck = [
    { title: "Прямая связь", desc: "Личный менеджер закрепляется за каждым крупным заказом." },
    { title: "Поддержка 24/7", desc: "Мы на связи в Telegram и WhatsApp для оперативных вопросов." },
    { title: "Юридическая чистота", desc: "Полный пакет документов для ВЭД и внутренней отчетности." },
    { title: "Дизайнерский отдел", desc: "Помощь в визуализации и подборе материалов по вашим рендерам." },
    { title: "Логистический хаб", desc: "Собственная инфраструктура для консолидации и хранения грузов." },
  ];

  const getCheck = () => {
    if (activeTab === 'keramogranit') return keramogranitCheck;
    if (activeTab === 'laminate_sps') return laminateCheck;
    if (activeTab === 'delivery') return deliveryCheck;
    return contactsCheck;
  }

  const currentCheck = getCheck();

  const getImages = () => {
    if (activeTab === 'contacts') {
      return {
        primary: PlaceHolderImages.find(i => i.id === "contacts-primary"),
        secondary: PlaceHolderImages.find(i => i.id === "contacts-secondary"),
        label: "Наш шоурум"
      };
    }
    if (activeTab === 'keramogranit') {
      return {
        primary: PlaceHolderImages.find(i => i.id === "tiles-primary"),
        secondary: PlaceHolderImages.find(i => i.id === "tiles-tertiary"),
        label: "Керамогранит"
      };
    }
    if (activeTab === 'laminate_sps') {
      return {
        primary: PlaceHolderImages.find(i => i.id === "laminat-primary"),
        secondary: PlaceHolderImages.find(i => i.id === "laminat-secondary"),
        label: "Ламинат и SPS"
      };
    }
    if (activeTab === 'delivery') {
      return {
        primary: PlaceHolderImages.find(i => i.id === "delivery-primary"),
        secondary: PlaceHolderImages.find(i => i.id === "delivery-secondary"),
        label: "Логистический узел"
      };
    }
    return null;
  };

  const currentImages = getImages();

  const handleLearnAboutShipping = () => {
    if (setActiveTab) {
      setActiveTab('delivery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 lg:mb-32">
          <SplitText
            text={activeTab === 'delivery' ? "Что мы гарантируем при доставке" : (activeTab === 'contacts' ? "Сервис и поддержка" : "Что вы получаете, выбирая нас")}
            tag="h2"
            className="text-2xl md:text-4xl font-headline mb-12 lg:mb-16 uppercase tracking-tighter"
            textAlign="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCheck.map((item, i) => (
              <BorderGlow key={i} borderRadius={8} glowColor="26 40 39" colors={['#8B5E3C', '#C9C3BC', '#4A3728']} className="border-[0.5px] border-foreground/5">
                <div className="flex flex-col gap-4 p-8 h-full group bg-card/40">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Check className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors uppercase">{item.title}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50 mb-20 lg:mb-24" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10">
             <div className="space-y-6">
               <SplitText
                 text={activeTab === 'delivery' ? 'Надежная доставка грузов' : (activeTab === 'keramogranit' ? 'Выбор керамогранита' : (activeTab === 'contacts' ? 'Наш шоурум' : 'Ламинат и SPS-покрытия'))}
                 tag="h2"
                 className="text-3xl md:text-5xl leading-[1.1] uppercase tracking-tighter"
                 textAlign="left"
               />
               <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                 {activeTab === 'delivery' 
                   ? 'Мы берем на себя полную ответственность за ваш груз. От завода в Индии или Китае до вашего склада в России.' 
                   : (activeTab === 'keramogranit' 
                     ? 'Мы поставляем керамогранит практически без ограничений по формату и дизайну под ваши требования.' 
                     : (activeTab === 'contacts' 
                       ? 'Посетите наш шоурум в Бено-Юрт, чтобы лично оценить качество материалов и получить консультацию.' 
                       : 'Под проекты любого масштаба — от регулярных заказов до комплексных поставок.'))}
               </p>
             </div>
             <div className="flex flex-col sm:flex-row gap-6">
                <Button variant="outline" className="h-16 px-10 rounded-none border-foreground/20 hover:bg-foreground/5 font-bold uppercase tracking-[0.3em] text-[10px] w-full md:w-auto">
                  <Download className="mr-3 h-5 w-5" />
                  {activeTab === 'delivery' ? 'Прайс-лист' : (activeTab === 'contacts' ? 'Реквизиты' : `Каталог`)}
                </Button>
                {activeTab === 'contacts' && (
                  <Button 
                    onClick={handleLearnAboutShipping}
                    className="h-16 px-10 rounded-none bg-primary text-white hover:bg-primary/90 transition-all font-bold uppercase tracking-[0.3em] text-[10px] w-full md:w-auto shadow-xl group flex items-center justify-center"
                  >
                    <span>О логистике</span>
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                )}
             </div>
          </div>

          <div className="relative">
            {currentImages?.primary && currentImages?.secondary ? (
              <BorderGlow borderRadius={8} glowRadius={60} className="border-none shadow-2xl" colors={['#8B5E3C', '#C9C3BC', '#4A3728']}>
                <InteractiveImage 
                  primaryImage={currentImages.primary} 
                  secondaryImage={currentImages.secondary} 
                  label={currentImages.label} 
                />
              </BorderGlow>
            ) : (
              <div className="aspect-[4/3] bg-card border border-border flex flex-col items-center justify-center text-muted-foreground relative group overflow-hidden shadow-lg">
                <HelpCircle className="w-16 h-16 mb-4 opacity-20" />
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold">Фото загружаются</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}