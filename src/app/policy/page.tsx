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
          text="Политика использования"
          tag="h1"
          className="text-4xl md:text-6xl font-headline mb-16 uppercase tracking-tighter"
          textAlign="left"
        />

        <div className="space-y-12 text-foreground/80 leading-relaxed font-light text-lg">
          <div className="space-y-4">
            <h2 className="text-xl font-headline font-bold text-primary uppercase tracking-widest">Интеллектуальная собственность</h2>
            <p className="font-medium text-foreground">
              Пожалуйста, обратите внимание, что все изображения и контент на этом сайте являются собственностью RION. Мы очень ценим ваш интерес, но просим вас, пожалуйста, не использовать наши материалы в сторонних проектах без предварительного согласования. Большое спасибо за понимание и уважение к нашему труду!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-headline font-bold text-primary uppercase tracking-widest">Использование сайта</h2>
            <p>
              Информация на сайте предоставлена для вашего ознакомления. Пожалуйста, учитывайте, что мы стараемся обновлять данные вовремя, но иногда можем вносить изменения. Спасибо, что следите за нашими обновлениями!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-headline font-bold text-primary uppercase tracking-widest">Конфиденциальность</h2>
            <p>
              Пожалуйста, будьте уверены — мы защищаем ваши данные любой ценой. Любая информация, которую вы нам доверяете, находится под надежной защитой и никогда не передается третьим лицам. Спасибо большое за ваше доверие!
            </p>
          </div>
          
          <div className="pt-16 border-t border-border/20 text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
            © 2026 RION. Все права защищены.
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
