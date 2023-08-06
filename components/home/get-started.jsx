'use client'
import { motion } from "framer-motion"
import styles from "@/app/index"
import { fadeIn, staggerContainer, planetVariants } from "utils/motion"
import { TitleText, TypingText } from "./custom-textx"
import StartSteps from "./start-steps"
import { startingFeatures } from "@/lib/constants"
import { useEffect } from "react"
import i18n from "i18n/i18n";
import { useTranslation } from "react-i18next";
import dynamic from 'next/dynamic'


export default function GetStarted() {
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng)
  }, [])

  // const lng = navigator.language
  
  const startingFeaturesWithTranslation = [
    t('landing.getstarted.features.first'),
    t('landing.getstarted.features.second'),
    t('landing.getstarted.features.third'),
  ];
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={planetVariants('left')}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <img
            src="/get-started.png"
            alt="get-started"
            className="w-[90%] h-[90%] object-contain"
          />
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title={t('landing.getstarted.title')} />
          <TitleText title={<>{t('landing.getstarted.text')}</>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
            {startingFeaturesWithTranslation.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? '0' : ''} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
};