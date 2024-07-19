import { motion } from "framer-motion"


export const CreacionModifciacionSala = () => {
  return (
    <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"100%"}} exit={{opacity:0,height:0}}>Creacion-ModifciacionSala</motion.div>
  )
}
