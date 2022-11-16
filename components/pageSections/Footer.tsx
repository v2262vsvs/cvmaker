import React from 'react';
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={'bg-violet-200 h-[1px] opacity-50 z-0'}/>

            <footer className="p-4 bg-white w-screen sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center ">
                    © 2022 <a href="https://cvmaker-gamma.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline">{t('CV - online constructor')}</a>.   {t('All Rights Reserved.')}
                </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900 ">
                            <img src='/facebook.svg' alt='facebook'/>
                        </a>
                        <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900 ">
                            <img src='/twitter.svg' alt='twitter'/>

                        </a>
                        <a href="components/pageSections/Footer#" className="text-gray-500 hover:text-gray-900">
                            <img src='/github.svg' alt='github'/>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
