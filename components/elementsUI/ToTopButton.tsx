import React, {useEffect, useState} from 'react'

function ToTopButton() {

    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 260) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        })
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            {backToTop && (
                <button
                    onClick={scrollUp}
                    className='shadow-2xl shadow-violet-500 '
                    style={{
                        position: 'fixed',
                        bottom: '140px',
                        left: '10px',
                        height: 70,
                        width: 70,
                        background: 'white',
                        display: "flex",
                        justifyContent: 'center',
                        borderRadius: 40,
                        zIndex: 1
                    }}
                >
                    <img src='/ChevronUp.svg' alt='up' className='self-center'/>
                </button>
            )}
        </div>
    )
}

export default ToTopButton
