import { auth } from "@/auth";

export const GET = async (req: Request) => {
  const session = await auth();

  console.log(session);

  if (!session) return new Response("Not authorized");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}chats?user=${session?.user?.id}`
  );
  const r = await response.text();

  return new Response(r);
};
