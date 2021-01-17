import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import ReactDOMServer from 'react-dom/server';
import bk from '../api/backendapi';
import logo from '../media/logo.png';
let MODE_NONE = 0;
let MODE_SEARCH = 1;
let MODE_ITEM = 2;
export default class VideoSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchStart: 0,
            searchEnd: 1,
            dur: 80,
            searchTextList: [],
            timestampList: [
                {
                    label: 'snake',
                    start_time: 11.4,
                    end_time: 20.4,
                    confidence: 0.99,
                },
                {
                    label: 'dog',
                    start_time: 20.3,
                    end_time: 33.2,
                    confidence: 0.89,
                },
                {
                    label: 'tank',
                    start_time: 23.3,
                    end_time: 26.2,
                    confidence: 0.79,
                },
                {
                    label: 'do',
                    start_time: 1.5,
                    end_time: 10.3,
                    confidence: 0.59,
                },
            ],
            mode: MODE_NONE,
            tracker: [],
        };
    }
    renderBar(s, e, dur, color = '#f00', code = 'adadada') {
        let vidBar = document.querySelector(
            '.video-react-progress-holder.video-react-slider-horizontal.video-react-slider',
        );
        let bar = (
            <div
                className={`video-react-slider-bar ${code}`}
                style={{
                    width: `${((e - s) * 100) / dur}%`,
                    height: '0.3em',
                    top: '0.3em',
                    position: 'absolute',
                    left: `${(s * 100) / dur}%`,
                    backgroundColor: color,
                    zIndex: 1000,
                }}
            />
        );
        vidBar.insertAdjacentHTML('beforeend', ReactDOMServer.renderToStaticMarkup(bar));
    }
    resetBar(code = 'adadada') {
        let vidBar = document.querySelector(`.${code}`);
        while (vidBar) {
            vidBar.remove(`.${code}`);
            vidBar = document.querySelector(`.${code}`);
        }
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
                                onKeyUp={(e) => {
                                    if (e.keyCode === 13) {
                                        bk.get(`/search-text?text=${this.state.searchText}`).then(
                                            ({ data }) => {
                                                this.setState({
                                                    searchTextList: data,
                                                    mode: MODE_SEARCH,
                                                    searchText: '',
                                                });
                                            },
                                        );
                                    }
                                }}
                                value={this.state.searchText}
                                onChange={({ target: { value } }) =>
                                    this.setState({ searchText: value })
                                }
                                placeholder="Search Items..."
                            />
                            <i className="search icon"></i>
                        </div>
                        <div className="results"></div>
                    </div>
                    <div className="v-search__list">
                        {this.state.searchTextList.map(
                            ({ label, start_time, end_time, confidence }) => {
                                return (
                                    <div
                                        className="v-titi"
                                        onMouseOver={() => {
                                            this.renderBar(
                                                start_time,
                                                end_time,
                                                this.state.dur,
                                                '#ff0',
                                                'mo',
                                            );
                                        }}
                                        onMouseLeave={() => {
                                            this.resetBar('mo');
                                        }}
                                    >
                                        <div className="v-titi__row">
                                            <div>
                                                <strong>Label: </strong>
                                                {label}
                                            </div>
                                            <div>
                                                {start_time}s to {end_time}s
                                            </div>
                                        </div>
                                        <div className="v-titi__row">
                                            <div>
                                                <strong>Confidence: </strong>
                                                {confidence * 100}%
                                            </div>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>

                    {/* <div className="v-search__download">Download Timeline</div> */}
                </div>
                <div className="v-timestamp">
                    <div class="ui action fluid input">
                        <input
                            type="number"
                            placeholder="Start... (in seconds)"
                            value={this.state.searchStart}
                            onChange={(e) => this.setState({ searchStart: e.target.value })}
                        />
                        <input
                            type="number"
                            value={this.state.searchEnd}
                            placeholder="End... (in seconds)"
                            onChange={(e) => {
                                this.setState({ searchEnd: e.target.value });
                            }}
                        />
                        <button
                            class="ui button"
                            onClick={() => {
                                let { searchStart: s, searchEnd: e, dur: d } = this.state;
                                if (s < 0 || s >= d) {
                                    alert('Please enter a valid start time');
                                    return;
                                } else if (e === '' || s === '') {
                                    alert('Please enter a full time');
                                    return;
                                } else if (e <= s || e > d) {
                                    alert('Please enter a valid end time');
                                    return;
                                }
                                bk.get(`/search-time?start=${s}&end=${e}`).then(({ data }) => {
                                    this.resetBar();
                                    this.renderBar(s, e, d);
                                    this.setState({ mode: MODE_ITEM, timestampList: data });
                                });
                            }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="v-timestamp__list">
                        {this.state.timestampList.map(
                            ({ label, start_time, end_time, confidence }) => {
                                return (
                                    <div
                                        className="v-tit"
                                        onMouseOver={() => {
                                            this.renderBar(
                                                start_time,
                                                end_time,
                                                this.state.dur,
                                                '#0f0',
                                                'mo',
                                            );
                                        }}
                                        onMouseLeave={() => {
                                            this.resetBar('mo');
                                        }}
                                        onClick={() => {
                                            if (this.player) {
                                                console.log('W');
                                                this.player.seek(start_time);
                                            }
                                        }}
                                    >
                                        <div className="v-tit__row">
                                            <div>
                                                <strong>Label: </strong>
                                                {label}
                                            </div>
                                            <div>
                                                {start_time}s to {end_time}s
                                            </div>
                                        </div>
                                        <div className="v-tit__row">
                                            <div>
                                                <strong>Confidence: </strong>
                                                {confidence * 100}%
                                            </div>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        );
    }
    renderVideoPlayer() {
        return (
            <div className="v-video">
                <Player
                    ref={(player) => {
                        this.player = player;
                    }}
                    height={500}
                    fluid={false}
                    playsInline
                    autoPlay={true}
                    poster="/assets/poster.png"
                    // src={VIDEO}
                    src="https://storage.googleapis.com/test-concrete-rig-265506/virat/final_60032c127eda940069ff76ba_513160_Trim.mp4"
                >
                    <ControlBar autoHide={false} default={false} />
                </Player>
            </div>
        );
    }
    render() {
        return (
            <div className="container v-con">
                <div className="hm-header">
                    <div className="hm-title">
                        <img src={logo} alt="" />
                        VidSpace
                    </div>
                    <div className="hm-contact">
                        <a className="hm-contact__devpost" href="/">
                            Devpost
                        </a>
                        <a className="hm-contact__github" href="/">
                            GitHub
                        </a>
                    </div>
                </div>
                {this.renderVideoPlayer()}
                {this.renderSearch()}
            </div>
        );
    }
}
