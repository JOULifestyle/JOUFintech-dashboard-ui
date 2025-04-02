import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AppContextType {
    transactions: any[];
}

export const AppContext = createContext<AppContextType>({ transactions: [] });

import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        axios.get<any[]>("https://api.example.com/transactions").then((res) => {
            setTransactions(res.data);
        });
    }, []);

    return (
        <AppContext.Provider value={{ transactions }}>
            {children}
        </AppContext.Provider>
    );
};
