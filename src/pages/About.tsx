import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Leaf, Sparkles, Heart } from "lucide-react";
import { useEffect } from "react";
import bilde from "@/assets/omoss.jpeg";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 py-8 overflow-hidden max-w-full">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-2">
                {/* Animated heading with letters appearing one by one */}
                <h1 className="text-4xl md:text-5xl font-serif font-bold inline-flex flex-wrap justify-center text-[#eecfa1]">
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
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Oppskriftene våre er inspirert av familiemiddager og smaker vi vokste opp med. Nå vil vi dele dem med deg. 
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <ScrollReveal delay={200} direction="left">
                <div className="rounded-sm overflow-hidden group border border-white/5 relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10" />
                  <motion.img 
                    src={bilde} 
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
                <div className="relative pl-0 lg:pl-8">
                  <motion.h2 
                    className="text-3xl font-serif font-medium mb-6 relative inline-block text-[#eecfa1]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span>Vår historie</span>
                    <motion.span 
                      className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#eecfa1]/50"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </motion.h2>
                  <motion.div className="space-y-6 text-muted-foreground font-light leading-7">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                    33 Street Food ble født av en drøm om å dele ekte matglede, og vi er her for å skape smaksopplevelser som forener mennesker i hjertet av Sarpsborg.
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      Vår filosofi er enkel: bruk de ferskeste sesongbaserte råvarene, tilbered dem med omhu og server dem med kjærlighet. Vi tror at å spise ikke bare handler om mat, men om å skape minneverdige opplevelser som bringer folk sammen.
                    </motion.p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="my-20 flex justify-center opacity-30">
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-[#eecfa1] to-transparent"
                style={{ width: "100%" }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            
            <ScrollReveal delay={200} className="mt-8">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-3xl font-serif font-medium inline-block text-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  Våre verdier
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground mt-4 max-w-2xl mx-auto font-light"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Prinsippene som styrer restauranten vår og definerer vår forpliktelse til kvalitet.
                </motion.p>
              </div>

              {/* REFACTORED VALUES SECTION - GOLDEN TOUCH */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    title: "Kvalitet",
                    description: "Vi håndplukker de beste ingrediensene for å sikre enestående smaksopplevelser.",
                    icon: <Leaf strokeWidth={1.5} className="h-8 w-8 text-[#eecfa1]" />,
                  },
                  {
                    title: "Kreativitet",
                    description: "Vi innoverer kontinuerlig samtidig som vi respekterer kulinariske tradisjoner.",
                    icon: <Sparkles strokeWidth={1.5} className="h-8 w-8 text-[#eecfa1]" />,
                  },
                  {
                    title: "Samfunn",
                    description: "Vi streber etter å skape et innbydende sted for alle våre gjester.",
                    icon: <Heart strokeWidth={1.5} className="h-8 w-8 text-[#eecfa1]" />,
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-500 hover:bg-white/[0.02]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {/* Floating Icon with Gold Glow Effect */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[#eecfa1] blur-2xl opacity-20 rounded-full"></div>
                        <div className="relative p-4 border border-[#eecfa1]/20 rounded-full">
                            {value.icon}
                        </div>
                    </div>

                    <h3 className="text-2xl font-serif font-medium mb-3 text-[#eecfa1]">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
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