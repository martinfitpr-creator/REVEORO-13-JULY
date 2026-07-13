import React, { useState } from "react";
import { Check, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar() {
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startingOffset = 1; // Tuesday offset for June 2026

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "04:30 PM",
  ];

  const getWhatsAppLink = () => {
    const text = `Hi Revero, I'd like to book a 30-minute consultation. I selected June ${selectedDay}, 2026 at ${selectedTime}.`;
    return `https://wa.me/27713315825?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="bg-white border border-[#E5E5E5] rounded-3xl p-6 sm:p-8 space-y-6 select-none max-w-md mx-auto shadow-sm"
      id="calendar-booking-card"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-black rounded-xl text-white">
          <CalendarIcon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-black font-sans uppercase tracking-wider">Book Consultation Desk</h3>
          <p className="text-xs text-[#6B6B6B] font-mono">Ready to get started? Book a free 30-minute call.</p>
        </div>
      </div>

      <div className="border border-[#E5E5E5] bg-[#F5F5F5] rounded-2xl p-4 space-y-4">
        {/* Month selector UI */}
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
          <span className="text-xs font-bold text-black font-mono uppercase tracking-wider">June 2026</span>
          <div className="flex gap-1.5">
            <button className="p-1 rounded-md border border-[#E5E5E5] bg-white text-neutral-400 hover:text-black hover:border-black cursor-pointer transition-all">
              <ChevronLeft size={12} />
            </button>
            <button className="p-1 rounded-md border border-[#E5E5E5] bg-white text-neutral-400 hover:text-black hover:border-black cursor-pointer transition-all">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
            <span key={idx} className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
              {day}
            </span>
          ))}
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before start day */}
          {Array.from({ length: startingOffset }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-8 w-8" />
          ))}

          {daysInMonth.map((day) => {
            const isSelected = selectedDay === day;
            const isWeekend = (day + startingOffset - 1) % 7 === 0 || (day + startingOffset - 1) % 7 === 6;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                disabled={isWeekend}
                className={`h-8 w-8 rounded-full text-[11px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isWeekend
                    ? "text-neutral-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-black text-white scale-105"
                    : "text-black hover:bg-neutral-200"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slot picker */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-[#6B6B6B] uppercase tracking-wider block">
          Available Slot
        </span>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-xl text-[10px] font-mono font-bold border transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-[#E5E5E5] hover:border-black hover:bg-neutral-50"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="referrer"
        className="w-full py-4 bg-black text-white hover:bg-neutral-800 transition-all text-xs font-mono font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        <span>BOOK CONSULTATION VIA WHATSAPP</span>
        <Clock size={14} />
      </a>
    </div>
  );
}
