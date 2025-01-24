import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Award } from "lucide-react";

interface RecognitionProps {
  language: "en" | "ru";
}

interface Award {
  name: string;
  year: string;
  count: number;
}

interface Content {
  title: string;
  description: string;
  awards: Award[];
}

const content: Record<RecognitionProps["language"], Content> = {
  en: {
    title: "Professional Recognition",
    description:
      "Our experience is confirmed by reputable world rating agencies.",
    awards: [
      { name: "The Legal 500", year: "2023", count: 15 },
      { name: "Chambers & Partners", year: "2023", count: 20 },
      { name: "IFLR1000", year: "2023", count: 10 },
    ],
  },
  ru: {
    title: "Профессиональное Признание",
    description:
      "Наш опыт подтвержден авторитетными мировыми рейтинговыми агентствами.",
    awards: [
      { name: "The Legal 500", year: "2023", count: 15 },
      { name: "Chambers & Partners", year: "2023", count: 20 },
      { name: "IFLR1000", year: "2023", count: 10 },
    ],
  },
};

export default function Recognition({ language }: RecognitionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          {content[language].title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          variants={itemVariants}
          className="text-xl text-center mb-12"
        >
          {content[language].description}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content[language].awards.map((award, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <Award size={48} className="mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{award.name}</h3>
              <p>{award.year}</p>
              <CountUp
                start={0}
                end={award.count}
                duration={2.5}
                separator=","
                className="text-3xl font-bold text-primary mt-4"
              />
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Recognitions" : "Признаний"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
