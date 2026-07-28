import { useState } from 'react'
import './App.css'
import Login from './components/Login'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
     {
      !token && <Login/>
     }
    </>
  )
}

export default App
