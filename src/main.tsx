import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { router } from './Routes/router_TEMP'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)