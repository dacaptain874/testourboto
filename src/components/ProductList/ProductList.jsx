import React, { useCallback, useEffect, useState } from 'react'
import "./ProductList.css"
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {id: "1", title: "niso", price: 8400, description: "delfin latta oq 40x40", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbZp7mtt7hfbd08mSvui81T0.jpg"},
  {id: "2", title: "niso xxl", price: 13500, description: "delfin latta oq 80x60", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbQff1Z91Nhafl4Jd1LNm8x8.jpg"},
  {id: "3", title: "niso gigant size", price: 19500, description: "delfin latta oq 80x100", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbYEWqVC1nZ5S9tEEcRC9sVi.jpg"},
  {id: "4", title: "niso gold", price: 10500, description: "delfin latta gold 40x40", img: "https://files.ox-sys.com/cache/original/image/c6/6f/f3/c66ff3791e0401fbaa2abbb6efee772dc90bb90dadf8778a5da1e306c5f7fac0.jpeg"},
  {id: "5", title: "niso gold gigant", price: 20500, description: "delfin latta gold 80x100", img: "https://images.uzum.uz/cg1h4vvhgiov1qidj7rg/original.jpg"},
  {id: "6", title: "veral 5W", price: 7177, description: "5 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "7", title: "veral 7W", price: 8482, description: "7 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "8", title: "veral 10W", price: 9135, description: "10 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "9", title: "veral 12W", price: 10440, description: "12 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "10", title: "veral 15W", price: 12400, description: "15 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "11", title: "veral 18W", price: 14355, description: "18 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
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
        totalPrice: getTotalPrice(addedItems),
        queryId,
    }
    fetch('https://thriving-lollipop-359fe8.netlify.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
  }, [addedItems])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
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