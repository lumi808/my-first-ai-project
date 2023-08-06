"user client";

import { useState } from "react";

export default function LangButton() {
    const [currentLanguage, setLanguage] = useState('EN')
    const changeLang = () => {
        if (currentLanguage === 'EN'){
            setLanguage('РУ')
        }
        else{
            setLanguage('EN')
        }
    }
    return (
        <button 
            type="button" 
            className="rounded-full border border-black bg-black p-1.5 px-3 mx-1 text-sm text-white transition-all hover:bg-rose-200 hover:text-black"
            onClick={changeLang}
            >
            {currentLanguage}
        </button>
    );
  }