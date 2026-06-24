
"use client";
import React from "react";
import { Handshake, Construction, ShieldCheck, Layers, Package, TrendingUp, Factory, Globe, Clock, ShieldAlert, Phone, Mail, MapPin } from "lucide-react";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { ZoomGlobe } from "@/components/ui/zoom-globe";

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
      icon: <MapPin className="w-10 h-10 text-primary" />,
      title: "Наш адрес",
      desc: "• Чеченская Республика\n\n• Торговая улица, 185",
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

  return (
    <section className="py-32 px-8 bg-card/10 border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 text-center">
          <SplitText
            text={activeTab === 'delivery' ? "Надежная логистика под ключ" : (activeTab === 'contacts' ? "Как с нами связаться" : "Наши главные преимущества")}
            tag="h2"
            className="text-4xl md:text-5xl font-headline max-w-5xl mx-auto leading-tight tracking-tighter"
            textAlign="center"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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

        {activeTab === 'contacts' && <ZoomGlobe />}
      </div>
    </section>
  );
}
