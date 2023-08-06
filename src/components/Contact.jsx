import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { EarthCanvas } from './canvas'
import { slideIn} from '../utils/motion'


const Contact = () => {

  const formRef = useRef()

  //template_xvo84i5
  //service_lv3pbot
  //fAPmK4U65-58bZPMP

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    emailjs.send("service_lv3pbot", "template_xvo84i5",{
      from_name: form.name,
      to_name: "Maike",
      from_email: form.email,
      toEmail: "maikermenezes@gmail.com",
      message: form.message
    },
    "fAPmK4U65-58bZPMP").then(() => {
      setLoading(false)
      alert("Thank you for your contact. I will get back to you as soon as possible!")
      setForm({
        name: '',
        email: '',
        message: ''
      })
    }, (error) => { 
      setLoading(false)
      alert("Something went wrong. Please try again.")
      console.log(error)
    })

  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-8 mt-12"> 
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary border-none rounded-lg px-6 py-4 text-white rounded-lg outlined-none border-none font-medium placeholder:text-secondary" />
            </label>  

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary border-none rounded-lg px-6 py-4 text-white rounded-lg outlined-none border-none font-medium placeholder:text-secondary" />
            </label>  

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea 
              rows="7" 
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say??"
              className="bg-tertiary border-none rounded-lg px-6 py-4 text-white rounded-lg outlined-none border-none font-medium placeholder:text-secondary" />
            </label> 
            <button type="submit" className="bg-teal-dark py-3 px-8 outline-none rounded-xl w-fit text-white font-bold shadow-md shadow-primary">
              {loading? "Sending..." : "Send"}
            </button>          
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl-flex-1 xl:h-auto md:h-[550px] w-full h-[350px]">
          <EarthCanvas />
        </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")