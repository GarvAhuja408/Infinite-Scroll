import { useState,useEffect } from "react"
import "./Scroll.css";

export default function Scroll(){

    let[posts,setPosts]=useState([]);
    let[page,setPage]=useState(1);
    let[loading,setLoading]=useState(false);

    let fetchdata= async()=>{
        setLoading(true);

        let response = await fetch(`https://randomuser.me/api/?results=20&page=${page}`);

        let jsonResponse = await response.json();
        setPosts( (prev)=>[...prev,...jsonResponse.results] );

        setLoading(false);
    }


    useEffect( ()=>{
        fetchdata();
    },[page]);

    useEffect( ()=>{
        const handleScroll = ()=>{

            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

            if(bottom && !loading){
                setPage( (p)=>p+1 );
            }
        };
        window.addEventListener("scroll", handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[loading]);

    return(
        <div className="container">

            <h1 className="heading">Scroll till end</h1>

            {posts.map( (post)=> (
                <div key={post.id}>
                    <p>{post.name.first} {post.name.last}</p>
                    <p>{post.gender}</p>
                    <p>Age:{post.registered.age}</p>
                    <br></br><br></br>
                </div>
            ))}

            {loading && <p>loading....</p>}
        </div>
    )
}