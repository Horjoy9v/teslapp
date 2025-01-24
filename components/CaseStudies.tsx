import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface CaseStudiesProps {
  language: "en" | "ru";
}

interface CaseStudy {
  title: string;
  description: string;
}

interface Content {
  title: string;
  description: string;
  cases: CaseStudy[];
  cta: string;
}

const content: Record<CaseStudiesProps["language"], Content> = {
  en: {
    title: "Case Studies",
    description: "We help our clients achieve their goals.",
    cases: [
      {
        title: "Corporate Restructuring",
        description: "Successfully restructured a multinational corporation.",
      },
      {
        title: "Intellectual Property Dispute",
        description: "Won a landmark case protecting our client's patents.",
      },
      {
        title: "International Arbitration",
        description:
          "Represented a client in a complex international arbitration.",
      },
    ],
    cta: "View All Cases",
  },
  ru: {
    title: "Кейсы",
    description: "Мы помогаем нашим клиентам достигать их целей.",
    cases: [
      {
        title: "Корпоративная Реструктуризация",
        description: "Успешно реструктурировали многонациональную корпорацию.",
      },
      {
        title: "Спор о Интеллектуальной Собственности",
        description: "Выиграли знаковое дело, защищая патенты нашего клиента.",
      },
      {
        title: "Международный Арбитраж",
        description: "Представляли клиента в сложном международном арбитраже.",
      },
    ],
    cta: "Посмотреть Все Кейсы",
  },
};

export default function CaseStudies({ language }: CaseStudiesProps) {
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
    <section ref={ref} className="py-16 bg-background/60 backdrop-blur-sm">
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
          {content[language].cases.map((caseStudy, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-800 text-gray-200 border border-gray-700">
                <CardHeader>
                  <CardTitle>{caseStudy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{caseStudy.description}</p>
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
