import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Subreddit from "./components/Subreddit";
import Posts from "./components/Posts";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [subreddit, setSubreddit] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPosts = async(subName:string) =>{
    const subredditPosts = await axios.get(`https://www.reddit.com/r/${subName}.json`);
    if(subredditPosts.status === 200){
      setPosts(subredditPosts.data.data.children);
    }
  }

  useEffect(()=>{
    const subs = localStorage.getItem('subreddit');
    const subList = subs ? JSON.parse(subs) : []
    if(subList.length > 0){
      setSubreddit(subList);
      getPosts(subreddit[subList.length-1]);
    }
  }, [isOpen])
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-600/25 text-white p-4 flex-shrink-0 fixed h-full overflow-y-auto">
        <div className="flex flex-row items-center justify-between p-2 text-black ">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Subreddit</h2>
          </div>
          <button className="text-2xl font-bold bg-blue-800 rounded-full w-8 h-8 cursor-pointer text-white" onClick={()=> setIsOpen(true)}>+</button>
        </div>
        <ul className="space-y-2 my-2`">
          {
            subreddit.map((sub, index)=>{
              return (
                <li className="hover:bg-blue-800/90 py-2 px-2 rounded hover:text-white text-black" key={'u'+index}>
                  <button  className="block" value={sub} onClick={(e)=>{
                    getPosts(e.currentTarget.value)

                  }}>{sub}</button>
                </li>
              )
            })
          }
        </ul>
      </aside>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="ml-64 flex-1 overflow-y-auto p-1 bg-gray-100">
        <Subreddit />
        <section className="">
          {
            posts.map((redditPost, id)=>{

              const {title, author, url_overridden_by_dest, permalink} = redditPost?.data;

              return <a href={'https:reddit.com/'+permalink} key={id}>
                <Posts post={{title:title, author:author, thumbnail:url_overridden_by_dest}} />
              </a>
            })
          }
        </section>
      </main>
    </div>
  );
}

export default App;
