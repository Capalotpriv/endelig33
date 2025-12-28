import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Menu item type
interface MenuItem {
  id: number;
  name: string;
  description: string;
  allergens: string;
  price: number;
  largePrice?: number;
  category: string;
}

// Menu data with fixed descriptions and separated allergens
const menuItems: MenuItem[] = [
  // PIZZA
  {
    id: 1,
    name: "Pepperoni Klassisk",
    description: "Tomatsaus, mozzarella og rikelig med pepperoni.",
    allergens: "1, 2, 6",
    price: 170,
    largePrice: 210,
    category: "pizza"
  },
  {
    id: 2,
    name: "Taco Fiesta",
    description: "Tomatsaus, mozzarella, tacokjøtt, jalapeño, nachochips, mais, løk, salsa og lime.",
    allergens: "1, 2, 6",
    price: 190,
    largePrice: 230,
    category: "pizza"
  },
  {
    id: 3,
    name: "Byens Spesial",
    description: "Tomatsaus, mozzarella, skinke, pepperoni, bacon, strimlet biff, løk, tacokjøtt og fersk hvitløk.",
    allergens: "1, 2, 6",
    price: 190,
    largePrice: 270,
    category: "pizza"
  },
  {
    id: 4,
    name: "Trøffeldrøm",
    description: "Trøffelbunn, mozzarella, strimlet biff, parmesan, sopp, rucola, olivenolje og basilikum.",
    allergens: "1, 2, 3, 6",
    price: 190,
    largePrice: 270,
    category: "pizza"
  },
  {
    id: 5,
    name: "Napoli Green",
    description: "Tomatsaus, mozzarella, fetaost, olivenolje, parmesan, rød paprika, løk, sopp, basilikum og rucola.",
    allergens: "1, 2, 4, 6",
    price: 180,
    largePrice: 260,
    category: "pizza"
  },
  {
    id: 6,
    name: "Margherita Originale",
    description: "Tomatsaus, mozzarella, basilikum og olivenolje.",
    allergens: "1, 2, 6",
    price: 145,
    largePrice: 215,
    category: "pizza"
  },
  {
    id: 7,
    name: "Deluxe",
    description: "Trøffelmajones og mozzarella i kanten, hvitløksbunn, sopp, kyllingfilet, pommes frites, husets saus.",
    allergens: "1, 2, 3, 5, 6",
    price: 229,
    largePrice: 309,
    category: "pizza"
  },
  {
    id: 8,
    name: "Husets Signatur",
    description: "Hvitløksdressing og mozzarella med skinke i kanten, tomatsaus, mozzarella, pepperoni, strimlet biff, tacokjøtt og rødløk.",
    allergens: "1, 2, 3, 6",
    price: 239,
    largePrice: 319,
    category: "pizza"
  },
  {
    id: 9,
    name: "W.O.W",
    description: "Hvitløkssaus og mozzarella i kanten, tomatsaus, mozzarella, dønerkjøtt, toppet med pommes frites og husets saus. Kjent som Canada kebabpizza.",
    allergens: "1, 2, 3, 5, 6",
    price: 229,
    largePrice: 309,
    category: "pizza"
  },
  {
    id: 10,
    name: "Norden",
    description: "Tomatsaus, mozzarella, kyllingfilet, indrefilet, fetaost, rucola, rødløk og rød paprika.",
    allergens: "1, 2, 6",
    price: 190,
    largePrice: 270,
    category: "pizza"
  },
  {
    id: 11,
    name: "Vesuvio",
    description: "Tomatsaus, mozzarella, skinke.",
    allergens: "1, 2, 6",
    price: 160,
    largePrice: 240,
    category: "pizza"
  },
  {
    id: 12,
    name: "Nabo'n",
    description: "Tomatsaus, mozzarella, bacon, skinke, indrefilet, rød paprika.",
    allergens: "1, 2, 6",
    price: 190,
    largePrice: 270,
    category: "pizza"
  },
  {
    id: 13,
    name: "Kebabpizza",
    description: "Tomatsaus, mozzarella, dönerkjøtt, rødløk, sopp, toppet med husets saus.",
    allergens: "1, 2, 3, 6",
    price: 170,
    largePrice: 250,
    category: "pizza"
  },
  {
    id: 14,
    name: "Roser",
    description: "Tomatsaus, mozzarella, strimlet kylling, cherrytomat, sopp, fetaost, parmesan, rucola og pesto.",
    allergens: "1, 2, 6",
    price: 170,
    largePrice: 250,
    category: "pizza"
  },
  {
    id: 15,
    name: "Min Favoritt",
    description: "Tomatsaus, mozzarella, indrefilet, rucola, trøffelolje, sopp, oregano og husets saus.",
    allergens: "1, 2, 3, 5, 6",
    price: 170,
    largePrice: 250,
    category: "pizza"
  },

  // PASTA
  {
    id: 22,
    name: "Tartufo",
    description: "Tagliatelle, indrefilet, parmesan, kremfløte, trøffelolje, sopp, fersk hvitløk og olivenolje.",
    allergens: "1, 2, 3",
    price: 180,
    category: "pasta"
  },
  {
    id: 23,
    name: "PestoDeli",
    description: "Tagliatelle, kyllingfilet, pesto, kremfløte, parmesan og fersk hvitløk.",
    allergens: "1, 2, 3",
    price: 170,
    category: "pasta"
  },
  {
    id: 24,
    name: "Carbonara",
    description: "Tagliatelle, sprøstekt bacon, kremfløte, olivenolje, parmesan, toppet med rucola.",
    allergens: "1, 2",
    price: 160,
    category: "pasta"
  },

  // BURGER
  {
    id: 28,
    name: "Trippel Cheddar",
    description: "160g burgerkjøtt, trippel cheddarost, karamellisert gul løk, ketchup og husets hamburgerdressing.",
    allergens: "1, 2, 3",
    price: 135,
    category: "burger"
  },
  {
    id: 29,
    name: "Trøffel Heaven",
    description: "160g burgerkjøtt, trøffelmajones, cheddarost, stekt karamellisert gul løk og sopp.",
    allergens: "1, 2, 3",
    price: 138,
    category: "burger"
  },
  {
    id: 30,
    name: "Klassikeren",
    description: "160g burgerkjøtt, salat, tomat, gul løk, ost, bacon, løkringer og husets hamburgerdressing.",
    allergens: "1, 2, 3",
    price: 135,
    category: "burger"
  },

  // INNBAKT/SANDWICH
  {
    id: 16,
    name: "Yes Chef",
    description: "Sandwich med kyllingfilet eller döner. Nybakt brød med hvitløksolje, mozzarella, rucola, tomat, løk, fetaost, pommes frites og husets saus.",
    allergens: "1, 2, 6",
    price: 149,
    category: "sandwich"
  },
  {
    id: 17,
    name: "Calzone",
    description: "Tomatsaus, mozzarella, skinke og olivenolje.",
    allergens: "1, 2, 3, 5, 6",
    price: 119,
    category: "sandwich"
  },
  {
    id: 18,
    name: "Hjertet Sandwich",
    description: "Nybakt brød, trøffelmajones, mozzarella, persillemix av løk og tomat, fetaost, rucola og pesto.",
    allergens: "1, 2, 3, 4, 6",
    price: 119,
    category: "sandwich"
  },

  // BAKT POTET
  {
    id: 19,
    name: "Baktbua",
    description: "Velg mellom kylling eller döner, trøffelmajones, hvitløkssmør, mozzarella, cheddar, mais og husets dressing.",
    allergens: "2, 3, 5",
    price: 135,
    category: "baktpotet"
  },
  {
    id: 20,
    name: "Grand Prix",
    description: "Bacon og skinke, hvitløkssmør, mozzarella, mais, cheddar og husets dressing.",
    allergens: "2, 3, 5",
    price: 125,
    category: "baktpotet"
  },
  {
    id: 21,
    name: "Fredagskos",
    description: "Hvitløkssmør, cheddar, mozzarella, mais, tacokjøtt, rømme, hvitløksdressing, nachos, flammesaus, jalapeño og lime.",
    allergens: "1, 2, 3",
    price: 135,
    category: "baktpotet"
  },

  // GRESKE RETTER
  {
    id: 25,
    name: "Gresk Rull",
    description: "Valgfritt kjøtt, salat, løk, tomat, mais og husets dressing.",
    allergens: "1, 2, 3, 5",
    price: 119,
    category: "gresk"
  },
  {
    id: 26,
    name: "Gresk Tallerken",
    description: "Valgfritt kjøtt. Serveres med nanbrød, pommes frites, fetaost, salat, løk, tomat, mais, rucola og husets dressing.",
    allergens: "1, 2, 3, 5",
    price: 149,
    category: "gresk"
  },
  {
    id: 27,
    name: "Souvlaki",
    description: "Valgfritt kjøtt med tzatziki, persillemix med løk og tomat, fetaost, rucola, pommes frites, hvitløkssmør og ost på brød.",
    allergens: "1, 2, 3",
    price: 125,
    category: "gresk"
  },

  // ANDRE RETTER
  {
    id: 31,
    name: "Biffsnadder",
    description: "Strimlet biff, stekt rødløk, paprika, sopp, bearnaisesaus, pommes frites, salat, tomat, mais og hvitløksbrød.",
    allergens: "1, 2, 3",
    price: 189,
    category: "andre"
  },
  {
    id: 32,
    name: "Philly Cheesesteak",
    description: "Husets biff i tynne skiver, sautert med karamellisert løk og toppet med smeltet ost. Serveres i nybakt sandwichbrød med husets saus.",
    allergens: "1, 2, 3",
    price: 139,
    category: "andre"
  },
  {
    id: 33,
    name: "Nachos",
    description: "Ovnsbakte nachochips med tacokjøtt, mozzarella, mais og salsa. Serveres med persillemix av løk og tomat, salat, hvitløksdressing, rucola og lime.",
    allergens: "1, 2",
    price: 159,
    category: "andre"
  },

  // FOR DE SMÅ
  {
    id: 34,
    name: "Mini-Pizza",
    description: "Velg mellom skinke eller kylling pizza.",
    allergens: "1, 2",
    price: 89,
    category: "barn"
  },
  {
    id: 35,
    name: "Gresk Tallerken Junior",
    description: "Valgfritt kjøtt. Serveres med nanbrød, pommes frites, salat, løk, tomat, mais, rucola og husets dressing.",
    allergens: "1, 2, 3, 5",
    price: 89,
    category: "barn"
  },

  // SØTT
  {
    id: 36,
    name: "Nutella-Calzone",
    description: "Nybakt brød med nutellafyll.",
    allergens: "1, 2, 4",
    price: 98,
    category: "dessert"
  },
  {
    id: 37,
    name: "Nutella-Pizza",
    description: "Toppet med Nutella, melisdryss og valnøtter.",
    allergens: "1, 2, 4",
    price: 109,
    category: "dessert"
  }
];

// Category configuration with elegant names
const categories = [
  { id: "pizza", name: "Pizza", subtitle: "Steinovnsbakt med kjærlighet" },
  { id: "pasta", name: "Pasta", subtitle: "Fersk pasta, klassiske smaker" },
  { id: "burger", name: "Burgere", subtitle: "Håndlagde med premium ingredienser" },
  { id: "sandwich", name: "Innbakt & Sandwich", subtitle: "Nybakt og velsmakende" },
  { id: "baktpotet", name: "Bakt Potet", subtitle: "Kremet og fyldig" },
  { id: "gresk", name: "Greske Retter", subtitle: "Smaken av Middelhavet" },
  { id: "andre", name: "Andre Retter", subtitle: "Kulinariske favoritter" },
  { id: "barn", name: "For de Små", subtitle: "Barnevennlige porsjoner" },
  { id: "dessert", name: "Søte Fristelser", subtitle: "Den perfekte avslutning" },
];

// Allergen reference
const allergenReference: Record<string, string> = {
  "1": "Hvete",
  "2": "Melk",
  "3": "Egg",
  "4": "Sesamfrø",
  "5": "Soya",
  "6": "Selleri",
  "7": "Sennep"
};

export default function Menu() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pizzaSize, setPizzaSize] = useState("medium");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const isMobile = useMediaQuery("(max-width: 640px)");

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    categories.forEach(cat => {
      groups[cat.id] = menuItems.filter(item => item.category === cat.id);
    });
    return groups;
  }, []);

  const openItemDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setPizzaSize("medium");
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
    if (quantity > 1) setQuantity(quantity - 1);
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

  const calculateSubtotal = () => getCurrentPrice() * quantity;
  const calculateTax = () => calculateSubtotal() * 0.25;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
    }, 2000);
  };

  const handleClosePayment = () => {
    setIsPaymentOpen(false);
    setIsOrderComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-menu text-5xl md:text-6xl font-semibold text-primary tracking-wide mb-4">
                  Menyen
                </h1>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-primary/40" />
                  <span className="font-menu text-lg text-muted-foreground italic">
                    Fra hjertet til tallerkenen
                  </span>
                  <div className="h-px w-16 bg-primary/40" />
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Menu Sections */}
          {categories.map((category, categoryIndex) => {
            const items = groupedItems[category.id];
            if (!items || items.length === 0) return null;

            return (
              <ScrollReveal key={category.id} delay={categoryIndex * 100}>
                <motion.section
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-16"
                >
                  {/* Category Header */}
                  <div className="text-center mb-10">
                    <h2 className="font-menu text-3xl md:text-4xl font-semibold text-primary tracking-wide mb-2">
                      {category.name}
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground tracking-widest uppercase">
                      {category.subtitle}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-8">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => openItemDetails(item)}
                        className="group cursor-pointer"
                      >
                        {/* Item Row */}
                        <div className="flex items-baseline justify-between gap-4">
                          {/* Name */}
                          <h3 className="font-menu text-xl md:text-2xl font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                            {item.name}
                          </h3>

                          {/* Price */}
                          <div className="flex-shrink-0 font-menu text-lg md:text-xl text-primary/90">
                            {item.largePrice ? (
                              <span className="tracking-wide">
                                {item.price} / {item.largePrice}
                              </span>
                            ) : (
                              <span className="tracking-wide">{item.price}</span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-sm md:text-base text-muted-foreground mt-2 leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                          {item.description}
                        </p>

                        {/* Allergens */}
                        <p className="font-sans text-xs text-muted-foreground/60 mt-2 tracking-wide">
                          Inneholder: {item.allergens}
                        </p>

                        {/* Subtle divider */}
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </ScrollReveal>
            );
          })}

          {/* Allergen Legend */}
          <ScrollReveal delay={200}>
            <div className="mt-20 pt-8 border-t border-border/30">
              <h3 className="font-menu text-xl text-primary/80 text-center mb-6">Allergener</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {Object.entries(allergenReference).map(([num, name]) => (
                  <div key={num} className="font-sans text-xs text-muted-foreground/70">
                    <span className="text-primary/60">{num}</span> — {name}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      {/* Item Details Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-lg bg-background border-border/50 p-0 rounded-lg mx-auto">
          {selectedItem && (
            <div className="p-6 md:p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="font-menu text-2xl md:text-3xl font-semibold text-primary">
                  {selectedItem.name}
                </DialogTitle>
                <DialogDescription className="font-sans text-muted-foreground mt-2">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Price Display */}
                <div className="flex items-center justify-between py-3 border-y border-border/30">
                  <span className="font-sans text-sm text-muted-foreground">Pris</span>
                  <span className="font-menu text-xl text-primary">
                    {selectedItem.largePrice
                      ? `${selectedItem.price} kr / ${selectedItem.largePrice} kr`
                      : `${selectedItem.price} kr`}
                  </span>
                </div>

                {/* Pizza Size Selection */}
                {selectedItem.category === "pizza" && selectedItem.largePrice && (
                  <div>
                    <Label className="font-sans text-sm text-muted-foreground mb-3 block">
                      Velg størrelse
                    </Label>
                    <RadioGroup value={pizzaSize} onValueChange={setPizzaSize} className="gap-3">
                      <div className="flex items-center space-x-3 p-3 rounded-md border border-border/30 hover:border-primary/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="flex items-center justify-between cursor-pointer w-full font-sans">
                          <span>Medium</span>
                          <span className="text-primary">{selectedItem.price} kr</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-md border border-border/30 hover:border-primary/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large" className="flex items-center justify-between cursor-pointer w-full font-sans">
                          <span>Stor</span>
                          <span className="text-primary">{selectedItem.largePrice} kr</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Allergens */}
                <div className="text-xs text-muted-foreground/60 font-sans">
                  <span className="font-medium">Allergener:</span> {selectedItem.allergens}
                </div>

                {/* Order Button */}
                <Button
                  onClick={handleOrderNow}
                  className="w-full font-menu text-lg tracking-wide"
                  size="lg"
                >
                  Bestill nå — {getCurrentPrice()} kr
                </Button>
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
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/30">
                <DialogTitle className="font-menu text-xl">Fullfør bestilling</DialogTitle>
                <DialogDescription className="font-sans text-sm">
                  {selectedItem.name} — {getCurrentPrice()} kr
                  {selectedItem.category === "pizza" && selectedItem.largePrice && (
                    <span className="block text-xs text-muted-foreground">
                      {pizzaSize === "medium" ? "Medium" : "Stor"} størrelse
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="p-6">
                <div className="mb-6">
                  <Label className="font-sans text-sm mb-2 block">Antall</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 px-4 flex items-center justify-center border-y border-input bg-background font-sans">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="specialInstructions" className="font-sans text-sm mb-2 block">
                    Spesielle ønsker
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Allergier eller andre ønsker?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="resize-none font-sans text-sm min-h-[80px]"
                  />
                </div>

                <div className="mb-6">
                  <Label className="font-sans text-sm mb-2 block">Betalingsmetode</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-3">
                    <div className="flex items-center space-x-2 border border-border/30 rounded-md p-3 cursor-pointer hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer font-sans text-sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Kort
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border/30 rounded-md p-3 cursor-pointer hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex items-center cursor-pointer font-sans text-sm">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Betal ved henting
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border/30 rounded-md p-3 cursor-pointer hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex items-center cursor-pointer font-sans text-sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Betal ved levering
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2 mb-6 font-sans">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{calculateSubtotal().toFixed(0)} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">MVA (25%)</span>
                    <span>{calculateTax().toFixed(0)} kr</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span className="text-primary">{calculateTotal().toFixed(0)} kr</span>
                  </div>
                </div>

                <Button
                  className="w-full font-menu tracking-wide"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Behandler...
                    </div>
                  ) : (
                    `Bekreft bestilling — ${calculateTotal().toFixed(0)} kr`
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Order Confirmation */}
          {isOrderComplete && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="font-menu text-2xl font-medium mb-2 text-primary">Bestilling bekreftet!</h2>
              <p className="font-sans text-sm text-muted-foreground mb-4">
                Takk for din bestilling. Ditt ordrenummer er:
              </p>
              <div className="bg-muted/50 py-2 px-4 rounded-md font-mono text-xl mb-6 inline-block">
                #{orderNumber}
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">
                {paymentMethod === 'card'
                  ? 'Betalingen er behandlet.'
                  : paymentMethod === 'pickup'
                    ? 'Betal ved henting i restauranten.'
                    : 'Betal når bestillingen leveres.'}
              </p>
              <Button className="w-full font-menu" onClick={handleClosePayment}>
                Fortsett
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
