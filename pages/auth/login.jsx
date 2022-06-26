import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { auth } from '../../config/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // EmailAuthProvider,
  updateProfile
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import {updateData} from '../../features/auth/index' 
import Image from 'next/image'
import login2 from '../images/login.avif'
import AOS from "aos";
import "aos/dist/aos.css";
const config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        // EmailAuthProvider.PROVIDER_ID,
    ],
}

export default function Login() {
  const [isLogin,setIsLogin] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  const login = (event) =>{
    event.preventDefault()
    // const {email:{value:email},password:{value:password}} = event.target
    const email = event.target.email.value
    const password = event.target.password.value

    if(isLogin){
      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        router.replace("/")
      })
      .catch(error=>{
        console.log(error)
      })
    }else{
      const name = event.target.name.value
      const profilePic = event.target.profilePic.value
      createUserWithEmailAndPassword(auth,email,password)
      .then(result=>{
        updateProfile(result.user,{
          displayName:name,
          photoURL:profilePic
        }).then(()=>{
          
          dispatch(updateData({
            name,
            profilePic
          }))
          router.replace("/")
        })
        
      }).catch(error=>{
        console.log(error)
      })
    }


    
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
        <section className='loginContainer'>
            <article className='loginImg' data-aos="zoom-in"
     
              data-aos-delay="100"
              data-aos-offset="0">
                
              <Image  src={login2} width={1050} height={550} alt="foto"/>
              <article className='loginForm'>
              <h1>{isLogin?"Inicia Sesión":"Registrate"}</h1>
              <form onSubmit={login}>
                {!isLogin&&<input type="text" name='name' placeholder='Name...' />}
                {!isLogin&&<input type="text" name='profilePic' placeholder='Profile pic...' />}
                <input type="email" name="email" placeholder='Email...' />
                <input type="password" name="password" placeholder='Password...' />
                <button>
                  {
                    isLogin?
                      "Iniciar sesión":
                      "Crear cuenta"
                  }
                </button>
              </form>
              <button 
                onClick={()=>{setIsLogin(!isLogin)}}
              >
                {
                  isLogin?
                    "¿No tienes una cuenta? ¡Registrate!":
                    "¿Ya tienes cuenta? Inicia Sesión!"
                }
              </button>
              
              <StyledFirebaseAuth uiConfig={config} firebaseAuth={auth}/>
            </article>
            </article>
            
        </section>
    
  )
}