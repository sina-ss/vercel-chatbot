"use client";

import { useChat } from "ai/react";
import { cn } from "../lib/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Message = {
  id: string;
  createdAt?: Date;
  content: string;
  role: "system" | "user" | "assistant" | "function";
  /**
   * If the message has a role of `function`, the `name` field is the name of the function.
   * Otherwise, the name field should not be set.
   */
  name?: string;
  /**
   * If the assistant role makes a function call, the `function_call` field
   * contains the function call name and arguments. Otherwise, the field should
   * not be set.
   */
};

export default function Chat() {
  const router = usePathname();
  const { messages, input, append, handleInputChange, handleSubmit } =
    useChat(); // Destructured setMessages from useChat

  const pathSegments = router.split("/");
  useEffect(() => {
    if (messages.length === 0) {
      const [_, chatSegment, ...params] = pathSegments;

      const apiUrl =
        chatSegment !== "chat"
          ? `https://server.eyesp.live/api/v1/dashboard/get-issue-stats/info/${chatSegment}/${params.join(
              "/"
            )}`
          : `https://server.eyesp.live/api/v1/dashboard/get-issue-stats/info/${params.join(
              "/"
            )}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          if (data && data.status) {
            const newMessage: Message = {
              id: uuidv4(),
              createdAt: new Date(),
              content: data.data.substring(0, 150),
              role: "user", // This is now correctly typed
            };
            append(newMessage);
          }
        })
        .catch((error) => {
          console.error("Error fetching message:", error);
        });
    }
  }, [messages.length, append]); // Added messages.length as a dependency

  return (
    <div className="flex flex-col items-center w-[80%] h-full py-24 px-6 mx-auto stretch bg-[#1A1A1A] rounded-xl">
      <h2 className="text-neutral-50">ربات متخصص</h2>
      {messages.length > 0
        ? messages.map((m) => (
            <div
              key={m.id}
              className={cn("whitespace-pre-wrap text-neutral-50 my-2", {
                "self-start bg-[#0C6087] px-7 py-4 rounded-xl max-w-[60%]":
                  m.role === "user",
                "self-end bg-[#262626] px-7 py-4 rounded-xl max-w-[60%]":
                  m.role != "user",
              })}
            >
              {m.content}
            </div>
          ))
        : null}

      <form
        onSubmit={handleSubmit}
        className="fixed w-full bottom-0 text-center"
      >
        <input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="گفت و گو را از اینجا شروع کنید..."
          onChange={handleInputChange}
        >
          <button>بفرست</button>
        </input>
      </form>
    </div>
  );
}
