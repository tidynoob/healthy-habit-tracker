import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import '@fontsource/inter/variable.css'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
