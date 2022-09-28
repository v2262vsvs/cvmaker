import React from 'react';

const Footer = () => {
    return (
        <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com"
                                                                                                    target="_blank"
                                                                                                    className="hover:underline">CV - online constructor™</a>.   All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <img src='/facebook.svg' alt='facebook'/>
                    </a>
                    <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <img src='/twitter.svg' alt='twitter'/>

                    </a>
                    <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <img src='/github.svg' alt='github'/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
