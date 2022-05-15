import React from 'react'
//import {useRouter} from 'next/router'
import {database} from '../../config/firebase'
import {collection,doc,getDocs,getDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCart } from '../../features/cart'

// export function getServerSideProps(context){

//     console.log(context)
//     const {id} = context.params

//     return {
//         props:{
//             id
//         }
//     }
// }

export async function getStaticPaths(){
    const col = collection(database,"products")
    const docs = await getDocs(col)

    const productos = []

    docs.forEach(doc=>{
        productos.push({...doc.data(),id:doc.id})
    })

    const paths = productos.map(producto=>({
        params:{
            id:producto.id
        }
    }))

    console.log(paths)

    return {
        paths,
        fallback:false // Si visitamos una ruta que no existe, devolvemos un 404
    }
}

export async function getStaticProps({params}){
    const document = doc(database,"products",params.id)
    const productDocument = await getDoc(document)

    const producto = productDocument.data()

    return {
        props:{
            producto
        },
        revalidate:10
    }
}

export default function Producto({producto}) {
    const items = useSelector(state=>state.cart.items)
    const {logged,name,profilePic} = useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const addProductoToCart =(producto)=>{
        // console.log(id)
            console.log(name)
            const addedProduct = {
              ...producto,
              ...{cantidad:1}}
              dispatch(addToCart({addedProduct,user:name,items}))
              dispatch(getCart(name))
            
      }

    return (
        <section className='contenedorProducto'>
            <section className='soloProduct'>
                <articles className="imageSoloProduct">
                    <img src={producto.image} alt="" />
                </articles>
                
                <article className='textSoloProduct'>
                    <h1>{producto.name}</h1>    
                    <h4>$ {producto.price}</h4>
                    <p>{producto.desc1}</p>
                    
                    
                    <button onClick={()=>{addProductoToCart(producto)}}>Agregar al Carrito</button>
                </article>   
                
                
                
            </section>
            <section className='aboutProduct'>
                <h1 className='titleProduct'>Sobre el producto</h1>
                <article>
                    <p>{producto.desc1}</p>
                    <p>{producto.desc2}</p>
                    <p>{producto.desc3}</p>
                </article>
            </section>
        </section>
    )
}