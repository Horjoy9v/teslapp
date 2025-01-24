import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface InsightsProps {
  language: "en" | "ru";
}

interface Article {
  title: string;
  date: string;
}

interface Content {
  title: string;
  description: string;
  articles: Article[];
  cta: string;
}

const content: Record<InsightsProps["language"], Content> = {
  en: {
    title: "Insights",
    description:
      "Stay up to date with the latest news, announcements and events.",
    articles: [
      { title: "The Future of Corporate Law", date: "May 15, 2023" },
      {
        title: "Navigating International Trade Regulations",
        date: "April 28, 2023",
      },
      {
        title: "Cybersecurity and Data Protection: Legal Challenges",
        date: "April 10, 2023",
      },
    ],
    cta: "View All Insights",
  },
  ru: {
    title: "Аналитика",
    description: "Будьте в курсе последних новостей, объявлений и событий.",
    articles: [
      { title: "Будущее Корпоративного Права", date: "15 мая 2023" },
      {
        title: "Навигация по Международным Торговым Правилам",
        date: "28 апреля 2023",
      },
      {
        title: "Кибербезопасность и Защита Данных: Юридические Проблемы",
        date: "10 апреля 2023",
      },
    ],
    cta: "Посмотреть Всю Аналитику",
  },
};

export default function Insights({ language }: InsightsProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    <section ref={ref} className="py-16 bg-gray-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        >
          {content[language].title}
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-xl text-center mb-12 text-gray-300"
        >
          {content[language].description}
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {content[language].articles.map((article, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-800 text-gray-200 border border-gray-700">
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{article.date}</p>
                  <motion.div
                    className="mt-4 text-blue-400"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="inline-block mr-2" />
                    <span>
                      {language === "en" ? "Read more" : "Читать далее"}
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {content[language].cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
