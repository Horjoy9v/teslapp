import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PrivacyPolicyDialogProps {
  language: "en" | "ru";
}

export function PrivacyPolicyDialog({ language }: PrivacyPolicyDialogProps) {
  const content = {
    en: {
      title: "Privacy Policy",
      description: "Our commitment to protecting your privacy",
      button: "Privacy Policy",
      policy: `
        <p>We collect information you provide directly to us, such as when you create an account, submit a form, or communicate with us.</p>
        
        <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.</p>

        <p>We do not share your personal information with third parties except as described in this policy.</p>

        <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

        <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
      `,
    },
    ru: {
      title: "Политика конфиденциальности",
      description: "Наше обязательство по защите вашей конфиденциальности",
      button: "Политика конфиденциальности",
      policy: `
        <p>Мы собираем информацию, которую вы предоставляете нам напрямую, например, при создании учетной записи, отправке формы или общении с нами.</p>
        <p>Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг, для общения с вами и для соблюдения юридических обязательств.</p>

        <p>Мы не передаем вашу личную информацию третьим лицам, за исключением случаев, описанных в этой политике.</p>

        <p>Мы принимаем разумные меры для защиты вашей личной информации от потери, кражи, неправомерного использования, несанкционированного доступа, раскрытия, изменения и уничтожения.</p>
        
        <p>У вас есть право на доступ, исправление или удаление вашей личной информации. Пожалуйста, свяжитесь с нами, если вы хотите воспользоваться этими правами.</p>
      `,
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal">
          {content[language].button}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{content[language].title}</DialogTitle>
          <DialogDescription>{content[language].description}</DialogDescription>
        </DialogHeader>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: content[language].policy }}
        />
      </DialogContent>
    </Dialog>
  );
}
