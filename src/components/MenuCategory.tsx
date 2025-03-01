
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import ScrollReveal from "./ScrollReveal";

export type MenuItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  dietary?: Array<"vegetarian" | "vegan" | "gluten-free" | "nut-free">;
};

interface MenuCategoryProps {
  title: string;
  items: MenuItem[];
}

export default function MenuCategory({ title, items }: MenuCategoryProps) {
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  
  const filteredItems = selectedDietary 
    ? items.filter(item => item.dietary?.includes(selectedDietary as any))
    : items;
  
  const dietaryOptions = [
    { label: "All", value: null },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten-Free", value: "gluten-free" },
    { label: "Nut-Free", value: "nut-free" },
  ];

  return (
    <section className="py-12" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <ScrollReveal>
        <div className="flex flex-col items-center mb-8">
          <span className="bg-primary/10 text-primary text-xs uppercase tracking-wider py-1 px-3 rounded-full">
            Our Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">{title}</h2>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {dietaryOptions.map((option) => (
              <Button
                key={option.value || "all"}
                variant={selectedDietary === option.value ? "default" : "outline"}
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setSelectedDietary(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <ScrollReveal 
            key={item.id} 
            delay={(index % 3) * 100}
          >
            <div 
              className={cn(
                "bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300",
                "group hover:-translate-y-1 transition-transform duration-300",
              )}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.popular && (
                  <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs py-1 px-2 rounded-full">
                    Popular
                  </span>
                )}
                {item.dietary && item.dietary.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                    {item.dietary.includes("vegetarian") && (
                      <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs py-0.5 px-2 rounded-full">
                        V
                      </span>
                    )}
                    {item.dietary.includes("vegan") && (
                      <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs py-0.5 px-2 rounded-full">
                        Ve
                      </span>
                    )}
                    {item.dietary.includes("gluten-free") && (
                      <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs py-0.5 px-2 rounded-full">
                        GF
                      </span>
                    )}
                    {item.dietary.includes("nut-free") && (
                      <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs py-0.5 px-2 rounded-full">
                        NF
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <span className="font-medium text-primary">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
