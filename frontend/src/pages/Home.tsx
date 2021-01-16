import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
    render() {
        return (
            <div className="container">
                Welcome to Video
                <input
                    type="file"
                    name="file"
                    onChange={(e: any) => {
                        console.log(e.target.files);
                    }}
                />
                <Link to="/v">Go to Video Summary</Link>
            </div>
        );
    }
}
