"use client";
import { travelTicketFAQ } from "@/static-data";
import { Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toggleOpen = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid place-items-center w-full min-h-screen p-10 ">
      <div className="grid max-w-4xl w-full gap-y-14">
        <h1 className="text-center text-2xl md:text-3xl  lg:text-4xl font-bold capitalize text-blue-950">
          Frequently Asked Questions
        </h1>
        <div className="grid gap-y-4">
          {travelTicketFAQ.map((faq, index) => (
            <div
              key={index}
              className="flex bg-gray-50 flex-col items-center justify-center p-4 px-6 rounded-3xl transition-all duration-200 ease-in-out cursor-pointer"
            >
              <div className="w-full flex flex-col justify-between">
                <div className="flex w-full justify-between items-center p-1 rounded-lg">
                  <h2 className="text-xl md:text-2xl font-bold capitalize text-blue-950">
                    {faq.question}
                  </h2>
                  <div onClick={() => toggleOpen(index)}>
                    {openIndex === index ? (
                      <X className="text-3xl text-blue-950 font-bold" />
                    ) : (
                      <Plus className="text-3xl text-blue-950 font-bold" />
                    )}
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) contentRefs.current[index] = el;
                  }}
                  style={{
                    height:
                      openIndex === index
                        ? `${contentRefs.current[index]?.scrollHeight}px`
                        : "0px",
                  }}
                  className="overflow-hidden transition-all duration-500 ease-in-out rounded-lg "
                >
                  <p className="text-blue-950  p-1">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
