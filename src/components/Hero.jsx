import { motion } from 'framer-motion'
import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
import { BiChevronsDown } from "react-icons/bi";
import ReactTyped from "react-typed";
import { heroText } from '../constants'


import { useState, useEffect } from 'react'


const Hero = () => {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#00dddd]" />
          <div className="w-1 sm:h-80 h-40 teal-gradient"/>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {heroText.title}<span className="text-[#00dddd]">{heroText.name}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {heroText.text1}<ReactTyped strings={heroText.text2} typeSpeed={50} loop/>
          </p>
        </div>
      </div>
        <ComputersCanvas />
        <div className='absolute xs:bottom-50  bottom-20 sm:bottom-[-60px] w-full flex justify-center items-center'>
          <a href="#about" className='cursor-pointer'>
            <div className={`${isMobile? 'flex': 'hidden'} flex flex-col justify-center items-center p-2`}>
              <p>{heroText.text3}</p>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                className='arrow-down color-white mb-1 scale-2 cursor-pointer'
              >
                <BiChevronsDown />
              </motion.div>
            </div>
          </a>
        </div>
    </section>  
  )
}

export default Hero