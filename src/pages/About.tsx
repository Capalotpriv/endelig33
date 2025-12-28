import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Leaf, Sparkles, Heart } from "lucide-react";
import { useEffect } from "react";

export default function About() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 py-8 overflow-hidden max-w-full">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-2">
                {/* Animated heading with letters appearing one by one */}
                <h1 className="text-4xl md:text-5xl font-serif font-bold inline-flex flex-wrap justify-center">
                  {Array.from("Om oss").map((letter, i) => (
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
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Oppskriftene våre er inspirert av familiemiddager og smaker vi vokste opp med. Nå vil vi dele dem med deg. 
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <ScrollReveal delay={200} direction="left">
                <div className="rounded-lg overflow-hidden group">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e" 
                    alt="Restaurant interior" 
                    className="w-full h-auto object-cover aspect-[4/3] transition-all duration-700"
                    whileHover={{ scale: 1.05 }}
                    initial={{ filter: "grayscale(20%)" }}
                    whileInView={{ filter: "grayscale(0%)" }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={400} direction="right">
                <div className="relative">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant="white"
                  />
                  <motion.h2 
                    className="text-3xl font-serif font-medium mb-4 relative inline-block"
                    whileHover={{ scale: 1.02 }}
                  >
                  <span>Vår historie</span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 bg-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                33 Street Food ble født av en drøm om å dele ekte matglede, og vi er her for å skape smaksopplevelser som forener mennesker i hjertet av Sarpsborg.
                </motion.p>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Vår filosofi er enkel: bruk de ferskeste sesongbaserte råvarene, tilbered dem med omhu og server dem med kjærlighet. Vi tror at å spise ikke bare handler om mat, men om å skape minneverdige opplevelser som bringer folk sammen.
                </motion.p>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="my-16 flex justify-center">
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
                style={{ width: "100%" }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            
           
            
            
            
            <ScrollReveal delay={600} className="mt-16">
              <div className="text-center mb-12 relative">
                <GlowingEffect
                  spread={50}
                  glow={true}
                  disabled={false}
                  proximity={120}
                  inactiveZone={0.01}
                  borderWidth={3}
                  variant="default"
                />
                <motion.h2 
                  className="text-3xl font-serif font-medium inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
                >
                  Våre verdier
                  <motion.div
                    className="w-full h-1 bg-primary/70 mt-2 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground mt-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Prinsippene som styrer restauranten vår og definerer vår forpliktelse til kvalitet.
                </motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Kvalitet",
                    description: "Vi håndplukker de beste ingrediensene for å sikre enestående smaksopplevelser.",
                    icon: <Leaf className="h-6 w-6" />,
                    color: "bg-green-100 dark:bg-green-900/20"
                  },
                  {
                    title: "Kreativitet",
                    description: "Vi innoverer kontinuerlig samtidig som vi respekterer kulinariske tradisjoner.",
                    icon: <Sparkles className="h-6 w-6" />,
                    color: "bg-purple-100 dark:bg-purple-900/20"
                  },
                  {
                    title: "Sammfunn",
                    description: "Vi streber etter å skape et innbydende sted for alle våre gjester.",
                    icon: <Heart className="h-6 w-6" />,
                    color: "bg-blue-100 dark:bg-blue-900/20"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={3}
                      />
                      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                        <div className="relative flex flex-1 flex-col justify-between gap-3">
                          <div className={`w-fit rounded-lg border-[0.75px] border-border ${value.color} p-4`}>
                            {value.icon}
                          </div>
                          <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                              {value.title}
                            </h3>
                            <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
