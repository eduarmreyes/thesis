import React, { Component } from 'react';

export default class SidebarTitle extends Component {
    toggleBodyClass() {
        document.body.classList.toggle('sidebar-title-content-open');
    }

    render() {
        return (
            <h1 className="sidebar-title-wrapper">
                <div className="sidebar-title-inner" onClick={this.toggleBodyClass.bind(this)}>

                    {/*<img className="logo" src="/img/logotext.png" alt="Logo" />*/}
                </div>
            </h1>
        );
    }
}
