import { useUIStore } from "../../stores/uiStore";

export default function TopNav() {
  const { theme, setTheme } = useUIStore();

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-joublue">JOU Finance</h1>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-3 py-1 bg-joupurple text-white rounded"
      >
        Toggle {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
