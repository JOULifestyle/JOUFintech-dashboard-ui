const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-16 ml-50">
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
                        <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Reviews</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                    </ul>
                </div>


                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Company</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>


                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Legal</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Licenses</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                <p>© {new Date().getFullYear()} JOU Lifestyle inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
