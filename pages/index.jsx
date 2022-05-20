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


  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },[Autoplay( {delay: 3000})])
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
      <a href="/api/payment/stripe-checkout">Pagar</a>
      {/* <button onClick={pay} >Pagar</button> */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
        
         
          <div className="embla__slide"><img src="https://www.lueschermusik.ch/srv/dr/_ts_1603630595545_8cdb6e0/rn_125242/args.pic/de/Vintera_Guitars_Banner.jpg"/></div>
          <div className="embla__slide"><img src="https://sc1.musik-produktiv.com/img/header/brands/Squier-by-Fender.jpg"/></div>
          <div className="embla__slide"><img src="https://cdn11.bigcommerce.com/s-yqxwyeh/product_images/uploaded_images/ibanez-banner.jpg"/></div>
          <div className="embla__slide"><img src="https://www.theartsmusicstore.com/wp-content/uploads/2019/01/Gibson-Guitars-Page-Banner-2.jpg"/></div>

        </div>
      </div>
      <Link  href={"/productos"}><button className="productLink">Ver todos los productos</button></Link>
      <h1 className='title2'>Nuevos Arribos</h1>
      <section  className="container2">
        
        <section className='products_Container2'>
        {newProducts?.map((producto)=>
        <div className='product2' data-aos="zoom-in" data-aos-delay="100" data-aos-offset="0"  key={producto.id}>
            <Link  href={"/productos/" + producto.id} >
              <div  className='product' >
                
                <div className='img_product'>
                  <img src={producto.image} alt="Picture of the author"/>
                </div>
              
                <p>$ {producto.price}</p>
                <h2>{producto.name}</h2>
              
              
              </div>

            </Link>
            <button className='btn-add' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            
          </div>)}
        </section>
        
      </section>
      <h1 className='title2'>Productos Populares</h1>
      <section  className="container2">
        
        <section className='products_Container2'>
        {popularProducts?.map((producto)=>
        <div className='product2' data-aos="zoom-in" data-aos-delay="100" data-aos-offset="0"  key={producto.id}>
            <Link  href={"/productos/" + producto.id} >
              <div  className='product' >
                
                <div className='img_product'>
                  <img src={producto.image} alt="Picture of the author"/>
                </div>
              
                <p>$ {producto.price}</p>
                <h2>{producto.name}</h2>
              
              
              </div>

            </Link>
            <button className='btn-add' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            
          </div>)}
        </section>
        
      </section>
      
      
      
      
    </main>
  )
}
