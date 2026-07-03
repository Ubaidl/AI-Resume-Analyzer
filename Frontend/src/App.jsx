 import { useState } from 'react'
 import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import { AuthProvider } from './Features/auth/auth.context'
import { InterviewProvider } from "./Features/interview/interview.context";





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <AuthProvider>
    < InterviewProvider>
       <RouterProvider router={router} />

    </InterviewProvider>
        
   </AuthProvider>

      
    </>
  )
}

export default App
