import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);

    // Перевірка на необхідні поля
    if (
      !body.firstName ||
      !body.lastName ||
      !body.phoneNumber ||
      !body.city ||
      !body.problemDescription
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Створення нового submission
    const submission = await prisma.submission.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        patronymic: body.patronymic || "", // Якщо відсутнє, надається пусте значення
        phoneNumber: body.phoneNumber,
        city: body.city,
        problemDescription: body.problemDescription,
      },
    });

    console.log("Data saved successfully:", submission);

    return new Response(JSON.stringify({ success: true, submission }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
