import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar2 from '../../components/NavBar2'
import {collection,getDocs} from 'firebase/firestore'
import { decreaseAmount, getCart, increaseAmount, removeFromCart,totalPrice } from '../../features/cart'
import { database } from '../../config/firebase'

export default function Index(){
    
    const items = useSelector(state=>state.cart.items)
    const total = useSelector(state=>state.cart.total)
    const {name} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const aumentarCantidad =(item)=>{
        
        dispatch(increaseAmount({item,name}))
        dispatch(getCart(name))
        // dispatch(totalPrice())
        
    }

    const dismunuirCantidad = (item)=>{
        if(item.cantidad>1){
            
            dispatch(decreaseAmount({item,name}))
            dispatch(getCart(name))
            // dispatch(totalPrice())
            
        }
        else{
            dispatch(removeFromCart({id:item.id,name}))
            dispatch(totalPrice())
            dispatch(getCart(name))
        }
        
    }
    const removeProductFromCart=(id)=>{
    
        console.log(id)
        dispatch(removeFromCart({id,name}))
        dispatch(getCart(name))
        dispatch(totalPrice())
      }
    // const totalPrice2=()=>{
        
    //     let totalArray=[];
    //     items.map((item)=>{
    //     totalArray.push(item.price*item.cantidad)
    //     })
        
        
    //     let sum = 0;
    //     for (let i = 0; i < totalArray.length; i++) {
    //         sum += parseInt(totalArray[i]);
    //     }
    //     setTotal(sum)
        
    // }
    
    
    useEffect(() => {
        dispatch(totalPrice())
      }, []);
  return (
    <>
       
        {items.length===0?<h1>El carrito esta vacío</h1>:<h1>Productos en carrito: {items.length}</h1>}
        
        {items.map((item)=><div key={item.id}>
            <p>{item.name}</p>
            {/* <p>{item.desc1}</p> */}
            <p> cantidad: {item.cantidad}</p>
            <p> precio: {item.price}</p>
            <p> id: {item.id}</p>
            <button onClick={()=>{aumentarCantidad(item)}}>+</button>
            <button onClick={()=>{dismunuirCantidad(item)}}>-</button>
            <button className='btn-remove' onClick={()=>{removeProductFromCart(item.id)}}>Quitar del Carrito</button>
            {/* <img src={item.image} alt="" /> */}
        </div>)}
        
        {/* {total?<h1>Total:{total}</h1>:<></>} */}
    </>
  )
}
