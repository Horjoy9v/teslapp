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

export default function ContactForm() {
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
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="w-full ">
      <div className="w-full mx-auto bg-primary/60 backdrop-blur-sm rounded-lg shadow-xl p-6 ">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Contact Us
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
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
                  <FormLabel className="text-white">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
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
                  <FormLabel className="text-white">Patronymic</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
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
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
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
                  <FormLabel className="text-white">City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
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
                  <FormLabel className="text-white">
                    Problem Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-white bg-opacity-70 border border-gray-300 text-black placeholder-gray-500 rounded-md p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-transparent text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white py-3 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
