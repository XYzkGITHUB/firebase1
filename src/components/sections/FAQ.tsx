
"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";

interface FAQProps {
  activeTab: ContentTab;
}

export function FAQ({ activeTab }: FAQProps) {
  const commonFaqs = [
    {
      q: "Сколько времени занимает поставка керамогранита?",
      a: "Производство занимает 3–5 дней, морская доставка — в среднем 23–25 дней. Общий срок — 25–45 дней.",
    },
    {
      q: "Можно ли заказать образцы перед закупкой?",
      a: "Можно использовать образцы из шоурума или заказать точные образцы с ближайшей поставкой (1-3 недели).",
    },
    {
      q: "Работаете ли вы с частными и коммерческими проектами?",
      a: "Работаем с любыми объёмами и любой сложностью — без ограничений.",
    },
    {
      q: "Какие форматы вы поставляете?",
      a: "Производство обеспечивают 5 заводов-партнёров, поэтому ограничений по цветам и форматам нет.",
    },
    {
      q: "Предоставляете ли вы поддержку по выбору материала?",
      a: "Предоставляем полный дизайнерский ресурс компании для подбора материала.",
    },
  ];

  return (
    <section className="py-32 px-8 max-w-5xl mx-auto">
      <SplitText
        text="Часто задаваемые вопросы"
        tag="h2"
        className="text-4xl md:text-6xl font-headline text-center mb-20 uppercase tracking-tighter"
        textAlign="center"
      />
      <Accordion type="single" collapsible className="w-full space-y-6">
        {commonFaqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 rounded-none px-8 bg-card/20 transition-all hover:bg-card/30">
            <AccordionTrigger className="text-left font-bold text-xl md:text-2xl hover:no-underline hover:text-primary py-8 uppercase tracking-tighter leading-tight transition-colors">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-10 leading-relaxed text-lg font-light">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
