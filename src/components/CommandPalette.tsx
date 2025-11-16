import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const actions = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
    { name: "Charts", path: "/charts" },
    { name: "Wallets", path: "/wallets" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Type a command or page..." />
      <Command.List>
        {actions.map((a) => (
          <Command.Item
            key={a.path}
            onSelect={() => {
              navigate(a.path);
              setOpen(false);
            }}
          >
            {a.name}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
