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
            className="relative w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-xl shadow-xl overflow-hidden overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
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
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-4 md:p-5 flex flex-col">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-2xl font-serif mb-1.5"
                >
                  {dish.name}
                </motion.h2>

                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3"
                >
                  {dish.price && (
                    <span className="text-primary font-medium">
                      {dish.price}
                    </span>
                  )}
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-sm mb-4"
                >
                  {dish.description}
                </motion.p>

                {dish.ingredients && dish.ingredients.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-3"
                  >
                    <h3 className="font-medium text-sm mb-1.5">Ingredients</h3>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground">
                      {dish.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {dish.preparationTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs"
                    >
                      <span className="block text-xxs text-muted-foreground">Preparation Time</span>
                      <span className="font-medium">{dish.preparationTime}</span>
                    </motion.div>
                  )}

                  {dish.calories && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs"
                    >
                      <span className="block text-xxs text-muted-foreground">Calories</span>
                      <span className="font-medium">{dish.calories}</span>
                    </motion.div>
                  )}
                </div>

                {dish.allergens && dish.allergens.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 text-xs"
                  >
                    <span className="block text-xxs text-muted-foreground mb-1">Allergens</span>
                    <div className="flex flex-wrap gap-1">
                      {dish.allergens.map((allergen, index) => (
                        <span key={index} className="px-1.5 py-0.5 bg-muted rounded-full text-xxs">
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
                    className="mt-3 flex flex-wrap gap-1.5"
                  >
                    {dish.dietaryInfo.map((info, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-xxs">
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
