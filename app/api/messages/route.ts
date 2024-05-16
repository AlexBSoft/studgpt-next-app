import { auth } from "@/auth";

export const GET = async (req: Request) => {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const chat = searchParams.get("chat");

  console.log(session);

  if (!session) return new Response("Not authorized");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}messages?chat=${chat}`
  );
  const r = await response.text();

  return new Response(r);
};
