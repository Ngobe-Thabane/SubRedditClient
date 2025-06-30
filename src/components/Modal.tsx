import axios from "axios";
import { useState } from "react";

export default function Modal({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen: (isOpen:boolean)=>void}) {
  const [redditName, setRedditName] = useState("");
  const reddit = localStorage.getItem('subreddit');
  const subs = reddit ? JSON.parse(reddit) : []
  
  return (
    <div className="relative">
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-gray-900/95 bg-opacity-50 backdrop-blur-xs z-40" 
       onClick={()=>setIsOpen(false)}></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-600/40 backdrop-blur-sm p-6 rounded-lg shadow-lg  relative">
              <h2 className="text-2xl font-semibold mb-4 text-white/80">Enter the name of the subreddit</h2>
              <div className="flex flex-col">
                <input type='text'  
                className="mb-4 border-b-2 border-gray-900 text-lg text-white/80 p-1 outline-none" 
                placeholder="subreddit name" 
                value={redditName} 
                onChange={(e) => {
                  setRedditName(e.currentTarget.value)
                } }/>

                <button
                  onClick={async() => {
                    const subreddit = await axios.get(`https://www.reddit.com/r/${redditName}.json`);
                    if(subreddit.data.data.children.length > 0){
                      subs.push(redditName);
                      localStorage.setItem('subreddit', JSON.stringify(subs))
                    }
                    setIsOpen(false)
                  }}
                  className="bg-blue-800  text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Add Subreddit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

