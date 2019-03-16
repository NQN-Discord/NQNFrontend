import React from "react";

import "./search_result_large.css"

export default function SearchResultLarge(props) {
    const post = props.post;
    console.log(post)
    const md5 = post.md5;
    const ext = post.ext;
    const postSrc = `https://static1.e621.net/data/${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}.${ext}`;
    return (
        <div className="page_result_large">
            <img
                src={postSrc}
                alt=""
            />
            <p>
                Artist: {post.artist}<br/>
                Score: {post.score}<br/>
                Favourites: {post.fav_count}<br/>
                {post.description}
            </p>
        </div>
    );
}