import { motion } from "framer-motion";
import YandexMap from "./YandexMap";
import { PrivacyPolicyDialog } from "./PrivacyPolicyDialog";
import { TermsOfServiceDialog } from "./TermsOfServiceDialog";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 text-gradient">РАЙТ</h3>
            <p>Адвокатское Бюро</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 flex justify-center"
          >
            <YandexMap apiKey={""} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-1 text-right"
          >
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
          <p className="text-left w-full md:w-auto">
            &copy; 2025 РАЙТ. {content[language].rights}.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <PrivacyPolicyDialog language={language} />
            <TermsOfServiceDialog language={language} />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
