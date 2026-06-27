"use client";
import React from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import SplitText from "@/components/ui/split-text";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = React.useState<any>("contacts");

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <section className="pt-48 pb-32 px-8 max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="flex items-center text-muted-foreground hover:text-primary transition-colors gap-2 uppercase tracking-widest text-[10px] font-bold mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Назад на главную
        </Link>

        <SplitText
          text="Политика"
          tag="h1"
          className="text-4xl md:text-6xl font-headline mb-16 uppercase tracking-tighter"
          textAlign="left"
        />

        <div className="space-y-8 text-foreground/80 leading-relaxed font-light text-lg">
          <p className="font-medium text-foreground">
            Мы защищаем ваши данные любой ценой. Ваши данные в полной безопасности.
          </p>
          
          <p>
            Спасибо за понимание!
          </p>
          
          <div className="pt-16 border-t border-border/20 text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
            © 2026 IRGG.
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
