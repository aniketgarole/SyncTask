import { useState } from 'react'


import Homepage from './pages/Homepage'
import Modal from './components/Modal'
import Signuppage from './pages/Signuppage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Homepage/> */}
      {/* <Modal/> */}
      <Signuppage/>
    </>
  )
}

export default App
