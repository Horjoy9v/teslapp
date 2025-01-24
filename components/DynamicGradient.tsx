import { useState, useEffect } from "react";

export default function DynamicGradient() {
  const [color1, setColor1] = useState([26, 26, 46]);
  const [color2, setColor2] = useState([22, 33, 62]);

  const [direction1, setDirection1] = useState([1, 1, 1]);
  const [direction2, setDirection2] = useState([1, 1, 1]);

  const step = 2; // Швидкість зміни кольору
  const maxColorValue = 180; // Максимальне значення (темніший колір)
  const minColorValue = 20; // Мінімальне значення (темніший колір)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Оновлюємо перший колір
      setColor1((prevColor) =>
        prevColor.map((value, index) => {
          const newValue = value + step * direction1[index];
          if (newValue >= maxColorValue || newValue <= minColorValue) {
            setDirection1((prevDir) => {
              const updatedDir = [...prevDir];
              updatedDir[index] *= -1; // Змінюємо напрямок
              return updatedDir;
            });
          }
          return Math.max(minColorValue, Math.min(maxColorValue, newValue));
        })
      );

      // Оновлюємо другий колір
      setColor2((prevColor) =>
        prevColor.map((value, index) => {
          const newValue = value + step * direction2[index];
          if (newValue >= maxColorValue || newValue <= minColorValue) {
            setDirection2((prevDir) => {
              const updatedDir = [...prevDir];
              updatedDir[index] *= -1; // Змінюємо напрямок
              return updatedDir;
            });
          }
          return Math.max(minColorValue, Math.min(maxColorValue, newValue));
        })
      );
    }, 100); // Часовий інтервал у мілісекундах

    return () => clearInterval(intervalId); // Очищення інтервалу
  }, [direction1, direction2]);

  return (
    <div
      className="fixed inset-0 z-[-1]"
      style={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(to right, rgb(${color1.join(
          ","
        )}), rgb(${color2.join(",")}))`,
      }}
    ></div>
  );
}
