import Head from 'next/head'
import Image from 'next/image'
// import Slider from 'infinite-react-carousel';

import foto1 from './images/img1.jpg'
import { database } from '../config/firebase'
import {collection,getDocs} from 'firebase/firestore'
import { BsFillCartPlusFill} from 'react-icons/bs';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Autoplay from 'embla-carousel-autoplay';
// import Slider from 'infinite-react-carousel';
// import  from '.././node_modules/infinite-react-carousel/lib/carousel/style.css'
import useEmblaCarousel from 'embla-carousel-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { addToCart,getCart } from '../features/cart'
export async function getStaticProps(){
  const col = collection(database,"products")
  const docs = await getDocs(col)

  const productos = []

  docs.forEach(doc=>{
      productos.push({...doc.data(),id:doc.id})
  })

  return {
    props:{
      productos
    }
  }
  
}
export default function Home({productos}) {
  const {name,id} = useSelector(state=>state.auth )
  const items = useSelector(state=>state.cart.items)
  const dispatch =useDispatch()
  
  const addProductoToCart =(producto)=>{
        
        const addedProduct = {
          ...producto,
          ...{cantidad:1}}
          dispatch(addToCart({addedProduct,user:name,items}))
          dispatch(getCart(name))
        
  }
  
  const newProducts = []
  const popularProducts = []
  productos.map((producto)=>{if(producto.new){newProducts.push(producto)}})
  productos.map((producto)=>{if(producto.popular){popularProducts.push(producto)}})


  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true,skipSnaps: false },[Autoplay( {delay: 3000})])
  // const [emblaRef] = useEmblaCarousel()
  useEffect(() => {
    
    AOS.init();
    AOS.refresh()
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])
    // const pay = ()=>{
    //   fetch("/api/payment/stripe-checkout",{
    //     method:"POST"
    //   })
    //   .then(result=>result.json())
    //   .then(data)
    // }
  return (
    <main >
      
      
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
        
         
          <div className="embla__slide"><img src="https://static.guitarcenter.com/static/gc/selects/2022/d-home/gc-md-hf-start-the-fireworks-early-06-22-22.jpg"/></div>
          <div className="embla__slide"><img src="https://static.guitarcenter.com/static/gc/selects/2022/d-home/gc-md-hf-mpc-keys-06-23-22.jpg"/></div>
          <div className="embla__slide"><img src="https://static.guitarcenter.com/static/gc/selects/2022/d-home/gc-md-hf-playing-with-pride-06-23-22.jpg"/></div>
          <div className="embla__slide"><img src="https://static.guitarcenter.com/static/gc/selects/2022/d-home/gc-md-hf-lessons-06-23-22.jpg"/></div>

        </div>
        <Link  href={"/productos"}><button className="productLink">Ver todos los productos</button></Link>
      </div>
      
      
      <section  className="container22">
      
      <h1 className='title2'>Nuevos Arribos</h1>
        <section className='products_Container2'>
        {newProducts?.map((producto)=>
        <div className='products1' data-aos="zoom-in" data-aos-delay="100" data-aos-offset="0"  key={producto.id}>
            <Link  href={"/productos/" + producto.id} >
              <div  className='product1' >
                
                <div className='img_product1'>
                  <img src={producto.image} alt=""/>
                </div>
              
                <p>$ {producto.price}</p>
                <h2>{producto.name}</h2>
              
              
              </div>

            </Link>
            <button className='btn-add1' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            
          </div>)}
        </section>
        
      </section>
      
      <section  className="container22">
      <h1 className='title2'>Productos Populares</h1>
        <section className='products_Container2'>
        {popularProducts?.map((producto)=>
        <div className='products1' data-aos="zoom-in" data-aos-delay="100" data-aos-offset="0"  key={producto.id}>
            <Link  href={"/productos/" + producto.id} >
              <div  className='product1' >
                
                <div className='img_product1'>
                  <img src={producto.image} alt="Picture of the author"/>
                </div>
              
                <p>$ {producto.price}</p>
                <h2>{producto.name}</h2>
              
              
              </div>

            </Link>
            <button className='btn-add1' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            
          </div>)}
        </section>
        
      </section>
      
      
      
      
    </main>
  )
}
