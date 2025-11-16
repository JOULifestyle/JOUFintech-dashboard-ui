import type { Transaction } from "../../api/transactions";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Papa from "papaparse";

// Export CSV
export function exportCSV(transactions: Transaction[]) {
  const csv = Papa.unparse(transactions);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "transactions.csv");
}

// Export PDF
export function exportPDF(transactions: Transaction[]) {
  const doc = new jsPDF();
  doc.text("Transactions", 10, 10);
  transactions.forEach((tx, i) => {
    doc.text(`${i + 1}. ${tx.date} | ${tx.category} | $${tx.amount}`, 10, 20 + i * 10);
  });
  doc.save("transactions.pdf");
}
