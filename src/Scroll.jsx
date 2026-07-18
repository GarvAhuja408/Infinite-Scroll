import { useState,useEffect } from "react"

export default function Scroll(){

    let[posts,setPosts]=useState([]);
    let[page,setPage]=useState(1);
    let[loading,setLoading]=useState(false);

    let fetchdata= async()=>{
        setLoading(true);

        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);

        let jsonResponse = await response.json();
        setPosts( (prev)=>[...prev,...jsonResponse] );

        setLoading(false);
    }


    useEffect( ()=>{
        fetchdata();
    },[page]);

    useEffect( ()=>{
        const handleScroll = ()=>{

            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight-10;

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
        <div>

            <h3>Scroll till end</h3>

            {posts.map( (post)=> (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}