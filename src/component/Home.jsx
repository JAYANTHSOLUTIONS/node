import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default function Home() {
  return (
    <div>
      <Nav/>
        <Link to='/view'><button>view</button></Link>
        <Link to='/add'><button>add</button></Link>
       
      
    </div>
  )
}
