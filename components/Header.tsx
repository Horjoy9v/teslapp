"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";

interface HeaderProps {
  language: "en" | "ru";
}

export default function Header({ language }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
    { title: string; content: string }[]
  > = {
    en: [
      { title: "About", content: "Learn more about our company and values." },
      {
        title: "Services",
        content: "Explore our wide range of legal services.",
      },
      { title: "Cases", content: "View our successful case studies." },
      { title: "Contact", content: "Get in touch with our expert team." },
    ],
    ru: [
      {
        title: "О нас",
        content: "Узнайте больше о нашей компании и ценностях.",
      },
      {
        title: "Услуги",
        content: "Ознакомьтесь с нашим широким спектром юридических услуг.",
      },
      { title: "Кейсы", content: "Посмотрите наши успешные кейсы." },
      { title: "Контакты", content: "Свяжитесь с нашей командой экспертов." },
    ],
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setSelectedItem(null);
  };

  const handleItemClick = (title: string) => {
    if (isMobile) {
      if (selectedItem === title) {
        setSelectedItem(null);
      } else {
        setSelectedItem(title);
      }
    } else {
      if (selectedItem === title) {
        setSelectedItem(null); // Закриваємо меню при повторному натисканні на вже вибраний елемент
      } else {
        setSelectedItem(title);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative z-10"
        >
          <Image
            src="/icon_big.png"
            width={70}
            height={70}
            alt="Picture"
            className="mr-2 pointer-events-auto"
          />
          <span>РАЙТ</span>
        </Link>

        {/* Для десктопної версії */}
        <nav className="hidden md:flex space-x-4 shadow-md p-2 rounded-xl">
          {menuItems[language].map((item, index) => (
            <Button
              key={index}
              onClick={() => handleItemClick(item.title)}
              className="bg-transparent hover:bg-transparent text-foreground/90 hover:text-foreground relative before:bg-teal-600 
          hover:before:scale-x-100 before:origin-bottom-left before:absolute before:bottom-0 before:left-0 
          before:block before:h-[2px] before:w-full before:scale-x-0 before:transition before:duration-300"
            >
              {item.title}
            </Button>
          ))}
        </nav>

        {/* Кнопка Write Us для десктопа */}
        <div className="hidden md:block shadow-md p-2 rounded-xl">
          <Button
            className="text-lg bg-transparent hover:bg-transparent text-foreground/80 hover:text-foreground relative before:bg-teal-600 
        hover:before:scale-x-100 before:origin-bottom-left before:absolute before:bottom-0 before:left-0 
        before:block before:h-[2px] before:w-full before:scale-x-0 before:transition before:duration-300"
          >
            {language === "en" ? "Write us" : "Написать нам"}
          </Button>
        </div>

        {/* Кнопка меню для мобільної версії */}
        <Button
          onClick={toggleMenu}
          className="md:hidden bg-transparent text-foreground/90 shadow-md hover:bg-transparent"
        >
          <Menu />
        </Button>
      </div>

      {/* Мобільне меню */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-background/80 backdrop-blur-md p-4 z-20"
          >
            <div className="p-4">
              {selectedItem ? (
                <div>
                  <Button
                    onClick={() => setSelectedItem(null)}
                    className="mb-4"
                  >
                    <ChevronLeft className="mr-2" />
                    Back
                  </Button>
                  <h3 className="text-lg font-semibold mb-2">{selectedItem}</h3>
                  <p>
                    {
                      menuItems[language].find(
                        (item) => item.title === selectedItem
                      )?.content
                    }
                  </p>
                </div>
              ) : (
                <nav className="flex flex-col space-y-2">
                  {menuItems[language].map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => handleItemClick(item.title)}
                      className="w-full text-left"
                    >
                      {item.title}
                    </Button>
                  ))}
                  <Button className="mt-4 w-full">
                    {language === "en" ? "Write us" : "Написать нам"}
                  </Button>
                </nav>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Для десктопної версії */}
      <AnimatePresence>
        {!isMobile && selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-background/80 backdrop-blur-md p-4"
          >
            <div className="container mx-auto">
              <h3 className="text-lg font-semibold mb-2">{selectedItem}</h3>
              <p>
                {
                  menuItems[language].find(
                    (item) => item.title === selectedItem
                  )?.content
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
