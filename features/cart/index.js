import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {database} from '../../config/firebase'
import {addDoc, collection,deleteDoc,doc,getDocs,updateDoc,docs} from 'firebase/firestore'
import { async } from "@firebase/util";
export const addToCart = createAsyncThunk("cart/addToCart",async(data,thunkAPI)=>{
    console.log(data.user)
    
    if(data.items.find(item => item.name ===data.addedProduct.name )){
                console.log("existe")
                data.items.map((item)=>{
                    if(item.name===data.addedProduct.name){
                        updateDoc(doc(database,"cart",data.user,"items",item.id),{cantidad:item.cantidad +1})
                    }
                })
    }else{
                console.log("no existe")
                
                const col =collection(database,"cart",data.user, "items" )
                const result = await addDoc(col,data.addedProduct)
                
            }
    
    
    return{
        data
    }
})



export const getCart = createAsyncThunk("cart/obtenerCarrito",async (data,thunkAPI)=>{
    
    const col = collection(database,"cart",data,"items")
    const snapshot = await getDocs(col)
    const carrito = []

    snapshot.forEach(doc=>{
      carrito.push({...doc.data(),id:doc.id})
    })
    // console.log(carrito)
    return carrito
})




export const removeFromCart = createAsyncThunk("cart/removeFromCart",async (data,thunkAPI)=>{
    console.log(data)
    deleteDoc(doc(database,"cart",data.name,"items",data.id))
    
    
    return data.id
})
export const removeCart = createAsyncThunk("cart/removeCart",async (data,thunkAPI)=>{
    console.log(data.items)
    data.items.map((item)=>{
        deleteDoc(doc(database,"cart",data.name,"items",item.id))
    })
    // await deleteDoc(doc(database,"cart",data.name))
    
    
    return data
})
export const increaseAmount =createAsyncThunk("cart/increaseAmount",async(data,thunkAPI)=>{
    console.log(data.item.id)
    
    updateDoc(doc(database,"cart",data.name,"items",data.item.id),{
        cantidad:data.item.cantidad +1
    })
    return data
})
export const decreaseAmount =createAsyncThunk("cart/decreaseAmount",async(data,thunkAPI)=>{
    console.log(data.item.id)
    
    updateDoc(doc(database,"cart",data.name,"items",data.item.id),{
        cantidad:data.item.cantidad -1
    })
    return data
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
        // increaseAmount2:(state,action)=>{
            
        //     const id = action.payload
            
        //     state.items.map((item)=>{
        //         if(item.id===id){
        //             item.cantidad=item.cantidad +1

        //         }
        //     })
        // },
        // decreaseAmount2:(state,action)=>{
            
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
            console.log("se ejecuta")
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
        //ADD TO CART
        builder.addCase(addToCart.pending,(state,action)=>{
            state.loading = true

        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
                state.loading = false       
        })
        builder.addCase(addToCart.rejected,(state,action)=>{
            state.loading = true
            
        })


        //OBTENER CARRITO
        builder.addCase(getCart.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getCart.fulfilled,(state,action)=>{
            state.loading= false
            state.items=action.payload
        })
        builder.addCase(getCart.rejected,(state,action)=>{
            state.loading = false
        })



        //REMOVER DEL CARRITO
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
        
        builder.addCase(removeCart.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(removeCart.fulfilled,(state,action)=>{
            
            
            state.items=[]
            state.total=0
        })
        builder.addCase(removeCart.rejected,(state,action)=>{
            state.loading = false
        })
        //Increase amunt
        builder.addCase(increaseAmount.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(increaseAmount.fulfilled,(state,action)=>{
            const id = action.payload.item.id
            totalPrice()
            state.items.map((item)=>{
                        if(item.id===id){
                            item.cantidad=item.cantidad +1
        
                        }
                    })
            
        })
        builder.addCase(increaseAmount.rejected,(state,action)=>{
            state.loading = false
        })

        //Decrease amount

        builder.addCase(decreaseAmount.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(decreaseAmount.fulfilled,(state,action)=>{
            const id = action.payload.item.id
            
            state.items.map((item)=>{
                        if(item.id===id){
                            item.cantidad=item.cantidad -1

        
                        }
                    })
            
            
        })
        builder.addCase(decreaseAmount.rejected,(state,action)=>{
            state.loading = false
        })

        

    }

})

const cartReducer = cartSlice.reducer
export const {totalPrice}=cartSlice.actions
export default cartReducer