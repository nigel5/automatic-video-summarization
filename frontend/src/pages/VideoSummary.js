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
        let vidsrc= this.props.match.params.vid;
        return (
            <div className="container v-con">
                <div className="v-video">
                    <Player
                        width={500}
                        playsInline
                        poster="/assets/poster.png"
                        src={'https://storage.googleapis.com/test-concrete-rig-265506/virat/09152008flight2tape1_1.mpg'}
                    />
                </div>
                {this.renderSearch()}
            </div>
        );
    }
}
