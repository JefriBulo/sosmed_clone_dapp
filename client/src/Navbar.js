import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import logo from "./assets/img/opensea_logo_collections_circle_clothes.png";
import { Button } from "@material-tailwind/react";
import { Routes, Route, Link } from "react-router-dom";
import {Details} from "@material-ui/icons";
import DetailUser from "./DetailUser";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <nav className="bg-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="inline-flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-11 w-11"
                                    src={logo}
                                    alt="jeflo_punks"
                                />
                            </div>
                            <div className="flex float-right ml-4">
                                <Link to="/" className="text-white font-semibold hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm text-xl">
                                    Jeflo Punks
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/" className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Dashboard
                                    </Link>
                                    <Link to="/detailuser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Team
                                    </Link>
                                    <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        About
                                    </Link>
                                    <Link to="/detailuser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Projects
                                    </Link>
                                    <Link to="/detailuser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Calendar
                                    </Link>
                                    <Link to="/detailuser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Reports
                                    </Link>
                                    <Link to="/detailuser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Connected
                                    </Link>
                                </div>
                            </div>
                            {/*<div className="main">*/}
                            {/*    <Routes>*/}
                            {/*        <Route path="/" element={<DetailUser/>}></Route>*/}
                            {/*        <Route path="/detailuser" element={<DetailUser/>}></Route>*/}
                            {/*        <Route path="/about" element={<About/>}></Route>*/}
                            {/*    </Routes>*/}
                            {/*</div>*/}
                            {/*<div className="flex float-right">*/}
                            {/*    <Button>Connected</Button>*/}
                            {/*</div>*/}
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link to="/" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Dashboard
                                </Link>
                                <Link to="/detailuser" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Team
                                </Link>
                                <Link to="/about" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    About
                                </Link>
                                <Link to="/detailuser" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Projects
                                </Link>
                                <Link to="/detailuser" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Calendar
                                </Link>
                                <Link to="/detailuser" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Reports
                                </Link>
                                <Link to="/detailuser" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Connected
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>

            {/*<header className="bg-white shadow">*/}
            {/*    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">*/}
            {/*        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>*/}
            {/*    </div>*/}
            {/*</header>*/}
            {/*<main>*/}
            {/*    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">*/}
            {/*        /!* <!-- Replace with your content --> *!/*/}
            {/*        <div className="px-4 py-6 sm:px-0">*/}
            {/*            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>*/}
            {/*        </div>*/}
            {/*        /!* <!-- /End replace --> *!/*/}
            {/*    </div>*/}
            {/*</main>*/}
        </div>
    );
}

export const About = () => {
    return <div className="App"><h2>About Page</h2></div>
}

export default Navbar;
