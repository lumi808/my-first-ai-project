'use client'
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { motion } from 'framer-motion'
import { useSignInModal } from "../layout/sign-in-modal";

export default function Landing() {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal/>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0 flex flex-col items-center">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Meet your AI Date Assistant</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-700 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            AI-powered date expert that can plan an ideal date in Almaty for you.
          </Balancer>
        </p>
        <p
          className="mt-1 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer></Balancer>
        </p>
        <button
          type="button" 
          className="px-6 animate-fade-up opacity-0 py-3.5 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:scale-110 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg content-center"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          onClick={() => setShowSignInModal(true)}
          >
              Plan Your Perfect Date
        </button>
      </div>
    </>
  )
}