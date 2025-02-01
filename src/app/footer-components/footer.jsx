"use client"
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import whatsapp from "./whatsapp.svg";
import copyright from "./copyright.svg";
import Link from 'next/link'

function Footer() {
    return (
        <div className="bg-gray-100 text-gray-500 py-8">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-orange-500 text-lg font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <p>About Us</p>
                            <p>Our Mission & Vision</p>
                            <p>Privacy Policy</p>
                            <p>Terms & Conditions</p>
                            <p>FAQ</p>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-orange-500 text-lg font-semibold mb-4">Contact Us</h4>
                        <p>contact@mrSmartwears.com</p>
                        
                        {/* Social Media Icons */}
                        <div className="flex md:justify-start justify-center gap-4 mt-4">
                        <Link href="#">
                            <img src={facebook} alt="facebook" className="w-8 h-8 hover:scale-110 transition" />
                            </Link>
                            <Link href="#">
                            <img src={instagram} alt="instagram" className="w-8 h-8 hover:scale-110 transition" />
                            </Link>
                            <Link href="https://api.Whatsapp.com/send?phone=2347032397184&text=I%27m+having+an+issue+can+you+please+help+me+resolve+it">
                                <img src={whatsapp} alt="whatsapp" className="w-8 h-8 hover:scale-110 transition" />
                            </Link>
                        </div>

                        {/* Subscription Box */}
                        <div className="mt-6 flex max-w-md mx-auto md:mx-0">
                            <input 
                                type="text" 
                                placeholder="Email address" 
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-l-md focus:outline-none w-full"
                            />
                            <button className="text-orange-500 px-6 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 my-6"></div>

                {/* Copyright */}
                <p className="text-center text-sm text-gray-500">
                    <img src={copyright} alt="copyright" className="inline-block w-4 h-4 mb-1" /> 
                    2025 Ebunolwa Akinwumi. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
