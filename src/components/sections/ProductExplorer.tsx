
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, HelpCircle, Truck, MapPin, ArrowRight, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProductExplorerProps {
  activeTab: ContentTab;
  setActiveTab?: (tab: ContentTab) => void;
}

function InteractiveImage({ image, label }: { image: any; label: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] group cursor-none perspective-[1000px]"
    >
      <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
      <div className="relative w-full h-full overflow-hidden border border-white/10 bg-card/50 shadow-2xl">
        <Image 
          src={image?.imageUrl || "https://picsum.photos/seed/fallback/800/600"}
          alt={label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={image?.imageHint || "store view"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 translate-z-[50px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white bg-primary px-4 py-2">
            {label}
          </span>
        </div>
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
    { title: "Полная материальная ответственность", desc: "Мы отвечаем за каждый квадратный метр вашего груза." },
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
  const dayStoreImage = PlaceHolderImages.find(img => img.id === "store-daytime");
  const nightStoreImage = PlaceHolderImages.find(img => img.id === "store-nighttime");

  const handleLearnAboutShipping = () => {
    if (setActiveTab) {
      setActiveTab('delivery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 lg:mb-40">
          <SplitText
            text={activeTab === 'delivery' ? "Что мы гарантируем при доставке" : (activeTab === 'contacts' ? "Сервис и поддержка" : "Что вы получаете, выбирая нас")}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="space-y-8 lg:space-y-12">
             <div className="space-y-6 lg:space-y-10">
               <div className="h-32 lg:h-40 cursor-default overflow-hidden">
                 <TextHoverEffect text="IRGG" />
               </div>
               <SplitText
                 text={activeTab === 'delivery' ? 'Надежная доставка грузов' : (activeTab === 'keramogranit' ? 'Выбор керамогранита' : (activeTab === 'contacts' ? 'Вид нашего шоурума' : 'Ламинат и SPS-покрытия'))}
                 tag="h2"
                 className="text-4xl lg:text-7xl font-headline leading-[1] lg:leading-[0.9] uppercase tracking-tighter"
                 textAlign="left"
               />
               <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
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
                <Button variant="outline" className="h-16 lg:h-20 px-8 lg:px-12 rounded-none border-primary/50 text-primary hover:bg-primary hover:text-white transition-all font-bold uppercase tracking-[0.3em] text-[10px] lg:text-[12px] w-full md:w-auto">
                  <Download className="mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                  {activeTab === 'delivery' ? 'Прайс-лист на логистику' : (activeTab === 'contacts' ? 'Карточка реквизитов' : `Скачать каталог ${activeTab === 'keramogranit' ? 'керамогранита' : ''} (PDF)`)}
                </Button>
                {activeTab === 'contacts' && (
                  <Button 
                    onClick={handleLearnAboutShipping}
                    className="h-16 lg:h-20 px-8 lg:px-12 rounded-none bg-primary text-white hover:bg-primary/90 transition-all font-bold uppercase tracking-[0.3em] text-[10px] lg:text-[12px] w-full md:w-auto shadow-2xl group flex items-center justify-center"
                  >
                    <span>О логистике</span>
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                )}
             </div>
          </div>

          <div className="space-y-8">
            {activeTab === 'contacts' ? (
              <div className="grid grid-cols-1 gap-8">
                <InteractiveImage image={dayStoreImage} label="Дневной вид (Daytime)" />
                <InteractiveImage image={nightStoreImage} label="Ночной вид (Nighttime)" />
              </div>
            ) : (
              <div className="aspect-square bg-card/30 border border-white/5 flex flex-col items-center justify-center text-muted-foreground relative group overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {activeTab === 'delivery' ? (
                    <Truck className="w-16 h-16 lg:w-24 lg:h-24 mb-6 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <HelpCircle className="w-16 h-16 lg:w-24 lg:h-24 mb-6 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                )}
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold">Image is coming soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
