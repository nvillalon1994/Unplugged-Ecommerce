import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../config/firebase'
import { removeCart, removeFromCart, totalPrice } from '../features/cart'
import { useRouter } from 'next/router'
export default function PayPalCheckoutButton() {
    
    const items = useSelector(state=>state.cart.items)
    const total = useSelector(state=>state.cart.total)
    const {name} = useSelector(state=>state.auth)
    const dispatch= useDispatch()
    const router = useRouter()
    dispatch(totalPrice())
    console.log(total)
    const compra =[]
    items.map((item)=>{
        const newProduct = {
            
            name:item.name,
            currency:"USD",
            quantity:toString(item.price),
            price:toString(item.price),
            sku:item.id
        }
        compra.push(newProduct)

    })
    
    console.log(compra)
    const [paidFor,setPaidFor]=useState(false)
    const [error, setError]= useState(null)
    
    
    const handleApprove =(orderID)=>{
        setPaidFor(true)
        
    }
    if(paidFor){
        
        dispatch(removeCart({name,items}))
        
        alert("Gracias por su compra")
        setTimeout(function(){router.replace("/")},2000)
        
        
        
        
    }
    if(error) {
        alert(error)
    }
  return (
    

    <PayPalButtons onClick={()=>{
        console.log(total)
        dispatch(totalPrice())}
    }
    style={{
        color:"silver",
        layout:"horizontal",
        height:48,
        tagline:false,
        shape:"pill"
    }}
    
    createOrder={(data,actions)=>{
        return actions.order.create({
            purchase_units:[
                {
                    description:"Lista de productos",
                    amount: {
                        value:total,
                        currency_code:"USD"
                    },
                    items:[]
                }
                

            ]
        })
    }}
    onApprove={async(data,actions) => {
        const order = await actions.order.capture();
        console.log("order", order)
        handleApprove(data.orderID)
    }}
    onCancel={()=>{

    }}
    onError={(error) =>{
        setError(error)
        console.log("error",error)
    }}
    />
  )
}
