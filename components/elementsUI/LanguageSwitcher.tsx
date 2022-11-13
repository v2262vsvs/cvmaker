import React, {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/solid'
import i18next from "i18next";

const languages = [
    {name: 'en'},
    {name: 'ua'},
]

async function chooseLanguage (lang:string) {
    if (lang == 'en') {
        await i18next.changeLanguage(lang)
        console.log('en')
    } else {
        console.log('ua')
        await i18next.changeLanguage(lang)
    }
}

export default function LanguageSwitcher() {
    const [selected, setSelected] = useState(languages[0])

    return (
        <div className=" inline-block text-left">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative inline-block text-left w-9">
                    <Listbox.Button
                        className={'hover:text-violet-700 inline-flex justify-center'}
                    >
                        <div className=" truncate uppercase">{selected.name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute left-0 mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-violetShadowMenu ring-1 ring-violet-500 ring-opacity-5 focus:outline-none sm:text-sm uppercase z-10"
                        >
                            {languages.map((language, languageIdx) => (
                                <Listbox.Option
                                    key={languageIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-violet-100 text-violet-700' : 'text-gray-600'
                                        }`
                                    }
                                    value={language}
                                    onClick={() => chooseLanguage(language.name)}
                                >
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'text-violet-700' : 'font-semibold'
                                                }`}
                                            >
                                                {language.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
