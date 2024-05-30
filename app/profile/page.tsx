import { auth } from "@/auth";
import type { NextComponentType, NextPageContext } from "next";
import ProfilePageClient from "./profilePageClient";
import { redirect } from "next/navigation";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = async (
  props: Props
) => {
  const session = await auth();

  console.log(session)

  // Redirect to login if not authenticated
  if (!session || !session?.user || !session.user.id) {
    return redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <ProfilePageClient session={session} />
    </div>
  );
};

export default Page;
