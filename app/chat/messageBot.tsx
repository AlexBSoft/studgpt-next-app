"use client";
import type { NextComponentType, NextPageContext } from "next";
import { RiRobot2Line } from "react-icons/ri";
import Markdown from "react-markdown";

interface Props {
  content: string;
}

const MessageBot: NextComponentType<NextPageContext, {}, Props> = ({
  content,
}: Props) => {
  return (
    <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
      <RiRobot2Line className="w-[2.375rem] h-[2.375rem] p-1 rounded-full bg-blue-500 text-white" />
      <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
        <p className="text-gray-800 dark:text-neutral-200">
          <Markdown>{content}</Markdown>
        </p>
      </div>
    </li>
  );
};

export default MessageBot;
