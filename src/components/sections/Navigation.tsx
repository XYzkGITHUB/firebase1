"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentTab } from "@/app/page";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { LuxuryLoader } from "@/components/ui/luxury-loader";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  activeTab: ContentTab;
  setActiveTab: (tab: ContentTab) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
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

  const navLinks = [
    { name: "Керамогранит", id: "keramogranit" as const },
    { name: "Ламинат и SPS", id: "laminate_sps" as const },
    { name: "Сантехника", id: "sanitary" },
    { name: "Таможня", id: "delivery" as const },
    { name: "О нас", id: "contacts" as const },
  ];

  const handleNavClick = (id: string) => {
    if (id === "keramogranit" || id === "laminate_sps" || id === "delivery" || id === "contacts") {
      setActiveTab(id as ContentTab);
    }
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
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 px-6 lg:py-8 lg:px-12",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("keramogranit");
              router.push("/");
            }}
            className="text-3xl lg:text-4xl font-headline font-bold text-foreground tracking-tighter hover:text-primary transition-all shrink-0 mr-[50px]"
          >
            RION
          </Link>

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
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center shrink-0">
            {user && !user.isAnonymous ? (
               <div className="flex items-center gap-6">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {user.email}
                  </span>
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost" 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] rounded-none px-4 h-14 ml-[20px]"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Выйти
                  </Button>
               </div>
            ) : (
              <>
                <Button 
                  onClick={() => handleAuthNavigation("/login")}
                  variant="outline" 
                  className="text-[11px] font-bold border-foreground/20 hover:bg-foreground/5 uppercase tracking-[0.2em] rounded-none px-8 h-14 ml-[50px]"
                >
                  <User className="mr-2 h-4 w-4" /> Войти
                </Button>
                <Button 
                  onClick={() => handleAuthNavigation("/register")}
                  className="rounded-none bg-primary hover:bg-primary/90 px-8 h-14 font-bold text-[11px] uppercase tracking-[0.3em] text-white ml-6"
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>

          <button 
            className="xl:hidden text-foreground p-2 relative z-[120]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 w-full h-[100dvh] bg-background xl:hidden z-[110] overflow-y-auto"
            >
              <div className="flex justify-end p-8">
                <button onClick={() => setIsMobileMenuOpen(false)} className="opacity-0 pointer-events-none">
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col p-12 space-y-6">
                {navLinks.map((link) => (
                  <button 
                    key={link.id} 
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      "text-2xl font-bold py-6 border-b border-border text-left uppercase tracking-tighter",
                      activeTab === link.id ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-8 flex flex-col gap-4">
                  {user && !user.isAnonymous ? (
                    <>
                      <div className="text-center py-4 text-muted-foreground text-xs uppercase tracking-widest">{user.email}</div>
                      <Button onClick={handleSignOut} variant="outline" className="h-16 rounded-none border-foreground text-foreground uppercase tracking-widest text-xs">Выйти</Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => handleAuthNavigation("/login")}
                        variant="outline" 
                        className="w-full h-16 rounded-none border-foreground/20 text-foreground uppercase tracking-widest text-xs"
                      >
                        Войти
                      </Button>
                      <Button 
                        onClick={() => handleAuthNavigation("/register")}
                        className="w-full h-16 rounded-none bg-primary text-white uppercase tracking-widest text-xs"
                      >
                        Регистрация
                      </Button>
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