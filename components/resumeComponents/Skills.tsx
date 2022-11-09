import React, {useEffect, useState} from 'react'
import MyModal from '../elementsUI/MyModal';


function Skills() {
    const [openSkills, setOpenSkills] = useState<boolean>(false);

    const [visibleSkills, setVisibleSkills] = useState<number>(0);

    const [skillsList, setSkillsList] = useState<Skills[]>([]);

    const handleRemoveSkills = async (index: number) => {
        if(skillsList.length === 1) {
            window.localStorage.removeItem("SKILLS_STATE")
        }
        const list = [...skillsList];
        list.splice(index, 1);
        setSkillsList(list);
    };

    const handleAddSkills = async (
        habit: string,
        level: string,
    ) => {
        setVisibleSkills(skillsList.length)
        setSkillsList([
            ...skillsList,
            {habit, level},
        ]);
    };

    const handleChangeSkills = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number, name: string) => {
        const value = e.target.value
        const list = [...skillsList]
        switch (name) {
            case 'habit':
                list[index].habit = value
                setSkillsList(list)
                break;
            case 'level':
                list[index].level = value
                setSkillsList(list)
                break;
        }
    }


    useEffect(() => {
        const data = window.localStorage.getItem("SKILLS_STATE");
        console.log("from storage", data);
        let formated = null;
        if (data !== null) {
            formated = JSON.parse(data);
            setSkillsList(formated);
            console.log("skills ", skillsList);
        } else {
            setSkillsList([{
                habit: '',
                level: ''
            }])
        }

    }, []);

    useEffect(() => {
        if (skillsList.length !== 0 || skillsList.length != 0) {
            console.log("data saved");
            window.localStorage.setItem(
                "SKILLS_STATE",
                JSON.stringify(skillsList)
            );
            console.log("storage", window.localStorage.getItem("SKILLS_STATE"));
        }
    }, [skillsList]);


    return (
        <div>
            <div className="bg-white max-w-[850px] shadow-xl rounded-md  mr-auto ml-auto ">
                <div
                    className="cursor-pointer"
                    onClick={() => setOpenSkills(!openSkills)}
                >
                    <div className="flex py-8 px-10 space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 font-medium text-neutral-700"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                                  clipRule="evenodd"/>
                        </svg>
                        <div className="font-medium text-xl text-neutral-700">
                            Skills
                        </div>
                    </div>
                </div>

                {openSkills && (
                    <div className="mr-10 ml-10 pb-10 -mt-2 space-y-4">
                        {skillsList.map((skills, index) => (

                            <div key={index} className="  -mt-2 space-y-4">
                                {(visibleSkills == index) ? (<div className="  -mt-2 space-y-4">
                                    <div
                                        className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>

                                    <div className="flex space-x-7">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Skill</div>
                                            <input
                                                value={skills.habit}
                                                onChange={(e) =>
                                                    handleChangeSkills(e, index, 'habit')
                                                }
                                                name='skill'
                                                placeholder="for example, salesforce"
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Level</div>
                                            <select value={skills.level}
                                                    onChange={(e) =>
                                                        handleChangeSkills(e, index, 'level')
                                                    } name="level" id="cars"
                                                    className="ring-2 ring-gray-200 my-auto text-lg px-4 py-3 text-neutral-600   rounded-sm w-full outline-none">
                                                <option value='' disabled selected>Choose a level</option>
                                                <option className="" value="Expert">Expert</option>
                                                <option value="Experienced">Experienced</option>
                                                <option value="Skillful">Skillful</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Newcomer">Newcomer</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="flex justify-between">
                                        <div className="">
                                            <MyModal advice={"1 .List only those skills that are important for the job you want to apply for. \n2 .Examples: excellent communicator, team player, reliable, etc. \n3 .List any valuable skills related to the job, such as computer and software skills. For example: Word, Excel, Photoshop, etc."}/>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-red-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div onClick={() => handleRemoveSkills(index)}
                                                     className="flex sapce-x-2 ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 hover:text-red-500 text-neutral-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div

                                                        className="mt-auto mb-auto"
                                                    >
                                                        Remove
                                                    </div>
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-bluee-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 mt-auto mb-auto py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div className="flex sapce-x-2 items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="hover:text-bluee-500 h-5 w-5 text-neutral-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                                                    </svg>
                                                    <div className="mt-auto mb-auto">Save</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>) : (
                                    <div onClick={() => setVisibleSkills(index)}>
                                        <div className="   space-y-4 mb-7">
                                            <div
                                                className=" border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>
                                            <div className="flex justify-between ">
                                                <div className="mt-auto mb-auto text-neutral-400 text-md">
                                                    <div className="font-medium">{skills.habit}</div>
                                                    <div className="text-xs">Skill</div>
                                                </div>
                                                <div className=" flex space-x-3 mt-auto mb-auto  text-neutral-600">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="cursor-pointer"
                                                         onClick={() => handleRemoveSkills(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={() =>
                                    handleAddSkills("", "")
                                }
                                type="button"
                                className="flex py-3 w-full justify-center space-x-2 rounded-sm bg-neutral-200  text-center  text-md text-neutral-600 hover:bg-opacity-60 bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" h-5 w-5 text-neutral-600 mt-auto mb-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="mt-auto mb-auto">Add another Skill</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Skills
