import React, { useState } from "react";

const faqData = [
    {
        question: "What is the minimum amount I can invest?",
        answer:
            "The minimum amount you can invest depends on the type of investment you choose. For most opportunities, the minimum amount is $100, but some may require more. Please check individual investment options for details.",
    },
    {
        question: "How can I track my savings progress?",
        answer:
            "You can track your savings progress directly from your dashboard. We provide tools like savings goals and visual reports that allow you to monitor your progress easily over time.",
    },
    {
        question: "Can I withdraw my savings at any time?",
        answer:
            "Yes, you can withdraw your savings at any time. However, depending on the investment options you choose, there may be withdrawal fees or a lock-in period for some investments. Please review the terms of each investment opportunity for specific withdrawal details.",
    },
    {
        question: "Are my investments safe?",
        answer:
            "Yes, we prioritize the security of your investments. We work with trusted partners and provide secure encryption to protect your data. We also advise you on low-risk investment options to keep your funds safe.",
    },
    {
        question: "How do I contact customer support?",
        answer:
            "You can contact our customer support through the 'Contact Us' section on the website, via email at support@joufintech.com, or by calling our 24/7 helpline at +1-800-123-4567.",
    },
];

const FAQPage: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col justify-start">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>

            <div className="max-w-4xl mx-auto w-full">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md mb-4 overflow-hidden w-full"
                    >
                        <div
                            className="py-4 px-6 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleToggle(index)}
                        >
                            <h3 className="text-xl font-semibold">{faq.question}</h3>
                        </div>

                        {expandedIndex === index && (
                            <div className="py-4 px-6 bg-gray-50">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
