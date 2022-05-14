import React from 'react'

import {collection,getDocs,addDoc,setDoc,doc} from 'firebase/firestore'
import { createProducts, database } from "../../config/firebase"

export default function CrearProducto() {

   
    const crear = (e)=>{
        e.preventDefault()
        const{name, desc1, desc2, desc3, price,image, categoria , popular, new1}=e.target
        
        
        const producto = {
            name:name.value,
            desc1:desc1.value,
            // desc2:desc2.value,
            // desc3:desc3.value,
            // price:price.value,
            // image:image.value,
            // categoria:categoria.value,
            // new1:new1.value,
            
            
        }
        
        
        createProducts(producto)

        
      }
  return (
    <div>
        <form className='formCreate' onSubmit={crear}>
          <legend>Crea un producto</legend>
          <input type="text" name='name' placeholder='Name' />
          <input type="text" name='desc1' placeholder='Descripcion 1' />
          <input type="text" name='desc2' placeholder='Descripcion 2' />
          <input type="text" name='desc3' placeholder='Descripcion 3' />
          <input type="text" name='price' placeholder='Price' />
          <input type="text" name='image' placeholder='urlImg' />
          
          
        
          
          
          
          
          <select name="categoria" id="">
            <option value="guitar">Guitarra</option>
            <option value="bass">Bajo</option>
            <option value="drums">Bateria</option>
            

          </select>
          
          <select name="new1" id="">
            <option value={true}>Nuevo</option>
            <option value={false}>No</option>

          </select>
          
          <select name="popular" id="">
            <option value={true}>Popular</option>
            <option value={false}>No</option>

          </select>
          

          
          
        <button>Publicar Producto</button>
        </form>
    </div>
  )
}
