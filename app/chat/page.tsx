import type { NextComponentType, NextPageContext } from "next";
import ChatPageClient from "./chatPageClient";
import { Suspense } from "react";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <Suspense>
      <ChatPageClient />
    </Suspense>
  );
};

export default Page;
