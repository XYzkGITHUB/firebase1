
"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { LogisticsJourney } from "@/components/sections/LogisticsJourney";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import ClickSpark from "@/components/ui/click-spark";

export type ContentTab = "keramogranit" | "laminate_sps" | "delivery" | "contacts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ContentTab>("keramogranit");

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ClickSpark sparkColor="#C9C3BC" sparkCount={10} sparkRadius={20}>
      <main className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <Hero activeTab={activeTab} />
        
        <Stats activeTab={activeTab} />

        {activeTab !== "delivery" && activeTab !== "contacts" && <AIAssistant />}
        
        <ProductExplorer activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {(activeTab === "delivery" || activeTab === "contacts") && (
          <LogisticsJourney activeTab={activeTab} />
        )}

        {activeTab !== "delivery" && activeTab !== "contacts" && (
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

        <FAQ activeTab={activeTab} />
        
        <Contact activeTab={activeTab} />
        
        <Footer />
      </main>
    </ClickSpark>
  );
}
