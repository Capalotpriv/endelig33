
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium">33 Street Food</h3>
            <p className="text-muted-foreground">
              Eksklusiv mat og enestående smaksopplevelser
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Utforsk</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Hjem
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Meny
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Kontakt</h4>
            <address className="not-italic text-muted-foreground">
              <p>33 Street Food</p>
              <p>Kirkegata 54, 1712 Sarpsborg</p>
              <p className="mt-2">contact@hvaermail.com</p>
              <p>(+47) 973 30 333</p>
            </address>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">Åpning</h4>
            <div className="text-muted-foreground">
              <p><span className="font-medium">Alle dager:</span> 09:00 - 22:00</p>
              <div className="mt-4 flex space-x-3">
                <a href="https://www.instagram.com/33street.food?utm_source=ig_web_button_share_sheet&igsh=MTh5cWk4Z2xkemc5" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={20} className="text-foreground hover:text-primary transition-colors" />
                </a>
                <a href="https://www.tiktok.com/@33.street.food?is_from_webapp=1&sender_device=pc"
   target="_blank"
  rel="noreferrer"
  aria-label="TikTok"
>
  <FaTiktok className="text-foreground hover:text-primary transition-colors w-5 h-5" />
</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} 33 Street Food. Alle rettigheter reservert.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://verkstedweb.no/" className="hover:text-primary transition-colors">Nettsiden er utviklet av VerkstedWeb</a>
            <a href="#" className="hover:text-primary transition-colors">Personvern</a>
            <a href="#" className="hover:text-primary transition-colors">Bruksvilkår</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
