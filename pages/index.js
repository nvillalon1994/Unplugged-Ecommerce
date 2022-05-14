import Head from 'next/head'
import Image from 'next/image'


import Link from 'next/link'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/cart';


export default function Home() {
  const items = useSelector(state=>state.cart.items)
  
  console.log(items)
  
  
  const dispatch =useDispatch()

  
  
    
  return (
    <main>
      
      <Link href={"/productos"}>ir a productos </Link>
    </main>
  )
}
