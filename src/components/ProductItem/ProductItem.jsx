import React from 'react'
import Button from '../Button/Button'
import "./ProductItem.css"

const ProductItem = ({product, className, onAdd}) => {

  const addHandler = () => {
    onAdd(product)
  }

  return (
      <div className={`product ` + className}>
        <div className="img-container" >
          <img src={product.img} className='img'/>
        </div>
        <div className='title' >
          {product.title}
        </div>
        <div className='description' >
          {product.description}
        </div>
        <div className='price' >
          <span>Narxi: <b>{product.price}</b> so'm </span>
        </div>
        <Button onClick={addHandler} >
          Korzinkaga qo`shish
        </Button>
      </div>
  )
}

export default ProductItem