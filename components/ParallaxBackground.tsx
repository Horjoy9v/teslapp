import { motion } from "framer-motion";
import Image from "next/image";

const ParallaxBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
      {/* Задній фон залишатиметься фіксованим на екрані */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen z-[-1] blur-sm"
        style={{
          filter: "brightness(0.7)", // Світлий фільтр
        }}
      >
        <Image
          src="/bg_image.png"
          alt="Parallax background"
          quality={100}
          width={2304} // або встановити ширину зображення
          height={1296} // пропорційно встановити висоту
          className="object-cover w-full h-full bg-scroll"
        />
      </motion.div>

      {/* Ваша основна контентна частина */}
      <div className="relative z-10">
        {/* Весь інший контент, який буде прокручуватись */}
      </div>
    </div>
  );
};

export default ParallaxBackground;
