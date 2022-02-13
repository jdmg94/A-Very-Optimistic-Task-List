import { enablePatches } from 'immer'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles.css'

enablePatches()

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
