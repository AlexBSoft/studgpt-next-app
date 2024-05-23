"use client";

import type { NextComponentType, NextPageContext } from "next";
import { RiRobot2Line } from "react-icons/ri";
import ChatInput from "./chatInput";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import MessageHuman from "./messageHuman";
import MessageBot from "./messageBot";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import ObjectId from "bson-objectid";
import {useModelStore} from "@/lib/stores/model.store";

interface Props {}

const commands = [
  { name: "extract", prompt: "Extract all facts from this text: " },
];

const contexts = [
  {
    name: "alex",
    prompt: "Alex is a cool man, he is a student, abc, etc ",
  },
  {
    name: "cats",
    prompt:
      "This cat has blue colors and it does not likes fish. But i like this cat. It is not mine",
  },
];

const normalizeGeminiPrompt = (messages: any) => {
  return messages.map((message: any) => {
    // Create a copy of the message object without the `original` field
    const newMessage = { ...message };
    delete newMessage.original;
    return newMessage;
  });
};

const ChatBody: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const session = useSession();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string>("");

  const model = useModelStore((state) => state.model)

  const getChatMessages = async (chatId: string) => {
    // If logged in - get chat from server
    if (session.status === "authenticated" && chatId != "" && chatId != null) {
      const r = await fetch("/api/messages?chat=" + chatId);
      const _lastMsg = await r.json();
      console.log("Chat messages", _lastMsg);
      if (_lastMsg) setMessages([..._lastMsg.messages, _lastMsg.result]);
      if(!_lastMsg) setMessages([])
    } else {
      const chat = localStorage.getItem(params.get("chat") || "");
      if (chat) {
        setMessages(JSON.parse(chat));
      }
    }
  };

  useEffect(() => {
    console.log("Use Effect");
    if (params.get("chat")) {
      console.log("Chat set");
      setChatId(params.get("chat")!);

      getChatMessages(params.get("chat")!);
    } else {
      const _chatId = new ObjectId().toHexString();
      router.push(pathname + `?chat=${_chatId}`);
    }
  }, [params]);

  const askBot = async (message: string) => {
    setLoading(true);

    // Convert message to raw prompt - by executing commands and adding context
    let rawPrompt = message;

    // parse commands
    for (const command of commands) {
      if (rawPrompt.includes("/" + command.name)) {
        rawPrompt = rawPrompt.replace("/" + command.name, "");
        rawPrompt = command.prompt + rawPrompt;
        console.log("Command ", command.name, " executed!");
      }
    }

    // parse contexts
    for (const context of contexts) {
      if (rawPrompt.includes("@" + context.name)) {
        rawPrompt = rawPrompt.replace("@" + context.name, context.prompt);
        console.log("Context ", context.name, " added!");
      }
    }

    let messagesWithMessage = [
      ...messages,
      { role: "user", parts: { text: rawPrompt }, original: message },
    ];

    console.log("messages", messages);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //model: "ollama-wizardlm2",
          model: model,
          chatId: chatId,
          messages: normalizeGeminiPrompt(messagesWithMessage),
          //user: session.data ? session.data.user?.id : null,
          stream: false,
        }),
      });
      const data = await response.json();

      if(data.error || !data.message) {
        setLoading(false);
        toast.error(data.error);
        return
      }

      setLoading(false);

      // If this is was first message - add chat to sidebar
      if (messagesWithMessage.length == 1)
        localStorage.setItem(
          "chats",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("chats") || "[]"),
            { id: chatId, name: message, date: Date.now() },
          ])
        );

      await setMessages([...messagesWithMessage, data.message]);

      // Set this chat to local storage
      localStorage.setItem(
        chatId,
        JSON.stringify([...messagesWithMessage, data.message])
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Ошибка генерации");
    }
  };

  return (
    <div className="relative h-screen w-full lg:ps-64">
      <div className="py-10 lg:py-14">
        <ul className="mt-16 space-y-5">
          {messages.length === 0 && (
            <li
              className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4"
              key="start"
            >
              <RiRobot2Line className="w-[2.375rem] h-[2.375rem] p-1 rounded-full bg-blue-500 text-white" />

              <div className="space-y-3">
                <h2 className="font-medium text-gray-800 dark:text-white">
                  Спроси о чем угодно
                </h2>
                <div className="space-y-1.5">
                  <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                    Нейросеть отвечает на любой текстовый запрос:
                  </p>
                  <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                    <li className="text-sm text-gray-800 dark:text-white">
                      Как долететь до луны?
                    </li>

                    <li className="text-sm text-gray-800 dark:text-white">
                      Как решить задачу?
                    </li>

                    <li className="text-sm text-gray-800 dark:text-white">
                      Помоги написать код на python?
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          )}
          {/* {JSON.stringify(messages)} */}

          {messages.map((message: any, index: number) => (
            <div key={index}>
              {message.role === "user" ? (
                <MessageHuman
                  
                  original={message.original}
                  raw={message.parts.text}
                />
              ) : (
                <MessageBot content={message.parts.text} />
              )}
           </div>
          ))}

          {loading && (
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </ul>
      </div>

      <ChatInput askBot={askBot} isLoading={loading} />
      <Toaster />
    </div>
  );
};

export default ChatBody;
