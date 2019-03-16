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
            attrs: {style: {}},
            src: props.post.ext === "swf"? swfPreview: previewSrc,
            replacement: null
        };
    }

    getURL = () => {
        const md5 = this.props.post.md5;
        return `${md5.slice(0, 2)}/${md5.slice(2, 4)}/${md5}`
    };

    elementSize = () => {
        const g = document.getElementsByTagName('body')[0];
        const x = window.innerWidth || document.documentElement.clientWidth || g.clientWidth;
        const y = window.innerHeight|| document.documentElement.clientHeight|| g.clientHeight;
        return {
            width: (x * 30) / 100,
            height: (y * 30) / 100
        }
    };

    updateImage = (e) => {
        let attrs = {};
        if (e !== undefined) {
            const windowHeight=window.innerHeight;
            const windowWidth=window.innerWidth;
            const width = e.target.naturalWidth;
            const height = e.target.naturalHeight;
            if ((width / height) > (windowWidth / windowHeight)) {
                attrs = {style: {width: "30vw"}, width, height};
            }
            else {
                attrs = {style: {height: "100%"}, width, height};
            }
        } else if (Object.keys(this.state.attrs).length !== 0) {
            attrs = this.state.attrs;
        }
        const sampleURL = `https://static1.e621.net/data/sample/${this.getURL()}.${this.props.post.ext}`;
        const fullURL = `https://static1.e621.net/data/${this.getURL()}.${this.props.post.ext}`;
        if (["none", "preview"].includes(this.state.previewType)) {
            if (this.props.isVisible) {
                if (this.state.replacement === null) {
                    const elementSize = this.elementSize();
                    const largest = Object.keys(attrs.style)[0];
                    if (attrs[largest] * 2 < elementSize[largest]) {
                        var replacement = new Image();
                        replacement.onload = () => {
                            this.setState(update(this.state, {
                                $merge: {
                                    previewType: "sample",
                                    src: sampleURL,
                                    replacement: null
                                }
                            }));
                        };
                        replacement.onerror = () => {
                            replacement = new Image();
                            replacement.onload = () => {
                                this.setState(update(this.state, {
                                    $merge: {
                                        previewType: "full",
                                        src: fullURL,
                                        replacement: null
                                    }
                                }));
                            };
                            replacement.src = fullURL;
                        };
                        replacement.src = sampleURL;
                        this.setState(update(this.state, {
                            $merge: {
                                previewType: "preview",
                                replacement,
                                attrs: attrs
                            }
                        }));
                    }
                    else if (this.state.previewType === "none") {
                        this.setState(update(this.state, {
                            $merge: {
                                previewType: "preview",
                                attrs: attrs
                            }
                        }));
                    }
                }
                else if (Object.keys(this.state.attrs).length === 0) {
                    this.setState(update(this.state, {
                        $merge: {
                            attrs: attrs
                        }
                    }));
                }
            }
            else if (this.state.previewType === "none") {
                this.setState(update(this.state, {
                    $merge: {
                        previewType: "preview",
                        replacement: null,
                        attrs: attrs
                    }
                }));
            }
        }
    };

    componentDidUpdate() {
        if (!this.props.isVisible) {
            if (this.state.replacement !== null) {
                const replacement = this.state.replacement;
                replacement.onerror = null;
                replacement.src = "";
                this.setState(update(this.state,
                    {
                        $merge: {
                            replacement: null
                        }
                    }));
            }
        }
        else if (this.state.previewType === "preview") {
            this.updateImage();
        }
    }

    render() {
        return (
            <div className="page_result">
                <img
                    src={this.state.src}
                    style={this.state.attrs.style}
                    alt=""
                    onClick={() => {
                        this.props.onClick(this.props.post)
                    }}
                    onLoad={(e) => {this.updateImage(e)}}
                />
            </div>
        );
    }
}