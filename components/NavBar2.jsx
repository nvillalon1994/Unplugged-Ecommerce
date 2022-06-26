import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logotipo from '../pages/images/logotipo.png'
import { useSelector } from 'react-redux'
import {TiShoppingCart} from 'react-icons/ti';
import {FaSignOutAlt} from 'react-icons/fa'
import {signOut} from 'firebase/auth'
import { auth } from '../config/firebase'


export default function NavBar() {
    const [show,setShow]= useState(false)
    const [show2,setShow2]= useState(false)
    const items = useSelector(state=>state.cart.items)
    const {logged,name,profilePic} = useSelector(state=>state.auth)

    const logout = ()=>{
        signOut(auth)
    }
    
    const filtroBusqueda =(event)=>{
      event.preventDefault()
      const {filtroBusqueda}= event.target
      console.log(filtroBusqueda.value)
    }
    
  return (
    
      <div className='navBar_Container' >
        
        <div className='navBar'>
          <div onClick={()=>{setShow2(false)}} >
          <Link href={"/"} passHref ><Image src={logotipo} alt="logo" width={150}  height={60} /></Link>
          </div>
        
          
          
          <ul className='linkRight'>
          
            

            {logged&&<li className='carritoLink'><TiShoppingCart onClick={()=>{setShow2(!show2)}} className='carrito'/><span className='cartLength'  >{items.length}</span> </li>}
            {logged&&
              <li className='userNav'>
                <img src={profilePic} alt="" />
                <p className='name'>{name}</p>
              </li>}
            {logged?  <li className='signOut' onClick={logout}><FaSignOutAlt/></li>:<Link href={"/auth/login"}><li className='btn-ingresar' onClick={()=>{setShow(!show)}} >Iniciar Sesión </li></Link>}
          </ul>
        </div>
        {/* {show&&
          
          <Login/>
          } */}
        {show2&&
          <div className='cart-nav'>
            {/* {items.length>0?<p onClick={()=>{setShow2(!show2)}}><Link href={"/carrito"} className="link-navCart">Ir al carrito</Link></p>:<p>Carrito vacío</p>} */}
            <p onClick={()=>{setShow2(!show2)}}><Link href={"/carrito"} className="link-navCart">Ir al carrito</Link></p>
            
             {items.map((item)=>
              <div key={item.id} className="product-navCart">
                <div className='img-nacCart'>
                  <img src={item.image} alt="" />
                </div>
                <div className='text-navCart'>
                  <h4>{item.name}</h4>
                  <p> $ {item.price}</p>
                </div>
                
              
        </div>)}
          </div>
          
          }
        
      </div>
    
  )
}
