import React, {Component} from "react";

import "./search_result.css";

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        const previewSrc = `https://static1.e621.net/data/preview/${this.getURL()}.jpg`;
        const swfPreview = "https://static1.e621.net/images/download-preview.png";

        this.state = {
            previewType: "preview",
            src: props.post.ext === "swf"? swfPreview: previewSrc
        };
    }

    getURL = () => {
        const md5 = this.props.post.md5;
        return `${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}`
    }


    render() {
        const onClick = this.props.onClick;
        const sampleURL = `https://static1.e621.net/data/sample/${this.getURL()}.${this.props.post.ext}`;
        const fullURL = `https://static1.e621.net/data/${this.getURL()}.${this.props.post.ext}`;
        return (
            <div className="page_result">
                <img
                    src={this.state.src}
                    alt=""
                    onClick={() => {
                        onClick(this.props.post)
                    }}
                    onLoad={() => {
                        if (this.state.previewType === "preview") {
                            var replacement = new Image();
                            replacement.onload = () => {
                                this.setState({
                                    previewType: "sample",
                                    src: sampleURL
                                });
                            };
                            replacement.onerror = () => {
                                replacement = new Image();
                                replacement.onload = () => {
                                    this.setState({
                                        previewType: "full",
                                        src: fullURL
                                    });
                                };
                                replacement.src = fullURL;
                            };
                            replacement.src = sampleURL;
                        }
                    }}
                />
            </div>
        );
    }
}