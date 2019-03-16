import React from "react";

import "./search_result.css";


export default function SearchResult(props) {
    const post = props.post;
    const onClick = props.onClick;
    const md5 = post.md5;
    const ext = post.ext;
    const postSrc = `https://static1.e621.net/data/preview/${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}.jpg`;
    return (
        <div className="page_result">
            <img
                src={postSrc}
                alt=""
                onClick={() => {onClick(post)}}
            />
        </div>
    );
}