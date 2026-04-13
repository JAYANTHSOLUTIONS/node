const handle = ()=>{
    fetch("http://127.0.0.1:8000/items/read")
    .then((data)=>data.json())
    .then((res)=>console.log(res)
    ).catch((err)=>console.log("error:",err)
    )
}

handle();