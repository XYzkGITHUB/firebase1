"use client";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="pt-40 pb-16 px-8 bg-background border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <h3 className="text-5xl font-headline font-bold text-primary tracking-tighter">RION</h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md font-light">
              Международные поставки строительных материалов под ключ. Качество, проверенное временем.
            </p>
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <div className="text-2xl font-headline font-bold tracking-tighter text-foreground">+7 989 919 95 41</div>
                <div className="text-2xl font-headline font-bold tracking-tighter text-foreground">+7 989 937 41 11</div>
              </div>
              <div className="text-xl text-muted-foreground font-light tracking-widest lowercase">irggimport@bk.ru</div>
              <div className="text-[11px] uppercase tracking-[0.5em] opacity-40 font-bold">Россия, Чечня, с. Бено-Юрт</div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-10">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.5em] text-foreground opacity-60">Навигация</h4>
            <ul className="space-y-6">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-all text-sm uppercase tracking-[0.3em] font-bold">Керамогранит</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-all text-sm uppercase tracking-[0.3em] font-bold">Ламинат и SPS</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-all text-sm uppercase tracking-[0.3em] font-bold">Сантехника</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-all text-sm uppercase tracking-[0.3em] font-bold">Таможня и Склад</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-all text-sm uppercase tracking-[0.3em] font-bold">Контакты</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.5em] text-foreground opacity-60">Партнеры и менеджмент</h4>
            <div className="space-y-6">
              <div className="p-8 border border-foreground/10 bg-card/20 text-center text-muted-foreground font-headline italic text-2xl tracking-tighter">Tile Time</div>
              <div className="p-8 border border-foreground/10 bg-card/20 text-center text-muted-foreground font-headline italic text-2xl tracking-tighter">Lima Ceramica</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light pt-6">
              Свяжитесь с нами напрямую или оставьте заявку — мы разберем запрос и предложим оптимальное решение.
            </p>
          </div>
        </div>

        <Separator className="bg-white/5 mb-16" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.4em]">
          <div>© 2026 RION. From Elin Yurt. Все права защищены.</div>
          <div className="flex gap-16">
            <Link href="#" className="hover:text-foreground transition-colors">Политика</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
