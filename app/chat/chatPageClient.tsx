"use client";
import type { NextComponentType, NextPageContext } from "next";
import ChatSideBar from "./chatSideBar";
import ChatBody from "./chatBody";

interface Props {}

const ChatPageClient: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  return (
    <div>
      <ChatSideBar />
      <ChatBody />
    </div>
  );
};

export default ChatPageClient;
