"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

type ToastFn = (message: string) => void;
const ToastContext = createContext<ToastFn>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ToastFn>((message) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="no-print pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-5"
      >
        {toast && (
          <div
            key={toast.id}
            className="toast-in pointer-events-auto flex items-center gap-2 rounded-lg border border-line-strong bg-ink px-4 py-2.5 text-sm font-medium text-canvas shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)]"
          >
            <Icon name="check" size={16} />
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
