
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request
    setTimeout(() => {
      toast({
        title: "Reservation Received",
        description: "We'll contact you shortly to confirm your reservation.",
      });
      setIsSubmitting(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: "Phone",
      content: "(555) 123-4567",
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      content: "contact@Vustorestaurant.com",
    },
    {
      icon: <MapPin size={20} />,
      title: "Address",
      content: "123 Gourmet Avenue, Food District, CA 90210",
    },
    {
      icon: <Clock size={20} />,
      title: "Hours",
      content: "Mon-Fri: 11am-10pm | Sat-Sun: 10am-11pm",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">Make a Reservation</h2>
        <p className="text-muted-foreground mb-8">
          Please fill out the form below to reserve your table. We'll contact you shortly to confirm your reservation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Guests
              </label>
              <select
                name="guests"
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
                <option value="9+">9+ people</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Time
              </label>
              <select
                name="time"
                required
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={form.time}
                onChange={handleChange}
              >
                <option value="">Select a time</option>
                {["11:00", "12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"].map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Special Requests
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Reserve Table"}
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">Contact Us</h2>
        <p className="text-muted-foreground mb-8">
          Have questions or need assistance? We're here to help. Reach out to us using the contact information below.
        </p>

        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-muted-foreground">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 h-[300px] rounded-lg overflow-hidden border border-border">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203615424!2d-118.385054!3d34.0768175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b931db956a83%3A0x67c8e8a9b8bd5c0c!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1720214238114!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Location"
          />
        </div>
      </div>
    </div>
  );
}
