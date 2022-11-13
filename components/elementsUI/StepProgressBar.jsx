import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Link from "next/link";
import { useRouter } from 'next/router'
import React from 'react'


export default function StepProgressBar(props) {
    const router = useRouter()
    console.log('ROUTER ********',router)
    // const step1 = '/box/personal'
    const step2 = '/box/experiencepage'
    const step3 = '/box/sample'


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
        <div className="flex justify-center max-md:w-4/5 max-md:mx-auto">
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

                            href={step2}
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
                        <Link href={router.pathname === step2 ? step3 : router.pathname}>
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
