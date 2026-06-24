"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { useFirestore, useAuth, useUser } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

interface ContactProps {
  activeTab: ContentTab;
}

export function Contact({ activeTab }: ContactProps) {
  const db = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const getTitle = () => {
    if (activeTab === 'keramogranit') return 'Нужен керамогранит?';
    if (activeTab === 'laminate_sps') return 'Нужен ламинат или SPS?';
    return 'Нужна доставка груза?';
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!db || !auth) {
      toast({
        variant: "destructive",
        title: "Ошибка конфигурации",
        description: "Сервисы Firebase инициализируются. Пожалуйста, попробуйте через секунду.",
      });
      return;
    }
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Пожалуйста, укажите ваше имя и номер телефона.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Step 1: Ensure Auth is active (required for security rules usually)
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (authError: any) {
          console.error("Auth error:", authError);
          // We continue anyway, Firestore might allow it if rules are open, 
          // but usually Anonymous Auth is safer.
        }
      }

      // Step 2: Prepare Data
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        description: formData.message,
        section: activeTab,
        createdAt: serverTimestamp(),
      };

      const leadsRef = collection(db, "leads");

      // Step 3: Write to Firestore (Non-blocking)
      addDoc(leadsRef, leadData)
        .then(() => {
          toast({
            title: "Успешно",
            description: "Ваш запрос отправлен! Мы свяжемся с вами в ближайшее время.",
          });
          setFormData({ name: "", phone: "", message: "" });
          setIsSubmitting(false);
        })
        .catch(async (error) => {
          const permissionError = new FirestorePermissionError({
            path: leadsRef.path,
            operation: "create",
            requestResourceData: leadData,
          });
          errorEmitter.emit("permission-error", permissionError);
          setIsSubmitting(false);
        });

    } catch (err: any) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Произошла непредвиденная ошибка. Проверьте интернет-соединение.",
      });
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 sm:px-8 bg-card/5 overflow-hidden" id="contact-form">
      <div className="max-w-[1600px] mx-auto">
        <Separator className="bg-white/5 mb-16 md:mb-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-6 md:space-y-10 lg:sticky lg:top-32">
            <SplitText
              text={getTitle()}
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-headline uppercase tracking-tighter leading-[1] md:leading-[0.9]"
              textAlign="left"
            />
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
              Оставьте заявку, и мы предложим решение для вашего проекта. Расскажем, какие материалы необходимы, и предоставим полный расчет.
            </p>
            <div className="space-y-4 pt-6 md:pt-10">
               <div className="text-2xl md:text-3xl font-headline font-bold text-primary tracking-tighter">+7 989 919 95 41</div>
               <div className="text-lg md:text-xl text-muted-foreground font-light uppercase tracking-widest">irggimport@bk.ru</div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-16 border border-white/5 bg-card/30 backdrop-blur-3xl shadow-2xl w-full">
            <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Ваше имя</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ваше имя" 
                  className="h-14 md:h-16 bg-background/50 border-white/5 rounded-none text-base md:text-lg px-6 focus:ring-primary focus:border-primary" 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Номер телефона</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-center bg-white/5 border border-white/5 h-14 md:h-16 px-6 md:px-8 text-[12px] font-bold uppercase tracking-widest shrink-0">Россия +7</div>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="912 345-67-89" 
                    className="h-14 md:h-16 flex-1 bg-background/50 border-white/5 rounded-none text-base md:text-lg px-6" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Описание запроса</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Тип объекта, объем, предпочтения..." 
                  className="min-h-[150px] md:min-h-[200px] bg-background/50 border-white/5 rounded-none text-base md:text-lg p-6" 
                />
              </div>
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-loose opacity-60">
                Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности.
              </p>
              <Button 
                type="submit"
                disabled={isSubmitting}
                size="lg" 
                className="w-full h-16 md:h-20 bg-primary text-white text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] group rounded-none shadow-2xl transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Отправить запрос
                    <Send className="ml-3 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
