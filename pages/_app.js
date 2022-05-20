import '../styles/globals.css'
import {Provider, useDispatch} from 'react-redux'
import store from '../redux/store'
import Page from '../components/Page'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
function MyApp({ Component, pageProps }) {
  
  return <PayPalScriptProvider option={{
    'client-id':process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    'currency':'ARS',
    
    
}}>
  <Provider store={store} >
    <Page>
      <Component {...pageProps} />
    </Page>
  </Provider>
  </PayPalScriptProvider>
}

export default MyApp