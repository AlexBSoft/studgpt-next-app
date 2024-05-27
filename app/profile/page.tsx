import { auth } from "@/auth";
import type { NextComponentType, NextPageContext } from "next";
import ProfilePageClient from "./profilePageClient";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = async (
  props: Props
) => {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <ProfilePageClient session={session} />
    </div>
  );
};

export default Page;
