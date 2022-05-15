import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {collection,getDocs} from 'firebase/firestore'
import { decreaseAmount, getCart, increaseAmount, removeFromCart,totalPrice } from '../../features/cart'
import { database } from '../../config/firebase'

import {FaTrashAlt} from 'react-icons/fa'
import {GrAddCircle} from 'react-icons/gr'
import {IoIosRemoveCircleOutline,IoIosAddCircleOutline} from 'react-icons/io'

export default function Index(){
    
    const items = useSelector(state=>state.cart.items)
    const total = useSelector(state=>state.cart.total)
    const {name} = useSelector(state=>state.auth)
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
 
    
      dispatch(totalPrice())
    useEffect(() => {
        dispatch(totalPrice())
      }, []);
  return (
    <>
       
        {items.length===0?<h1 className='titleCart'>El carrito esta vacío</h1>:
        <div>
            <h1 className='titleCart'>Productos en carrito: {items.length}</h1>
            <table>
                <thead>
                    <tr>
                        
                        <th>Producto</th>
                        <th>Precio por unidad</th>
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
                        <td>$ {item.price}</td>
                        <td className='amount'>
                            <button className='btn-amount' onClick={()=>{aumentarCantidad(item)}}><IoIosAddCircleOutline/></button>
                            <span>{item.cantidad}</span>
                            <button className='btn-amount' onClick={()=>{dismunuirCantidad(item)}}><IoIosRemoveCircleOutline/></button>
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
                        <td></td>
                        
                        <td>Total</td>
                        <td>{total?<>$ {total}</>:<>$ 0</>}</td>
                        <td><button>Pagar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>}
        
        
        
        
    </>
  )
}
