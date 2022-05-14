import React from 'react'
import { useEffect } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/auth'
import NavBar from './NavBar2'
import { getCart } from '../features/cart'


export default function Page({children}) {
    const dispatch = useDispatch()

    useEffect(()=>{
      
      onAuthStateChanged(auth,(result)=>{
        if(result){
          dispatch(login({
              name:result.displayName,
              profilePic:result.photoURL,
              id:result.uid
          }))
          dispatch(getCart(result.displayName))
        }else{
          dispatch(logout())
        }
      })
    },[])
  return (
    <>
    <NavBar/>
    {children}
    </>
  )
}
