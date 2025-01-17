import React from 'react'
import Button from '../Button/Button'
import "./ProductItem.css"

const ProductItem = ({product, className, onAdd}) => {

  const addHandler = () => {
    onAdd(product)
  }

  return (
    <div>
      <div className={`product ` + className}>
        {product.price}
      </div>
      <div className='img' />
      <div className='title' >
        {product.title}
      </div>
      <div className='description' >
        {product.description}
      </div>
      <div className='price' >
        <span>Narxi: <b>{product.price}</b> </span>
      </div>
      <Button className="add-btn" onClick={addHandler} >
        Korzinkaga qo`shish
      </Button>
    </div>
  )
}

export default ProductItem