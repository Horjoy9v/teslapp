import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TermsOfServiceDialogProps {
  language: "en" | "ru";
}

export function TermsOfServiceDialog({ language }: TermsOfServiceDialogProps) {
  const content = {
    en: {
      title: "Terms of Service",
      description:
        "Please read these terms carefully before using our services",
      button: "Terms of Service",
      terms: `
        <p>By accessing or using our services, you agree to be bound by these Terms of Service.</p>

        <p>We provide legal services as described on our website. We reserve the right to modify or discontinue any part of our services at any time.</p>

        <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

        <p>All content and materials available on our website are the property of our law firm and are protected by applicable intellectual property laws.</p>

        <p>We are not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.</p>
      `,
    },
    ru: {
      title: "Условия использования",
      description:
        "Пожалуйста, внимательно прочитайте эти условия перед использованием наших услуг",
      button: "Условия использования",
      terms: `
        
        <p>Получая доступ к нашим услугам или используя их, вы соглашаетесь соблюдать настоящие Условия использования.</p>
        
        <p>Мы предоставляем юридические услуги, как описано на нашем веб-сайте. Мы оставляем за собой право изменять или прекращать любую часть наших услуг в любое время.</p>
        
        <p>Вы несете ответственность за сохранение конфиденциальности информации вашей учетной записи и за все действия, которые происходят под вашей учетной записью.</p>
        
        <p>Весь контент и материалы, доступные на нашем веб-сайте, являются собственностью нашей юридической фирмы и защищены применимыми законами об интеллектуальной собственности.</p>
        
        <p>Мы не несем ответственности за любые косвенные, случайные, специальные, последующие или штрафные убытки, возникшие в результате использования вами наших услуг.</p>
      `,
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-2 h-auto font-normal">
          {content[language].button}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto space-x-2">
        <DialogHeader>
          <DialogTitle>{content[language].title}</DialogTitle>
          <DialogDescription>{content[language].description}</DialogDescription>
        </DialogHeader>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: content[language].terms }}
        />
      </DialogContent>
    </Dialog>
  );
}
