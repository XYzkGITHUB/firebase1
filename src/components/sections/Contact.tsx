
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContentTab } from "@/app/page";
import SplitText from "@/components/ui/split-text";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

interface ContactProps {
  activeTab: ContentTab;
}

/**
 * Contact form component for RION.
 * Handles feedback, bug reports, and general inquiries in Russian.
 */
export function Contact({ activeTab }: ContactProps) {
  const db = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const getTitle = () => {
    return "Не нашли то, что искали? Хотите оставить отзыв или нашли ошибку?";
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    const leadData = {
      name: formData.name,
      phone: formData.phone,
      description: formData.message,
      section: activeTab,
      type: "feedback_or_bug",
      createdAt: serverTimestamp(),
    };

    const leadsRef = collection(db, "leads");
    addDoc(leadsRef, leadData)
      .then(() => {
        toast({ title: "Отправлено", description: "Спасибо за ваш отзыв!" });
        setFormData({ name: "", phone: "", message: "" });
        setIsSubmitting(false);
      })
      .catch((error: any) => {
        const permissionError = new FirestorePermissionError({
          path: leadsRef.path,
          operation: "create",
          requestResourceData: leadData,
        });
        errorEmitter.emit("permission-error", permissionError);
        setIsSubmitting(false);
      });
  };

  return (
    <section className="py-24 md:py-32 px-4 sm:px-8 bg-card/5 overflow-hidden" id="contact-form">
      <div className="max-w-[1600px] mx-auto">
        <Separator className="bg-border/20 mb-16 md:mb-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-6 md:space-y-10 lg:sticky lg:top-32">
            <SplitText
              text={getTitle()}
              tag="h2"
              className="text-3xl md:text-4xl font-headline uppercase tracking-tighter leading-tight"
              textAlign="left"
            />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-xl">
              Мы ценим ваш опыт. Сообщите нам, если вы столкнулись с ошибкой, у вас есть предложение или вы не нашли нужный материал.
            </p>
            <div className="space-y-4 pt-6 md:pt-10">
               <div className="text-2xl md:text-3xl font-headline font-bold text-primary tracking-tighter">+7 989 919 95 41</div>
               <div className="text-lg text-muted-foreground font-light uppercase tracking-widest">irggimport@bk.ru</div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-16 border border-foreground/10 bg-card/30 backdrop-blur-3xl shadow-xl w-full">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Ваше имя</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ваше имя" 
                  className="h-14 bg-background/50 border-foreground/10 rounded-none text-base px-6 focus:ring-primary focus:border-primary" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Контактный телефон</label>
                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (___) ___-__-__" 
                  className="h-14 bg-background/50 border-foreground/10 rounded-none text-base px-6 focus:ring-primary focus:border-primary" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Сообщение или отчет об ошибке</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Опишите вашу проблему или предложение..." 
                  className="min-h-[120px] bg-background/50 border-foreground/10 rounded-none text-base p-6 focus:ring-primary focus:border-primary" 
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.4em] group rounded-none shadow-2xl"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Отправить отзыв"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
