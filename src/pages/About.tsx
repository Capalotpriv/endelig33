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
                  {Array.from("About Us").map((letter, i) => (
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
                Our journey from a small family kitchen to an award-winning restaurant
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
                  <span>Our Story</span>
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
                  Founded in 2010, Gusto began as a humble family-owned establishment with a dream to share our passion for culinary excellence with the world. What started as a small café has now evolved into one of the most celebrated dining destinations in the city.
                </motion.p>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Our philosophy is simple: use the freshest seasonal ingredients, prepare them with care, and serve them with love. We believe that dining is not just about food, but about creating memorable experiences that bring people together.
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
            
            <ScrollReveal>
              <div className="text-center mb-12 relative">
                <GlowingEffect
                  spread={45}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.01}
                  borderWidth={2.5}
                  variant="default"
                />
                <motion.h2 
                  className="text-3xl font-serif font-medium inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  whileHover={{ scale: 1.05, color: "hsl(var(--secondary))" }}
                >
                  Meet Our Chef
                  <motion.div
                    className="w-full h-1 bg-primary/70 mt-2 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.h2>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal delay={200} direction="left" className="order-2 lg:order-1">
                <h3 className="text-2xl font-serif font-medium mb-4">Chef Alessandro Romano</h3>
                <p className="text-muted-foreground mb-4">
                  With over 20 years of culinary experience across Europe and America, Chef Alessandro brings his unique vision and expertise to every dish served at Gusto. He trained at the prestigious Culinary Institute of Milan and has worked in Michelin-starred restaurants around the world.
                </p>
                <motion.div
                  className="relative mt-6 mb-6 p-6 bg-primary/5 rounded-lg border border-primary/10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="absolute -top-3 -left-3 text-4xl text-primary opacity-50">"</div>
                  <div className="absolute -bottom-3 -right-3 text-4xl text-primary opacity-50">"</div>
                  <p className="italic text-muted-foreground relative z-10">
                    Cooking is an art that engages all the senses. My goal is to create dishes that not only taste extraordinary but also tell a story and evoke emotions.
                  </p>
                  <p className="text-right mt-2 text-sm font-medium">— Chef Alessandro</p>
                </motion.div>
              </ScrollReveal>
              
              <ScrollReveal delay={400} direction="right" className="order-1 lg:order-2">
                <div className="rounded-lg overflow-hidden relative">
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={100}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.img 
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c" 
                    alt="Chef Alessandro" 
                    className="w-full h-auto object-cover aspect-[3/4]"
                    initial={{ y: 0 }}
                    whileInView={{ 
                      y: [0, -15, 0], 
                      transition: { 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 6,
                        ease: "easeInOut" 
                      } 
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center transform translate-y-full"
                    whileHover={{ translateY: 0 }}
                    initial={{ translateY: "100%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-medium text-sm">Chef Alessandro Romano</p>
                    <p className="text-xs text-white/80">Executive Chef & Founder</p>
                  </motion.div>
                </div>
              </ScrollReveal>
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
                  Our Values
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
                  The principles that guide our restaurant and define our commitment to excellence.
                </motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Quality",
                    description: "We source only the finest ingredients from local farmers and suppliers.",
                    icon: <Leaf className="h-6 w-6" />,
                    color: "bg-green-100 dark:bg-green-900/20"
                  },
                  {
                    title: "Creativity",
                    description: "We constantly innovate while respecting culinary traditions.",
                    icon: <Sparkles className="h-6 w-6" />,
                    color: "bg-purple-100 dark:bg-purple-900/20"
                  },
                  {
                    title: "Community",
                    description: "We strive to create a welcoming space for all our guests.",
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
            
            {/* Glowing Effect Demo Section */}
            <div className="mt-24 mb-16">
              <ScrollReveal>
                <div className="text-center mb-12 relative">
                  <GlowingEffect
                    spread={55}
                    glow={true}
                    disabled={false}
                    proximity={110}
                    inactiveZone={0.01}
                    borderWidth={3}
                    variant="default"
                  />
                  <motion.h2 
                    className="text-3xl font-serif font-medium inline-block"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ scale: 1.05, color: "hsl(var(--accent))" }}
                  >
                    Our Achievements
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
                    Explore our journey of excellence and the milestones we've achieved along the way.
                  </motion.p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <GlowingEffectDemo />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
