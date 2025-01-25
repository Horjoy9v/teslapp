import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface InsightsProps {
  language: "en" | "ru";
}

export default function Insights({ language }: InsightsProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Good to know",
      description:
        "Get important facts, useful tips and relevant information for every day.",
      articles: [
        {
          title: "What is MiFID II",
          date: "14 November 2017",
          description:
            "MiFID II is a legislative framework instituted by the European Union to regulate financial markets and improve protections for investors.",
        },
        {
          title: "What is the StAR Initiative",
          date: "28 April 2023",
          description:
            "The Stolen Asset Recovery Initiative (StAR) is a partnership between the World Bank Group and the United Nations Office on Drugs and Crime that supports international efforts to end safe havens for corrupt funds.",
        },
        {
          title: "MIGA - Multilateral Investment Guarantee Agency",
          date: "3 May 2024",
          description:
            "MIGA is a member of the World Bank Group that promotes foreign direct investment in developing countries by providing political risk insurance (guarantees) to investors and lenders.",
        },
      ],
    },
    ru: {
      title: "Полезно знать",
      description:
        "Узнавайте важные факты, полезные советы и актуальную информацию для каждого дня.",
      articles: [
        {
          title: "Что такое MiFID II",
          date: "14 ноября 2017",
          description:
            "MiFID II - это законодательная база, созданная Европейским Союзом для регулирования финансовых рынков и улучшения защиты инвесторов.",
        },
        {
          title: "Что такое Инициатива StAR",
          date: "28 апреля 2023",
          description:
            "Инициатива по возвращению похищенных активов (StAR) - это партнерство между Группой Всемирного банка и Управлением ООН по наркотикам и преступности, которое поддерживает международные усилия по прекращению существования безопасных убежищ для коррупционных фондов.",
        },
        {
          title: "МИГА - Многостороннее инвестиционное гарантийное агентство",
          date: "3 мая 2024",
          description:
            "МИГА - член Группы Всемирного банка, который способствует прямым иностранным инвестициям в развивающиеся страны, предоставляя страхование от политических рисков (гарантии) инвесторам и кредиторам.",
        },
      ],
    },
  };

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
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient"
        >
          {content[language].title}
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-xl text-center mb-12 text-foreground"
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
              <Popover>
                <PopoverTrigger asChild>
                  <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card text-card-foreground cursor-pointer">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{article.date}</p>
                    </CardContent>
                  </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p>{article.description}</p>
                </PopoverContent>
              </Popover>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
