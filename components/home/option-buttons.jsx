'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

export default function Buttons({setOptionButtons, sendMessage, places, handlePlacesChange, setFoundWord}){

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [responseGenerating, setResponseGenerating] = useState(false)

    // test
    const updateOptionButtons = () => {
        setOptionButtons(false);
    };

    const updateFoundWord = () => {
        setFoundWord(false);
    }

    const pressOption = async (input, option) => {
        console.log(option);
        const response = await requestToBack(`${option.join(', ')}`);
        handlePlacesChange(response);

        await sendMessage(input);
        updateOptionButtons();
        updateFoundWord();
    }

    const requestToBack = async (query) => {
        setResponseGenerating(true)
        try {
            const response = await fetch(`https://ai-date-assistant.onrender.com/generate/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: `${query}`}),
            })

            const responseData = await response.json()
            console.log(query)
            console.log(responseData)
            return responseData

        } catch(error) {
            console.log(error)
            setError(error)
        }
    }

    return (
        responseGenerating?(
            <div className="flex justify-center">
                <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-cyan-50 rounded-lg border border-gray-200 hover:bg-cyan-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:outline-none focus:ring-cyan-200 focus:text-cyan-200 inline-flex items-center shadow-md">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#403f40"/>
                    </svg>
                    Loading...
                </button>
            </div>
        ):(
            <div className="flex justify-center">
                <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    animate={{ x: [-100, 0] }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    type="button" 
                    onClick={() => pressOption(`Option 1`, places[0])} 
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-cyan-50 rounded-lg border border-gray-200 hover:bg-cyan-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 shadow-md"
                    >Option 1
                </motion.button>

                <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    type="button" 
                    onClick={() => pressOption(`Option 2`, places[1])} 
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-cyan-50 rounded-lg border border-gray-200 hover:bg-cyan-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 shadow-md"
                    >Option 2
                </motion.button>

                <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    animate={{ x: [100, 0] }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    type="button" 
                    onClick={() => pressOption(`Option 3`, places[2])}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-cyan-50 rounded-lg border border-gray-200 hover:bg-cyan-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 shadow-md"
                    >Option 3
                </motion.button>
            </div>
        )
    )
}