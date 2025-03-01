
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  rating: number;
  date: string;
  content: string;
  image?: string;
}

export default function TestimonialCard({
  name,
  rating,
  date,
  content,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                "fill-current",
                i < rating
                  ? "text-yellow-500"
                  : "text-muted-foreground/20"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground flex-1">{content}</p>
      <div className="mt-4 text-xs flex justify-between text-muted-foreground">
        <span>Verified Diner</span>
      </div>
    </div>
  );
}
