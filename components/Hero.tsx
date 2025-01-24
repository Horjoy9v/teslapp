import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";

interface HeroProps {
  language: "en" | "ru"; // Обмежуємо значення можливими ключами об'єкта content
}

export default function Hero({ language }: HeroProps) {
  const { scrollY } = useScroll();

  // Фон буде рухатися швидше
  const yBackground = useTransform(scrollY, [0, 500], [0, 250]);

  // Текст буде рухатися повільніше
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yBtn = useTransform(scrollY, [0, 800], [0, 20]);
  const scaleBtn = useTransform(scrollY, [0, 800], [1, 3]);
  // Прозорість для тексту, яка змінюється при прокручуванні
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  const content = {
    en: {
      title: "Law with a special touch.",
      subtitle:
        "Wright is a law firm with more than twenty years of experience.",
      cta: "Learn More",
    },
    ru: {
      title: "Закон с особым подходом.",
      subtitle:
        "Райт - юридическая фирма с более чем двадцатилетним опытом работы.",
      cta: "Узнать больше",
    },
  } as const;

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Фон з паралаксом */}
      <motion.div
        className="absolute inset-0 bg-transparent/65 opacity-50"
        style={{ y: yBackground }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Заголовок з повільнішим рухом і плавною прозорістю */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
          style={{ y: yText, opacity: opacityText }} // Стиль паралаксу та прозорості для заголовку
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          {content[language].title}
        </motion.h1>
        {/* Підзаголовок з аналогічним паралаксовим ефектом і прозорістю */}
        <motion.p
          className="text-xl md:text-2xl mb-8 text-white/80"
          style={{ y: yText, opacity: opacityText }} // Теж застосовуємо повільніший рух та прозорість
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
        >
          {content[language].subtitle}
        </motion.p>
        {/* Кнопка */}
        <motion.div
          style={{ y: yBtn, opacity: opacityText, scale: scaleBtn }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.7 }}
        >
          <Button className="mt-4 px-16 py-8 text-xl bg-white/40 hover:bg-white/60 text-white backdrop-blur-sm shadow-lg hover:shadow-xl rounded-lg transition-transform transform hover:scale-105">
            {content[language].cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
