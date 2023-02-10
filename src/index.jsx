import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App'
import '@fontsource/inter/variable.css'
import Auth0ProviderWithNavigate from './app/auth0-provider-with-navigate'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  }
  // breakpoints: {
  //   sm: '600px',
  //   smd: '905px',
  //   md: '1240px',
  //   lg: '1440px'
  // }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)
