import React, { useCallback, useEffect, useState } from 'react'
import "./ProductList.css"
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {id: "1", title: "niso", price: 8400, quantity: 1, quantityBlok: 1, blok: 20, description: "delfin latta oq 40x40", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbZp7mtt7hfbd08mSvui81T0.jpg"},
  {id: "2", title: "niso xxl", price: 13500, quantity: 1, quantityBlok: 1, blok: 15, description: "delfin latta oq 80x60", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbQff1Z91Nhafl4Jd1LNm8x8.jpg"},
  {id: "3", title: "niso gigant size", price: 19500, quantity: 1, quantityBlok: 1, blok: 10, description: "delfin latta oq 80x100", img: "https://cdn.flymart.uz/file/hub/file/2024/10/17/2nYQbYEWqVC1nZ5S9tEEcRC9sVi.jpg"},
  {id: "4", title: "niso gold", price: 10500, quantity: 1, quantityBlok: 1, blok: 20, description: "delfin latta gold 40x40", img: "https://files.ox-sys.com/cache/original/image/c6/6f/f3/c66ff3791e0401fbaa2abbb6efee772dc90bb90dadf8778a5da1e306c5f7fac0.jpeg"},
  {id: "5", title: "niso gold gigant", price: 20500, quantity: 1, quantityBlok: 1, blok: 20, description: "delfin latta gold 80x100", img: "https://images.uzum.uz/cg1h4vvhgiov1qidj7rg/original.jpg"},
  {id: "6", title: "veral 5W", price: 7177, quantity: 1, quantityBlok: 1, blok: 10, description: "5 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "7", title: "veral 7W", price: 8482, quantity: 1, quantityBlok: 1, blok: 10, description: "7 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "8", title: "veral 10W", price: 9135, quantity: 1, quantityBlok: 1, blok: 10, description: "10 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "9", title: "veral 12W", price: 10440, quantity: 1, quantityBlok: 1, blok: 10, description: "12 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "10", title: "veral 15W", price: 12400, quantity: 1, quantityBlok: 1, blok: 10, description: "15 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
  {id: "11", title: "veral 18W", price: 14355, quantity: 1, quantityBlok: 1, blok: 10, description: "18 watt led", img: "https://images.uzum.uz/crqgrnkhug2lhicohrb0/original.jpg"},
]

const ProductList = () => {

  const [addedItems, setAddedItems] = useState([])
  const {tg, queryId} = useTelegram()

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

  const getTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity) + (item.quantityBlok * item.blok * item.price), 0);
  };
  
  const onAdd = (product) => {
    
    setAddedItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id)
      let updatedItems

      if (existingItem) {
        updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: product.quantity + 1, quantityBlok: product.quantityBlok + 1} : item
        )
      } else {
        updatedItems = [...prevItems, { ...product, quantity: product.quantity, quantityBlok: product.quantityBlok }]
      }

      const totalPrice = getTotalPrice(updatedItems)

      console.log(updatedItems);
      

      if (updatedItems.length === 0) {
        tg.MainButton.hide()
      } else {
        tg.MainButton.show()
        tg.MainButton.setParams({
          text: `Zakaz berish: ${totalPrice} so'm`
        })
      }

      return updatedItems;
    })

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