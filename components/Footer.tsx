import Link from "next/link";
import { motion } from "framer-motion";

interface FooterProps {
  language: "en" | "ru";
}

interface Content {
  about: string;
  services: string;
  cases: string;
  contact: string;
  rights: string;
  privacy: string;
  terms: string;
}

const content: Record<FooterProps["language"], Content> = {
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

export default function Footer({ language }: FooterProps) {
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
      className="bg-primary/60 backdrop-blur-sm text-primary-foreground"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              РАЙТ
            </h3>
            <p>© 2023 {content[language].rights}</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">
              {content[language].about}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  {content[language].about}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:underline">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">
              {content[language].services}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/corporate" className="hover:underline">
                  {content[language].services}
                </Link>
              </li>
              <li>
                <Link href="/services/litigation" className="hover:underline">
                  Litigation
                </Link>
              </li>
              <li>
                <Link href="/services/ip" className="hover:underline">
                  Intellectual Property
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">
              {content[language].contact}
            </h3>
            <ul className="space-y-2">
              <li>123 Law Street, City</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Email: info@wright-legal.com</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p>&copy; 2023 РАЙТ. {content[language].rights}.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:underline">
              {content[language].privacy}
            </Link>
            <Link href="/terms" className="hover:underline">
              {content[language].terms}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
