import Link from "next/link";
import { motion } from "framer-motion";

interface FooterProps {
  language: "en" | "ru";
}

export default function Footer({ language }: FooterProps) {
  const content = {
    en: {
      about: "About Us",
      services: "Services",
      cases: "Cases",
      contact: "Contact",
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    ru: {
      about: "О нас",
      services: "Услуги",
      cases: "Кейсы",
      contact: "Контакты",
      rights: "Все права защищены",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="bg-background text-foreground py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-gradient">РАЙТ</h3>
            <p>© 2025 {content[language].rights}</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2">
              <li></li>
              <li></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">
              {content[language].contact}
            </h3>
            <ul className="space-y-2">
              <li>606023, Нижегородская обл., г. Дзержинск,</li>
              <li>ул. Бутлерова, д. 19 пом. П1</li>
              <li>email@bleb.com</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p>&copy; 2025 РАЙТ. {content[language].rights}.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              {content[language].privacy}
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              {content[language].terms}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
