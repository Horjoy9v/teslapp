"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, "Ім'я повинно містити щонайменше 2 символи"),
  lastName: z.string().min(2, "Прізвище повинно містити щонайменше 2 символи"),
  patronymic: z
    .string()
    .min(2, "По батькові повинно містити щонайменше 2 символи"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Невірний формат номера телефону"),
  city: z.string().min(2, "Назва міста повинна містити щонайменше 2 символи"),
  problemDescription: z
    .string()
    .min(10, "Опис проблеми повинен містити щонайменше 10 символів"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "ru";
}

export default function ContactPopup({
  isOpen,
  onClose,
  language,
}: ContactPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      phoneNumber: "",
      city: "",
      problemDescription: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Тут ви можете додати логіку для відправки даних на сервер
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Імітація відправки на сервер
    setIsSubmitting(false);
    onClose();
  };

  const content = {
    en: {
      title: "Contact Us",
      firstName: "First Name",
      lastName: "Last Name",
      patronymic: "Patronymic",
      phoneNumber: "Phone Number",
      city: "City",
      problemDescription: "Problem Description",
      submit: "Submit",
    },
    ru: {
      title: "Свяжитесь с нами",
      firstName: "Имя",
      lastName: "Фамилия",
      patronymic: "Отчество",
      phoneNumber: "Номер телефона",
      city: "Город",
      problemDescription: "Описание проблемы",
      submit: "Отправить",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{content[language].title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].firstName}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].lastName}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patronymic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].patronymic}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].phoneNumber}</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].city}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {content[language].problemDescription}
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : content[language].submit}
                </Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
