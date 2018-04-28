import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../Helpers/Breadcrumbs';
import Shortcuts from '../UI/Shortcut';


class PageTitle extends Component {
	static propType = {
     pagetitle: PropTypes.string.isRequired
    };
    render() {    	
	    const { pagetitle } = this.props;
        return (
            <div className="page-title">
                
                <h1>{pagetitle}</h1>
                <Breadcrumbs/>
                <Shortcuts/>
            </div>
        );
    }
}


export default PageTitle