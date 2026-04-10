import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Api() {

    const [api, setapi] = useState([])

    useEffect(() => {
        handle();
    }, [])
    const handle = async () => {

        const data = await fetch("https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies")
        const res = await data.json()
        console.log(res)
        setapi(res)



    }





    return (
        <div>

            {api.map((da) => (
                <div>
                    <h1>{da.Title}</h1>
                </div>
            ))}


            <Link to='/add'><button>Add Song</button></Link>
        <Link to='/'><button>Home</button></Link>
        </div>
    )
}
