import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Link from "next/link";
// import {useEffect, useState} from "react";
// import personal from "../../pages/box/personal";

import { useRouter } from 'next/router'



export default function StepProgressBar(props) {
    const router = useRouter()
    console.log('ROUTER ********',router)
    const step1 = '/box/personal'
    const step2 = '/box/experiencepage'
    const step3 = '/box/sample'


    //const [isActive, setIsActive] = useState(false);

    const {percent} = props

    const circleStyle = {
        width: 40,
        height: 40,
        borderRadius: 20,
        background: "white",
        display: "flex",
        justifyContent: 'center'
    }

    return (
        <div className="flex justify-center">
            <ProgressBar
                percent={percent}
                width={600}
                filledBackground="linear-gradient(to right, #C4B5FD, #ffffff)"
            >
                <Step transition="scale">
                    {({ accomplished }) => (
                        <Link href="/box/personal" >
                            <div style={circleStyle}>
                                <img
                                    alt="img"
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="20"
                                    src="/person.svg"
                                />
                            </div>
                        </Link>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <Link
                            //href={isActive ? '/box/experience' : ''}
                            href="/box/experiencepage"
                        >
                            <div style={circleStyle}>
                                <img
                                    alt="img"
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="20"
                                    src="/experience.svg"
                                />
                            </div>
                        </Link>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <Link href={router.pathname == step2 ? step3 : router.pathname}>
                            <div style={circleStyle}>
                                <img
                                    alt="img"
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="20"
                                    src="/sample.svg"
                                />
                            </div>
                        </Link>
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
}
