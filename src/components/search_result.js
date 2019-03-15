import React from "react";


export default function SearchResult(props) {
    const post = props.post;
    const md5 = post.md5;
    const ext = post.ext;
    const postSrc = `https://static1.e621.net/data/${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}.${ext}`;
    return (
        <div key={post.id}>
            <img
                src={postSrc}
                alt=""
            />
        </div>
    );
}