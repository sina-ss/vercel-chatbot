"use client";

import { useChat } from "ai/react";
import { cn } from "./lib/utils";
import HistoryCard from "./components/HistoryCard";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  return (
    <main className="flex flex-row w-full h-full gap-5">
      <section className="basis-2/3 py-2 px-6 mb-8 bg-[#1A1A1A] rounded-xl relative overflow-y-auto shadow-lg">
        <h2 className="self-start text-neutral-50 text-4xl my-2">ربات متخصص</h2>
        <div className="flex flex-col items-center h-[70dvh]">
          {messages.length > 0
            ? messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "whitespace-pre-wrap text-neutral-50 my-2 max-w-[90%]",
                    {
                      "self-end bg-[#0C6087] px-7 py-4 rounded-xl":
                        m.role === "user",
                      "self-start bg-[#262626] px-7 py-4 rounded-xl":
                        m.role != "user",
                    }
                  )}
                >
                  {m.content}
                </div>
              ))
            : null}
        </div>
        <form
          onSubmit={handleSubmit}
          className="absolute flex flex-row p-2 mb-8 w-[70%] bottom-0 text-center bg-[#3C3C3C] rounded-xl shadow-lg"
        >
          <input
            className="w-full bg-transparent font-bold text-neutral-50 font-xl px-4"
            value={input}
            placeholder="گفت و گو را از اینجا شروع کنید!"
            onChange={handleInputChange}
          />
          <button className="bg-[#008EDD] rounded-xl py-4 px-12 text-neutral-50">
            بفرست
          </button>
        </form>
      </section>
      <div className="basis-1/3 grow-[1] w-full">
        <section className=" flex flex-col gap-4 min-w-max bg-[#1A1A1A] rounded-xl p-4">
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
        </section>
      </div>
    </main>
  );
}
