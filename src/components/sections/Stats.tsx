"use client";
import React, { useState } from "react";
import { Handshake, Construction, ShieldCheck, Layers, Package, TrendingUp, Factory, Globe, Clock, ShieldAlert, Phone, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { BorderGlow } from "@/components/ui/border-glow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StatsProps {
  activeTab: ContentTab;
}

export function Stats({ activeTab }: StatsProps) {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

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

  const deliveryAdv = [
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Глобальная сеть маршрутов",
      desc: "Оптимальные пути из Индии и Китая. Знаем все нюансы морской и авиа логистики.",
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Сроки от 25 дней",
      desc: "25 дней из Индии, 35 дней из Китая. Точное планирование и соблюдение графика.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Бережное отношение",
      desc: "Мы берем на себя полную ответственность за сохранность вашего груза на каждом этапе.",
    },
    {
      icon: <ShieldAlert className="w-10 h-10 text-primary" />,
      title: "Полное страхование",
      desc: "Все грузы застрахованы. Мы минимизируем любые финансовые риски для вашего бизнеса.",
    },
  ];

  const getAdv = () => {
    if (activeTab === 'keramogranit') return keramogranitAdv;
    if (activeTab === 'laminate_sps') return laminateAdv;
    if (activeTab === 'delivery') return deliveryAdv;
    return [];
  }

  const currentAdv = getAdv();
  const isContacts = activeTab === 'contacts';

  return (
    <section className="py-32 px-8 bg-card/10 border-y border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 text-center">
          <SplitText
            text={activeTab === 'delivery' ? "Надежная логистика под ключ" : (isContacts ? "Миссия и ценности RION" : "Наши главные преимущества")}
            tag="h2"
            className="text-4xl md:text-5xl font-headline max-w-5xl mx-auto leading-tight tracking-tighter"
            textAlign="center"
          />
        </div>
        
        {isContacts ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column: Direct Contacts */}
            <BorderGlow borderRadius={8} className="border-[0.5px] border-foreground/5 shadow-sm">
              <div className="p-12 h-full bg-card/20 flex flex-col gap-10">
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Телефоны</h4>
                      <div className="text-xl md:text-2xl font-headline font-bold text-foreground">+7 989 919 95 41</div>
                      <div className="text-xl md:text-2xl font-headline font-bold text-foreground">+7 989 937 41 11</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Email</h4>
                      <div className="text-xl md:text-2xl font-headline font-bold text-foreground lowercase">irggimport@bk.ru</div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>

            {/* Right Column: Legal Address (Expandable) */}
            <BorderGlow borderRadius={8} className="border-[0.5px] border-foreground/5 shadow-sm">
              <div className="p-12 h-full bg-card/20 flex flex-col">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pt-4">Юридический адрес</h4>
                </div>

                <div className="relative flex-1">
                  <div 
                    className={cn(
                      "transition-all duration-500 ease-in-out overflow-hidden",
                      isAddressExpanded ? "max-h-[500px]" : "max-h-[60px]"
                    )}
                  >
                    <p className="text-lg md:text-xl font-headline font-medium leading-relaxed text-foreground">
                      364029, Чеченская респ г. Грозный ул. имени Магомеда Яхъяевича Узуева (байсангуровский р-н), д 2/17, офис 41
                    </p>
                  </div>
                  
                  {!isAddressExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                  className="mt-6 self-start text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-primary/5 h-10 px-4"
                >
                  {isAddressExpanded ? "Свернуть" : "Развернуть"}
                  {isAddressExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </Button>
              </div>
            </BorderGlow>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentAdv.map((adv, idx) => (
              <BorderGlow key={idx} borderRadius={8} className="border-[0.5px] border-foreground/5 shadow-sm">
                <div className="p-12 h-full bg-card/20 hover:bg-card/30 transition-all duration-700 group overflow-hidden">
                  <div className="mb-10 transform transition-transform group-hover:scale-110 duration-500">{adv.icon}</div>
                  <h3 className="text-2xl font-headline font-bold mb-6 text-foreground leading-tight tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-light whitespace-pre-line">
                    {adv.desc}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </div>
        )}

        {isContacts && (
          <div className="mt-40 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="mb-16 text-center space-y-6">
              <SplitText
                text="Где мы находимся?"
                tag="h2"
                className="text-3xl md:text-6xl font-headline uppercase tracking-tighter"
                textAlign="center"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="h-[1px] w-24 bg-primary/40" />
                <p className="text-muted-foreground font-light uppercase tracking-[0.4em] text-[10px] max-w-2xl text-center">
                  Чеченская Республика, с. Бено-Юрт, Торговая, 185
                </p>
              </div>
            </div>
            
            <div className="relative w-full h-[500px] mt-12 bg-card/20 border border-border overflow-hidden shadow-2xl">
              <div className="absolute inset-0 pointer-events-auto">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?text=%D0%A7%D0%B5%D1%87%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%2C%20%D1%81.%20%D0%91%D0%B5%D0%BD%D0%BE-%D0%AE%D1%80%D1%82%2C%20%D1%83%D0%BB.%20%D0%A2%D0%BE%D1%80%D0%B3%D0%BE%D0%B2%D0%B0%D1%8F%2C%20185&z=16&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="w-full h-full grayscale opacity-70 contrast-125"
                ></iframe>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-border shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
