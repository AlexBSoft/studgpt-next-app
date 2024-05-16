"use client";
import type { NextComponentType, NextPageContext } from "next";
import { FaTelegramPlane, FaYandex } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface Props {}

const AuthPageClient: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  return (
    <button
      onClick={() => signIn("yandex", { callbackUrl: "/chat" })}
      type="button"
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
    >
      <FaYandex className="w-4 h-auto text-red-600" />
      Войти через Яндекс
    </button>
  );
};

export default AuthPageClient;
