import React from 'react'
import Gamebox from './Gamebox'

const Slidebar = () => {
    const game = 3;
    const slideitems = ['Home', 'Flip', 'Quiz', 'Chatbot']
    return (
        <div className=''>
            <div className='w-[20vw] bg-zinc-300 h-screen text-black flex flex-col items-center'>
                <div className='gap-10'>
                    {
                        slideitems.map((item, idx) => {
                            return <h1 className='m-10 bg-zinc-500 py-3 px-6 text-center rounded-lg cursor-pointer' key={idx}>{item}</h1>
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default Slidebar