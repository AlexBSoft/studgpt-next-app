import { auth } from "@/auth";

export const GET = async (req: Request) => {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}rag/delete?id=${id}`, {method: "POST"} )
    const r = await response.text();

    return new Response(r);
}
 