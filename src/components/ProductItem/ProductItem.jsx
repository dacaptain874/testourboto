import React, { useState } from 'react'
import Button from '../Button/Button'
import "./ProductItem.css"

const ProductItem = ({product, className, onAdd}) => {

  const [productQuantity, setProductQuantity] = useState(0)
  const [productQuantityBlock, setProductQuantityBlock] = useState(0)

  const addHandler = () => {
    const updatedProduct = { ...product, quantity: productQuantity, blok: productQuantityBlock }
    onAdd(updatedProduct)
  }

  const plusProduct = (setter) => {
    setter(item => item + 1)
  }
  const minusProduct = (setter) => {
    setter(prev => (prev > 1 ? prev - 1 : 1))
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
          <span>blok:({product.blok}) </span>
          <div onClick={() => minusProduct(setProductQuantityBlock)} >-</div>
          <span>{productQuantityBlock}</span>
          <div onClick={() => plusProduct(setProductQuantityBlock)} >+</div>
        </div>
        <div className='product-quantity' >
          <span>dona: </span>
          <div onClick={() => minusProduct(setProductQuantity)} >-</div>
          <span>{productQuantity}</span>
          <div onClick={() => plusProduct(setProductQuantity)} >+</div>
        </div>
        <Button onClick={addHandler} >
          Korzinkaga qo`shish
        </Button>
      </div>
  )
}

export default ProductItem