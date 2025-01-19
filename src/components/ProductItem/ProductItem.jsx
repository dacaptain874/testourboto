import React, { useState } from 'react'
import Button from '../Button/Button'
import "./ProductItem.css"

const ProductItem = ({product, className, onAdd}) => {

  const [productQuantity, setProductQuantity] = useState(0)
  const [productQuantityBlock, setProductQuantityBlock] = useState(0)

  const addHandler = () => {
    const updatedProduct = { ...product, quantity: productQuantity, quantityBlok: productQuantityBlock }
    onAdd(updatedProduct)
  }

  const plusProduct = (setter) => {
    setter(item => item + 1)
    addHandler()
  }
  const minusProduct = (setter) => {
    setter(prev => (prev === 0 ? 0 : prev - 1))
    addHandler()
  }
  

  return (
      <div className={`product ` + className}>
        <div className="img-container" >
          <img src={product.img} className='img'/>
        </div>
        <div className='title' >
          <h3>
            {product.title}
          </h3>
        </div>
        <div className='description' >
          {product.description}
        </div>
        <div className='price' >
          <span>Narxi: <b>{product.price}</b> so'm </span>
        </div>
        <div className='product-quantity' >
          <span>blok: (<b>{product.blok}</b>) </span>
          <div className='product-quantity-btns' >
            <div onClick={() => minusProduct(setProductQuantityBlock)} >-</div>
            <span>{productQuantityBlock}</span>
            <div onClick={() => plusProduct(setProductQuantityBlock)} >+</div>
          </div>
        </div>
        <div className='product-quantity' >
          <span>dona: (<b>{product.quantity}</b>)</span>
          <div className='product-quantity-btns' >
            <div onClick={() => minusProduct(setProductQuantity)} >-</div>
            <span>{productQuantity}</span>
            <div onClick={() => plusProduct(setProductQuantity)} >+</div>
          </div>
        </div>
        <Button onClick={addHandler} >
          Savatga qo`shish
        </Button>
      </div>
  )
}

export default ProductItem