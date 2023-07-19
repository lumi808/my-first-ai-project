'use client';

import { motion } from 'framer-motion';
import { TypingText } from './custom-textx';
import React from 'react';
import styles from '@/app/index';
import { fadeIn, staggerContainer } from 'utils/motion';

export default function About() {

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
        <TypingText title="About AI Date Assistant" textStyles="text-center" />

        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[18px] text-center text-gray-700"
        >
          <span className="font-extrabold text-gray-800">AI Date Assistant</span> aims to foster {' '}
          <span className="font-extrabold text-gray-800">
          love and healthy relationships
          </span>{' '}
          by facilitating quality time spent together, fostering deeper connections, and enhancing communication between partners. It provides an avenue for individuals to create meaningful experiences, strengthen their bond, and grow closer, ultimately leading to more fulfilling and harmonious relationships.
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