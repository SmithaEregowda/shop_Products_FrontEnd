import '../styles/globals.css'
import '../public/scss/styles.scss'
import Layout from '../components/Layout/Layout'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import store from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SnackbarProvider>
    </Provider>
  )
}
export default MyApp;

