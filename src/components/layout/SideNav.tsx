import { NavLink } from "react-router-dom";

export default function SideNav() {
  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Transactions", to: "/transactions" },
    { label: "Wallets", to: "/wallets" },
    { label: "Charts", to: "/charts" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 shadow-md p-4 hidden md:block">
      <ul>
        {navItems.map((item) => (
          <li key={item.to} className="mb-2">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-joublue hover:text-white ${
                  isActive ? "bg-joublue text-white" : "text-gray-800 dark:text-gray-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
