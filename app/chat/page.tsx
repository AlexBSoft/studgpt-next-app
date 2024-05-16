import type { NextComponentType, NextPageContext } from "next";
import ChatPageClient from "./chatPageClient";
import { Suspense } from "react";
import SessionWrapper from "@/components/SessionWrapper";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <Suspense>
      <SessionWrapper>
        <ChatPageClient />
      </SessionWrapper>
    </Suspense>
  );
};

export default Page;
