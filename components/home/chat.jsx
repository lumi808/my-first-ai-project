'use client'

import { throttle } from '@/lib/throttle'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ChatLine, LoadingChatLine } from './chat-line'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Buttons from "@/components/home/option-buttons" 
import { motion } from "framer-motion"
// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
  {
    role: 'assistant',
    content: "Hi! I am a Date Assistant. Tell me about your and your partner's preferences. Also it would be helpful to specify your budget and stage of relationship with your partner.",
  },
]



const InputMessage = ({ input, setInput, sendMessage, loading, showOptionButtons, setOptionButtons, places, handlePlacesChange, setFoundWord}) => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [question, setQuestion] = useState(null)
  const [questionError, setQuestionError] = useState(null)
  const inputRef = useRef(null)

  const shouldShowLoadingIcon = loading || isGeneratingQuestion
  const inputActive = input !== '' && !shouldShowLoadingIcon
  const sampleQuestions = [
    `I like walking in parks, while my girlfriend enjoys restaraunts. My budget for the date is 100 dollars. We are couple.`,
    `I enjoy active outdoor activities. My wife likes cozy places, like coffee chops with breakfasts and books. Our budget for the date is $50. We are married couple.`,
    `I like eastern food and it would be great to visit restaurants with this type of food. My partner is Chinese food enjoyer, also she likes sports like tennis, golf. I can spend $70 for this date. We are just friends, but I want her to be my girlfriend.`,
    `I like night clubs and bars. Girl that I like loves fancy restaurants with unusual servings. My budget is unlimited. I like her, but we are strangers.`,
    `I love swimming. She likes breakfasts and coffee shops. My budget is pretty limited, only $30. We are engaged.`
  ]

  const generateSampleQuestion = async () => {
    setIsGeneratingQuestion(true)
    const randomInput = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)]
    setInput(randomInput)
    setIsGeneratingQuestion(false)
  }

  useEffect(() => {
    const input = inputRef?.current
    if (question && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [question, inputRef])

  useEffect(() => {
    if (questionError) {
      toast.error(questionError)
    }
  }, [questionError])

  const pressReload = () => {
    window.location.reload()
  }


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      {!showOptionButtons ? (<motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mx-auto flex w-fit items-center gap-3 rounded-lg border border-neutral-200 bg-cyan-50 py-2 px-4 text-black text-sm hover:opacity-50 disabled:opacity-25"
        onClick={generateSampleQuestion}
        disabled={isGeneratingQuestion}
      >
        <div className="w-4 h-4">
          <AcademicCapIcon />
        </div> {'Generate a Sample question for me'}
      </motion.button>):
      (<Buttons setOptionButtons = {setOptionButtons} sendMessage = {sendMessage} places={places} handlePlacesChange={handlePlacesChange} setFoundWord = {setFoundWord}/>)}

      <div className="mx-2 my-4 flex-1 flex items-center w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-lg border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            disabled={isGeneratingQuestion}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cx(
              shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
              inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
              "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors")}
            type="submit"
            onClick={() => {
              sendMessage(input)
              setInput('')
            }}
            disabled={shouldShowLoadingIcon}
          >
            {shouldShowLoadingIcon
              ? <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              : <div className={cx(inputActive && "text-white", "w-6 h-6")}>
                <PaperAirplaneIcon />
              </div>
            }
          </motion.button>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button" 
          onClick={() => pressReload()} 
          className="text-white bg-cyan-200 hover:bg-cyan-300 focus:ring-5 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30">
              <path fill="currentColor" d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"/>
            </svg>
            <span className="sr-only">Icon description</span>
        </motion.button>
      </div>
    </div>
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [fplaces, setFplaces] = useState(null);
  const [placesFromOption, setPlacesFromOption] = useState('');

  const handlePlacesChange = (updatedPlaces) => {
    setPlacesFromOption(updatedPlaces);
  };


  const extractPlaces = (text) => {
    const placesRegex = /Places to Visit:\s*([\s\S]*?)(?=\n\n|$)/g;
    const placeRegex = /- ([^\n]+)/g;
  
    const places = [];
    let match;
  
    while ((match = placesRegex.exec(text)) !== null) {
      const placeMatches = match[1].match(placeRegex);
      if (placeMatches) {
        const placeList = placeMatches.map(place => place.trim().substring(2));
        places.push(placeList);
      }
    }
  
    return places;
  }



  // send message to API /api/chat endpoint
  const sendMessage = async (newMessage) => {
    setLoading(true)
    setError(null)
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ] 
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      console.log(response)
      setError(response.statusText)
      setLoading(false)
      return
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    // This data is a ReadableStream

    setIsMessageStreaming(true)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue
      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage },
      ])

      setLoading(false)
    }

    setIsMessageStreaming(false)
    if(lastMessage.includes('Option')){
      setFplaces(extractPlaces(lastMessage));
    }
  }

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
    fplaces,
    setMessages,
    handlePlacesChange,
    placesFromOption
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showOptionButtons, setOptionButtons] = useState(false)
  const { messages, isMessageStreaming, loading, error, sendMessage, fplaces, setMessages, handlePlacesChange, placesFromOption} = useMessages()

  const [foundWord, setFoundWord] = useState(false); 
  const wordsToSearch1 = ['Option 1:']
  const wordsToSearch2 = ['Option 2:']
  const wordsToSearch3 = ['Option 3:']

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    const isWordPresent1 = lastMessage.content.includes(wordsToSearch1)
    const isWordPresent2 = lastMessage.content.includes(wordsToSearch2)
    const isWordPresent3 = lastMessage.content.includes(wordsToSearch3)
    
    if (!foundWord && isWordPresent1 && isWordPresent2 && isWordPresent3) {
      console.log('FOUND OPTIONS IN RESPONSE')
      setOptionButtons(true)
      setFoundWord(true)
    }
  }, [isMessageStreaming]);


  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(()=>{
    if(!showOptionButtons && placesFromOption != ''){
      const additionalMessage = `${placesFromOption}`
      const updatedMessages= [...messages, { role: 'assistant', content: additionalMessage}];
      setMessages(updatedMessages)
    }

  }, [showOptionButtons, placesFromOption])


  return (
    <div className="flex-1 flex justify-center w-screen border-zinc-100 overflow-hidden">
      <div
        ref={chatContainerRef}
        className="w-7/12 max-h-[calc(100vh-4rem)]  justify-center overflow-x-hidden"
        onScroll={handleScroll}
      >
        {
        messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming} />
        ))
        }

        {loading && <LoadingChatLine />}        
        
        <div
          className="h-[152px] static"
          ref={messagesEndRef}
        />
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
          showOptionButtons = {showOptionButtons}
          setOptionButtons = {setOptionButtons}
          places = {fplaces}
          handlePlacesChange = {handlePlacesChange}
          setFoundWord = {setFoundWord}
        />        
      </div>
      <Toaster />
    </div>
  )
}
