
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium">Gusto</h3>
            <p className="text-muted-foreground">
              Elevating dining to an art form since 2010. Join us for an unforgettable culinary experience.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p>123 Gourmet Avenue</p>
              <p>Food District, CA 90210</p>
              <p className="mt-2">contact@gustorestaurant.com</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Hours</h4>
            <div className="text-muted-foreground">
              <p><span className="font-medium">Mon - Fri:</span> 11am - 10pm</p>
              <p><span className="font-medium">Sat - Sun:</span> 10am - 11pm</p>
              <div className="mt-4 flex space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={20} className="text-foreground hover:text-primary transition-colors" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={20} className="text-foreground hover:text-primary transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <Twitter size={20} className="text-foreground hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Gusto Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
