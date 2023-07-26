'use client'
import Balancer from "react-wrap-balancer";
import { useSignInModal } from "../layout/sign-in-modal";
import React from "react";
import About from "@/components/home/about"
import GetStarted from "./get-started";

export default function Landing() {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal/>
      <div className="z-10 w-full h-[75vh] max-w-xl px-5 xl:px-0 flex flex-col items-center justify-center overflow-hidden">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
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
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer></Balancer>
        </p>
        <button
          type="button" 
          className="px-6 animate-fade-up opacity-0 py-3.5 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:scale-110 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg content-center"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          onClick={() => setShowSignInModal(true)}
          >
              Plan Your Perfect Date
        </button>
        <img
          src="/arrow-down.svg"
          alt="arrow down"
          className="w-[18px] h-[28px] object-contain mt-[28px] animate-fade-up"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        />
      </div>
      <div className="relative">
        <About/>
      </div>
      <div className="relative">
        <GetStarted/>
      </div>
      <footer className="bg-white-/50 backdrop-blur-xl rounded-lg shadow m-4">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">© 2023 Date Assistant™. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
              <li>
                  <a href="#" className="mr-4 ml-4 hover:underline md:mr-6 ">About</a>
              </li>
              <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
              </li>
              <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
              </li>
              <li>
                  <a href="https://www.linkedin.com/in/kairatmakym/" target="_blank" rel="noopener noreferrer" className="hover:underline">Author</a>
              </li>
          </ul>
          </div>
      </footer>
    </>
  )
}