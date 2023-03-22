import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Pages = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')

  }, [])
  return (
    <div>Pages</div>
  )
}

export default Pages