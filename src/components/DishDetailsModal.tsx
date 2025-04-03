import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage";

interface DishDetailsModalProps {
  dish: {
    name: string;
    description: string;
    image: string;
    price?: string;
    ingredients?: string[];
    allergens?: string[];
    preparationTime?: string;
    calories?: string;
    dietaryInfo?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const DishDetailsModal: React.FC<DishDetailsModalProps> = ({
  dish,
  isOpen,
  onClose,
}) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-card border border-border rounded-xl shadow-xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <ResponsiveImage
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-serif mb-2"
                >
                  {dish.name}
                </motion.h2>

                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  {dish.price && (
                    <span className="text-primary font-medium text-lg">
                      {dish.price}
                    </span>
                  )}
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground mb-6"
                >
                  {dish.description}
                </motion.p>

                {dish.ingredients && dish.ingredients.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-4"
                  >
                    <h3 className="font-medium mb-2">Ingredients</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {dish.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {dish.preparationTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm"
                    >
                      <span className="block text-xs text-muted-foreground">Preparation Time</span>
                      <span className="font-medium">{dish.preparationTime}</span>
                    </motion.div>
                  )}

                  {dish.calories && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm"
                    >
                      <span className="block text-xs text-muted-foreground">Calories</span>
                      <span className="font-medium">{dish.calories}</span>
                    </motion.div>
                  )}
                </div>

                {dish.allergens && dish.allergens.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 text-sm"
                  >
                    <span className="block text-xs text-muted-foreground mb-1">Allergens</span>
                    <div className="flex flex-wrap gap-1">
                      {dish.allergens.map((allergen, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {dish.dietaryInfo && dish.dietaryInfo.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {dish.dietaryInfo.map((info, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {info}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DishDetailsModal;
