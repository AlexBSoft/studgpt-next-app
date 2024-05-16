import { auth } from "@/auth";

export const POST = async (req: Request) => {
  const session = await auth();

  console.log(session);
  const data = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: data.model,
        chatId: data.chatId,
        messages: data.messages,
        user: session ? session.user?.id : null,
        stream: false,
      }),
    }
  );
  const r = await response.text();

  return new Response(r);
};
