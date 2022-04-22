import ReactionButtons from "./ReactionButtons";
import axios from "axios";

const PostsExcerptAdmin = ({ post }) => {

    const deletePost = async (id) => {
    
        axios.post('http://localhost:5000/api/newsfeed/newsfeeddelete', {"_id": post._id})
       .then((res) => {
           console.log('response',res);
       })
       .catch((error) => {
           console.log('error block called',error);
       })
       
       }



    return (
        <article className="mx-auto p-6 sm:w-1/3 rounded-lg border text-white border-green-200 shadow-md bg-green-800 mt-10">
            <h3 className="font-mono text-4xl">{post.title}</h3>
            <p className="font-mono text-lg pt-5">{post.body.substring(0, 100)}</p>
            <p className="postCredit pt-10">
                Written by Head of Society
                <ReactionButtons post={post} />
                <p className="font-mono italic text-md pt-5">This was posted {post.date}</p>
               
            </p>
            <div className="text-right">
            <button className="text-right text-red-500" onClick={deletePost}> Delete </button>
            </div>
        </article>
    )
}
export default PostsExcerptAdmin