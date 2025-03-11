const Footer = () => {
    return (
        <footer className="bg-gray-900 py-12 text-white">
            <div className="container mx-auto grid grid-cols-4 gap-8">
                <div>
                    <h4 className="mb-4 font-bold">Company</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-green-400">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Press
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Community</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Forums
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Writers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Support</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-green-400">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Connect</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-2xl hover:text-green-400">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-2xl hover:text-green-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-2xl hover:text-green-400">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8 border-t border-gray-700 pt-4 text-center">
                <p>&copy; 2024 Wattpad. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
