// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode"; // Import ThemeProvider
import Dashboard from "./pages/dashboard";
import Investments from "./pages/Investments";
import Savings from "./pages/Savings";
import Transactions from "./pages/Transactions";
import FAQs from "./pages/FAQs";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { useState } from "react"; // Import useState

function App() {
  const { theme } = useDarkMode();

  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
        <Router>
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
