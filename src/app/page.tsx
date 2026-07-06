
"use client";
import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { LogisticsJourney } from "@/components/sections/LogisticsJourney";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { MainSection } from "@/components/sections/MainSection";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ContentTab = "main" | "keramogranit" | "laminate_sps" | "sanitary" | "delivery" | "contacts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ContentTab>("main");
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [storeFilter, setStoreFilter] = useState<string[]>([]);

  // Listen for hash changes ONLY (interaction-driven), but always start on "main"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs: ContentTab[] = ["main", "keramogranit", "laminate_sps", "sanitary", "delivery", "contacts"];
      
      if (validTabs.includes(hash as ContentTab)) {
        setActiveTab(hash as ContentTab);
        setIsStoreOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMainTab = activeTab === "main";
  const isContactsTab = activeTab === "contacts";
  const isDeliveryTab = activeTab === "delivery";

  const handleOpenStoreWithFilter = (categoryId?: string) => {
    if (categoryId) {
      setStoreFilter([categoryId]);
    } else {
      setStoreFilter([]);
    }
    setIsStoreOpen(true);
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isStoreOpen={isStoreOpen}
        setIsStoreOpen={setIsStoreOpen}
        onOpenStoreWithFilter={handleOpenStoreWithFilter}
      />
      
      <Hero 
        activeTab={activeTab} 
        isStoreOpen={isStoreOpen}
        setIsStoreOpen={setIsStoreOpen}
        externalFilter={storeFilter}
        onFilterChange={setStoreFilter}
      />

      <div>
        <AnimatePresence mode="wait">
          {isMainTab ? (
            <MainSection 
              key="main-section" 
              setActiveTab={setActiveTab} 
              setIsStoreOpen={setIsStoreOpen}
            />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Stats activeTab={activeTab} />

              {!isContactsTab && !isDeliveryTab && <AIAssistant />}
              
              <ProductExplorer 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onOpenStore={handleOpenStoreWithFilter}
              />
              
              {isDeliveryTab && (
                <LogisticsJourney activeTab={activeTab} />
              )}

              {!isContactsTab && !isDeliveryTab && (activeTab !== "sanitary") && (
                <section className="py-24 md:py-32 px-6 bg-primary flex flex-col items-center justify-center text-center">
                   <h2 className="text-3xl md:text-6xl font-headline text-white mb-8 uppercase tracking-tighter max-w-4xl">
                     Связаться с менеджером
                   </h2>
                   <p className="text-white/80 text-lg md:text-2xl mb-12 max-w-2xl font-medium leading-relaxed">
                     Мы поможем рассчитать объем и сроки поставки для вашего объекта уже сегодня.
                   </p>
                   <button 
                     onClick={scrollToContact}
                     className="h-20 md:h-24 px-12 md:px-20 bg-white text-primary font-bold uppercase tracking-widest text-sm md:text-lg hover:bg-neutral-100 transition-all shadow-2xl"
                   >
                     Отправить запрос
                   </button>
                </section>
              )}

              {!isContactsTab && (
                <>
                  <FAQ activeTab={activeTab} />
                  <Contact activeTab={activeTab} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer onTabChange={setActiveTab} />
      </div>
    </main>
  );
}
