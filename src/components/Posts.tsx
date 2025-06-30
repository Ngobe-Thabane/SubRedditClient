
export default function Posts({post}:{post:{title:string, author:string, thumbnail:string}}){
  return (
    <div className="flex bg-gray-600/10 shadow-xl my-5 mx-2 rounded-md gap-4 items-center ">
      <div className="p-2">
        <div>
          <h2 className="font-bold text-black text-lg">{post.title}</h2>
          <p className="text-gray-500 italic">@{post.author}</p>
        </div>
      </div>
    </div>
  )
}