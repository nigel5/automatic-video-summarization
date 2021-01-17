import React, { Component } from 'react';
import logo from '../media/logo.png';
import UploadButton from './UploadButton';
import personScreen from '../media/vid.png';
export default class Home extends Component {
    renderHeader() {
        return (
            <div className="hm-header">
                <div className="hm-title">
                    <img src={logo} alt="idk" />
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
        );
    }

    renderBody() {
        console.log(this.props);
        return (
            <div className="hm-body">
                <div className="hm-body__title">
                    Find what you are looking for in a fraction of the time
                </div>
                <div className="hm-body__gs">
                    <div className="gs">
                        <UploadButton
                            handleFile={(x) => {
                                this.props.history.push(`/v/${x}`);
                            }}
                        />
                        <img src={personScreen} alt="x" className="gs-img" />
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container hm-con">
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }
}
