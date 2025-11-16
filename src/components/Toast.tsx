import { useEffect } from "react";
import { useToastStore } from "../stores/toastStore";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timers = toasts.map((t) => setTimeout(() => removeToast(t.id), 3000));
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className={`p-3 rounded shadow text-white ${t.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
