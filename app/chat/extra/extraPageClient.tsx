"use client";
import type { NextComponentType, NextPageContext } from "next";
import ChatSideBar from "../chatSideBar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface Props {}

const ExtraPageClient: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const [documents, setDocuments] = useState([]);

  const [newDocumentName, setNewDocumentName] = useState("");
  const [newDocumentContent, setNewDocumentContent] = useState("");

  const fetchDocuments = async () => {
    const res = await fetch("/api/documents");
    const data = await res.json();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const addDocument = async () => {
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: newDocumentName,
        text: newDocumentContent,
      }),
    });
    const data = await res.json();
    setNewDocumentContent("")
    setNewDocumentName("")
    fetchDocuments();
  };

  const deleteDocument = async (id: any) => {
    let yes = confirm("Точно удалить?");

    if (yes) {
      const res = await fetch(`/api/documents/delete?id=${id}`, {
        method: "GET"});
        fetchDocuments();
      }

  };

  return (
    <>
      <ChatSideBar />
      <div className="relative h-screen w-full lg:ps-64 ">
        <div className="py-10 lg:py-14 container">
          {/* <span className="text-2xl font-bold block">Команды</span>
          <span className="">
            Используйте в чате команды с префиксом "/". Они добавляют инструкцию
            (или роль) в начало сообщения, чтобы нейросеть следовала инструкциям
            в команде.
          </span> */}
          <span className="text-2xl font-bold block">Контексты (файлы)</span>
          <div className="">
            <span>
              Сохраняйте часто используемые данные в контексты, чтобы вставлять
              их в сообщение префиксом "@". Экономит ваше время, если часто
              приходится ботать с одним куском текста.
            </span>

            <div>
              <input type="text" className="mb-2 p-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm" placeholder="Название документа." value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}/>
              <textarea
                className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Текст документа."
                value={newDocumentContent}
                onChange={(e) => setNewDocumentContent(e.target.value)}
              ></textarea>

              <button
                type="button"
                className="mt-2 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={addDocument}
              >
                Сохранить
              </button>

            </div>
            <div className="mt-4">
              {documents.map((document: any) => (
                <div key={document._id} className="rounded-lg border border-gray-200 p-4">
                  <span className="block gap-2">
                    <span className="font-bold ">{document.fileName}</span>
                    
                    <span className="ml-3 text-red-500 cursor-pointer text-sm" onClick={()=>deleteDocument(document._id)}>Удалить</span>
                  </span> 
                  <span className="whitespace-pre">{document.text}</span>
                  
                </div>
              ))}
            </div>
          </div>
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
        <Toaster />
      </div>
    </>
  );
};

export default ExtraPageClient;
