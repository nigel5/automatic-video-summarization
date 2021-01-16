import React, { Component } from 'react';
import { Player } from 'video-react';
export default class VideoSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' };
    }
    renderSearch() {
        return (
            <div className="v-search">
                <div className="ui right aligned category search v-search__bar">
                    <div className="ui icon input fluid">
                        <input
                            className="prompt"
                            type="text"
                            onChange={({ target: { value } }) =>
                                this.setState({ searchText: value })
                            }
                            placeholder="Search Items..."
                        />
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
                <div className="v-search__list">List</div>
                <div className="v-search__download">Download Timeline</div>
            </div>
        );
    }
    render() {
        return (
            <div className="container v-con">
                <div className="v-video">
                    <Player
                        width={500}
                        playsInline
                        poster="/assets/poster.png"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                </div>
                {this.renderSearch()}
            </div>
        );
    }
}
