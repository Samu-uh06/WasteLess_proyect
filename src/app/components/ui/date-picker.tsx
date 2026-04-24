"use client";

import * as React from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ date, onDateChange, placeholder = "Selecciona una fecha", className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewMonth, setViewMonth] = React.useState(date ?? new Date());
  const ref = React.useRef<HTMLDivElement>(null);

  // Cierra al hacer click fuera
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Construir la grilla del mes
  const buildCalendar = () => {
    const start = startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 });
    const days: Date[] = [];
    let cur = start;
    while (cur <= end) {
      days.push(cur);
      cur = addDays(cur, 1);
    }
    return days;
  };

  const days = buildCalendar();
  const weekDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%" }}>
      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        onClick={() => {
          setViewMonth(date ?? new Date());
          setOpen((o) => !o);
        }}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
      </Button>

      {/* Calendario desplegable */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
            padding: "12px",
            minWidth: "260px",
            userSelect: "none",
          }}
        >
          {/* Header: mes y año */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <button
              type="button"
              onClick={() => setViewMonth((m) => subMonths(m, 1))}
              style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "2px 6px", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, textTransform: "capitalize" }}>
              {format(viewMonth, "MMMM yyyy", { locale: es })}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "2px 6px", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Días de la semana */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" }}>
            {weekDays.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: "11px", fontWeight: 600, color: "#9ca3af", padding: "2px 0" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
            {days.map((day, i) => {
              const isSelected = date ? isSameDay(day, date) : false;
              const isCurrentMonth = isSameMonth(day, viewMonth);
              const isTodayDay = isToday(day);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onDateChange?.(day);
                    setOpen(false);
                  }}
                  style={{
                    background: isSelected ? "#e7000b" : isTodayDay ? "#fef2f2" : "transparent",
                    color: isSelected ? "white" : !isCurrentMonth ? "#d1d5db" : isTodayDay ? "#e7000b" : "#111827",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 0",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: isSelected || isTodayDay ? 700 : 400,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = isTodayDay ? "#fef2f2" : "transparent";
                  }}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}