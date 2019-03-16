import React from "react";

import "./search_result_large.css"

export default function SearchResultLarge(props) {
    const post = props.post;
    console.log(post)
    const md5 = post.md5;
    const ext = post.ext;
    const postSrc = `https://static1.e621.net/data/${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}.${ext}`;
    const e6page = `https://e621.net/post/show/${post.id}`
    return (
        <div className="page_result_large">
            <a href={postSrc} target="_blank" rel="noopener noreferrer">
                <img
                    src={postSrc}
                    alt=""
                />
            </a>
            <p>
                <a href={e6page} target="_blank" rel="noopener noreferrer">View on e621</a><br/>
                Artist: {post.artist}<br/>
                Score: {post.score}<br/>
                Favourites: {post.fav_count}<br/>
                {post.description}
            </p>
        </div>
    );
}