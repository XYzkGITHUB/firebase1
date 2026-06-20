
"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { LogisticsJourney } from "@/components/sections/LogisticsJourney";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { LogisticsAI } from "@/components/sections/LogisticsAI";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export type ContentTab = "keramogranit" | "laminate_sps";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ContentTab>("keramogranit");

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Hero activeTab={activeTab} />
      
      <Stats activeTab={activeTab} />

      {/* AI Material Selection Section */}
      <AIAssistant />
      
      <ProductExplorer activeTab={activeTab} />
      
      <LogisticsJourney activeTab={activeTab} />

      {/* AI Logistics Forecast Section */}
      <LogisticsAI />

      {/* Action Section */}
      <section className="py-32 px-6 bg-primary flex flex-col items-center justify-center text-center">
         <h2 className="text-4xl md:text-6xl font-headline text-white mb-8 uppercase tracking-tighter max-w-4xl">
           {activeTab === 'keramogranit' ? 'Связаться с менеджером' : 'Связаться с менеджером'}
         </h2>
         <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl font-medium leading-relaxed">
           Мы поможем рассчитать объем и сроки поставки для вашего объекта уже сегодня.
         </p>
         <button className="h-24 px-20 bg-white text-primary font-bold uppercase tracking-widest text-lg hover:bg-neutral-100 transition-all shadow-2xl">
           Отправить запрос
         </button>
      </section>

      <FAQ activeTab={activeTab} />
      
      <Contact activeTab={activeTab} />
      
      <Footer />
    </main>
  );
}
