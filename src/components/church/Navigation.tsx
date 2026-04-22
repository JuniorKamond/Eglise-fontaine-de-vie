import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoFdv from "@/assets/logo-fdv.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["À propos", "Prédications", "Événements", "Mouvement", "Contact"];

const sectionIds: Record<string, string> = {
  "À propos": "about",
  "Prédications": "sermons",
  "Événements": "events",
  "Mouvement": "ministries",
    "Contact": "contact",
};

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (label: string) => {
    setMobileOpen(false);
    const id = sectionIds[label] || label.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logoFdv} alt="Logo Fontaine de Vie" className="h-10 w-10 rounded-full object-cover" />
          <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
            Fontaine de Vie
          </span>
        </a>

        <div className="hidden space-x-8 md:flex">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-muted-foreground hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Button
          variant={scrolled ? "hero" : "heroOutline"}
          size="sm"
          className="hidden md:inline-flex"
          onClick={() => scrollTo("À propos")}
        >
          Planifier votre visite
        </Button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="py-2 text-left text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button variant="hero" size="sm" className="mt-2" onClick={() => navigate("/inscription")}>
                Planifier votre visite
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
