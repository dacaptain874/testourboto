import React, { useState } from 'react'
import Button from '../Button/Button'
import "./ProductItem.css"

const ProductItem = ({product, className, onAdd}) => {

  const [productQuantity, setProductQuantity] = useState(0)

  const addHandler = () => {
    const updatedProduct = { ...product, quantity: productQuantity }
    onAdd(updatedProduct)
  }

  const productQuantityPlus = () => {
    setProductQuantity(prev => prev + 1)
  }

  const productQuantityMinus = () => {
    setProductQuantity(prev => prev === 0 ? prev = 0 : prev - 1)
  }
  

  return (
      <div className={`product ` + className}>
        <div className="img-container" >
          <img src={product.img} className='img'/>
        </div>
        <div className='title' >
          <h2>
            {product.title}
          </h2>
        </div>
        <div className='description' >
          {product.description}
        </div>
        <div className='price' >
          <span>Narxi: <b>{product.price}</b> so'm </span>
        </div>
        <div className='product-quantity' >
          <div onClick={productQuantityMinus} >-</div>
          <span>{productQuantity}</span>
          <div onClick={productQuantityPlus} >+</div>
        </div>
        <Button onClick={addHandler} >
          Korzinkaga qo`shish
        </Button>
      </div>
  )
}

export default ProductItem