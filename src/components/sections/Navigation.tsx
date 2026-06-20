
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentTab } from "@/app/page";

interface NavigationProps {
  activeTab: ContentTab;
  setActiveTab: (tab: ContentTab) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Керамогранит", id: "keramogranit" as const },
    { name: "Ламинат и SPS", id: "laminate_sps" as const },
    { name: "Сантехника", id: "sanitary" },
    { name: "Морская и авиа доставка", id: "delivery" },
    { name: "Застройщикам", id: "developers" },
    { name: "Спецзаказ", id: "custom" },
    { name: "Таможня", id: "customs" },
    { name: "Склад", id: "warehouse" },
  ];

  const handleNavClick = (id: string) => {
    if (id === "keramogranit" || id === "laminate_sps") {
      setActiveTab(id as ContentTab);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-700 py-10 px-12",
      isScrolled ? "bg-background/95 backdrop-blur-3xl border-b border-white/5 py-8 shadow-2xl" : "bg-transparent"
    )}>
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          onClick={() => setActiveTab("keramogranit")}
          className="text-4xl font-headline font-bold text-foreground tracking-tighter hover:text-primary transition-all shrink-0 mr-[50px]"
        >
          IRGG
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={cn(
                "text-[11px] font-bold transition-all tracking-[0.2em] uppercase relative py-2",
                activeTab === link.id 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-primary"
              )}
            >
              {link.name}
              {activeTab === link.id && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center shrink-0">
          <Button 
            variant="outline" 
            className="text-[11px] font-bold text-white border-white hover:bg-white/10 uppercase tracking-[0.2em] rounded-none px-8 h-14 ml-[50px] bg-transparent"
          >
            <User className="mr-2 h-4 w-4" /> Войти
          </Button>
          <Button className="rounded-none bg-primary hover:bg-primary/90 px-8 h-14 font-bold text-[10px] uppercase tracking-[0.3em] text-white ml-6">
            Регистрация
          </Button>
        </div>

        <button 
          className="xl:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 w-full h-screen bg-background/98 backdrop-blur-3xl xl:hidden animate-in fade-in slide-in-from-top-4 z-[100] overflow-y-auto">
          <div className="flex justify-end p-8">
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col p-12 space-y-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "text-3xl font-bold py-6 border-b border-white/5 text-left uppercase tracking-tighter",
                  activeTab === link.id ? "text-primary" : "text-foreground"
                )}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
