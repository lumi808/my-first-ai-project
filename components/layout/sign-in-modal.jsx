import { signIn } from "next-auth/react";
import {
  useState,
  useCallback,
  useMemo,
  Fragment
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18n/i18n";
import dynamic from 'next/dynamic'

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng)
  }, [])

  // const lng = navigator.language
  return (
    <Transition appear show={showSignInModal} as={Fragment}>
      <Dialog as="div" className="relative z-40" open={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 transition-all rounded-2xl max-w-sm border border-gray-200">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-red-100 px-4 py-6 pt-8 text-center md:px-16">
                  <Image
                    src="/datelogo2.png"
                    alt="Logo"
                    className="h-10 w-10 rounded-full"
                    width={20}
                    height={20}
                  />
                  <h3 className="font-display text-2xl font-bold">{t('navbar.signin')}</h3>
                </div>

                <div className="flex flex-col space-y-4 bg-red-50 px-4 py-8 md:px-16">
                  <button
                    disabled={signInClicked}
                    className={`${signInClicked
                      ? "cursor-not-allowed border-gray-200 bg-cyan-100"
                      : "border border-gray-200 bg-cyan-50 text-black hover:bg-cyan-100"
                      } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                    onClick={() => {
                      setSignInClicked(true);
                      signIn("google");
                    }}
                  >
                    {signInClicked ? (
                      <LoadingDots color="#808080" />
                    ) : (
                      <>
                        <Google className="h-5 w-5" />
                        <p>{t('navbar.signgoogle')}</p>
                      </>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
