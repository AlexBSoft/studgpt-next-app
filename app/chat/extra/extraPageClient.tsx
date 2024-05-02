import type { NextComponentType, NextPageContext } from "next";
import ChatSideBar from "../chatSideBar";

interface Props { }

const ExtraPageClient: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    return (
        <>
            <ChatSideBar />
            <div className="relative h-screen w-full lg:ps-64">
                <div className="py-10 lg:py-14">

                    <span className="text-2xl font-bold block">Команды</span>

                    <span className="">Используйте в чате команды с префиксом "/". Они добавляют инструкцию (или роль) в начало сообщения, чтобы нейросеть следовала инструкциям в команде.

                    </span>



                    <span className="text-2xl font-bold block">Контексты (файлы)</span>

                    <span className="">Сохраняйте часто используемые данные в контексты, чтобы вставлять их в сообщение префиксом "@". Экономит ваше время, если часто приходится работать с одним куском текста.
                    </span>

                    В разработке...

                    <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
                        <button
                            type="button"
                            className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            data-hs-overlay="#application-sidebar"
                            aria-controls="application-sidebar"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                className="flex-shrink-0 size-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="3" x2="21" y1="6" y2="6"></line>
                                <line x1="3" x2="21" y1="12" y2="12"></line>
                                <line x1="3" x2="21" y1="18" y2="18"></line>
                            </svg>
                            <span>Меню</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtraPageClient