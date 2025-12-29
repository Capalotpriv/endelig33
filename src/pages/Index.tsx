import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CustomerReviews from "@/components/CustomerReviews";
import { ChevronRight, Utensils, Award, Clock, ChefHat  } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRef, useState } from "react";
import DishDetailsModal from "@/components/DishDetailsModal";
import ResponsiveImage from "@/components/ResponsiveImage";
import Video from "@/assets/video/33Video.mp4";
import Pasta from "@/assets/nypastaaa.jpeg";
import Nypasta from "@/assets/nyerepasta.png";
import Fine from "@/assets/image0.jpeg";
import NyVideo from "@/assets/video/nyTT.mp4";
import lol from "@/assets/video/Lol.mp4";
import olo from "@/assets/video/Lol (1).mp4";
import mimi from "@/assets/video/nowat";
import hovedbilde from "@/assets/unnamed2.jpg";
import nyttVideo from "@/assets/video/33Video.mp4";



export default function Index() {
  const features = [
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Eksklusiv matkunst",
      description: "Våre kokker forener tradisjon og nytenkning for å gi deg en uforglemmelig matopplevelse.",
    },
    {
      icon: <ChefHat  className="h-6 w-6" />,
      title: "Unike smaksopplevelser",
      description: "Hos oss møter råvarer av høy kvalitet kreativt håndverk, hver rett er laget for å imponere.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Førsteklasses service",
      description: "Vårt dedikerte team sikrer en elegant og problemfri opplevelse fra ankomst til avreise.",
    },
  ];



  const popularDishes = [
    {
      name: "Every day sandwich",
      description: "Nybakt brød, stekt til perfeksjon hver morgen. Fylte lag av kvalitetsråvarer, balansert med våre signatur sauser. Inspirasjonen er hentet fra hjertet av Napoli, men smaker finner du kun hos oss.",
      image: Fine,
      price: "135 kr",
      allergens: ["Hvete", "Melk", "Egg"],
      preparationTime: "15 minutter",
      
      dietaryInfo: []
    }, 
    {
      name: "Autentisk Pasta",
      description: "Vår tagliatelle kommer i varianter: Pesto med kyllingfillet, Trøffel med indrefilet, Carbonara med bacon",
      image: Nypasta,
      price: "160kr",
      allergens: ["Hvete", "Melk"],
      preparationTime: "15 minutter",
      
      dietaryInfo: []
    },
    {
      name: "Nutella-Calzone",
      description: "Nybakt brød med nutellafyll.",
      image: new URL('../assets/nynutella.jpeg', import.meta.url).href,
      price: "98 kr",
      allergens: ["Hvete", "Melk", "Selleri"],
      preparationTime: "10 minutter",
      
    },
  ];

  const featuresRef = useRef<HTMLElement>(null);
  const [selectedDish, setSelectedDish] = useState<typeof popularDishes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the screen is mobile-sized
  const isMobile = useMediaQuery("(max-width: 640px)");

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openDishDetails = (dish: typeof popularDishes[0]) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeDishDetails = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden max-w-full">
        <div className="absolute inset-0 z-0">
        <video src={mimi} autoPlay loop muted playsInline style={{zIndex: 1}} className="w-full h-full object-cover"></video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>  
        </div>
        
        <div className="container relative z-10 mt-16 sm:mt-20 px-4 text-center text-white">
          <ScrollReveal delay={200}>
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full text-white mb-3 sm:mb-4">
              Eksklusiv mat og intense smaksopplevelser
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif mb-4 sm:mb-6 leading-tight">
            Mesterlig <span className="text-primary">Mat</span>
              <br /> 
              Nytenkt
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Utforsk autentiske smaker og enestående smaksopplevelser
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={800}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/meny" className="w-full sm:w-auto">
                <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  Se menyen
                </Button>
              </Link>
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button variant="outline" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  Reserver et bord
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
        
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
            onClick={scrollToFeatures}
            aria-label="Scroll to features"
          >
            <ChevronRight size={isMobile ? 16 : 20} className="text-white rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-12 sm:py-16 md:py-24 w-full overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full text-primary mb-3 sm:mb-4">
                Vår opplevelse
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Fremhevende mat og enestående smaksopplevelser
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-muted-foreground">
                Vi er dedikert til å skape minneverdige opplevelser gjennom ekstraordinær mat, drikke og service. Vår tilnærming balanserer tradisjon med innovasjon, noe som resulterer i en måltid som gløder alle smaker.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <ScrollReveal 
                key={index} 
                delay={index * 100 + 400}
                direction="up"
              >
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8 text-center hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 sm:mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Dishes Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted w-full overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full text-primary mb-3 sm:mb-4">
                Våre beste
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Våre mest populære retter
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-muted-foreground">
                Disse signatureretter representerer vår kulinarisk filosofi og har blitt favoritter blant våre gjester. Hver plate er laget med nøyaktighet og omsorg, ved hjelp av bare de fineste sesongingredienser.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {popularDishes.map((dish, index) => (
              <ScrollReveal key={index} delay={index * 100 + 400}>
                <div 
                  className="group overflow-hidden rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer"
                  onClick={() => openDishDetails(dish)}
                >
                  <div className="zoom-out-image">
                    <ResponsiveImage 
                      src={typeof dish.image === 'string' ? dish.image : ''}
                      alt={dish.name}
                      className="w-full h-full"
                      objectFit="cover"
                      priority={index < 2}
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-serif font-medium mb-1 sm:mb-2">{dish.name}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{dish.description}</p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                      <span className="text-xs sm:text-sm font-medium text-primary"></span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <ScrollReveal delay={700}>
              <Link to="/meny" className="w-full sm:w-auto inline-block">
                <Button className="rounded-full px-6 sm:px-8 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  Utforsk hele menyen
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
          
        
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
        <video src={nyttVideo} autoPlay loop muted playsInline style={{zIndex: 1}} className="w-full h-full object-cover"></video>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full text-white mb-3 sm:mb-4">
                Bli med oss
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Reserver et bord i dag
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8">
                Utforsk ekstraordinære smaker og atmosfære på 33 Street Food. Uansett om det er en spesiell tilnærming eller en enkel måltid, vi ser frem til å servere deg.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/kontakt" className="w-full sm:w-auto">
                  <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                    Reserver et bord
                  </Button>
                </Link>
                <Link to="/meny" className="w-full sm:w-auto">
                  <Button variant="outline" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                    Se menyen
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Dish Details Modal */}
      {selectedDish && (
        <DishDetailsModal 
          dish={selectedDish} 
          isOpen={isModalOpen} 
          onClose={closeDishDetails} 
        />
      )}
    </>
  );
}