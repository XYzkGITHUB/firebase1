
"use client";
import React from "react";
import { Handshake, Construction, ShieldCheck, Layers, Package, TrendingUp, Factory, Globe, Clock, ShieldAlert, Phone, Mail, MapPin } from "lucide-react";
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
      desc: "Работаем with регулярными и этапными отгрузками для разных типов проектов.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Выстроенная система поставок",
      desc: "Контролируем стабильные условия работы и отгрузок на всех эта этапе.",
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

  const contactsAdv = [
    {
      icon: <Phone className="w-10 h-10 text-primary" />,
      title: "Номера телефонов",
      desc: "• +7 989 919 95 41\n\n• +7 989 937 41 11",
    },
    {
      icon: <Mail className="w-10 h-10 text-primary" />,
      title: "Gmail",
      desc: "• irggimport@bk.ru",
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "График работы",
      desc: "• Круглосуточно 24/7\n\n• WhatsApp / Telegram",
    },
  ];

  const getAdv = () => {
    if (activeTab === 'keramogranit') return keramogranitAdv;
    if (activeTab === 'laminate_sps') return laminateAdv;
    if (activeTab === 'delivery') return deliveryAdv;
    return contactsAdv;
  }

  const currentAdv = getAdv();
  const isContacts = activeTab === 'contacts';

  return (
    <section className="py-32 px-8 bg-card/10 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 text-center">
          <SplitText
            text={activeTab === 'delivery' ? "Надежная логистика под ключ" : (isContacts ? "Как с нами связаться" : "Наши главные преимущества")}
            tag="h2"
            className="text-4xl md:text-5xl font-headline max-w-5xl mx-auto leading-tight tracking-tighter"
            textAlign="center"
          />
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isContacts ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-12`}>
          {currentAdv.map((adv, idx) => (
            <div key={idx} className="relative p-12 border border-white/5 bg-card/30 hover:bg-card/50 hover:border-primary/40 transition-all duration-700 group overflow-hidden">
              <div className="mb-10 transform transition-transform group-hover:scale-110 duration-500">{adv.icon}</div>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground leading-tight tracking-tight">
                {adv.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed font-light whitespace-pre-line">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

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
            
            <div className="relative w-full h-[500px] mt-12 bg-card/20 border border-white/5 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 grayscale opacity-80 pointer-events-auto">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?text=%D0%A7%D0%B5%D1%87%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%2C%20%D1%81.%20%D0%91%D0%B5%D0%BD%D0%BE-%D0%AE%D1%80%D1%82%2C%20%D1%83%D0%BB.%20%D0%A2%D0%BE%D1%80%D0%B3%D0%BE%D0%B2%D0%B0%D1%8F%2C%20185&z=16&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
