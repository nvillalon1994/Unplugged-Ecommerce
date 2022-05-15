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
  // console.log(items===[])
  // console.log(items)
  const [blockButton,setBlockButton]= useState(false)
  const dispatch = useDispatch()

  
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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    
    <section className='products-container'>
      
      
      {/* <NavBar/> */}
      <div className='navBar_Container' >
        
        <nav>
          <ul>
            <li onClick={()=>{filtrar_categoria("todos")}}>Todos los productos</li>
            <li onClick={()=>{filtrar_categoria("guitar")}}>Guitarras</li>
            <li onClick={()=>{filtrar_categoria("bass")}}>Bajos</li>
            <li onClick={()=>{setCategoria("guitarras")}}>Baterías</li>
            <li onClick={()=>{setCategoria("guitarras")}}>Amplificadores</li>
          </ul>
        </nav>
      </div>
      <div className='container'>
      <div className='filtros_container' data-aos="fade-right">
        <h1 id="titulo_filtro">Filtros</h1>
        <h1>Marca</h1>
        <p>Fender</p>
        <p>Gibson</p>
        <h1>Estilo</h1>
        <p>Stratocaster</p>
        <p>Telecaster</p>
        <h1>Filtrar por precio</h1>
        <div className='filtro_precio'>
          <input type="number" placeholder='Minimo'/> 
          <span>a</span>
          <input type="number" placeholder='Maximo'/>
          <button> {">"} </button>
        </div>
        
        
        
      </div>
      <div className='products_Container'>
        
        {products.map(producto=><div className='product2' data-aos="zoom-in"
     
     data-aos-delay="100"
     data-aos-offset="0"  key={producto.id}>
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
            
          </div>
       )}
       
        {/* {products.map(producto=>(<motion.div layoutId={producto.id} onClick={()=>{setSelectedId(producto)}} className='product'  key={producto.id}>
            
                
              <motion.div className='img_product'>
                  <img src={producto.image} alt=""/>
              </motion.div>
              
              <motion.p>$ {producto.price}</motion.p>
              <motion.h2>{producto.name}</motion.h2>
              
              
              

              
              
              

            <button className='btn-add' onClick={()=>{addProductoToCart(producto)}}><BsFillCartPlusFill/></button>
            <button className='btn-remove' onClick={()=>{removeProductFromCart(producto.id)}}>Quitar del Carrito</button>
          </motion.div>
       ))} */}
       
       
       
      </div>
      </div>
      
    </section>
     
      
      
  )
}
