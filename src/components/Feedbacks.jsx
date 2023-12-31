import { motion} from "framer-motion"

import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from "../utils/motion" 
import { testimonials, feedbackText } from '../constants'
import { useSelector } from 'react-redux'


const FeedbackCard = ({ name, designation, company, image, index, testimonial, preposition }) => (
  <motion.div
    variants={fadeIn("", "spring", index*0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl w-full xs:w-[490px]">
      <p className="text-white font-black text-[42px]">"</p>
      <div className="mt-1">
        <p className="text-white tracking-wider text-[18px]">{testimonial}</p>
        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[16px]">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            <p className="mt-1 text-secondary text-[12px]">{designation} {preposition} {company}</p>
          </div>
          <img src={image} alt={name} className="w-10 h-10 object-cover rounded-full"/>
        </div>
      </div>
    </motion.div>

)


const Feedbacks = () => {

  const language = useSelector(state => state.language)

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
          <motion.div 
          variants={textVariant} >
            <p className={styles.sectionSubText}>
              {feedbackText[language].subtitle}
            </p>
            <h2 className={styles.sectionHeadText}>
              {feedbackText[language].title}
            </h2>
          </motion.div>
        </div>
        <div className={`${styles.paddingX} -mt-20 pb-14 flex justify-center flex-wrap gap-7`}>
          {testimonials[language].map((testimonial, index) => (
            <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "feedbacks")