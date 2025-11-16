import { motion } from "framer-motion";

type InsightsProps = {
  messages: string[];
};

export default function Insights({ messages }: InsightsProps) {
  if (!messages?.length) return null;

  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-bold mb-3">Insights</h3>
      <ul className="space-y-2">
        {messages.map((msg, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200"
          >
            <span className="text-joublue font-bold">•</span>
            {msg}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
