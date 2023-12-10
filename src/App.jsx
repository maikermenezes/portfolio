import { BrowserRouter } from "react-router-dom"
import { About, Contact, Experience, Feedbacks, 
  Hero, Navbar, Tech, Works, StarsCanvas} from "./components" 
  import { useSelector } from 'react-redux'
  import { heroText } from './constants'



const App = () => {

  const language = useSelector(state => state.language)

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero heroText={heroText[language]}/>
        </div>
        <About language={language}/>
        <Experience language={language}/>
        <Tech language={language}/>
        <Works language={language}/>
        <Feedbacks language={language}/>
        <div className="relative z-o">
          <Contact language={language}/>
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
