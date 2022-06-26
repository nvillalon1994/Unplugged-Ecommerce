import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logotipo from '../images/logotipo.png'
import {database} from '../../config/firebase'
import {collection,getDocs} from 'firebase/firestore'
import AOS from "aos";
import "aos/dist/aos.css";
// import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,getCart,increaseAmount,removeFromCart } from '../../features/cart'

import { BsFillCartPlusFill} from 'react-icons/bs';
import {TiShoppingCart} from 'react-icons/ti';
// import { ToastContainer, toast } from 'react-toastify';
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


export default function Productos({productos}) {
  const notify = () => toast('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    
  const items = useSelector(state=>state.cart.items)
  
  const {logged,name,profilePic} = useSelector(state=>state.auth)
  const [selectedId, setSelectedId] = useState(null)
  const [filtro,setFiltro] = useState(false)
  // console.log(items===[])
  // console.log(items)
  const [blockButton,setBlockButton]= useState(false)
  const dispatch = useDispatch()
  console.log(name)
   
  
  const addProductoToCart =(producto)=>{
    // console.log(id)
        console.log(name)
        const addedProduct = {
          ...producto,
          ...{cantidad:1}}
          dispatch(addToCart({addedProduct,user:name,items}))
          dispatch(getCart(name))
        
  }
  
  // console.log(categoria)
  const [products,setProducts] = useState(productos)
  const [categoria,setCategoria] = useState("todos")
  // console.log(categoria)
  const filtrar_categoria=(categoria)=>{
    console.log(categoria)
    let newProducts =[]
    if(categoria==="todos"){
      setProducts(productos)
      setCategoria(categoria)
    }
    else{
      productos.map((product)=>{
      
        if(product.categoria===categoria){
          
          newProducts.push(product)
        }
        
        setProducts(newProducts)
        setCategoria(categoria)
      })
    }
    
  }
  const filtrar_marca=(categoria,marca)=>{
    console.log(categoria)
    let newProducts =[]
    if(categoria==="todos"){
      setProducts(productos)
      setCategoria(categoria)
    }
    else{
      productos.map((product)=>{
      
        if(product.categoria===categoria&&product.marca===marca){
          
          newProducts.push(product)
        }
        
        setProducts(newProducts)
        setCategoria(categoria)
      })
    }
    
  }
  const filtrar_estilo=(categoria,estilo)=>{
    console.log(categoria)
    let newProducts =[]
    if(categoria==="todos"){
      setProducts(productos)
      setCategoria(categoria)
    }
    else{
      productos.map((product)=>{
      
        if(product.categoria===categoria&&product.estilo===estilo){
          
          newProducts.push(product)
        }
        
        setProducts(newProducts)
        setCategoria(categoria)
      })
    }
    
  }
  const filtrar_precio=(precio)=>{
    console.log(categoria)
    let newProducts =[]
    productos.map((product)=>{
      if(product.price<precio&&(product.categoria===categoria||categoria==="todos")){
        newProducts.push(product)
        console.log("es menor a 2000")
      }
      setProducts(newProducts)
    })
    
    
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    
    <section className='products-container'>
      
      
      {/* <NavBar/> */}
      <article className='navBar_Container' >
        
        <nav className='navFull'>
          <ul>
            <li onClick={()=>{filtrar_categoria("todos");setFiltro(true)}}>Todos los productos</li>
            <li onClick={()=>{filtrar_categoria("guitar");setFiltro(true)}}>Guitarras</li>
            <li onClick={()=>{filtrar_categoria("bass");setFiltro(true)}}>Bajos</li>
            <li onClick={()=>{filtrar_categoria("bateria");setFiltro(true)}}>Baterías</li>
            <li onClick={()=>{filtrar_categoria("amplificador");setFiltro(true)}}>Amplificadores</li>
            <li className='showFiltro' onClick={()=>{setFiltro(!filtro)}}>Filtros</li>
          </ul>
        </nav>
        <nav className='navResponsive'>
          <ul onClick={()=>{setFiltro(!filtro)}}>
            <li >Filtros</li>
            
          </ul>
        </nav>
      </article>
      <div className='container'>
      <div className='filtros_container' data-aos="fade-right">
        <h1 id="titulo_filtro">Filtros</h1>
        {categoria==="guitar"?
        <div>
            <h1>Marca</h1>
            <p onClick={()=>{filtrar_marca("guitar","fender")}}>Fender</p>
            <p onClick={()=>{filtrar_marca("guitar","Gibson")}}>Gibson</p>
            
            <h1>Estilo</h1>
            <p onClick={()=>{filtrar_estilo("guitar","strato")}}>Stratocaster</p>
            <p onClick={()=>{filtrar_estilo("guitar","tele")}}>Telecaster</p>
            <p onClick={()=>{filtrar_estilo("guitar","jaguar")}}>Jaguar</p>
        </div>:<></>}
        
        {categoria==="bass"?
        <div>
            <h1>Marca</h1>
            <p onClick={()=>{filtrar_marca("bass","fender")}}>Fender</p>
            <p onClick={()=>{filtrar_marca("bass","Gibson")}}>Gibson</p>
            
            <h1>Estilo</h1>
            <p onClick={()=>{filtrar_estilo("bass","jazz")}}>Jazz Bass</p>
            <p onClick={()=>{filtrar_estilo("bass","precision")}}>Precisión</p>
            
        </div>:<></>}
        
        <h1>Precio</h1>
        
        <p onClick={()=>{filtrar_precio(2000)}}>Menos de 2000</p>
        <p onClick={()=>{filtrar_precio(3000)}}>Menos de 3000</p>
          
         
        
        
        
      </div>
      
      <div className='products_Container'>
        
        {products.map((producto)=><div className='product2' data-aos="zoom-in"
     
        data-aos-delay="100"
        data-aos-offset="0"  key={producto.id}>
            <Link  href={"/productos/" + producto.id} >
              <div  className='product' >
                
                <div className='img_product'>
                <img src={producto.image} layout="responsive"  alt="Picture of the author"/>
                </div>
              
              <p>$ {producto.price}</p>
              <h2>{producto.name}</h2>
              
              
              </div>

              
              
              
            </Link>
            <button className='btn-add' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            
          </div>
       )}
       
       
       
       
       
      </div>
      {filtro&&<div className='filtros_container2' data-aos="fade-right">
        <h1 id="titulo_filtro">Filtros</h1>
        <button className='close_Filter' onClick={()=>{setFiltro(false)}}>x</button>
        {categoria==="guitar"?
        <div>
            <h1>Marca</h1>
            <p onClick={()=>{filtrar_marca("guitar","fender");setFiltro(false)}}>Fender</p>
            <p onClick={()=>{filtrar_marca("guitar","Gibson");setFiltro(false)}}>Gibson</p>
            
            <h1>Estilo</h1>
            <p onClick={()=>{filtrar_estilo("guitar","strato");setFiltro(!filtro)}}>Stratocaster</p>
            <p onClick={()=>{filtrar_estilo("guitar","tele");setFiltro(!filtro)}}>Telecaster</p>
            <p onClick={()=>{filtrar_estilo("guitar","jaguar");setFiltro(!filtro)}}>Jaguar</p>
        </div>:<></>}
        
        {categoria==="bass"?
        <div>
            <h1>Marca</h1>
            <p onClick={()=>{filtrar_marca("bass","fender");setFiltro(!filtro)}}>Fender</p>
            <p onClick={()=>{filtrar_marca("bass","Gibson");setFiltro(!filtro)}}>Gibson</p>
            
            <h1>Estilo</h1>
            <p onClick={()=>{filtrar_estilo("bass","jazz");setFiltro(!filtro)}}>Jazz Bass</p>
            <p onClick={()=>{filtrar_estilo("bass","precision");setFiltro(!filtro)}}>Precisión</p>
            
        </div>:<></>}
        
        <h1>Precio</h1>
        
        <p onClick={()=>{filtrar_precio(2000);setFiltro(!filtro)}}>Menos de 2000</p>
        <p onClick={()=>{filtrar_precio(3000);setFiltro(!filtro)}}>Menos de 3000</p>
        <div className='filtro2'>
        <h1>Instrumento</h1>
          <p onClick={()=>{filtrar_categoria("todos");setFiltro(!filtro)}}>Todos los productos</p>
          <p onClick={()=>{filtrar_categoria("guitar");setFiltro(!filtro)}}>Guitarras</p>
          <p onClick={()=>{filtrar_categoria("bass");setFiltro(!filtro)}}>Bajos</p>
          <p onClick={()=>{filtrar_categoria("bateria");setFiltro(!filtro)}}>Baterías</p>
          <p onClick={()=>{filtrar_categoria("amplificador");setFiltro(!filtro)}}>Amplificadores</p>
        </div>
        
        
        
      </div>}
      </div>
      
    </section>
     
      
      
  )
}
