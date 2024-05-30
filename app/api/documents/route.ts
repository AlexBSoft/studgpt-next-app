import { auth } from "@/auth";

export const POST = async (req: Request) => {
  const session = await auth();

  console.log(session);
  const data = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}rag/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: data.fileName,
        text: data.text,
        user: session ? session.user?.id : null,
      }),
    }
  );
  const r = await response.text();

  return new Response(r);
};

export const GET = async (req: Request) => {
    const session = await auth();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}rag/documents?user=${session ? session.user?.id : null}`)
    const r = await response.text();

    return new Response(r);
}

