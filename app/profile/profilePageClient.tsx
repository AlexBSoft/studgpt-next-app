"use client";
import type { NextComponentType, NextPageContext } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  session: any;
}

const ProfilePageClient: NextComponentType<NextPageContext, {}, Props> = ({
  session,
}: Props) => {
  const [userName, setUserName] = useState(
    session.user.name.split(" ")[0] || ""
  );

  const saveUser = async () => {
    // const res = await fetch("/api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: userName }),
    // });
    // const data = await res.json();
    // console.log(data);
    toast.success("Сохранено!");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Профиль
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Настройки вашего профиля
        </p>
      </div>

      <form>
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
              Имя
            </label>
          </div>

          <div className="sm:col-span-9">
            <div className="sm:flex">
              <input
                id="af-account-full-name"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
              Email
            </label>
          </div>

          <div className="sm:col-span-9">
            <input
              id="af-account-email"
              type="email"
              className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              disabled
              value={session.user ? session.user?.email || "" : ""}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
              Пароль
            </label>
          </div>

          <div className="sm:col-span-9">
            <div className="space-y-2">
              <input
                id="af-account-password"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Введите текущий пароль"
              />
              <input
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Введите новый пароль"
              />
            </div>
          </div>

          {/* <div className="sm:col-span-3">
        <div className="inline-block">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
            Телефон
            </label>
        </div>
        </div>

          <div className="sm:col-span-9">
            <div className="sm:flex">
              <input
                id="af-account-phone"
                type="text"
                className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="+7(xxx)xxx-xx-xx"
              />
            </div>
          </div> */}
        </div>

        <div className="mt-5 flex justify-end gap-x-2">
          <Link
            href="/api/auth/signout"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Выйти из аккаунта
          </Link>
          <Link
            href="/chat"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Отменить
          </Link>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={saveUser}
          >
            Сохранить
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ProfilePageClient;
