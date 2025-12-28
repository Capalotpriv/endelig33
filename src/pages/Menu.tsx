import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { optimizeImageUrl } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, CreditCard, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ResponsiveImage from "@/components/ResponsiveImage";
import { describe } from "node:test";


// Menu data
const menuItems = [
  {
    id: 1,
    name: "Pepperoni Klassisk",
    description: "Tomatsaus, mozzarella og rikelig med peperoni. (Allergener: 1,2,6)",
    price: 170,
    largePrice: 210,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    category: "pizza"
  },
  {
    id: 2,
    name: "Taco fiesta",
    description: "Tomatsaus, mozzarella, tacokjøtt, Jalapeño, nachochips, mais, løk, salsa og lime. (Allergener: 1,2,6)",
    price: 190,
    largePrice: 230,
    image: new URL('../assets/nytaco.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 3,
    name: "Byens Spesial",
    description: "tomatsaus, mozzarella, skinke, pepperioni, bacon, strimlet biff, løk, tacokjøtt og fersk hvitløk. (Allergener:1,2,6)",
    price: 190,
    largePrice: 270,
    image: new URL('../assets/byens.avif', import.meta.url).href,
    category: "pizza"
  },
  {
      id: 4,
      name: "Trøffeldrom",
      description: "Trøffelbunn, mozzarella, strimlet biff, parmesan, sopp, ruccola, olivenolje og basilikum. (Allergener:1,2,3,6)",
      price: 190,
      largePrice: 270,
      image: new URL('../assets/truffle.jpg', import.meta.url).href,
      category: "pizza"
  },
  {
      id: 5,
      name: "Napoli Green",
      description: "Tomatsaus, mozzarella, fetaost, olivenolje, parmesan, rød paprika, løk, sopp, basilikum og ruccola. (Allergener:1,2,4,6)",
      price: 180,
      largePrice: 260,
      image: new URL('../assets/napoli.webp', import.meta.url).href,
      category: "pizza"
  },
  {
      id: 6,
      name: "Margherita Originale",
      description: "Tomatsaus, mozzarella, basilikum og olivenolje. (Allergener:1,2,6)",
      price: 145,
      largePrice: 215,
      image: new URL('../assets/marg.jpg', import.meta.url).href,
      category: "pizza"
  },
  {
      id: 7,
      name: "Deluxe",
      description: "Trøffelmajones og mozzarella i kanten, hvitløksbunn, sopp, kyllingfilet, pommes frites, husets saus. (Allergener:1,2,3,5,6)",
      price: 229,
      largePrice: 309,
      image: new URL('../assets/owo.webp', import.meta.url).href,
      category: "pizza"
  },
  {
      id: 8,
      name: "Husets Signatur",
      description: "Hvitløksdressing og mozzarella med skinke i kanten, tomatsaus, mozzarella, pepperoni, strimlet biff, tacokjøtt og rødløk. (Allergener:1,2,3,6)",
      price: 239,
      largePrice: 319,
      image: new URL('../assets/hussign.jpg', import.meta.url).href,
      category: "pizza"
  },
  {
      id: 9,
      name: "W.O.W",
      description: "Hvitløkssaus og Mozzarella i kanten, tomatsaus, mozzarella, dønerkjøtt, toppet med pommes frites og husets saus- kjent som CANADA kebabpizza. (Allergener:1,2,3,5,6)",
      price: 229,
      largePrice: 309,
      image: new URL('../assets/wow.jpg', import.meta.url).href,
      category: "pizza"
  },
  {
    id: 10,
    name: "Norden",
    description: "Tomatsaus, Mozzarella, kyllingfilet, indrefilet, fetaost, ruccola, rødløk og rød paprika. (Allergener:1,2,6)",
    price: 190,
    largePrice: 270,
    image: new URL('../assets/norden.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 11,
    name: "Vesuvio",
    description: "Tomatsaus, mozzarella, skinke. (Allergener:1,2,6)",
    price: 160,
    largePrice: 240,
    image: new URL('../assets/vesu.avif', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 12,
    name: "Nabo'n",
    description: "Tomatsaus, mozzarella, bacon, skinke, indrefilet, rød paprika. (Allergener:1,2,6)",
    price: 190,
    largePrice: 270,
    image: new URL('../assets/nabo.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 13,
    name: "Kebabpizza",
    description: "Tomatsaus, mozzarella, dönerkjøtt, rødløk, sopp, toppet med husets saus. (Allergener:1,2,3,6)",
    price: 170,
    largePrice: 250,
    image: new URL('../assets/kebab.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 14,
    name: "Roser",
    description: "Tomatsaus, mozzarella, strimlet kylling, Cherry tomat, sopp, fetaost, parmesan, ruccola og pesto. (Allergener:1,2,6)",
    price: 170,
    largePrice: 250,
    image: new URL('../assets/nyrose.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 15,
    name: "Min Favoritt",
    description: "Tomatsaus, mozzarella, indrefilet, ruccola, trøffelolje, sopp, oregano og husets saus. (Allergener:1,2,3,5,6)",
    price: 170,
    largePrice: 250,
    image: new URL('../assets/minfav.jpg', import.meta.url).href,
    category: "pizza"
  },
  {
    id: 16,
    name: "Yes Chef",
    description: "Sanswich(kyllingfilet/döner). Nybakt brød med hvitløksolje, mozzarella, ruccola, tomat, løk, fetaost, pommes frites og husets saus. (Allergener:1,2,6)",
    price: 149,
    image: new URL('../assets/yeschef.jpg', import.meta.url).href,
    category: "Innbakt/Sandwich"
  },
  {
    id: 17,
    name: "Calzone",
    description: "Tomatsaus, mozzarella, skinke og olivenolje. (Allergener:1,2,3,5,6)",
    price: 119,
    image: new URL('../assets/calzone.705Z.png', import.meta.url).href,
    category: "Innbakt/Sandwich"
  },
  {
    id: 18,
    name: "Hjertet Sandwich",
    description: "Nybakt brød, trøffelmajones, mozzarella, persillemix av løk og tomat, fetaost, ruccola og pesto. (Allergener:1,2,3,4,6)",
    price: 119,
    image: new URL('../assets/hjertet.webp', import.meta.url).href,
    category: "Innbakt/Sandwich"
  },
  {
    id: 19,
    name: "Baktbua",
    description: "Velg mellom kylling eller döner, trøffelmajones, hvitløkssmør, mozzarella, cheddar, mais og husets dressing. (Allergener:2,3,5)",
    price: 135,
    image: new URL('../assets/baktbua.jpg', import.meta.url).href,
    category: "bakt potet"
  },
  {
    id: 20,
    name: "Grand Prix",
    description: "bacon & skinke, hvitløkssmør, mozzarella, mais, cheddar og husets dressing. (Allergener:2,3,5)",
    price: 125,
    image: new URL('../assets/prix.jpg', import.meta.url).href,
    category: "bakt potet"
  },
  {
    id: 21,
    name: "Fredagskos",
    description: "Hvitløkssmør, cheddar, mozzarella, mais, tacokjøtt, rømme, hvitløksdressing, nachos, flamme saus, Jalapeño og lime.(Allergener:1,2,3)",
    price: 135,
    image: new URL('../assets/fredag.jpg', import.meta.url).href,
    category: "bakt potet"
  },
  {
    id: 22,
    name: "Tartufo",
    description: "Tagliatelle, indrefilet, parmesan, kremfløte, trøfferlolje, sopp, fersk hvitløk og olivenolje.(Allergener:1,2,3)",
    price: 180,
    image: new URL('../assets/tartu.webp', import.meta.url).href,
    category: "pasta"
  },
  {
    id: 23,
    name: "PestoDeli",
    description: "Tagliatelle, kyllingfillet, pesto, kremfløte, parmesan og fersk hvitløk.(Allergener:1,2,3)",
    price: 170,
    image: new URL('../assets/deli.jpg', import.meta.url).href,
    category: "pasta"
  },
  {
    id: 24,
    name: "Carbonara",
    description: "agliatelle, sprøstekt bacon, kremfløte, olivenolje, parmesan, toppet med ruccola.(Allergener:1,2)",
    price: 160,
    image: new URL('../assets/carbonara.webp', import.meta.url).href,
    category: "pasta"
  },
  {
    id: 25,
    name: "Gresk Rull",
    description: "Vlagfri kjøtt, salat, løk, tomat, mais og husets dressing.(Allergener:1,2,3,5)",
    price: 119,
    image: new URL('../assets/gresk.jpg', import.meta.url).href,
    category: "gresk rett"
  },
  {
    id: 26,
    name: "Gresk Tallerk",
    description: "Valgfri kjøtt. Serveres med nanbrød, pommes frites, fetaost, salat, løk, tamat, mais, ruccola og husets dressing.(Allergener:1,2,3,5)",
    price: 149,
    image: new URL('../assets/tallerk.jpg', import.meta.url).href,
    category: "gresk rett"
  },
  {
    id: 27,
    name: "Souvlaki/Gresk Pita",
    description: "Valgfri kjøtt med tzatziki, persillemix med løk og tomat, fetaost, ruccola, pommes frites, hvitløkssmør og ost på brød.(Allergener:1,2,3)",
    price: 125,
    image: new URL('../assets/souv.jpg', import.meta.url).href,
    category: "gresk rett"
  },
{
  id: 28,
  name: "Trippel Cheddar",
  description: "160g, Trippel cheddarost, karamelliseert gul løk, ketchup og husets hamburgerdressing.(Allergener:1,2,3)",
  price: 135,
  image: new URL('../assets/trippel.569Z.png', import.meta.url).href,
  category: "burger"
},
{
  id: 29,
  name: "Trøffel Heaven",
  description: "160g, Trøffelmajones, cheddarost, stekt karamellisert gul løk og sopp.(Allergener:1,2,3)",
  price: 138,
  image: new URL('../assets/trøffel.932Z.png', import.meta.url).href, 
  category: "burger"
},
{
  id: 30,
  name: "Klassikeren",
  description: "160g, Salat, tomat, gul løk, ost, bacon, løkringer og husets hamburgerdressing.(Allergener:1,2,3)",
  price: 135,
  image: new URL('../assets/klassisk.webp', import.meta.url).href,
  category: "burger"
},
{
  id: 31,
  name: "Biffsnadder",
  description: "Strimlet biff, stekt rødløk, paprika, sopp, bearnaisesus, pommes firtes, salat, tomat, mais og hvitløksbrød.(Allergener:1,2,3)",
  price: 189,
  image: new URL('../assets/ikkenoe.jpg', import.meta.url).href,
  category: "andre retter"
},
{
  id: 32,
  name: "Philly Cheesesteak",
  description: "Husets biff i tynne skiver, sautert med karamelliset løk og toppet med smeltet ost. Serveres i nybakt sandwichbrød med vår husets saus.(Allergener:1,2,3)",
  price: 139,
  image: new URL('../assets/philly.jpg', import.meta.url).href,
  category: "andre retter"
},
{
  id: 33,
  name: "Nachos",
  description: "Ovnsbakte tacokjøtt med mozzarella, nachochips, mais og salsa. Serveres med persillemix av løk og tomat, salat hvitølksdressing, rucola og lime.(Allergener:1,2) ",
  price: 159,
  image: new URL('../assets/nacho.265Z.png', import.meta.url).href,
  category: "andre retter"
},
{
  id: 34,
  name: "Mini-Pizza",
  description: "Velg mellom skinke eller kylling pizza.(Allergener:1,2)",
  price: 89,
  image: new URL('../assets/kids.avif', import.meta.url).href,
  category: "for de små"
},
{
  id: 35,
  name: "Gresk Tallerk",
  description: "Valgfri kjøtt. Serveres med nanbrød, pommes frites, salat, løk, tomat, mais, ruccola og husets dressing.(Allergener:1,2,3,5)",
  price: 89,
  image: new URL('../assets/tallerk.jpg', import.meta.url).href,
  category: "for de små"
},
{
  id: 36,
  name: "Nutella-Calzone",
  description: "Nybakt brød med nutellafyll.(Allergener:1,2,4)",
  price: 98,
  image: new URL('../assets/nutella.jpg', import.meta.url).href,
  category: "sukkersjokk"
},
{
  id: 37,
  name: "Nutella-Pizza",
  description: "Toppet med Nutella, melisdryss og valnøtter.(Allergener:1,2,4) ",
  price: 109,
  image: new URL('../assets/pizztella.jpg', import.meta.url).href,
  category: "sukkersjokk"
}
];

const categories = [
  { id: "alt", name: "Alt" },
  { id: "burger", name: "Burger" },
  { id: "pasta", name: "Pasta" },
  { id: "pizza", name: "Pizza" },
  { id: "Innbakt/Sandwich", name: "Innbakt/Sandwich" },
  { id: "bakt potet", name: "Bakt potet" },
  { id: "gresk rett", name: "Greske retter" },
  { id: "andre retter", name: "Andre retter" },
  { id: "for de små", name: "For de små"},
  { id: "saus", name: "Sauser"},
  {id: "sukkersjokk", name: "Sukkersjokk"}
];

export default function Menu() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("alt");
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pizzaSize, setPizzaSize] = useState("medium"); // New state for pizza size
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Check if the screen is mobile-sized
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const filteredItems = useMemo(() => 
      activeCategory === "alt" 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const openItemDetails = (item: typeof menuItems[0]) => {
    setSelectedItem(item);
    setPizzaSize("medium"); // Reset to medium when opening new item
    setIsOpen(true);
  };

  const handleOrderNow = () => {
    setIsOpen(false);
    setQuantity(1);
    setSpecialInstructions("");
    setPaymentMethod("card");
    setIsProcessing(false);
    setIsOrderComplete(false);
    setIsPaymentOpen(true);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const getCurrentPrice = () => {
    if (!selectedItem) return 0;
    if (selectedItem.category === "pizza" && selectedItem.largePrice && pizzaSize === "large") {
      return selectedItem.largePrice;
    }
    return selectedItem.price;
  };

  const calculateSubtotal = () => {
    return getCurrentPrice() * quantity;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.25; // 25% MVA
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString()); // Generate random 6-digit order number
    }, 2000);
  };

  const handleClosePayment = () => {
    setIsPaymentOpen(false);
    setIsOrderComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-2">Vår meny</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
             Fra hjertet til tallerkenen
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
              {categories.map(category => (
                <Badge 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 cursor-pointer transition-colors"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
          
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group cursor-pointer"
                  onClick={() => openItemDetails(item)}
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <ResponsiveImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full"
                      objectFit="cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                      <span className="font-medium text-primary">
                        {item.category === "pizza" && item.largePrice ? (
                          <span className="text-sm">
                            {item.price} kr / {item.largePrice} kr
                          </span>
                        ) : (
                          <span>{item.price} kr</span>
                        )}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[85vh] overflow-hidden bg-background p-0 rounded-lg mx-auto" style={{ maxHeight: "calc(100vh - 40px)" }}>
          {selectedItem && (
            <div className="overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-64 overflow-hidden">
                <ResponsiveImage
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full"
                  objectFit="cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 sm:p-5 w-full">
                    <AnimatePresence>
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                        className="text-xl sm:text-2xl font-serif text-white mb-1"
                      >
                        {selectedItem.name}
                      </motion.h2>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex gap-2 mb-2"
                      >
                        <Badge variant="secondary">{categories.find(c => c.id === selectedItem.category)?.name}</Badge>
                        <Badge variant="outline" className="text-white border-white">
                          {selectedItem.category === "pizza" && selectedItem.largePrice ? (
                            <span className="text-xs">{selectedItem.price} kr / {selectedItem.largePrice} kr</span>
                          ) : (
                            <span>{selectedItem.price} kr</span>
                          )}
                        </Badge>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 240px)' }}>
                <AnimatePresence>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-5"
                  >
                    {selectedItem.description}
                  </motion.p>
                  
                  {/* Pizza size selection */}
                  {selectedItem.category === "pizza" && selectedItem.largePrice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mb-4 sm:mb-6"
                    >
                      <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Velg størrelse</h3>
                      <RadioGroup value={pizzaSize} onValueChange={setPizzaSize} className="gap-2 sm:gap-3">
                        <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="medium" id="medium" className="h-4 w-4 sm:h-5 sm:w-5" />
                          <Label htmlFor="medium" className="flex items-center justify-between cursor-pointer text-sm sm:text-base w-full">
                            <span>Medium</span>
                            <span className="font-medium">{selectedItem.price} kr</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="large" id="large" className="h-4 w-4 sm:h-5 sm:w-5" />
                          <Label htmlFor="large" className="flex items-center justify-between cursor-pointer text-sm sm:text-base w-full">
                            <span>Stor</span>
                            <span className="font-medium">{selectedItem.largePrice} kr</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  )}
                  
                  <motion.div                     
                      initial={{ opacity: 0, y: 10 }}                      
                      animate={{ opacity: 1, y: 0 }}                      
                      transition={{ duration: 0.4, delay: 0.5 }}                   
                    >                     
                      <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Allergener</h3>                     
                      <ul className="list-disc pl-5 mb-4 sm:mb-6 space-y-1">                       
                        {[
                          "1 - Hvete",
                          "2 - Melk", 
                          "3 - Egg",
                          "4 - Sesamfrø",
                          "5 - Soya",
                          "6 - Selleri",
                          "7 - Sennep"
                        ].map((item, idx) => (                         
                          <motion.li                            
                            key={idx}                           
                            initial={{ opacity: 0, x: -10 }}                            
                            animate={{ opacity: 1, x: 0 }}                            
                            transition={{ duration: 0.3, delay: 0.6 + (idx * 0.1) }}                           
                            className="text-muted-foreground text-sm sm:text-base"                         
                          >                           
                            {item}                         
                          </motion.li>                       
                        ))}                     
                      </ul>                   
                    </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Tilberedning</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                    Våre kokker tilbereder denne retten med stor omhu og presisjon, for å sikre en perfekt balanse i smakene.
                    Retten tilberedes ved bestilling og serveres umiddelbart for å bevare den utsøkte smaken og presentasjonen.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="w-[95vw] max-w-md overflow-hidden bg-background p-0 rounded-lg mx-auto">
          {selectedItem && !isOrderComplete && (
            <div className="overflow-hidden">
              <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
                <DialogTitle className="text-lg sm:text-xl font-serif">Complete Your Order</DialogTitle>
                <DialogDescription className="text-sm">
                  {selectedItem.name} - {getCurrentPrice()} kr
                  {selectedItem.category === "pizza" && selectedItem.largePrice && (
                    <span className="text-xs text-muted-foreground block">
                      {pizzaSize === "medium" ? "Medium" : "Stor"} størrelse
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              
              <div className="p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                  <Label className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 block">Quantity</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-r-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <div className="h-9 sm:h-10 px-3 sm:px-4 flex items-center justify-center border-y border-input bg-background text-sm sm:text-base">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-l-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <Label htmlFor="specialInstructions" className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 block">
                    Special Instructions
                  </Label>
                  <Textarea 
                    id="specialInstructions"
                    placeholder="Any allergies or special requests?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="resize-none text-sm sm:text-base min-h-[80px]"
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <Label className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 block">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-2 sm:gap-3">
                    <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" className="h-4 w-4 sm:h-5 sm:w-5" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer text-sm sm:text-base">
                        <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="pickup" id="pickup" className="h-4 w-4 sm:h-5 sm:w-5" />
                      <Label htmlFor="pickup" className="flex items-center cursor-pointer text-sm sm:text-base">
                        <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        Pay at Pickup
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                     <RadioGroupItem value="delivery" id="delivery" className="h-4 w-4 sm:h-5 sm:w-5" />
                     <Label htmlFor="delivery" className="flex items-center cursor-pointer text-sm sm:text-base">
                       <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                       Pay on Delivery
                     </Label>
                   </div>
                 </RadioGroup>
               </div>
               
               <Separator className="my-4 sm:my-6" />
               
               <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                 <div className="flex justify-between text-xs sm:text-sm">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span>{calculateSubtotal().toFixed(0)} kr</span>
                 </div>
                 <div className="flex justify-between text-xs sm:text-sm">
                   <span className="text-muted-foreground">MVA (25%)</span>
                   <span>{calculateTax().toFixed(0)} kr</span>
                 </div>
                 <div className="flex justify-between font-medium text-sm sm:text-base pt-1 sm:pt-2">
                   <span>Total</span>
                   <span>{calculateTotal().toFixed(0)} kr</span>
                 </div>
               </div>
               
               <Button 
                 className="w-full text-sm sm:text-base py-2 sm:py-2.5"
                 onClick={handlePayment}
                 disabled={isProcessing}
               >
                 {isProcessing ? (
                   <div className="flex items-center">
                     <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Processing...
                   </div>
                 ) : (
                   `Complete Order - ${calculateTotal().toFixed(0)} kr`
                 )}
               </Button>
             </div>
           </div>
         )}
         
         {/* Order Confirmation */}
         {isOrderComplete && (
           <div className="p-4 sm:p-6 text-center">
             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
               <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
             </div>
             <h2 className="text-xl sm:text-2xl font-serif font-medium mb-1 sm:mb-2">Order Confirmed!</h2>
             <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
               Thank you for your order. Your order number is:
             </p>
             <div className="bg-muted/50 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md font-mono text-lg sm:text-xl mb-4 sm:mb-6 inline-block">
               #{orderNumber}
             </div>
             <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
               {paymentMethod === 'card' 
                 ? 'Your payment has been processed successfully.' 
                 : paymentMethod === 'pickup'
                   ? 'Please pay at the restaurant when you pick up your order.'
                   : 'Please pay when your order is delivered.'}
             </p>
             <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
               We've sent a confirmation to your email with all the details.
             </p>
             <Button 
               className="w-full text-sm sm:text-base"
               onClick={handleClosePayment}
             >
               Continue Browsing
             </Button>
           </div>
         )}
       </DialogContent>
     </Dialog>
     
     <Footer />
   </div>
 );
}