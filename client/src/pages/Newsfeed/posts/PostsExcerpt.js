import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {

    let date = Date.parse(post.date)
    return (
        <article className="mx-auto p-6 sm:w-1/3 rounded-lg border text-white border-gray-200 shadow-md bg-gray-800 mt-10">
            <h3 className="font-mono text-4xl">{post.title}</h3>
            <p className="font-mono text-lg pt-5">{post.body.substring(0, 100)}</p>
            <p className="postCredit pt-10">
                Written by Head of Society
                <ReactionButtons post={post} />
                <p className="font-mono italic text-md pt-5">This was posted {post.date.substring(0, 100)}</p>
            </p>
           
        </article>
    )
}
export default PostsExcerpt