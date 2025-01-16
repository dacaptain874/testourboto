import React, { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'


const App = () => {

  const {tg, onToggleButton} = useTelegram()

  useEffect(() => {
    tg.ready()
  })


  return (
    <div>App
      <Header/>
      <button onClick={onToggleButton}>Close</button>
    </div>
)
}

export default App