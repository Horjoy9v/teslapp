import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

interface Award {
  name: string
  year: string
  count: number
  isPercentage?: boolean
}

interface RecognitionProps {
  language: "en" | "ru"
}

export default function Recognition({ language }: RecognitionProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [startCounting, setStartCounting] = useState(false)

  const content = {
    en: {
      title: "About us",
      description:
        "Our company provides legal services at the international level, specializing in the resolution of investment disputes and litigation between investors and various types of companies. We offer support at all stages of disputes, from pre-trial consultations to the enforcement of arbitration and court decisions. Our experience includes work with multilateral agreements and international conventions, which guarantees an effective solution to complex legal issues in the field of international law.",
      awards: [
        { name: "Cases Won", year: "2023", count: 98, isPercentage: true },
        { name: "Chambers & Partners", year: "2023", count: 20 },
        { name: "IFLR1000", year: "2023", count: 10 },
      ],
    },
    ru: {
      title: "Про нас",
      description:
        "Наша компания предоставляет юридические услуги на международном уровне, специализируясь на разрешении инвестиционных споров и судебных разбирательств между инвесторами и различного рода компаниями. Мы предлагаем поддержку на всех этапах споров, от досудебных консультаций до исполнения решений арбитражных и судебных инстанций. Наш опыт охватывает работу с многосторонними соглашениями и международными конвенциями, что гарантирует эффективное решение сложных юридических вопросов в сфере международного права.",
      awards: [
        { name: "Выиграных дел", year: " ", count: 98, isPercentage: true },
        { name: "Штат сотрудников", year: " ", count: 58 },
        { name: "Лет на рынке", year: " ", count: 15 },
      ],
    },
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      setStartCounting(true)
    }
  }, [controls, inView])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient"
        >
          {content[language].title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          variants={itemVariants}
          className="text-xl text-center mb-12 text-foreground"
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
              <h3 className="text-xl font-semibold mb-2 text-primary">{award.name}</h3>
              <p className="text-muted-foreground">{award.year}</p>
              <CountUp
                start={0}
                end={award.count}
                duration={2.5}
                separator=","
                useEasing={true}
                useGrouping={true}
                redraw={true}
                suffix={award.isPercentage ? "%" : ""}
              >
                {({ countUpRef }) => <span ref={countUpRef} className="text-3xl font-bold text-primary mt-4" />}
              </CountUp>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

