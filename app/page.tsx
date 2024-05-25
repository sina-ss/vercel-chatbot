"use client";
import { useChat } from "ai/react";
import { cn } from "./lib/utils";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  return (
    <main className="flex flex-col w-full gap-5 mt-10">
      <section className="w-full h-full py-2 bg-[#1A1A1A] rounded-xl overflow-y-auto shadow-lg relative">
        <div className="flex flex-col px-6 items-center h-full overflow-y-auto pt-10">
          {messages.length > 0 ? (
            messages.map((m) => (
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
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="leading-1" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="leading-1" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="leading-1" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="leading-1" {...props} />
                    ),
                    // Add more elements as needed
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            ))
          ) : (
            <div className="hidden sm:flex max-w-[35%] text-center flex-col gap-10 my-auto">
              <p className="text-white text-[1.2rem] text-[700]">
                هر سوالی که درباره{" "}
                <span className="text-[#85CCF4]">
                  وضعیت اینترنت، راه‌ حل‌ها، اختلالات
                </span>{" "}
                و یا هر مورد مرتبط دیگر دارید، از من بپرسید
              </p>
              <div className="text-white flex flex-col gap-3">
                <p className="mb-3">برای مثال:</p>
                <p className="p-3 bg-[#262626] rounded-xl">
                  اختلال کاهش سرعت دانلود برای چیست؟
                </p>
                <p className="p-3 bg-[#262626] rounded-xl">
                  راه حل مشکل افزایش پینگ چیست
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row p-2 w-full bg-[#3C3C3C] rounded-xl shadow-lg"
      >
        <input
          className="w-full bg-transparent focus:border-none focus:outline-none font-bold text-neutral-50 font-xl px-4"
          value={input}
          placeholder="گفت و گو را از اینجا شروع کنید!"
          onChange={handleInputChange}
        />
        <button className="bg-[#008EDD] rounded-xl py-4 px-12 text-neutral-50">
          بفرست
        </button>
      </form>
    </main>
  );
}
