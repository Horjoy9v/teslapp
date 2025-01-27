import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import { useCallback } from "react";

interface HeroProps {
  language: "en" | "ru";
}

export default function Hero({ language }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Law Firm 'Right'",
      subtitle: "Law firm with over fifteen years of experience.",
      cta: "Free consultation",
    },
    ru: {
      title: "Адвокатское Бюро 'Райт'",
      subtitle:
        "Юридическая компания с более чем пятнадцатилетним опытом работы.",
      cta: "Бесплатная консультация",
    },
  };

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient opacity-50"
        style={{ y }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-[#292f71]"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {content[language].title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-foreground"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {content[language].subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="button-primary px-48"
            onClick={scrollToContact}
          >
            {content[language].cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
