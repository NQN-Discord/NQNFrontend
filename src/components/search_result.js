import React, {Component} from "react";
import update from 'immutability-helper';

import "./search_result.css";

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        const previewSrc = `https://static1.e621.net/data/preview/${this.getURL()}.jpg`;
        const swfPreview = "https://static1.e621.net/images/download-preview.png";

        this.state = {
            previewType: "none",
            src: props.post.ext === "swf"? swfPreview: previewSrc,
            replacement: null
        };
    }

    getURL = () => {
        const md5 = this.props.post.md5;
        return `${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}`
    };

    updateImage = () => {
        const sampleURL = `https://static1.e621.net/data/sample/${this.getURL()}.${this.props.post.ext}`;
        const fullURL = `https://static1.e621.net/data/${this.getURL()}.${this.props.post.ext}`;
        if (["none", "preview"].includes(this.state.previewType)) {
            if (this.props.isVisible) {
                var replacement = new Image();
                replacement.onload = () => {
                    this.setState({
                        previewType: "sample",
                        src: sampleURL,
                        replacement: null
                    });
                };
                replacement.onerror = () => {
                    replacement = new Image();
                    replacement.onload = () => {
                        this.setState({
                            previewType: "full",
                            src: fullURL,
                            replacement: null
                        });
                    };
                    replacement.src = fullURL;
                };
                replacement.src = sampleURL;
                if (this.state.replacement === null) {
                    this.setState(update(this.state, {
                            $merge: {
                                previewType: "preview",
                                replacement
                            }
                    }));
                }
            }
            else if (this.state.previewType === "none") {
                this.setState(update(this.state, {
                        $merge: {
                            previewType: "preview"
                        }
                }));
            }
        }
    };

    componentDidUpdate() {
        if (!this.props.isVisible && this.state.replacement !== null) {
            this.setState(update(this.state,
                {$merge: {
                    replacement: null
            }}));
        }
        if (this.props.isVisible && this.state.replacement === null && this.state.previewType === "preview") {
            this.updateImage();
        }
    }

    render() {
        return (
            <div className="page_result">
                <img
                    src={this.state.src}
                    alt=""
                    onClick={() => {
                        this.props.onClick(this.props.post)
                    }}
                    onLoad={() => {this.updateImage()}}
                />
            </div>
        );
    }
}