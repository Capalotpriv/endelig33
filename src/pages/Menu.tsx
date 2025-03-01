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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, CreditCard, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Truffle Pasta",
    description: "Homemade pasta with black truffle and parmesan cream sauce",
    price: 22,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    category: "pasta"
  },
  {
    id: 2,
    name: "Mediterranean Salad",
    description: "Fresh vegetables, feta cheese, olives, and house dressing",
    price: 14,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    category: "salad"
  },
  {
    id: 3,
    name: "Filet Mignon",
    description: "8oz premium beef filet with red wine reduction",
    price: 38,
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef",
    category: "main"
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso and mascarpone",
    price: 12,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    category: "dessert"
  },
  {
    id: 5,
    name: "Bruschetta",
    description: "Toasted bread with tomatoes, basil, and balsamic glaze",
    price: 10,
    image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550",
    category: "appetizer"
  },
  {
    id: 6,
    name: "Seafood Risotto",
    description: "Creamy Arborio rice with fresh seafood and saffron",
    price: 26,
    image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9",
    category: "main"
  },
  {
    id: 7,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 14,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    category: "dessert"
  },
  {
    id: 8,
    name: "Caprese Salad",
    description: "Sliced tomatoes, fresh mozzarella, basil, and balsamic reduction",
    price: 13,
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5",
    category: "salad"
  },
  {
    id: 9,
    name: "Garlic Shrimp",
    description: "Sautéed jumbo shrimp with garlic, white wine, and herbs",
    price: 18,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    category: "appetizer"
  },
  {
    id: 10,
    name: "Margherita Pizza",
    description: "Classic thin-crust pizza with tomato sauce, fresh mozzarella, and basil",
    price: 16,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    category: "pizza"
  },
  {
    id: 11,
    name: "Lobster Ravioli",
    description: "Handmade ravioli filled with lobster meat in a saffron cream sauce",
    price: 28,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    category: "pasta"
  },
  {
    id: 12,
    name: "Crème Brûlée",
    description: "Classic French custard with caramelized sugar crust",
    price: 11,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc",
    category: "dessert"
  },
  {
    id: 13,
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan",
    price: 19,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    category: "main"
  },
  {
    id: 14,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan, croutons, and classic Caesar dressing",
    price: 12,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    category: "salad"
  },
  {
    id: 15,
    name: "Beef Carpaccio",
    description: "Thinly sliced raw beef with arugula, capers, and truffle oil",
    price: 16,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    category: "appetizer"
  },
  {
    id: 16,
    name: "Panna Cotta",
    description: "Italian cream dessert with berry compote and fresh mint",
    price: 10,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc",
    category: "dessert"
  },
  {
    id: 17,
    name: "Spaghetti Carbonara",
    description: "Classic Roman pasta with pancetta, egg, pecorino cheese, and black pepper",
    price: 18,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    category: "pasta"
  },
  {
    id: 18,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables",
    price: 24,
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
    category: "main"
  },
  {
    id: 19,
    name: "Arancini",
    description: "Sicilian rice balls stuffed with mozzarella and served with marinara sauce",
    price: 12,
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8",
    category: "appetizer"
  },
  {
    id: 20,
    name: "Gnocchi al Pesto",
    description: "Handmade potato dumplings with fresh basil pesto and pine nuts",
    price: 17,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    category: "pasta"
  },
  {
    id: 21,
    name: "Pepperoni Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and spicy pepperoni",
    price: 17,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    category: "pizza"
  },
  {
    id: 22,
    name: "Quattro Formaggi",
    description: "Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan",
    price: 18,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    category: "pizza"
  },
  {
    id: 23,
    name: "Prosciutto & Arugula Pizza",
    description: "Thin crust pizza with prosciutto di Parma, fresh arugula, and shaved parmesan",
    price: 19,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c",
    category: "pizza"
  },
  {
    id: 24,
    name: "Cannoli",
    description: "Sicilian pastry tubes filled with sweet ricotta cream and chocolate chips",
    price: 9,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    category: "dessert"
  },
  {
    id: 25,
    name: "Gelato Selection",
    description: "Assorted Italian ice cream flavors with biscotti",
    price: 8,
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364",
    category: "dessert"
  },
  {
    id: 26,
    name: "Affogato",
    description: "Vanilla gelato 'drowned' with a shot of hot espresso",
    price: 7,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
    category: "dessert"
  }
];

const categories = [
  { id: "all", name: "All" },
  { id: "appetizer", name: "Appetizers" },
  { id: "salad", name: "Salads" },
  { id: "pasta", name: "Pasta" },
  { id: "pizza", name: "Pizza" },
  { id: "main", name: "Main Courses" },
  { id: "dessert", name: "Desserts" }
];

export default function Menu() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Check if the screen is mobile-sized
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const filteredItems = useMemo(() => 
    activeCategory === "all" 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const openItemDetails = (item: typeof menuItems[0]) => {
    setSelectedItem(item);
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

  const calculateSubtotal = () => {
    if (!selectedItem) return 0;
    return selectedItem.price * quantity;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-2">Our Menu</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Exquisite culinary creations crafted with passion and the finest ingredients
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
                    <img
                      src={optimizeImageUrl(item.image, 600)}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                      <span className="font-medium text-primary">${item.price}</span>
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
        <DialogContent className="w-[95vw] max-w-3xl overflow-hidden bg-background p-0 rounded-lg mx-auto">
          {selectedItem && (
            <div className="overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-80 overflow-hidden">
                <img 
                  src={optimizeImageUrl(selectedItem.image, 1200)} 
                  alt={selectedItem.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 sm:p-6 w-full">
                    <AnimatePresence>
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-serif text-white mb-1"
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
                        <Badge variant="outline" className="text-white border-white">${selectedItem.price}</Badge>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <AnimatePresence>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
                  >
                    {selectedItem.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Ingredients</h3>
                    <ul className="list-disc pl-5 mb-4 sm:mb-6 space-y-1">
                      {["Premium quality ingredients", "Locally sourced produce", "Organic herbs and spices", "Chef's secret blend"].map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
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
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Preparation</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                      Our chefs prepare this dish with meticulous attention to detail, ensuring each flavor is balanced perfectly. 
                      Cooked to order and served immediately to preserve the exquisite taste and presentation.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="bg-muted/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
                  >
                    <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Chef's Note</h3>
                    <p className="text-xs sm:text-sm italic text-muted-foreground">
                      "This dish represents our commitment to culinary excellence and the finest traditions of our kitchen.
                      Each serving is crafted with passion and respect for the ingredients."
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="flex justify-center"
                  >
                    <Button 
                      size={isMobile ? "default" : "lg"} 
                      className="w-full sm:w-auto px-4 sm:px-8"
                      onClick={handleOrderNow}
                    >
                      Order Now
                    </Button>
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
                  {selectedItem.name} - ${selectedItem.price.toFixed(2)}
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
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-sm sm:text-base pt-1 sm:pt-2">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
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
                    `Complete Order - $${calculateTotal().toFixed(2)}`
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
