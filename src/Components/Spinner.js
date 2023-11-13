
import React, { Component } from 'react';
import Magnifier from './Magnify-1s-200px.gif';

class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className="Spinner my-3" src={Magnifier} alt="magnifier" />
            </div>
        );
    }
}


