import React, { useCallback, useEffect, useState } from 'react'
import "./Form.css"
import { useTelegram } from '../../hooks/useTelegram'

const Form = () => {

  const [country, setCountry] = useState("")
  const [street, setStreet] = useState("")
  const [subject, setSubject] = useState("jismoniy")
  const {tg} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country, 
      street, 
      subject
    }

    tg.sendData(JSON.stringify(data))
  }, [country, street, subject])

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData)

    return () => {
      tg.offEvent("mainButtonClicked", onSendData)
    }
  }, [onSendData])


  useEffect(() => {
    tg.MainButton.setParams({
      text: "malumot jonatish"
    })
  }, [])

  useEffect(() => {
    if(!street || !country) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [country, street])

  const onChangeCountry = e => {
    setCountry(e.target.value)
  }

  const onChangeStreet = e => {
    setStreet(e.target.value)
  }

  const onChangeSubject = e => {
    setSubject(e.target.value)
  }

  return (
    <div className='form' >
      <h3>ozingiz haqingizdagi malumotni kiriting: </h3>
      <input 
        className='input' 
        type="text" 
        placeholder='Tuman yoki shaxringiz' 
        value={country}
        onChange={onChangeCountry}
      />
      <input 
        className='input' 
        type="text" 
        placeholder='Dokoningiz manzili' 
        value={street}
        onChange={onChangeStreet}
      />
      <select 
        className='select' 
        value={subject}
        onChange={onChangeSubject}
      >
        <option value="jismoniy">Jismoniy shaxs</option>
        <option value="yuridik">Yuridik shaxs</option>
      </select>
    </div>
  )
}

export default Form