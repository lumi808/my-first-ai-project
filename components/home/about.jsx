'use client';

import { motion } from 'framer-motion';
import { TypingText } from './custom-textx';
import React from 'react';
import styles from '@/app/index';
import { fadeIn, staggerContainer } from 'utils/motion';
import { useTranslation } from "react-i18next";
import i18n from "i18n/i18n";
import { useEffect } from "react";
import dynamic from 'next/dynamic'

export default function About() {
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    const lng = navigator.language;
    i18n.changeLanguage(lng)
  }, [])

  // const lng = navigator.language
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className="gradient-02 z-0" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText title={t('landing.about.title')} textStyles="text-center" />

        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[18px] text-center text-gray-700"
        >
          <span className="font-extrabold text-gray-800">WeDate</span> {t('landing.about.text1')} {' '}
          <span className="font-extrabold text-gray-800">
          {t('landing.about.text2')}
          </span>{' '}
          {t('landing.about.text3')}
        </motion.p>

        <motion.img
          variants={fadeIn('up', 'tween', 0.3, 1)}
          src="/arrow-down.svg"
          alt="arrow down"
          className="w-[18px] h-[28px] object-contain mt-[28px]"
        />
      </motion.div>
    </section>
  );
}