import { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServicesProps {
  language: "en" | "ru";
}

export default function Services({ language }: ServicesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const content = {
    en: {
      title: "Our Services",
      services: [
        {
          title: "Filing applications with international bodies",
          description: [
            "Case analysis: examining the circumstances of the dispute and the legislation, determining the jurisdiction for filing the application.",
            "Preparation of documentation: collecting evidence, drafting legal arguments for submission to international bodies (arbitration courts, international tribunals).",
            "Authority selection: determining the most appropriate international body to resolve the dispute.",
            "Filing the application: formally submitting the initiation of the case to the chosen body.",
          ],
        },
        {
          title: "Obtaining a pre-trial solution",
          description: [
            "Mediation and negotiation: attempts to resolve the dispute through negotiations or mediation aimed at reaching a pre-trial agreement.",
            "Consultations: recommendations to the client on possible outcomes and settlement options.",
            "Pre-trial agreement: preparation and signing of a settlement agreement when reaching a compromise.",
          ],
        },
        {
          title: "Support for international proceedings",
          description: [
            "Legal support: representing the client in arbitration, coordination with international experts.",
            "Enforcement of decisions: recognition and enforcement of the arbitration award in the jurisdiction where the defendant's assets are located.",
            "Organization of return: ensuring the return of funds (freezing of assets, collection of funds, transfer to the client).",
          ],
        },
        {
          title: "Organization of return of funds",
          description: [
            "Freezing of assets: organizing the process of blocking the defendant's assets.",
            "Collection of funds: legal support for the collection process.",
            "Transfer of funds to the client: support for the transfer of returned funds.",
          ],
        },
        {
          title:
            "Protection of the rights of an individual in disputes with companies",

          description: [
            "Analysis of the client's rights: assessment of violations in accordance with international law and treaties.",
            "Consultations: development of a strategy for protecting interests and analysis of possible risks.",
            "Legal protection: representing the client's interests in negotiations, courts and at the stage of execution of decisions.",
          ],
        },
        {
          title: "Consultations on international disputes",
          description: [
            "Strategy development: dispute analysis, selection of optimal legal solutions.",
            "Legal advice: explanation of legislation and features of international law.",
            "Negotiation support: assistance in reaching agreements at all stages of the dispute.",
          ],
        },
      ],
    },
    ru: {
      title: "Наши Услуги",
      services: [
        {
          title: "Подача заявлений в международные органы",
          description: [
            "Анализ дела: изучение обстоятельств спора и законодательства, определение юрисдикции для подачи заявления.",
            "Подготовка документации: сбор доказательств, составление правовых аргументов для подачи в международные инстанции (арбитражные суды, международные трибуналы).",
            "Выбор органа: определение наиболее подходящего международного органа для разрешения спора.",
            "Подача заявления: формальная подача инициации дела в выбранную инстанцию.",
          ],
        },
        {
          title: "Получение досудебного решения",
          description: [
            "Медиация и переговоры: попытки урегулирования спора через переговоры или медиацию, направленные на достижение досудебного соглашения.",
            "Консультации: рекомендации клиенту по возможным исходам и вариантам урегулирования.",
            "Досудебное соглашение: подготовка и подписание мирового соглашения при достижении компромисса.",
          ],
        },
        {
          title: "Сопровождение международного процесса",
          description: [
            "Юридическое сопровождение: представление интересов клиента в арбитраже, координация с международными экспертами.",
            "Исполнение решений: признание и исполнение арбитражного решения в юрисдикции, где находятся активы ответчика.",
            "Организация возврата: обеспечение возврата денежных средств (заморозка активов, взыскание средств, перевод клиенту).",
          ],
        },
        {
          title: "Организация возврата денежных средств",
          description: [
            "Заморозка активов: организация процесса блокировки активов ответчика.",
            "Взыскание средств: юридическое обеспечение процесса взыскания.",
            "Перевод средств клиенту: сопровождение передачи возвращенных средств.",
          ],
        },
        {
          title: "Защита прав физического лица в спорах с компаниями",
          description: [
            "Анализ прав клиента: оценка нарушений в соответствии с международным правом и договорами.",
            "Консультации: разработка стратегии защиты интересов и анализ возможных рисков.",
            "Юридическая защита: представление интересов клиента в переговорах, судах и на этапе исполнения решений.",
          ],
        },
        {
          title: "Консультации по международным спорам",
          description: [
            "Разработка стратегии: анализ спора, выбор оптимальных юридических решений.",
            "Правовые рекомендации: разъяснение законодательства и особенностей международного права.",
            "Сопровождение переговоров: помощь в достижении соглашений на всех этапах спора.",
          ],
        },
      ],
    },
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };

      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      className="py-16 bg-background/70 backdrop-blur-sm overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#292f71]">
          {content[language].title}
        </h2>
        <div className="relative">
          {showLeftArrow && (
            <Button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          {showRightArrow && (
            <Button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
            }}
          >
            {content[language].services.map((service, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 scroll-snap-align-start"
              >
                <Card className="h-full transform transition-transform duration-300 hover:bg-background/50 hover:shadow-lg bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {service.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
