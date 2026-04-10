import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddSong() {

    const [inp, setinp] = useState("")
    const [rol, setrol] = useState("")
    const [api, setapi] = useState([])


    useEffect(() => {
        handlefetch();
    }, [])


    const handleName = (e) => {

        console.log(e.target.value);
        setinp(e.target.value)


    }



    const handleRole = (e) => {

        console.log(e.target.value);

        setrol(e.target.value)


    }

    const handlefetch = async () => {
        const res = await axios.get("http://localhost:3000/data")
        setapi(res.data)
        console.log(res.data);

    }

    const handlesave = async () => {

        const body = {
            name: inp,
            role: rol,

        }
        const res = await axios.post("http://localhost:3000/data", body)

        // ✅ Refresh the list so the new song/user appears
        handlefetch();

        // ✅ Clear inputs
        setinp("");
        setrol("");
        console.log("added")
        console.log("succes", res.data);




    }


    return (
        <div>
            <form>
                <label>NAME:</label><input onChange={handleName} type='text' placeholder='Enter Your Name'></input>
                <label>Role:</label><input onChange={handleRole} type='text' placeholder='Enter Your Role'></input>
                <br /><button onClick={handlesave} type='button'>Save</button>
                <button onClick={handlefetch} type='button'>View</button>
                <br /><Link to='/'><button>Home</button></Link>
                <Link to='/api'><button>Api</button></Link>

            </form>
        </div>
    )
}
