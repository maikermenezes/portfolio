import React,  {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import  { styles } from '../styles'
import  { navLinks, resumeLink } from '../constants'
import { logo, menu, close } from '../assets'
import Flag from 'react-flagkit';

import { useSelector, useDispatch } from 'react-redux'

import { LuDownload } from "react-icons/lu";


const Navbar = () => {

  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)

  const language = useSelector(state => state.language)
  const dispatch = useDispatch();

  const navBarLinks = navLinks[language]

  const switchLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt'
    dispatch({type: 'CHANGE_LANGUAGE', payload: newLanguage})
  }

  return (
      <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2" 
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0)
          }}>
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-white text-[18px] font-bold cursor-pointer">Maike Menezes</p>
          </Link>
          <a href={resumeLink[language]}
            className='flex gap-2 items-center'
            download={ language === 'pt' ? 'Maike Menezes - curriculo.pdf' : 'Maike Menezes - Resume.pdf'}
            rel="noreferrer"><LuDownload size={20} color='#00dddd'/> {language === 'pt'? 'Baixar Currículo' : 'Download Resume'}</a>
          <ul className="list-none hidden sm:flex flex-row gap-10">
            <button className='flex gap-4 items-center' onClick={switchLanguage}>
              <Flag className="rounded-full" country={language === 'pt' ? 'BR' : 'GB'} size={32} />
              {language === 'pt' ? 'BR' : 'ENG'}
            </button>
            {navBarLinks.map((link) => (
              <li key={link.id} className={`${
                active === link.title? "text-teal-dark" : "text-secondary"} 
                hover:text-teal-dark text-[18px] capitalize font-medium cursor-pointer transition-all duration-300 ease-in-out
                `}
                onClick={() => {
                  setActive(link.title);
                }}
                >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
              ))}
          </ul>  

          <div className="sm:hidden flex flex-1 justify-end items-center">
                <img src={toggle? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={
                  () => setToggle(!toggle) 
                }/>
                <div className={`${toggle ? 'flex' : 'hidden'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-x1`}>
                  <ul className="list-none flex flex-col gap-4 justify-end items-start">
                    {navBarLinks.map((link) => (
                      <li key={link.id} className={`${
                        active === link.title? "text-white" : "text-secondary"} 
                        hover:text-white text-[16px] capitalize font-medium cursor-pointer transition-all duration-300 ease-in-out
                        `}
                        onClick={() => {
                          setToggle(!toggle);
                          setActive(link.title);
                        }}>
                        <a href={`#${link.id}`}>{link.title}</a>
                      </li>
                      ))}
                  </ul> 
                </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar