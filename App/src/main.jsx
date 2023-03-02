import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {Appl as App} from './App'
import { persistor, store } from './app/store'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)