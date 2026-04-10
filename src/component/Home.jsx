import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>

        <Link to='/add'><button>Add Song</button></Link>
        <Link to='/api'><button>Api</button></Link>
      
    </div>
  )
}
