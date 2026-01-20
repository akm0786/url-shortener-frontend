import { useEffect, useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useDispatch } from 'react-redux'
import { checkAuth } from './features/auth/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
