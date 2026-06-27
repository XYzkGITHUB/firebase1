
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown, Package, Truck, Info, Grid3X3, Layers, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentTab } from "@/app/page";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { LuxuryLoader } from "@/components/ui/luxury-loader";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  activeTab: ContentTab;
  setActiveTab: (tab: ContentTab) => void;
  isStoreOpen: boolean;
  setIsStoreOpen: (open: boolean) => void;
}

export function Navigation({ activeTab, setActiveTab, isStoreOpen, setIsStoreOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (id: ContentTab) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsStoreOpen(false);
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const handleAuthNavigation = (path: string) => {
    setIsNavigating(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <LuxuryLoader isVisible={isNavigating} />
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-6 lg:py-6 lg:px-12",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto grid grid-cols-3 items-center">
          
          {/* LEFT: Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick("main")}
              className={cn(
                "text-[10px] font-bold transition-all tracking-[0.3em] uppercase py-2",
                activeTab === "main" ? "text-primary" : "text-foreground/60 hover:text-primary"
              )}
            >
              Главная
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "text-[10px] font-bold transition-all tracking-[0.3em] uppercase py-2 flex items-center gap-2 outline-none",
                  activeTab !== "main" && activeTab !== "contacts" ? "text-primary" : "text-foreground/60 hover:text-primary"
                )}>
                  Информация <ChevronDown size={12} className="opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background/95 backdrop-blur-xl border-border min-w-[220px] p-2 rounded-none mt-2">
                <DropdownMenuItem onClick={() => handleNavClick("keramogranit")} className="flex items-center gap-3 py-3 px-4 cursor-pointer focus:bg-primary/5 rounded-none">
                  <Grid3X3 size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Керамогранит</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("laminate_sps")} className="flex items-center gap-3 py-3 px-4 cursor-pointer focus:bg-primary/5 rounded-none">
                  <Layers size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ламинат и SPS</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("sanitary")} className="flex items-center gap-3 py-3 px-4 cursor-pointer focus:bg-primary/5 rounded-none">
                  <Bath size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Сантехника</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("delivery")} className="flex items-center gap-3 py-3 px-4 cursor-pointer focus:bg-primary/5 rounded-none">
                  <Truck size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Таможня</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("contacts")} className="flex items-center gap-3 py-3 px-4 cursor-pointer focus:bg-primary/5 rounded-none">
                  <Info size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">О нас</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              onClick={() => setIsStoreOpen(true)}
              className="text-[10px] font-bold transition-all tracking-[0.3em] uppercase py-2 text-foreground/60 hover:text-primary"
            >
              Каталог
            </button>
          </div>

          {/* MIDDLE: RION Logo */}
          <div className="flex justify-center">
            <Link 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("main");
              }}
              className="text-2xl lg:text-3xl font-headline font-bold text-foreground tracking-tighter hover:text-primary transition-all"
            >
              RION
            </Link>
          </div>

          {/* RIGHT: Auth Buttons */}
          <div className="hidden lg:flex items-center justify-end gap-6">
            {user && !user.isAnonymous ? (
               <div className="flex items-center gap-6">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold opacity-60">
                    {user.email}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="text-[9px] font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} /> Выйти
                  </button>
               </div>
            ) : (
              <>
                <button 
                  onClick={() => handleAuthNavigation("/login")}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2"
                >
                  <User size={14} /> Войти
                </button>
                <button 
                  onClick={() => handleAuthNavigation("/register")}
                  className="bg-primary text-white px-6 py-3 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-xl"
                >
                  Регистрация
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex justify-end">
            <button 
              className="text-foreground p-2 relative z-[120]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 w-full h-[100dvh] bg-background lg:hidden z-[110] overflow-y-auto pt-24"
            >
              <div className="flex flex-col p-8 space-y-4">
                <button onClick={() => handleNavClick("main")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">Главная</button>
                <button onClick={() => handleNavClick("keramogranit")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">Керамогранит</button>
                <button onClick={() => handleNavClick("laminate_sps")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">Ламинат</button>
                <button onClick={() => handleNavClick("sanitary")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">Сантехника</button>
                <button onClick={() => handleNavClick("delivery")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">Таможня</button>
                <button onClick={() => handleNavClick("contacts")} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter">О нас</button>
                <button onClick={() => { setIsStoreOpen(true); setIsMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-border text-left uppercase tracking-tighter text-primary">Магазин</button>
                
                <div className="pt-8 flex flex-col gap-4">
                  {user && !user.isAnonymous ? (
                    <Button onClick={handleSignOut} variant="outline" className="h-14 rounded-none">Выйти</Button>
                  ) : (
                    <>
                      <Button onClick={() => handleAuthNavigation("/login")} variant="outline" className="h-14 rounded-none">Войти</Button>
                      <Button onClick={() => handleAuthNavigation("/register")} className="h-14 rounded-none bg-primary text-white">Регистрация</Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
