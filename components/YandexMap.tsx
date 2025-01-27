import { useEffect, useRef, useState } from "react";

interface YandexMapProps {
  apiKey: string;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps: any;
  }
}

const YandexMap: React.FC<YandexMapProps> = ({
  apiKey,
  center = [56.24476, 43.443578],
  zoom = 16,
  className = "w-full h-96",
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapLoaded) {
      const loadYandexMaps = () => {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.type = "text/javascript";
        script.onload = () => {
          setMapLoaded(true);
        };
        document.head.appendChild(script);
      };

      loadYandexMaps();
    } else if (window.ymaps) {
      window.ymaps.ready(() => {
        if (mapContainer.current) {
          const map = new window.ymaps.Map(mapContainer.current, {
            center,
            zoom,
          });

          const placemark = new window.ymaps.Placemark(center, {
            hintContent: "Адвокатское Бюро 'Райт'",
          });

          map.geoObjects.add(placemark);
        }
      });
    }
  }, [apiKey, center, zoom, mapLoaded]);

  return <div ref={mapContainer} className={className} />;
};

export default YandexMap;
