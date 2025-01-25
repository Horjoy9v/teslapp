"use client";

import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

interface ContactFormProps {
  language: "en" | "ru";
}

export default function ContactForm({ language }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
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
      submitting: "Submitting...",
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
      submitting: "Отправка...",
    },
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-16 bg-background/60 backdrop-blur-sm overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
          {content[language].title}
        </h2>
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].firstName}</FormLabel>
                      <FormControl>
                        <Input {...field} className="input-primary" />
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
                        <Input {...field} className="input-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="patronymic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content[language].patronymic}</FormLabel>
                      <FormControl>
                        <Input {...field} className="input-primary" />
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
                        <Input
                          {...field}
                          type="tel"
                          className="input-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content[language].city}</FormLabel>
                    <FormControl>
                      <Input {...field} className="input-primary" />
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
                      <Textarea {...field} className="input-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full button-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? content[language].submitting
                  : content[language].submit}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.section>
  );
}
