
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Layers, Layout, Filter, ArrowLeft, ShoppingBag, LampCeiling } from "lucide-react";
import { ContentTab } from "@/app/page";
import { cn } from "@/lib/utils";
import BlurText from "@/components/ui/blur-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShineButton } from "@/components/ui/shine-button";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface HeroProps {
  activeTab: ContentTab;
  isStoreOpen: boolean;
  setIsStoreOpen: (open: boolean) => void;
}

const categories = [
  { id: "keramogranit", name: "Керамогранит", icon: <Grid3X3 className="w-6 h-6" /> },
  { id: "laminate", name: "Ламинат", icon: <Layers className="w-6 h-6" /> },
  { id: "carpets", name: "Ковры", icon: <Layout className="w-6 h-6" /> },
  { id: "lyustri", name: "Люстры", icon: <LampCeiling className="w-6 h-6" /> },
];

const mockProducts = [
  // Люстры (Lyustri)
  { id: 'ly1', cat: "lyustri", name: "Люстра", price: "7 000 ₽", sub: "5 ламп", image: "/imgs/Catalog/Lyustri/5-lamp-7000.png" },
  { id: 'ly2', cat: "lyustri", name: "Люстра", price: "8 900 ₽", sub: "6 ламп", image: "/imgs/Catalog/Lyustri/6-lamp-8900.png" },
  { id: 'ly3', cat: "lyustri", name: "Люстра", price: "28 500 ₽", sub: "6 ламп", image: "/imgs/Catalog/Lyustri/6-lamp-28500.png" },
  { id: 'ly4', cat: "lyustri", name: "Люстра", price: "6 800 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-6800.png" },
  { id: 'ly5', cat: "lyustri", name: "Люстра", price: "11 900 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-11900.png" },
  { id: 'ly6', cat: "lyustri", name: "Люстра \"Дождик\"", price: "13 200 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-dozhdik-13200.png" },
  { id: 'ly7', cat: "lyustri", name: "Люстра \"Диодная\"", price: "13 120 ₽", sub: "10 ламп", image: "/imgs/Catalog/Lyustri/10-lamp-dioidnaya-13120.png" },
  { id: 'ly8', cat: "lyustri", name: "Люстра", price: "19 500 ₽", sub: "10 ламп", image: "/imgs/Catalog/Lyustri/10-lamp-19500.png" },
  { id: 'ly9', cat: "lyustri", name: "Люстра", price: "18 900 ₽", sub: "11 ламп", image: "/imgs/Catalog/Lyustri/11-lamp-18900.png" },
  { id: 'ly10', cat: "lyustri", name: "Люстра \"Ветка\"", price: "23 750 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-vetka-23750.png" },
  { id: 'ly11', cat: "lyustri", name: "Люстра", price: "32 500 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-32500.png" },
  { id: 'ly12', cat: "lyustri", name: "Люстра", price: "32 750 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-32750.png" },
  { id: 'ly13', cat: "lyustri", name: "Люстра", price: "33 750 ₽", sub: "16 ламп", image: "/imgs/Catalog/Lyustri/16-lamp-33750.png" },
  { id: 'ly14', cat: "lyustri", name: "Люстра", price: "33 800 ₽", sub: "16 ламп, диаметр 1000 мм", image: "/imgs/Catalog/Lyustri/16-lamp-diameter-1000cm-33800.png" },
  { id: 'ly15', cat: "lyustri", name: "Люстра", price: "47 300 ₽", sub: "18 ламп", image: "/imgs/Catalog/Lyustri/18-lamp-47300.png" },
  { id: 'ly16', cat: "lyustri", name: "Люстра", price: "14 700 ₽", sub: "740x550 мм, 6 ламп", image: "/imgs/Catalog/Lyustri/740mmx550mm-6-lamp-14700.png" },
  { id: 'ly17', cat: "lyustri", name: "Люстра", price: "27 000 ₽", sub: "диаметр 60 см", image: "/imgs/Catalog/Lyustri/diameter-60-27000.png" },
  { id: 'ly18', cat: "lyustri", name: "Люстра \"Диодная\"", price: "33 700 ₽", sub: "диаметр 60 см", image: "/imgs/Catalog/Lyustri/diameter-60-diodnaya-33700.png" },
  { id: 'ly19', cat: "lyustri", name: "Люстра \"Диодная\"", price: "17 040 ₽", sub: "диаметр 800 мм", image: "/imgs/Catalog/Lyustri/diameter-800-diodnaya-17040.png" },
  { id: 'ly20', cat: "lyustri", name: "Люстра \"Диод-Трос\"", price: "17 850 ₽", sub: "", image: "/imgs/Catalog/Lyustri/Diod-tross-17850.png" },
  { id: 'ly21', cat: "lyustri", name: "Люстра \"Диодная\"", price: "25 400 ₽", sub: "", image: "/imgs/Catalog/Lyustri/diyoidnaya-25400.png" },
  { id: 'ly22', cat: "lyustri", name: "Люстра", price: "4 900 ₽", sub: "", image: "/imgs/Catalog/Lyustri/4900.png" },
  { id: 'ly23', cat: "lyustri", name: "Люстра", price: "9 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/9500.png" },
  { id: 'ly24', cat: "lyustri", name: "Люстра", price: "12 300 ₽", sub: "", image: "/imgs/Catalog/Lyustri/12300.png" },
  { id: 'ly25', cat: "lyustri", name: "Люстра", price: "22 400 ₽", sub: "", image: "/imgs/Catalog/Lyustri/22400.png" },
  { id: 'ly26', cat: "lyustri", name: "Люстра", price: "31 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/31500.png" },

  // Ковры (Carpets)
  { id: 'c1', cat: "carpets", name: "Осло", price: "7 650 ₽", sub: "1.5 * 2 м", image: "/imgs/Catalog/Carpets/1,5.2oslo7650.png" },
  { id: 'c2', cat: "carpets", name: "Турецкий Ковер", price: "14 100 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish14100.avif" },
  { id: 'c3', cat: "carpets", name: "Турецкий Ковер", price: "16 135 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish16135.png" },
  { id: 'c4', cat: "carpets", name: "Турецкий Ковер", price: "23 100 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish23100.png" },
  { id: 'c5', cat: "carpets", name: "Ковер", price: "11 400 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet11400.png" },
  { id: 'c6', cat: "carpets", name: "Ковер", price: "14 800 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet14800.png" },
  { id: 'c7', cat: "carpets", name: "Ковер", price: "16 200 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet16200.avif" },
  { id: 'c8', cat: "carpets", name: "Ковер", price: "16 900 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet16900.png" },
  { id: 'c9', cat: "carpets", name: "Ковер", price: "17 400 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet17400.png" },
  { id: 'c10', cat: "carpets", name: "Ковер", price: "18 000 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet18000.png" },
  { id: 'c11', cat: "carpets", name: "Ковер", price: "28 100 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet28100.png" },
  { id: 'c12', cat: "carpets", name: "Диор", price: "20 100 ₽", sub: "2.4 м", image: "/imgs/Catalog/Carpets/2.4dior20100.png" },
  { id: 'c13', cat: "carpets", name: "Турецкий Ковер", price: "12 880 ₽", sub: "2.4 м", image: "/imgs/Catalog/Carpets/2.4turkish12880.png" },
  { id: 'c14', cat: "carpets", name: "Толстый Кролик", price: "10 450 ₽", sub: "160 * 230 см", image: "/imgs/Catalog/Carpets/160.230fat-rabbit10450.png" },

  // Керамогранит (Keramogranit)
  { id: 'k1', cat: "keramogranit", name: "Керамогранит", price: "850 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-850.png" },
  { id: 'k2', cat: "keramogranit", name: "Керамогранит", price: "950 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-950.png" },
  { id: 'k3', cat: "keramogranit", name: "Керамогранит", price: "1 450 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-1450.png" },
  { id: 'k4', cat: "keramogranit", name: "Керамогранит", price: "1 100 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1100.png" },
  { id: 'k5', cat: "keramogranit", name: "Керамогранит", price: "1 250 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1250.png" },
  { id: 'k6', cat: "keramogranit", name: "Керамогранит", price: "1 400 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1400.png" },
  { id: 'k7', cat: "keramogranit", name: "Примавера", price: "2 340 ₽/м²", sub: "Керамогранит", image: "/imgs/Catalog/Keramogranit/Primavera-2340.png" },
  { id: 'k8', cat: "keramogranit", name: "Прогресс", price: "1 150 ₽/м²", sub: "Керамогранит", image: "/imgs/Catalog/Keramogranit/Progress-1150.png" },

  // Ламинат (Laminat)
  { id: 'l1', cat: "laminate", name: "Peli Анатолия Кофе", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-peli-950 (2).png" },
  { id: 'l2', cat: "laminate", name: "Peli Анатолия Белый", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-Peli-950 (3).png" },  
  { id: 'l3', cat: "laminate", name: "Peli Анатолия Темный дуб", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-Peli-950.png" }, 
  { id: 'l4', cat: "laminate", name: "Peli Анатолия Бежевый", price: "950 ₽/м²", sub: "8мм", image: "/imgs/Catalog/Laminat/8mm-Peli-Anatolia-Beige.png" },
  { id: 'l5', cat: "laminate", name: "Peli Анатолия Серый", price: "950 ₽/м²", sub: "8мм", image: "/imgs/Catalog/Laminat/8mm-Peli-Anatolia-Gray-950.png" },
  { id: 'l6', cat: "laminate", name: "Дуб Аркадия", price: "1 270 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Arcadia-1270.png" },
  { id: 'l7', cat: "laminate", name: "Дуб Кайзер", price: "1 270 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Kaizer-1270.png" },
  { id: 'l8', cat: "laminate", name: "Дуб Медичи", price: "1 300 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Medichi-1270.png" },
  { id: 'l9', cat: "laminate", name: "Дуб Рональд", price: "1 050 ₽/м²", sub: "12мм", image: "/imgs/Catalog/Laminat/12mm-Dob-Ronald-1050.png" },
  { id: 'l10', cat: "laminate", name: "Дуб Савой", price: "1 100 ₽/м²", sub: "12мм", image: "/imgs/Catalog/Laminat/12mm-Dub-Savoy.png" },
];

export function Hero({ activeTab, isStoreOpen, setIsStoreOpen }: HeroProps) {
  const isMobile = useIsMobile();
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Star Rating Animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const jitter = (Math.random() - 0.5) * 0.05;
    const value = latest + (latest < 4.6 && latest > 0 ? jitter : 0);
    return Math.min(4.6, Math.max(0, value)).toFixed(1);
  });
  const [starsFill, setStarsFill] = useState(0);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('rion_hero_rating_seen');
    if (seen) {
      count.set(4.6);
      setStarsFill(92);
      setAnimationPlayed(true);
      return;
    }

    if (activeTab === 'contacts' && !isStoreOpen && !animationPlayed) {
      const numberAnimation = animate(count, 4.6, {
        duration: 2,
        ease: "easeOut",
      });

      const starAnimation = animate(0, 92, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setStarsFill(latest),
      });

      sessionStorage.setItem('rion_hero_rating_seen', 'true');
      setAnimationPlayed(true);

      return () => {
        numberAnimation.stop();
        starAnimation.stop();
      };
    }
  }, [activeTab, isStoreOpen, animationPlayed, count]);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackerLogin = () => {
    window.location.href = "https://irgg.ru/";
  };

  const toggleStore = () => {
    if (isStoreOpen) {
      setIsStoreOpen(false);
    } else {
      setIsStoreOpen(true);
      setSelectedCats([]);
    }
  };

  const storeTitle = useMemo(() => {
    if (selectedCats.length === 0) return "Весь ассортимент";
    const names = categories
      .filter(c => selectedCats.includes(c.id))
      .map(c => c.name);
    
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
    return "Коллекции RION";
  }, [selectedCats]);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const currentContent = {
    main: { title: "", desc: "" }, // Handled by MainSection
    keramogranit: { title: "КЕРАМОГРАНИТ ПОД КЛЮЧ", desc: "Подбираем материал от производителей по всему миру и доставляем на объект точно в срок." },
    laminate_sps: { title: "ЛАМИНАТ И SPS", desc: "Стабильные поставки напрямую с фабрик Китая и Индии." },
    sanitary: { title: "ЭКСКЛЮЗИВНАЯ САНТЕХНИКА", desc: "Прямые поставки санфаянса и мебели для ванных комнат от ведущих мировых брендов." },
    delivery: { title: "ЛОГИСТИКА БЕЗ ГРАНИЦ", desc: "Бережная доставка ваших материалов из Индии (25 дней) и Китая (35 дней) с полной страховкой." },
    contacts: { title: "БОЛЬШЕ О RION", desc: "Чеченская Республика, с. Бено-Юрт. Мы всегда на связи для решения ваших задач." }
  }[activeTab];

  // Star Generator
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.max(0, Math.min(100, (starsFill - i * 20) * 5));
    return (
      <svg key={i} width="24" height="24" viewBox="0 0 24 24" className="mr-1">
        <defs>
          <linearGradient id={`star-gradient-${i}`}>
            <stop offset={`${fillPercentage}%`} stopColor="black" />
            <stop offset={`${fillPercentage}%`} stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
        </defs>
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill={`url(#star-gradient-${i})`} stroke="black" strokeWidth="1.5" />
      </svg>
    );
  });

  if (activeTab === "main" && !isStoreOpen) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 md:pt-48 pb-40">
      {/* Hidden button for MainSection to trigger shop */}
      <button data-shop-trigger="true" className="hidden" onClick={() => setIsStoreOpen(true)} />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]" style={{ backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <AnimatePresence mode="wait">
        {!isStoreOpen ? (
          <motion.div key="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="z-10 w-full max-w-[1600px] px-8 flex flex-col items-center">
            <div className="relative w-full max-w-6xl py-12 md:py-24 px-4 md:px-16 flex flex-col items-center justify-center">
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-full h-[8rem] md:h-[14rem] flex items-center justify-center cursor-default">
                  <TextHoverEffect text="RION" disableInteraction={isMobile} />
                </div>
                <div className="mt-8 text-center space-y-6 max-w-4xl">
                  <div className="min-h-[100px] flex items-center justify-center">
                    <BlurText text={currentContent.title} animateBy="words" direction="top" className="text-3xl md:text-5xl lg:text-7xl font-headline text-foreground leading-tight uppercase tracking-tighter" />
                  </div>
                  <div className="min-h-[60px]">
                    <BlurText text={currentContent.desc} animateBy="words" direction="bottom" className="text-base text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto font-light" />
                  </div>

                  {activeTab === 'contacts' && (
                    <div className="flex flex-col items-center gap-2 pt-8">
                      <div className="flex items-center gap-6">
                        <div className="flex">{stars}</div>
                        <div className="text-2xl md:text-3xl font-headline font-bold text-black tabular-nums flex items-baseline gap-1">
                          <motion.span>{rounded}</motion.span>
                          <span className="text-sm md:text-base opacity-40">/ 5</span>
                        </div>
                      </div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground opacity-60">Рейтинг удовлетворенности партнеров</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                    <Button onClick={scrollToContact} size="lg" className="h-16 px-10 rounded-none font-bold group bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all w-full sm:w-auto">
                      Связаться с менеджером
                      <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Button>
                    {activeTab !== "contacts" && (
                      <>
                        {activeTab === 'delivery' ? (
                          <ShineButton label="Вход в трекер" size="lg" bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)" onClick={handleTrackerLogin} className="w-full sm:w-auto" />
                        ) : (
                          <ShineButton 
                            label="Открыть магазин" 
                            size="lg" 
                            variant="outline" 
                            onClick={toggleStore} 
                            className="w-full sm:w-auto" 
                            icon={<ShoppingBag className="w-5 h-5 mr-2" />}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="store-content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="z-[110] fixed inset-0 bg-background/95 backdrop-blur-3xl flex flex-col">
            <div className="flex justify-between items-center px-8 py-10 border-b border-white/10 bg-background/50">
              <button 
                onClick={toggleStore} 
                className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={18} /> Назад
              </button>
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="p-12 border-b border-white/10 bg-background/50 flex flex-col md:flex-row items-center justify-between gap-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-headline uppercase tracking-tighter text-foreground">{storeTitle}</h2>
                  <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-3">Каталог товаров RION</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Button variant="outline" className="h-16 px-10 rounded-none border-foreground/20 uppercase tracking-[0.2em] text-[11px] font-bold" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                      <Filter className="mr-3 h-5 w-5" />
                      Фильтр {selectedCats.length > 0 && `(${selectedCats.length})`}
                    </Button>
                    <AnimatePresence>
                      {showFilterMenu && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 bg-background border border-border shadow-2xl p-6 min-w-[240px] z-[60] flex flex-col gap-3">
                          {categories.map((cat) => (
                            <button 
                              key={cat.id} 
                              onClick={() => toggleCategory(cat.id)} 
                              className={cn(
                                "flex items-center justify-between px-6 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors", 
                                selectedCats.includes(cat.id) ? "bg-primary text-white" : "hover:bg-muted"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                {cat.icon}
                                <span>{cat.name}</span>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {selectedCats.length > 0 && (
                    <Button variant="ghost" className="h-16 px-10 rounded-none uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground hover:text-primary" onClick={() => setSelectedCats([])}>
                      Очистить
                    </Button>
                  )}
                </div>
              </div>

              <ScrollArea className="flex-1 p-12">
                <div className="max-w-[1800px] mx-auto space-y-32 pb-32">
                  {categories
                    .filter(cat => selectedCats.length === 0 || selectedCats.includes(cat.id))
                    .map(cat => {
                      const categoryProducts = mockProducts.filter(p => p.cat === cat.id);
                      if (categoryProducts.length === 0) return null;
                      return (
                        <div key={cat.id} className="space-y-12">
                          <div className="flex items-center gap-10">
                            <div className="h-[1px] flex-1 bg-primary/20" />
                            <h3 className="text-3xl md:text-4xl font-headline uppercase tracking-tight text-primary">{cat.name}</h3>
                            <div className="h-[1px] flex-1 bg-primary/20" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {categoryProducts.map(prod => (
                                <div key={prod.id} className="glass-panel p-10 border-white/5 hover:bg-foreground/5 transition-all group">
                                  <div className="aspect-square bg-muted/20 mb-8 flex items-center justify-center relative overflow-hidden">
                                    {prod.image && (
                                      <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                                    )}
                                    <div className="absolute bottom-6 right-6">
                                      <Badge variant="outline" className="bg-background/80 border-primary/20 text-[10px] uppercase tracking-widest px-3 py-1">В наличии</Badge>
                                    </div>
                                  </div>
                                  <h4 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{prod.name}</h4>
                                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold mb-4">{prod.sub}</p>
                                  <p className="text-primary font-headline font-bold text-2xl">{prod.price}</p>
                                  <Button className="w-full mt-8 rounded-none bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 font-bold uppercase tracking-widest text-[11px] h-14">Подробнее</Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isStoreOpen && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[1em] text-muted-foreground font-bold">Листайте вниз</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      )}
    </section>
  );
}
