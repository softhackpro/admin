import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Component/stores/Auth.jsx';
import { StrictMode } from 'react'
import './index.css'
import App from './Route/App.jsx'
import Slider from './Component/Home/Slider.jsx';
import Login from './Component/Login.jsx';
import './index.css'

// const ContentSection = lazy(()=>import('./Component/ContentSection.jsx'));

const router = createBrowserRouter([
  {path: "/", element:<App/>,
    children:[
      {path: "/", element: (<Suspense fallback={<div>Loading...</div>}>
        <Slider/>
        </Suspense>
      )
    },
    {path: "/Login", element: (<Suspense fallback={<div>Loading...</div>}>
      <Login/>
      </Suspense>
    )
  }
  ]
  
  },
    
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    <App />
    </AuthProvider>
  </StrictMode>,
)
