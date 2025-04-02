import React, { useState } from "react";

const settingsData = {
    profile: {
        name: "Israel Olasehinde",
        email: "israelola@example.com",
    },
    security: {
        twoFactor: true,
        lastLogin: "2025-03-25 10:30 AM",
    },
    notifications: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
    },
    paymentMethods: [
        { method: "Credit Card", last4Digits: "1234" },
        { method: "PayPal", email: "johndoe@paypal.com" },
    ],
    password: "********",
    language: "English",
    helpSupport: {
        faqLink: "https://www.example.com/faq",
        contactLink: "mailto:support@example.com",
    },
};

const getInitials = (fullName: string) => {
    const nameParts = fullName.split(" ");
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
    return initials;
};

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: settingsData.profile.name,
        email: settingsData.profile.email,
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Here you can make an API call to save the updated profile
        console.log("Profile saved:", profile);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen ml-60">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Settings</h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-8 mb-6">
                <button
                    className={`${activeTab === "profile" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("profile")}
                >
                    Profile
                </button>
                <button
                    className={`${activeTab === "security" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("security")}
                >
                    Security
                </button>
                <button
                    className={`${activeTab === "notifications" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("notifications")}
                >
                    Notifications
                </button>
                <button
                    className={`${activeTab === "paymentMethods" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("paymentMethods")}
                >
                    Payment Methods
                </button>
                <button
                    className={`${activeTab === "password" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("password")}
                >
                    Password
                </button>
                <button
                    className={`${activeTab === "language" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("language")}
                >
                    Language
                </button>
                <button
                    className={`${activeTab === "helpSupport" ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-600 dark:hover:text-blue-500`}
                    onClick={() => setActiveTab("helpSupport")}
                >
                    Help & Support
                </button>
            </div>

            {/* Settings Sections */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                {activeTab === "profile" && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Profile</h3>
                        <div className="flex items-center space-x-4 mb-4">
                            {/* Avatar with initials */}
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center text-white font-semibold">
                                {getInitials(settingsData.profile.name)}
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Name:</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleInputChange}
                                        className="px-4 py-2 border rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.name}</p>
                                )}
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">Email:</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        className="px-4 py-2 border rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                                )}
                            </div>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveClick}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                )}

                {activeTab === "security" && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Security</h3>
                        <p className="mb-2 text-gray-900 dark:text-gray-100">
                            Two-factor Authentication: {settingsData.security.twoFactor ? "Enabled" : "Disabled"}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">Last Login: {settingsData.security.lastLogin}</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4">
                            Manage Security Settings
                        </button>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notifications</h3>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settingsData.notifications.emailNotifications}
                                    onChange={() => { }}
                                    className="mr-2"
                                />
                                Email Notifications
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settingsData.notifications.pushNotifications}
                                    onChange={() => { }}
                                    className="mr-2"
                                />
                                Push Notifications
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settingsData.notifications.smsNotifications}
                                    onChange={() => { }}
                                    className="mr-2"
                                />
                                SMS Notifications
                            </label>
                        </div>
                    </div>
                )}

                {/* Similar dark mode updates for other sections */}
            </div>
        </div>
    );
};

export default SettingsPage;
