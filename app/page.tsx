"use client";

import {useChat} from "ai/react";
import {cn} from "./lib/utils";
import HistoryCard from "./components/HistoryCard";
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

export default function Chat() {
  const {messages, input, handleInputChange, handleSubmit, data} = useChat();
  const [animateEffect, setAnimateEffect] = useState(false);
  return (
    <main className="flex flex-row w-full h-full gap-5">
      <section className="basis-2/3 py-2 px-6 bg-[#1A1A1A] rounded-xl relative overflow-y-auto shadow-lg">
        <h2 className="self-start text-neutral-50 text-4xl my-2">ربات متخصص</h2>
        <div className="flex flex-col items-center h-[70dvh]">
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
                {m.content}
              </div>
            ))
          ) : (
            <div className="max-w-[35%] text-center flex flex-col gap-10 my-auto">
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
        <form
          onSubmit={handleSubmit}
          className="absolute left-[50%] -translate-x-[50%] flex flex-row p-2  mb-8 w-[90%] bottom-0 text-center bg-[#3C3C3C] rounded-xl shadow-lg"
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
      </section>
      <div className="basis-1/3 grow-[1] w-full flex flex-col justify-between gap-5">
        <section className=" flex flex-col gap-4 min-w-max bg-[#1A1A1A] rounded-xl p-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Image
                src="/images/history.svg"
                width={25}
                height={25}
                alt="history icon"
              />
              <p className="text-white text-[1.5rem] font-bold">مباحث گذشته</p>
            </div>
            <button
              className={`text-white ${animateEffect && "animate-wiggle"}`}
              onClick={() => setAnimateEffect(true)}
              onAnimationEnd={() => setAnimateEffect(false)}
            >
              پاک کردن همه
            </button>
          </div>
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
          <HistoryCard text="اختلال پینگ در استان تهران" />
        </section>

        <Link
          href="https://eyesp.live/information"
          className="flex mt-auto justify-between w-full rounded-xl p-5 bg-[#1A1A1A] "
        >
          <span className="text-white">آموزش نحوه استفاده</span>
          <Image
            src="/images/graduate.svg"
            width={25}
            height={25}
            alt="education icon"
          />
        </Link>
        <button className="flex justify-between w-full rounded-xl p-5 bg-[#1A1A1A] ">
          <span className="text-white">تنظیمات</span>
          <Image
            src="/images/setting.svg"
            width={25}
            height={25}
            alt="education icon"
          />
        </button>
      </div>
    </main>
  );
}
