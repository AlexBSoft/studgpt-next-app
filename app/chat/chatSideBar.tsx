"use client";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import ModelModal from "./modelModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdLogin } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
interface Props {}

const ChatSideBar: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const [chats, setChats] = useState<any>([]);
  const session = useSession();

  const updateChats = async () => {
    //  If logged in - get chats from backend
    if (session.status === "authenticated") {
      const r = await fetch("/api/chats");
      setChats(await r.json());
    } else {
      const _chats = JSON.parse(localStorage.getItem("chats") || "[]");

      setChats(_chats);
    }
  };

  useEffect(() => {
    updateChats();
  }, []);

  return (
    <div
      id="application-sidebar"
      className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 open opened"
    >
      <nav
        className="hs-accordion-group size-full flex flex-col"
        data-hs-accordion-always-open=""
      >
        <div className="flex items-center justify-between pt-4 pe-4 ps-7"></div>

        <div className="h-full">
          <ul className="space-y-1.5 p-4">
            <li>
              <a
                className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                href="/chat"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Новый чат
              </a>
            </li>

            {chats &&
              chats.map((chat: any, i: number) => (
                <li key={i}>
                  <Link
                    href={`/chat?chat=${chat.id}`}
                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {chat.name.slice(0, 25)}
                  </Link>
                </li>
              ))}

            <li>
              <Link
                className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                href="/chat/extra"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Контексты и команды
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <div className="py-2.5 px-7">
            <ModelModal>
              <p className="inline-flex items-center gap-x-2 text-xs text-green-600 cursor-pointer">
                <span className="block size-1.5 rounded-full bg-green-600"></span>
                Модель: GeminiPro
              </p>
            </ModelModal>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
            {!session.data ? (
              <Link
                href="/auth/login"
                className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Войти в аккаунт
                <MdLogin className="flex-shrink-0 size-4" />
              </Link>
            ) : (
              <Link
                href="/profile"
                className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Профиль
                <BsPerson className="flex-shrink-0 size-4" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChatSideBar;
