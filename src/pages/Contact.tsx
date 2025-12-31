import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useMediaQuery } from "@/hooks/use-media-query";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Form field animation variants
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };
  
  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden max-w-full">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 overflow-hidden max-w-full">
          
          <ScrollReveal>
            <div className="text-center mb-2">
              {/* Animated heading with letters appearing one by one */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold inline-flex flex-wrap justify-center">
                {Array.from("Kontakt oss").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className={letter === " " ? "mr-3" : ""}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>
            <motion.p 
              className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Kontakt oss for reservasjoner, spørsmål eller tilbakemelding
            </motion.p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal delay={200} direction="left">
              <motion.div 
                className="bg-card rounded-lg p-6 border border-border relative overflow-hidden"
                whileHover={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <GlowingEffect disabled={isMobile} className="absolute inset-0" />
                <h2 className="text-2xl font-serif font-medium mb-6 relative">
                  <span className="relative inline-block">
                    Send oss en melding
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    />
                  </span>
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
                    <Input
                      placeholder="Navn"
                      {...register("name", { required: "Navn er påkrevd" })}
                      className="w-full transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
                    <Input
                      type="email"
                      placeholder="E-postadresse"
                      {...register("email", { 
                        required: "E-postadresse er påkrevd",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Ugyldig e-postadresse"
                        }
                      })}
                      className="w-full transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
                    <Input
                      placeholder="Telefonnummer"
                      {...register("phone")}
                      className="w-full transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                  </motion.div>
                  
                  <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
                    <Textarea
                      placeholder="Melding"
                      {...register("message", { required: "Melding er påkrevd" })}
                      className="w-full min-h-[150px] transition-all duration-300 hover:border-primary focus:border-primary"
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    custom={4} 
                    variants={formFieldVariants} 
                    initial="hidden" 
                    animate="visible"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full relative overflow-hidden group"
                    >
                      <span className="relative z-10">Send melding</span>
                      <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal delay={400} direction="right">
              <motion.div 
                className="bg-card rounded-lg p-6 border border-border mb-8 relative overflow-hidden"
                whileHover={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <GlowingEffect disabled={isMobile} className="absolute inset-0" />
                <h2 className="text-2xl font-serif font-medium mb-6 relative">
                  <span className="relative inline-block">
                    Kontaktinformasjon
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    />
                  </span>
                </h2>
                
                <div className="space-y-4">
                  {[
                    { icon: <MapPin className="w-5 h-5 text-primary" />, title: "Adresse", content: "Kirkegata 54, 1712 Sarpsborg" },
                    { icon: <Phone className="w-5 h-5 text-primary" />, title: "Telefon", content: "(+47) 973 30 333" },
                    { icon: <Mail className="w-5 h-5 text-primary" />, title: "E-post", content: "contact@33streetfood.com" },
                    { icon: <Clock className="w-5 h-5 text-primary" />, title: "Åpningstider", content: ["Man–Tir: 12–22", "Ons: 12–22", "Tor: 11–22", "Fre: 10–22", "Lør: 12–22", "Søn: 10–22"] }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {Array.isArray(item.content) ? (
                          item.content.map((line, i) => (
                            <p key={i} className="text-muted-foreground">{line}</p>
                          ))
                        ) : (
                          <p className="text-muted-foreground">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="rounded-lg overflow-hidden h-80 border border-border relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.1234567890123!2d11.107460316326123!3d59.28348508165432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464172b3cf17fdf1%3A0x52a77503da13bd9c!2sKirkegata%2054%2C%201712%20Sarpsborg%2C%20Norway!5e0!3m2!1sno!2sno!4v1698765432109!5m2!1sno!2sno" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={600} className="mt-16">
            <motion.div 
              className="p-8 bg-muted/50 rounded-lg text-center relative overflow-hidden"
              whileHover={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <GlowingEffect disabled={isMobile} className="absolute inset-0" spread={40} />
              <h3 className="text-2xl font-serif font-medium mb-4 relative inline-block">
                Reserver et bord
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For reservasjoner, vennligst ring oss direkte eller bruk vår online booking system.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" className="rounded-full relative overflow-hidden group">
                  <span className="relative z-10">Reserver et bord</span>
                  <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
