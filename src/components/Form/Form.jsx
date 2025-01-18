import React, { useCallback, useEffect, useState } from 'react'
import "./Form.css"
import { useTelegram } from '../../hooks/useTelegram'

const Form = () => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState(``)
  const [country, setCountry] = useState("")
  const [street, setStreet] = useState("")
  const {tg} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      name, 
      number,
      country, 
      street, 
    }

    console.log("Sending data:", data)
    const dataJson = JSON.stringify(data)
    console.log("Sending JSON data:", dataJson);

    tg.sendData("asdf")
  }, [name, number, country, street])

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData)
    console.log("mainbuttonclicked")

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
  
  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeNumber = e => {
    const newValue = e.target.value
    if (/^\d*$/.test(newValue)) {
      setNumber(newValue);
    }
  }

  return (
    <div className='form' >
      <h1>O'zingiz haqingizdagi malumotni kiriting: </h1>
      <input 
        className='input' 
        type="text" 
        placeholder='F.I.O' 
        value={name}
        onChange={onChangeName}
      />
      <input 
        className='input' 
        type="text" 
        placeholder='Telefon raqamingiz' 
        value={number}
        onChange={onChangeNumber}
      />
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
    </div>
  )
}

export default Form