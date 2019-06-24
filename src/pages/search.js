import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import update from "immutability-helper";
import axios from "axios";

import {setAliases, unsetAliases, changeAliases} from "../actions/user";
import {Emote} from "../components/emote";
import Entry from "../components/entry";
import {api_url} from "../config";

class SearchPage extends Component {
    componentDidMount() {
        this.setState({
            term: "",
            pageNo: 0,
            emotes: {},
            totalResults: 0
        });
    }

    getNewEmotes(term, pageNo) {
        axios.get(`${api_url}/emotes/search`, {params: {term, page_no: pageNo}}).then(response => {
            this.setState(update(this.state,
                {$merge: {
                    pageNo,
                    term,
                    totalResults: response.data.total,
                    emotes: response.data.results,
                }}
            ));
        });
    }

    render() {
        if (!this.state) {
            return <div/>;
        }
        return (
            <div>
                <h4>Find Emotes</h4>
                <Entry
                    onSubmit={(term) => {this.getNewEmotes(term, 0)}}
                    clearOnSubmit={false}
                />
                { Object.keys(this.state.emotes).length !== 0 && <div>
                    {this.state.totalResults} results (page {this.state.pageNo + 1} of {Math.ceil(this.state.totalResults / 20)})
                    <br/>
                    {this.state.emotes.map((emote) => {
                        const emoteObj = new Emote(emote);
                        const alias = this.props.aliases.find(alias => alias.id === emote.id);
                        return <div key={emote.id}>
                            <input
                                name={emote.id}
                                id={emote.id}
                                type="checkbox"
                                checked={alias !== undefined}
                                onChange={() => {
                                    if (alias) {
                                        this.props.unsetAliases([alias.name]);
                                    }
                                    else {
                                        this.props.setAliases([emote]);
                                    }
                                }}
                            />
                            <label
                                htmlFor={emote.id}
                            >
                                {emoteObj.renderImg()} - {!alias && emote.name}{alias &&
                                    <Entry
                                        initial={alias.name}
                                        inline={true}
                                        onBlur={(newAlias) => {
                                            if (newAlias === alias.name) {
                                                return
                                            }
                                            this.props.changeAliases([{
                                                name: newAlias,
                                                oldName: alias.name,
                                                id: emote.id,
                                                animated: emote.animated
                                            }]);
                                        }}
                                        clearOnSubmit={false}
                                    />
                                }
                            </label>
                            <br/>
                        </div>
                    })}
                    <hr/>
                    { this.state.totalResults > 20 && <div>
                        <button
                            disabled={this.state.pageNo === 0}
                            onClick={() => {
                                this.getNewEmotes(this.state.term, this.state.pageNo - 1);
                            }}
                        >Previous</button>
                        <button
                            disabled={(this.state.pageNo + 1) * 20 >= this.state.totalResults}
                            onClick={() => {
                                this.getNewEmotes(this.state.term, this.state.pageNo + 1);
                            }}
                        >Next</button>
                    </div>}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        aliases: state.user.user_aliases
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAliases: (aliases) => dispatch(setAliases(aliases)),
        changeAliases: (aliases) => dispatch(changeAliases(aliases)),
        unsetAliases: (emotes) => dispatch(unsetAliases(emotes))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);