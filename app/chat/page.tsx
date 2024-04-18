import type { NextComponentType, NextPageContext } from "next";
import ChatPageClient from "./chatPageClient";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <div>
      <ChatPageClient />
    </div>
  );
};

export default Page;
