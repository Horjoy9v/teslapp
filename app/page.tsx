"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Recognition from "@/components/Recognition";
import Services from "@/components/Services";
import Insights from "@/components/Insights";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import ContactForm from "@/components/ContactForm";

type Language = "en" | "ru";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="bg-[url('/bg_image.jpg')] bg-cover bg-center bg-fixed min-h-screen ">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme + language}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className={`min-h-screen ${theme}`}
        >
          <Header language={language} />
          <Hero language={language} />
          <Recognition language={language} />
          <Services language={language} />
          <Insights language={language} />
          <ContactForm language={language} />
          <Footer language={language} />
          <ThemeToggle
            theme={theme}
            setTheme={(value) => setTheme(value as "light" | "dark")}
          />
          <LanguageToggle
            language={language}
            setLanguage={(value) => setLanguage(value as Language)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
