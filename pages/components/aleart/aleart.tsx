import { useState, FunctionComponent } from 'react'
import SuccessAleart from './successAleart'

interface AleartProps {
  duration?: Number,
  condition?: Boolean,
  text?: String,
}

const Aleart:FunctionComponent<AleartProps> = ({duration, condition, text}) => {

  const [ isAleartOn, setIsAleartOn ] = useState(true)

  const styleDistributor = () => {
    if (isAleartOn) {
      return 'flex fixed w-screen'
    } else {
      return 'disabled'
    }
  }

  return (
    <div className={styleDistributor()}>
      <div className='m-auto text-white px-8 py-8 rounded-lg'>
        <SuccessAleart />
      </div>
    </div>
  )
}
export default Aleart;