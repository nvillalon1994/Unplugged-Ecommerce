import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {database} from '../../config/firebase'
import {addDoc, collection,deleteDoc,doc,getDocs,updateDoc} from 'firebase/firestore'
import { async } from "@firebase/util";
export const addToCart = createAsyncThunk("cart/addToCart",async(data,thunkAPI)=>{
    console.log(data.addedProduct,data.user)
    
    const col =collection(database,"cart",data.user, "items" )
    const result = await addDoc(col,data.addedProduct)
    
    return{
        result
    }
})

export const getCart = createAsyncThunk("cart/obtenerCarrito",async (data,thunkAPI)=>{
    
    const col = collection(database,"cart",data,"items")
    const snapshot = await getDocs(col)
    const carrito = []

    snapshot.forEach(doc=>{
      carrito.push({...doc.data(),id:doc.id})
    })
    console.log(carrito)
    return carrito
})
export const removeFromCart = createAsyncThunk("cart/removeFromCart",async (data,thunkAPI)=>{
    console.log(data)
    const docRef = doc(database,"cart",data.name,"items",data.id)
    
    deleteDoc(docRef)
    return data.id
})
export const increaseAmount =createAsyncThunk("cart/increaseAmount",async(data,thunkAPI)=>{
    console.log(data.item.id)
    
    updateDoc(doc(database,"cart",data.name,"items",data.item.id),{
        cantidad:data.item.cantidad +1
    })
})
export const decreaseAmount =createAsyncThunk("cart/increaseAmount",async(data,thunkAPI)=>{
    console.log(data.item.id)
    
    updateDoc(doc(database,"cart",data.name,"items",data.item.id),{
        cantidad:data.item.cantidad -1
    })
})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        total:0,
        loading:false
        
    
    },
    reducers:{
        // addToCart:(state,action)=>{
        //     const newProduct = action.payload
            
        //     // state.items.push(newProduct)
        //     if(state.items.find(item => item.id ===newProduct.id )){
        //         console.log("existe")
        //         state.items.map((item)=>{
        //             if(item.id===newProduct.id){
        //                 item.cantidad=item.cantidad+1
        //                 console.log(item.cantidad)
        //             }
        //         })
        //     }
        //     else{
        //         console.log("no existe")
        //         state.items.push(newProduct)
                
        //     }

        // },
        // removeFromCart:(state,action)=>{
        //     const id = action.payload
        //     console.log(id)
            
            
        //     state.items = state.items.filter(item=>item.id!==id)
        // },
        // increaseAmount:(state,action)=>{
            
        //     const id = action.payload
            
        //     state.items.map((item)=>{
        //         if(item.id===id){
        //             item.cantidad=item.cantidad +1

        //         }
        //     })
        // },
        // decreaseAmount:(state,action)=>{
            
        //     const id = action.payload
            
        //     state.items.map((item)=>{
        //         if(item.id===id&item.cantidad>1){
        //             item.cantidad=item.cantidad -1

        //         }
        //         else{
        //             state.items = state.items.filter(item=>item.id!==id)
        //         }


                
        //     })
        // },
        totalPrice:(state,action)=>{
            
            let totalArray=[];
            state.items.map((item)=>{
            totalArray.push(item.price*item.cantidad)
            })
            
            
            let sum = 0;
            for (let i = 0; i < totalArray.length; i++) {
                sum += parseInt(totalArray[i]);
            }
            
            state.total=sum
        },
        

        
        
    },
    extraReducers(builder){

        builder.addCase(addToCart.pending,(state,action)=>{
            state.loading = true

        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
                state.loading = false
                
                
                
        })
        builder.addCase(addToCart.rejected,(state,action)=>{
            state.loading = true
            
        })



        builder.addCase(getCart.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getCart.fulfilled,(state,action)=>{
            state.loading= true
            state.items=action.payload
        })
        builder.addCase(getCart.rejected,(state,action)=>{
            state.loading = false
        })

        
        builder.addCase(removeFromCart.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(removeFromCart.fulfilled,(state,action)=>{
            const id = action.payload
            console.log(id)
            state.loading= true
            state.items=state.items.filter(item=>item.id!==id)
            
        })
        builder.addCase(removeFromCart.rejected,(state,action)=>{
            state.loading = false
        })
    }

})

const cartReducer = cartSlice.reducer
export const {totalPrice}=cartSlice.actions
export default cartReducer