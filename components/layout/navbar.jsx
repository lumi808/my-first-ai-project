"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18n/i18n";
import dynamic from 'next/dynamic'

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const {t, i18n} = useTranslation();

  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng)
  }, [])

  // const lng = navigator.language

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "border-b border-white-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all md:w-full`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/datelogo2.png"
              alt="N17R logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>WeDate</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-rose-200 hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                {t('navbar.signin')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
