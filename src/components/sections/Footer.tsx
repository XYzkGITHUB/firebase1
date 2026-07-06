
"use client";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { ContentTab } from "@/app/page";

interface FooterProps {
  onTabChange?: (tab: ContentTab) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent, tabId: ContentTab) => {
    if (onTabChange) {
      e.preventDefault();
      onTabChange(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Update hash without triggering immediate scroll if already handled
      window.history.pushState(null, '', `#${tabId}`);
    }
  };

  const navLinks = [
    { label: "Главная", id: "main", href: "/#main" },
    { label: "Керамогранит", id: "keramogranit", href: "/#keramogranit" },
    { label: "Ламинат & SPS", id: "laminate_sps", href: "/#laminate_sps" },
    { label: "Сантехника", id: "sanitary", href: "/#sanitary" },
    { label: "Логистика", id: "delivery", href: "/#delivery" },
    { label: "О компании", id: "contacts", href: "/#contacts" },
  ];

  return (
    <footer className="pt-32 pb-16 px-6 md:px-12 bg-background border-t border-border/40">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Column 1: Branding */}
          <div className="space-y-8">
            <h3 className="text-4xl font-headline font-bold text-primary tracking-tighter">IRGG</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              Международный эксперт в поставках строительных материалов премиум-класса. Прямые контракты с ведущими заводами Индии и Китая.
            </p>
            <div className="pt-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60 block mb-2">Глобальная логистика</span>
              <div className="h-[1px] w-24 bg-primary/20" />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-foreground">Навигация</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.id as ContentTab)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group font-light"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-foreground">Связь с нами</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="text-sm font-medium">+7 989 919 95 41</div>
                  <div className="text-sm font-medium">+7 989 937 41 11</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium lowercase">irggimport@bk.ru</span>
              </div>
            </div>
          </div>

          {/* Column 4: Location */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-foreground">Локация</h4>
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
              <p className="text-sm leading-relaxed text-muted-foreground font-light">
                Чеченская Республика, <br />
                с. Бено-Юрт, <br />
                ул. Торговая, 185
              </p>
            </div>
            <div className="bg-primary/5 p-4 border border-primary/10">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary leading-tight">
                Шоурум открыт ежедневно <br /> с 9:00 до 17:30
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/40 mb-12" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.4em]">
              © {currentYear} IRGG Global Materials. Все права защищены.
            </div>
            <div className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em] font-medium">
              Сделано с любовью в Элин-Юрт
            </div>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Link href="/policy" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
