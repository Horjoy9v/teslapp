"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";

interface HeaderProps {
  language: "en" | "ru";
}

export default function Header({ language }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const menuItems: Record<
    HeaderProps["language"],
    { title: string; href: string }[]
  > = {
    en: [
      { title: "About", href: "#about" },
      { title: "Services", href: "#services" },
      { title: "Contact", href: "#contact" },
    ],
    ru: [
      { title: "О нас", href: "#about" },
      { title: "Услуги", href: "#services" },
      { title: "Контакты", href: "#contact" },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center text-2xl font-bold">
          <Image
            src="/icon_big.png"
            width={70}
            height={70}
            alt="Logo"
            className="mr-2"
          />
          <span className="text-gradient">
            
          </span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          {menuItems[language].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => scrollToSection(item.href.slice(1))}
            >
              {item.title}
            </Button>
          ))}
        </nav>

        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          variant="ghost"
          size="icon"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm"
          >
            <nav className="flex flex-col p-4">
              {menuItems[language].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => scrollToSection(item.href.slice(1))}
                >
                  {item.title}
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
