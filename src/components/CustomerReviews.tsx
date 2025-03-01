
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Food Enthusiast",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Food Critic",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Chef",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Food Blogger",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Frequent Diner",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Sophia Chen",
    designation: "Instagram Foodie",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full text-primary mb-4">
              Happy Customers
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Join Our Growing Community
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground">
              Our customers love the exceptional dining experience at Vusto. Here are some of our loyal patrons who have shared their experiences.
            </p>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={400}>
          <div className="flex flex-col items-center">
            <div className="mb-8">
              <AnimatedTooltip items={people} />
            </div>
            
            <div className="text-center max-w-3xl mx-auto mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <p className="italic text-lg mb-6">
                  "Vusto has completely transformed my dining expectations. The ambiance, service, and most importantly, the food - everything is exceptional!"
                </p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="font-medium">Over 500+ 5-star reviews</p>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CustomerReviews;
