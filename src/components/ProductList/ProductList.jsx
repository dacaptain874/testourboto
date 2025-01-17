import React, { useCallback, useEffect, useState } from 'react'
import "./ProductList.css"
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {id: "1", title: "niso", price: 8400, description: "delfin latta oq 40x40"},
  {id: "2", title: "niso xxl", price: 13500, description: "delfin latta oq 80x60"},
  {id: "3", title: "niso gigant size", price: 19500, description: "delfin latta oq 80x100"},
  {id: "4", title: "niso gold", price: 10500, description: "delfin latta gold 40x40"},
  {id: "5", title: "niso gold gigant", price: 20500, description: "delfin latta gold 80x100"},
  {id: "6", title: "veral 5W", price: 7177, description: "5 watt led"},
  {id: "7", title: "veral 7W", price: 8482, description: "7 watt led"},
  {id: "8", title: "veral 10W", price: 9135, description: "10 watt led"},
  {id: "9", title: "veral 12W", price: 10440, description: "12 watt led"},
  {id: "10", title: "veral 15W", price: 12400, description: "15 watt led"},
  {id: "11", title: "veral 18W", price: 14355, description: "18 watt led"},
]

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0) 
}

const ProductList = () => {

  const [addedItems, setAddedItems] = useState([])
  const {tg} = useTelegram()


    const onSendData = useCallback(() => {
      const data = {
        products: addedItems,
        totalPrice: getTotalPrice(addedItems)
      }
    
      fetch("https://localhost:5174", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    }, [])
  
    useEffect(() => {
      tg.onEvent("mainButtonClicked", onSendData)
  
      return () => {
        tg.offEvent("mainButtonClicked", onSendData)
      }
    }, [onSendData])


  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)

    let newItems = []

    if(alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Zakaz berish: ${getTotalPrice(newItems)}`
      })
    }

  }

  return (
    <div className='list' >
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={"item"}
        />
      ))}
    </div>
  )
}

export default ProductList