import React, { Component } from 'react';
import { Player } from 'video-react';
import ReactDOMServer from 'react-dom/server';

export default class VideoSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '' };
    }
    componentDidMount() {
        let vidBar = document.querySelector(
            '.video-react-progress-holder.video-react-slider-horizontal.video-react-slider',
        );
        let duration = 52;
        let start = 10;
        let end = 20;
        console.log(`${(end - start) / duration}%`);
        let bar = (
            <div
                class=" video-react-slider-bar"
                style={{
                    width: `${((end - start) * 100) / duration}%`,
                    height: '0.3em',
                    top: '0.3em',
                    position: 'absolute',
                    left: `${(start * 100) / duration}%`,
                    backgroundColor: 'red',
                    zIndex: 1000,
                }}
            />
        );
        vidBar.insertAdjacentHTML('beforeend', ReactDOMServer.renderToStaticMarkup(bar));
        console.log(vidBar);
    }
    renderSearch() {
        return (
            <div className="v-box">
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
                <div className="v-timestamp">xd</div>
            </div>
        );
    }
    render() {
        let vidsrc = this.props.match.params.vid;
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
