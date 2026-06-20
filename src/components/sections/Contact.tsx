
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContentTab } from "@/app/page";

interface ContactProps {
  activeTab: ContentTab;
}

export function Contact({ activeTab }: ContactProps) {
  return (
    <section className="py-32 px-8 bg-card/5">
      <div className="max-w-[1600px] mx-auto">
        <Separator className="bg-white/5 mb-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-10 sticky top-32">
            <h2 className="text-5xl md:text-7xl font-headline uppercase tracking-tighter leading-[0.9]">
              {activeTab === 'keramogranit' ? 'Нужен керамогранит?' : 'Нужен ламинат или SPS?'}
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
              Оставьте заявку и мы предложим решение под Ваш проект. Расскажем, какие материалы нужны и предложим решение под ваш объект.
            </p>
            <div className="space-y-4 pt-10">
               <div className="text-3xl font-headline font-bold text-primary tracking-tighter">+7 989 919 95 41</div>
               <div className="text-xl text-muted-foreground font-light uppercase tracking-widest">irggimport@bk.ru</div>
            </div>
          </div>

          <div className="p-16 border border-white/5 bg-card/30 backdrop-blur-3xl shadow-2xl">
            <form className="space-y-12">
              <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Ваше Имя</label>
                <Input placeholder="Введите имя" className="h-16 bg-background/50 border-white/5 rounded-none text-lg px-6 focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Телефон</label>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center bg-white/5 border border-white/5 px-8 text-[12px] font-bold uppercase tracking-widest">Russia +7</div>
                  <Input placeholder="912 345-67-89" className="h-16 flex-1 bg-background/50 border-white/5 rounded-none text-lg px-6" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Опишите ваш запрос (макс. 100 слов)</label>
                <Textarea placeholder="Тип объекта, объем, предпочтения..." className="min-h-[200px] bg-background/50 border-white/5 rounded-none text-lg p-6" />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-loose opacity-60">
                Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c политикой конфиденциальности.
              </p>
              <Button size="lg" className="w-full h-20 bg-primary text-white text-[12px] font-bold uppercase tracking-[0.4em] group rounded-none shadow-2xl transition-all">
                Отправить заявку
                <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
