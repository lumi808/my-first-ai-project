import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeIn } from 'utils/motion'
import { TypingText } from './custom-textx'

const About = () => {
    
  return (
    <section className='relative z-10'>
        <div className='gradient-02 z-0'/>
        <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='show'
            viewport={{once: false, amount: 0.25}}
            className='mx-auto flex-col'>
                <TypingText title="| About Date Assistant" textStyles="text-center"/>
        </motion.div>
    </section>
  )
}

export default About