"use client";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";

interface Props {
  original: string | null;
  raw: string;
}

const MessageHuman: NextComponentType<NextPageContext, {}, Props> = ({
  original,
  raw,
}: Props) => {
  const [view, setView] = useState(false);
  return (
    <li className="py-2 sm:py-4">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
          <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
            <span className="text-sm font-medium text-white leading-none">
              ME
            </span>
          </span>

          <div className="grow mt-2 space-y-3">
            <div className="text-gray-800 dark:text-neutral-200">
              {original ? (view ? raw : original) : raw}
            </div>
          </div>
        </div>
        <div className="sm:flex sm:justify-between">
          <div></div>

          <div className="mt-1 sm:mt-0">
            {original && original != raw && (
              <button
                onClick={() => setView(!view)}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                View raw prompt
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MessageHuman;
