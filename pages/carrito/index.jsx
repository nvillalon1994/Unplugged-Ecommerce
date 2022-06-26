import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {collection,getDocs} from 'firebase/firestore'
import { decreaseAmount, getCart, increaseAmount, removeFromCart,totalPrice ,removeCart} from '../../features/cart'
import { database } from '../../config/firebase'

import {FaTrashAlt} from 'react-icons/fa'
import {GrAddCircle} from 'react-icons/gr'
import {IoIosRemoveCircleOutline,IoIosAddCircleOutline} from 'react-icons/io'
import {PayPalButtons, PayPalScriptProvider,} from '@paypal/react-paypal-js'
import axios from 'axios'
import Paypal from '../../components/PayPalCheckoutButton'
import PayPalCheckoutButton from '../../components/PayPalCheckoutButton'
export default function Index(){
    
    const items = useSelector(state=>state.cart.items)
    const total = useSelector(state=>state.cart.total)
    const {name,id} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const aumentarCantidad =(item)=>{
        
        dispatch(increaseAmount({item,name}))
        
        
        
    }

    const dismunuirCantidad = (item)=>{
        if(item.cantidad>1){
            
            dispatch(decreaseAmount({item,name}))
            
            // dispatch(totalPrice())
            
        }
        else{
            dispatch(removeFromCart({id:item.id,name}))
            // dispatch(totalPrice())
            
        }
        
    }
    const removeProductFromCart=(id)=>{
    
        console.log(id)
        dispatch(removeFromCart({id,name}))
        
        
    }
    const removeCart2=()=>{
    
        
        dispatch(removeCart({name,items}))
        
        
    }
 
    
      dispatch(totalPrice())
    useEffect(() => {
        dispatch(totalPrice())
      }, []);
      const createOrder = async() =>{
        const result = await axios.post("/api/payment/createOrder")
        return result.data.orderID
      }
      const onApprove =(data)=>{
        console.log(data)
      }
      console.log(typeof(total))
      const [checkout,setCheckOut]= useState(false)
  return (
    <section className='carrito-Container'>
       
        {items.length===0?<h1 className='titleCart'>El carrito esta vacío</h1>:
        <div className='carrito2'>
            <h1 className='titleCart'>Productos en carrito: {items.length}</h1>
            <table>
                <thead className='thead'>
                    <tr>
                        
                        <th>Producto</th>
                        <th className='precioUnidad'>Precio por unidad</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item)=><tr key={item.id}>
                        
                        <td className='carritoProduct'>
                            <img src={item.image} alt={item.id} />
                            <p>{item.name}</p>
                        
                        </td>
                        <td className='precioUnidad'>$ {item.price}</td>
                        <td >
                            <div className='amount'>
                                <button className='btn-amount' onClick={()=>{aumentarCantidad(item)}}><IoIosAddCircleOutline/></button>
                                <p>{item.cantidad}</p>
                                <button className='btn-amount' onClick={()=>{dismunuirCantidad(item)}}><IoIosRemoveCircleOutline/></button>
                            </div>
                        </td>
                        <td>$ {item.cantidad*item.price}</td>
                        <td>
                            <button className='btn-remove' onClick={()=>{removeProductFromCart(item.id)}}>
                            
                                <FaTrashAlt />
                                
                            </button>
                            
                        </td>
                    
                    </tr>)}
                    <tr className='total'>
                        <td></td>
                        <td className='precioUnidad'></td>
                        
                        <td>Total</td>
                        <td >{total?<p className='totalPay'>$ {total}</p>:<>$ 0</>}</td>
                        <td className='botonPay'>
                            <PayPalCheckoutButton items={items} total ={total}/>
                        </td>
                       
                    </tr>
                </tbody>
            </table>
           
        </div>}
        
        
        
        
    </section>
  )
}
