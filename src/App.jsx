import React, { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
const tg = window.Telegram.WebApp


const App = () => {

  const {tg, onToggleButton} = useTelegram()

  useEffect(() => {
    tg.ready()
  })


  return (
    <div>App

      <button onClick={onToggleButton}>Close</button>
    </div>
  )
}

export default App