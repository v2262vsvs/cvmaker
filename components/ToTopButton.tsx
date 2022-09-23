import React from 'react'
import {useEffect, useState} from 'react'

function ToTopButton () {

    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 260) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        })
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            // left: 0
            behavior: 'smooth'
        })
    }

    return (
        <div>
            {backToTop && (
                <button
                    onClick={scrollUp}
                    className='shadow-2xl shadow-violet-500'
                    style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '80px',
                    height: 80,
                    width: 80,
                    background: 'white',
                    display: "flex",
                    justifyContent: 'center',
                    borderRadius: 40
                    }}
                >
                    <img src='/ChevronUp.svg' alt='up' className='self-center'/>
                </button>
            )}
        </div>
    )
}

export default ToTopButton
