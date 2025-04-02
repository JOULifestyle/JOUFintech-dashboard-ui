const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-16 w-full dark:bg-gray-800 dark:text-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">

                <div className="md:w-1/4">
                    <h2 className="text-xl font-bold">JOUFintech</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Smarter finances, brighter future.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Product</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Reviews</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">FAQ</a></li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Company</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">About</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Blog</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Careers</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Contact</a></li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Legal</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Terms</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Privacy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Licenses</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white dark:hover:text-gray-200">Cookies</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} JOU Lifestyle inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
