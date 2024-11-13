import { useState } from 'react'

import Header from './components/Header'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-green-50 w-full h-screen'>
      <Header />
      <Home />
    </div>
      
    </>
  )
}

export default App
