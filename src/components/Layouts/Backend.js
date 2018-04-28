import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notificaciones from '../Helpers/Notificaciones';
import Footer from '../Helpers/Footer';
import PageTitle from '../Helpers/PageTitle';
import Sidebar from '../Helpers/Sidebar';
import Toolbar from '../Helpers/Toolbar';
import Navmenu from '../Helpers/Navmenu';
 class Backend extends Component {
    static propType = {
     title:  PropTypes.string.isRequired,
     page:   PropTypes.string.isRequired,
     menu:   PropTypes.string.isRequired,
     uuid:   PropTypes.string.isRequired,
     id_user:PropTypes.string.isRequired,
    };
  toggleBodyClass() {
        document.body.classList.toggle('content-side-open');
  }
  render() {  
    const { title, page,menu,uuid,id_user} = this.props;
    return(
      <div className="page-inner">
          <Toolbar />
          <Sidebar />
          <div className="main">
            <PageTitle  pagetitle={title}/>
            <Navmenu    page={page}   menu={menu}  uuid={uuid} id_user={id_user}/>
            <div className="content">
              {this.props.children}
            </div>
            <Footer />
          </div>
          <div className="content-side-wrapper">
              <div className="content-side-overlay" onClick={this.toggleBodyClass.bind(this)} />

              <div className="content-side">

                  <Notificaciones />
              </div>
          </div>
      </div>
    );
  }
}

export default Backend
