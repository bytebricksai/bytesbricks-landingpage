"use client";

import { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clickedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si acabamos de hacer clic, no procesamos el evento de scroll
      if (clickedRef.current) return;

      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // offset para mejor detección

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Ejecutar una vez para establecer la sección inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMenuOpen(false);
    clickedRef.current = true;

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        clickedRef.current = false;
      }, 1000);
    }
  };

  // Placeholder for demo request action
  const handleRequestDemo = () => {
    setIsMenuOpen(false); // Close menu if open
    // Add actual logic here, e.g., open a modal, scroll to contact, etc.
    alert("Demo request functionality to be implemented.");
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-auto">
      {/* Desktop Navigation */}
      <div className="hidden md:flex backdrop-blur-md backdrop-filter rounded-full px-4 py-1 bg-white/20">
        <div className="flex items-center justify-center space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`group relative text-base transition-all duration-300 py-2 px-2 ${
                activeSection === item.id
                  ? "font-semibold text-primary"
                  : "text-gray-900 hover:text-primary"
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ease-in-out ${
                  activeSection === item.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
          {/* Desktop CTA Button (Text is white, background is primary) */}
          <button
            onClick={handleRequestDemo}
            className="ml-4 px-4 py-1.5 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Request a Demo
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-end w-full px-4 py-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-700 hover:text-primary rounded-md bg-white/30 hover:bg-white/50 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 p-4 rounded-lg backdrop-blur-md backdrop-filter bg-white/90 shadow-lg w-full max-w-[calc(100%-2rem)] mr-4">
          <div className="flex flex-col space-y-3">
            {/* CTA Button - Now inside the menu */}
            <button
              onClick={handleRequestDemo}
              className="w-full px-4 py-2.5 text-base font-semibold text-white bg-primary rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Request a Demo
            </button>
            {/* Separator */}
            <hr className="border-gray-200 my-2" />
            {/* Regular Nav Items */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block py-2 px-3 rounded-md text-base text-center transition-colors ${
                  activeSection === item.id
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
