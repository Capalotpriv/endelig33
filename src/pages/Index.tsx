import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CustomerReviews from "@/components/CustomerReviews";
import { ChevronRight, Utensils, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRef, useState } from "react";
import DishDetailsModal from "@/components/DishDetailsModal";

export default function Index() {
  const features = [
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Exquisite Cuisine",
      description: "Our chefs blend traditional techniques with modern innovation to create unforgettable flavors.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Award Winning",
      description: "Recognized for culinary excellence with multiple industry awards and distinctions.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Impeccable Service",
      description: "Our attentive staff ensures a seamless dining experience from beginning to end.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "April 15, 2023",
      content: "The tasting menu was exceptional. Each course was thoughtfully prepared with beautiful presentation and incredible flavors. The sommelier's wine pairings were perfect. Can't wait to return!",
    },
    {
      name: "Michael Chen",
      rating: 5,
      date: "March 22, 2023",
      content: "Our anniversary dinner exceeded all expectations. The service was attentive without being intrusive, and the chef's special dessert surprise made our celebration truly memorable.",
    },
    {
      name: "Emma Rodriguez",
      rating: 4,
      date: "May 2, 2023",
      content: "The ambiance is elegant yet comfortable. I particularly enjoyed the seasonal fish dish and the craft cocktail selection. A wonderful spot for special occasions.",
    },
  ];

  const popularDishes = [
    {
      name: "Truffle Risotto",
      description: "Creamy arborio rice, wild mushrooms, black truffle shavings, aged parmesan",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      price: "$28",
      ingredients: ["Arborio rice", "Wild mushrooms", "Black truffle", "Aged parmesan", "White wine", "Vegetable stock", "Shallots", "Butter"],
      allergens: ["Dairy", "Gluten"],
      preparationTime: "25 minutes",
      calories: "520 kcal",
      dietaryInfo: ["Vegetarian"]
    },
    {
      name: "Pan-Seared Scallops",
      description: "Cauliflower puree, bacon jam, micro herbs, citrus reduction",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      price: "$32",
      ingredients: ["Fresh scallops", "Cauliflower", "Bacon", "Micro herbs", "Citrus", "Butter", "Cream"],
      allergens: ["Shellfish", "Dairy"],
      preparationTime: "20 minutes",
      calories: "380 kcal",
      dietaryInfo: []
    },
    {
      name: "Chocolate Soufflé",
      description: "Warm dark chocolate, vanilla bean ice cream, berry compote",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      price: "$14",
      ingredients: ["Dark chocolate", "Eggs", "Sugar", "Butter", "Vanilla bean", "Berries", "Cream"],
      allergens: ["Eggs", "Dairy"],
      preparationTime: "18 minutes",
      calories: "420 kcal",
      dietaryInfo: ["Vegetarian"]
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
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant interior"
            className="w-full h-full object-cover max-w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container relative z-10 mt-16 sm:mt-20 px-4 text-center text-white">
          <ScrollReveal delay={200}>
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full text-white mb-3 sm:mb-4">
              Fine Dining Experience
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif mb-4 sm:mb-6 leading-tight">
              Culinary <span className="text-primary">Excellence</span>
              <br /> 
              Reimagined
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Experience the extraordinary at Vusto, where tradition meets innovation. Each dish tells a story of passion, creativity, and the finest ingredients.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={800}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/menu" className="w-full sm:w-auto">
                <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  View Our Menu
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  Make a Reservation
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
                The Vusto Experience
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Elevating Dining to an Art Form
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-muted-foreground">
                At Vusto, we're committed to creating memorable experiences through exceptional food, drink, and service. Our approach balances tradition with innovation, resulting in a dining experience that delights all the senses.
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
                Chef's Selection
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Our Most Popular Creations
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-muted-foreground">
                These signature dishes exemplify our culinary philosophy and have become favorites among our guests. Each plate is crafted with precision and care, using only the finest seasonal ingredients.
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
                  <div className="h-56 sm:h-64 md:h-72 overflow-hidden">
                    <img 
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 max-w-full"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-serif font-medium mb-1 sm:mb-2">{dish.name}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{dish.description}</p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                      <span className="text-xs sm:text-sm font-medium text-primary">Chef's Signature Dish</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <ScrollReveal delay={700}>
              <Link to="/menu" className="w-full sm:w-auto inline-block">
                <Button className="rounded-full px-6 sm:px-8 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                  Explore Full Menu
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* About Preview Section */}
      <section className="py-12 sm:py-16 md:py-24 w-full overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
                    alt="Chef preparing food"
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover max-w-full"
                  />
                </div>
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-card p-4 sm:p-6 rounded-lg shadow-lg border border-border max-w-[250px] sm:max-w-xs">
                  <p className="text-muted-foreground italic text-xs sm:text-sm">
                    "We're dedicated to creating unforgettable dining experiences through craftsmanship, quality ingredients, and genuine hospitality."
                  </p>
                  <p className="mt-3 sm:mt-4 font-medium text-sm sm:text-base">Chef Antonio Rossi</p>
                  <p className="text-xs text-muted-foreground">Executive Chef</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="lg:pl-8">
                <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full text-primary mb-3 sm:mb-4">
                  Our Story
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                  Passion for Culinary Excellence
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Founded in 2010, Vusto was born from Chef Antonio Rossi's vision to create a restaurant where classic techniques meet contemporary innovation. With over 20 years of experience in Michelin-starred restaurants across Europe, Chef Rossi brings unparalleled expertise and creativity to every dish.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                  Our team sources the finest ingredients from local farmers and artisanal producers, ensuring peak flavor and freshness. Each menu item represents our commitment to sustainability, craftsmanship, and exceptional dining experiences.
                </p>
                <Link to="/about" className="w-full sm:w-auto inline-block">
                  <Button variant="outline" className="rounded-full w-full sm:w-auto">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted w-full overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full text-primary mb-3 sm:mb-4">
                Guest Experiences
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                What Our Guests Say
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-muted-foreground">
                Don't just take our word for it. Here's what our valued guests have to say about their dining experiences at Vusto.
              </p>
            </ScrollReveal>
          </div>
          
          <CustomerReviews />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074&auto=format&fit=crop"
            alt="Restaurant interior"
            className="w-full h-full object-cover max-w-full"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full text-white mb-3 sm:mb-4">
                Join Us
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                Reserve Your Table Today
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8">
                Experience the extraordinary flavors and ambiance of Vusto. Whether it's a special celebration or a casual dinner, we look forward to serving you.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                    Make a Reservation
                  </Button>
                </Link>
                <Link to="/menu" className="w-full sm:w-auto">
                  <Button variant="outline" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 w-full sm:w-auto" size={isMobile ? "default" : "lg"}>
                    View Our Menu
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