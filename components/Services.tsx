import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface ServicesProps {
  language: "en" | "ru";
}

export default function Services({ language }: ServicesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Our Services",
      services: [
        {
          title: "Corporate Law",
          description: "Expert advice on all aspects of corporate law.",
        },
        {
          title: "Litigation",
          description:
            "Representing clients in court and arbitration proceedings.",
        },
        {
          title: "Intellectual Property",
          description:
            "Protection and management of intellectual property rights.",
        },
        {
          title: "Real Estate",
          description:
            "Comprehensive legal services for real estate transactions.",
        },
        {
          title: "Tax Law",
          description: "Strategic tax planning and dispute resolution.",
        },
        {
          title: "Employment Law",
          description:
            "Guidance on employment regulations and dispute resolution.",
        },
      ],
    },
    ru: {
      title: "Наши Услуги",
      services: [
        {
          title: "Подача заявлений в международные органы",
          description:
            "Анализ дела: изучение обстоятельств спора и законодательства, определение юрисдикции для подачи заявления.",
        },
        {
          title: "Судебные разбирательства",
          description:
            "Представление интересов клиентов в суде и арбитражных разбирательствах.",
        },
        {
          title: "Интеллектуальная собственность",
          description:
            "Защита и управление правами интеллектуальной собственности.",
        },
        {
          title: "Недвижимость",
          description:
            "Комплексные юридические услуги по сделкам с недвижимостью.",
        },
        {
          title: "Налоговое право",
          description:
            "Стратегическое налоговое планирование и разрешение споров.",
        },
        {
          title: "Трудовое право",
          description:
            "Консультации по трудовому законодательству и разрешение споров.",
        },
      ],
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % content[language].services.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [language]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      id="services"
      className="py-16 bg-background/60 backdrop-blur-sm overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient"
        >
          {content[language].title}
        </motion.h2>
        <div className="relative">
          <motion.div
            className="flex transition-all duration-500 ease-in-out"
            animate={{
              x: `-${currentIndex * (100 / 3)}%`,
            }}
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            {[
              ...content[language].services,
              ...content[language].services.slice(0, 2),
            ].map((service, index) => (
              <motion.div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                initial="hidden"
                animate={controls}
                variants={cardVariants}
              >
                <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
