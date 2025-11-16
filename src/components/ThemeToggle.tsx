import useDarkMode from "../hooks/useDarkMode";

export default function ThemeToggle() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800">
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
