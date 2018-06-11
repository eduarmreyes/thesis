import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import PrivateRoute from 'components/routes/PrivateRoute';
import store from 'store';

/*Componentes tipo pagina cargados*/
import Dashboard from 'pages/Dashboard';

/* Project routes */
import NewProject from 'pages/projects/NewProject';
import NewProjectActivities from 'pages/projects/Activities';
import NewProjectData from 'pages/projects/Data';
import NewProjectKPIs from 'pages/projects/KPI';
import NewProjectSpecs from 'pages/projects/Specs';

/* Update routes */

import UpdateKPI from 'pages/projects/UpdateKPI';
import UpdateActivities from 'pages/projects/UpdateActivities';

//import actions from "actions";
import Login from 'pages/login/Login';
import LoginAdmin from 'pages/login/LoginAdmin';
import LoginUser from 'pages/login/LoginUser';

import Signup from 'pages/login/Signup';
import Logout from 'pages/login/Logout';

import Loading from 'components/Helpers/Loading';

import registerServiceWorker from 'registerServiceWorker';

import 'assets/css/pages/general.css';

class Error404 extends Component {
  render() {
    return (
      /*Componente que se ejecutara cuando no encuentre un comonente al cual redireccionar*/
      <div className="content-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="416.826 4980.277 552.348 355.446"
          className="error-splashs"
        >
          <defs>
            <style>
              {
                '.cls-1 { fill: #f3f8ff; } .cls-2 { fill: #4873ff;  } .cls-3, .cls-5 { fill: none; } .cls-3 { stroke: #afcdff; stroke-width: 4px; } .cls-4 {  stroke: none; }'
              }
            </style>
          </defs>
          <g id="Group_258" data-name="Group 258" transform="translate(0 4776)">
            <rect
              id="Rectangle_262"
              data-name="Rectangle 262"
              class="cls-1"
              width="526.776"
              height="301.746"
              rx="3"
              transform="translate(442.398 257.977)"
            />
            <g id="Group_257" data-name="Group 257">
              <path
                id="Path_229"
                data-name="Path 229"
                class="cls-2"
                d="M50.4,120.218v4.812h-.8V113.1h2.907a3.937,3.937,0,0,1,2.807.9,3.388,3.388,0,0,1,1,2.506,3.7,3.7,0,0,1-1.1,2.707,4.092,4.092,0,0,1-3.008,1.1H50.4Zm0-6.416v5.614h1.7a3.3,3.3,0,0,0,2.406-.8,2.954,2.954,0,0,0,.8-2.206c0-1.8-1-2.707-3.108-2.707H50.4Z"
                transform="translate(567.022 320.451)"
              />
              <path
                id="Path_230"
                data-name="Path 230"
                class="cls-2"
                d="M64.623,125.03l-1.4-3.709H58.006l-1.4,3.709h-.9l4.511-11.93h.8l4.411,11.93ZM60.913,115a.9.9,0,0,1-.1-.5c0-.1-.1-.3-.1-.4h0a4.66,4.66,0,0,1-.3.9l-2.005,5.514h4.612Z"
                transform="translate(567.038 320.451)"
              />
              <path
                id="Path_231"
                data-name="Path 231"
                class="cls-2"
                d="M75.823,124.229a7.476,7.476,0,0,1-3.81,1,4.766,4.766,0,0,1-3.91-1.7,6.276,6.276,0,0,1-1.5-4.311,6.387,6.387,0,0,1,1.6-4.511,5.528,5.528,0,0,1,4.311-1.8,7.672,7.672,0,0,1,3.008.6v.9a7.581,7.581,0,0,0-3.208-.8,4.618,4.618,0,0,0-3.609,1.5,5.652,5.652,0,0,0-1.4,3.91,5.276,5.276,0,0,0,1.3,3.91,4.677,4.677,0,0,0,3.509,1.4,5.086,5.086,0,0,0,2.807-.7v-3.91H72.114v-.7h3.609v5.213Z"
                transform="translate(567.066 320.451)"
              />
              <path
                id="Path_232"
                data-name="Path 232"
                class="cls-2"
                d="M78.5,125.03V113.1h5.614v.8H79.4v4.812h4.411v.7H79.4v4.912h5.013v.7Z"
                transform="translate(567.096 320.451)"
              />
              <path
                id="Path_233"
                data-name="Path 233"
                class="cls-2"
                d="M100.121,125.031,93,115.406c-.1-.2-.3-.4-.4-.6l-.1-.2h0V124.93h-.8V113h.6l7.018,9.524a5.6,5.6,0,0,1,.5.8h0V113h.8v12.031Z"
                transform="translate(567.129 320.451)"
              />
              <path
                id="Path_234"
                data-name="Path 234"
                class="cls-2"
                d="M108.614,125.232a5.144,5.144,0,0,1-4.01-1.7,6.363,6.363,0,0,1-1.5-4.411,6.9,6.9,0,0,1,1.5-4.612,5.432,5.432,0,0,1,4.211-1.7,5,5,0,0,1,3.91,1.6,6.1,6.1,0,0,1,1.5,4.311,6.55,6.55,0,0,1-1.5,4.612A5.519,5.519,0,0,1,108.614,125.232Zm.1-11.629a4.342,4.342,0,0,0-3.409,1.5,6.517,6.517,0,0,0,0,7.82,4.2,4.2,0,0,0,3.409,1.5,4.677,4.677,0,0,0,3.509-1.4,5.529,5.529,0,0,0,1.3-4.01,5.276,5.276,0,0,0-1.3-3.91A4.407,4.407,0,0,0,108.714,113.6Z"
                transform="translate(567.158 320.45)"
              />
              <path
                id="Path_235"
                data-name="Path 235"
                class="cls-2"
                d="M118.811,113.8V125.03h-.8V113.9H114.6v-.8h7.72v.8h-3.509Z"
                transform="translate(567.188 320.451)"
              />
              <path
                id="Path_236"
                data-name="Path 236"
                class="cls-2"
                d="M129.7,113.8v4.912h4.411v.7H129.7v5.514h-.8V113h5.614v.8Z"
                transform="translate(567.224 320.451)"
              />
              <path
                id="Path_237"
                data-name="Path 237"
                class="cls-2"
                d="M141.714,125.232a5.144,5.144,0,0,1-4.01-1.7,6.363,6.363,0,0,1-1.5-4.411,6.9,6.9,0,0,1,1.5-4.612,5.113,5.113,0,0,1,4.211-1.7,5,5,0,0,1,3.91,1.6,6.1,6.1,0,0,1,1.5,4.311,6.55,6.55,0,0,1-1.5,4.612A5.519,5.519,0,0,1,141.714,125.232Zm.1-11.629a4.342,4.342,0,0,0-3.409,1.5,6.517,6.517,0,0,0,0,7.82,4.2,4.2,0,0,0,3.409,1.5,4.677,4.677,0,0,0,3.509-1.4,5.69,5.69,0,0,0,1.3-4.01,5.276,5.276,0,0,0-1.3-3.91A4.7,4.7,0,0,0,141.814,113.6Z"
                transform="translate(567.242 320.45)"
              />
              <path
                id="Path_238"
                data-name="Path 238"
                class="cls-2"
                d="M157.821,120.218c0,3.308-1.4,5.013-4.211,5.013-2.707,0-4.01-1.6-4.01-4.812V113.1h.8v7.218c0,2.807,1.1,4.11,3.409,4.11,2.206,0,3.308-1.3,3.308-4.01V113.1h.8v7.118Z"
                transform="translate(567.277 320.451)"
              />
              <path
                id="Path_239"
                data-name="Path 239"
                class="cls-2"
                d="M169.221,125.031l-7.118-9.624c-.1-.2-.3-.4-.4-.6l-.1-.2h0V124.93h-.8V113h.6l7.018,9.524a5.6,5.6,0,0,1,.5.8h0V113h.8v12.031Z"
                transform="translate(567.305 320.451)"
              />
              <path
                id="Path_240"
                data-name="Path 240"
                class="cls-2"
                d="M172.8,125.03V113.1h3.008a6.127,6.127,0,0,1,4.511,1.5,5.782,5.782,0,0,1,1.5,4.311,6.048,6.048,0,0,1-1.7,4.411,6.206,6.206,0,0,1-4.612,1.7Zm.8-11.228v10.426h1.9a5.824,5.824,0,0,0,4.11-1.4,5.032,5.032,0,0,0,1.4-4.01c0-3.409-1.8-5.113-5.313-5.113H173.6Z"
                transform="translate(567.336 320.451)"
              />
              <path
                id="Path_241"
                data-name="Path 241"
                class="cls-2"
                d="M68.373,50.027V65.366H56.744V84.414H39.3V65.366H0V51.932L25.765,0H43.811L19.65,50.027H39.3V31.38H56.744V50.027Z"
                transform="translate(566.896 320.164)"
              />
              <path
                id="Path_242"
                data-name="Path 242"
                class="cls-2"
                d="M231.573,50.027V65.366H220.044V84.414H202.6V65.366H163.3V51.932L188.965,0h18.046L182.749,50.027H202.4V31.38h17.444V50.027Z"
                transform="translate(567.311 320.164)"
              />
              <path
                id="Path_243"
                data-name="Path 243"
                class="cls-2"
                d="M129.407,28.015a2.907,2.907,0,1,0-2.907-2.907A2.909,2.909,0,0,0,129.407,28.015Z"
                transform="translate(567.218 320.22)"
              />
              <ellipse
                id="Ellipse_73"
                data-name="Ellipse 73"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(706.851 365.278)"
              />
              <path
                id="Path_244"
                data-name="Path 244"
                class="cls-2"
                d="M87,47.907A2.907,2.907,0,1,0,89.907,45,2.909,2.909,0,0,0,87,47.907Z"
                transform="translate(567.117 320.278)"
              />
              <path
                id="Path_245"
                data-name="Path 245"
                class="cls-2"
                d="M76.507,43.115A2.907,2.907,0,1,0,73.6,40.207,2.909,2.909,0,0,0,76.507,43.115Z"
                transform="translate(567.083 320.258)"
              />
              <ellipse
                id="Ellipse_74"
                data-name="Ellipse 74"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(640.884 372.697)"
              />
              <ellipse
                id="Ellipse_75"
                data-name="Ellipse 75"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(680.083 335.001)"
              />
              <ellipse
                id="Ellipse_76"
                data-name="Ellipse 76"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(667.451 327.382)"
              />
              <path
                id="Path_246"
                data-name="Path 246"
                class="cls-2"
                d="M90.107,14.4a2.907,2.907,0,1,0,2.907,2.907A2.847,2.847,0,0,0,90.107,14.4Z"
                transform="translate(567.118 320.2)"
              />
              <path
                id="Path_247"
                data-name="Path 247"
                class="cls-2"
                d="M89.407,29.6a2.907,2.907,0,1,0,2.907,2.907A2.909,2.909,0,0,0,89.407,29.6Z"
                transform="translate(567.116 320.239)"
              />
              <ellipse
                id="Ellipse_77"
                data-name="Ellipse 77"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(667.351 342.42)"
              />
              <path
                id="Path_248"
                data-name="Path 248"
                class="cls-2"
                d="M129.407,13.215a2.907,2.907,0,1,0-2.907-2.907A2.909,2.909,0,0,0,129.407,13.215Z"
                transform="translate(567.218 320.182)"
              />
              <path
                id="Path_249"
                data-name="Path 249"
                class="cls-2"
                d="M142.507,20.315a2.907,2.907,0,1,0-2.907-2.907A2.909,2.909,0,0,0,142.507,20.315Z"
                transform="translate(567.251 320.2)"
              />
              <path
                id="Path_250"
                data-name="Path 250"
                class="cls-2"
                d="M142.507,35.715a2.907,2.907,0,1,0-2.907-2.907A2.909,2.909,0,0,0,142.507,35.715Z"
                transform="translate(567.251 320.24)"
              />
              <ellipse
                id="Ellipse_78"
                data-name="Ellipse 78"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(719.884 357.659)"
              />
              <path
                id="Path_251"
                data-name="Path 251"
                class="cls-2"
                d="M155.207,52.4a2.907,2.907,0,1,0,2.907,2.907A2.909,2.909,0,0,0,155.207,52.4Z"
                transform="translate(567.283 320.297)"
              />
              <path
                id="Path_252"
                data-name="Path 252"
                class="cls-2"
                d="M129.407,67.8a2.907,2.907,0,1,0,2.907,2.907A2.909,2.909,0,0,0,129.407,67.8Z"
                transform="translate(567.218 320.336)"
              />
              <ellipse
                id="Ellipse_79"
                data-name="Ellipse 79"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(680.083 395.555)"
              />
              <ellipse
                id="Ellipse_80"
                data-name="Ellipse 80"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(667.451 403.174)"
              />
              <ellipse
                id="Ellipse_81"
                data-name="Ellipse 81"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(654.318 395.956)"
              />
              <path
                id="Path_253"
                data-name="Path 253"
                class="cls-2"
                d="M89.407,66.215A2.907,2.907,0,1,0,86.5,63.307,2.976,2.976,0,0,0,89.407,66.215Z"
                transform="translate(567.116 320.317)"
              />
              <ellipse
                id="Ellipse_82"
                data-name="Ellipse 82"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(667.351 388.136)"
              />
              <path
                id="Path_254"
                data-name="Path 254"
                class="cls-2"
                d="M129.407,82.6a2.907,2.907,0,1,0,2.907,2.907A2.909,2.909,0,0,0,129.407,82.6Z"
                transform="translate(567.218 320.374)"
              />
              <ellipse
                id="Ellipse_83"
                data-name="Ellipse 83"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(706.851 395.856)"
              />
              <ellipse
                id="Ellipse_84"
                data-name="Ellipse 84"
                class="cls-2"
                cx="2.907"
                cy="2.907"
                rx="2.907"
                ry="2.907"
                transform="translate(706.851 380.416)"
              />
              <path
                id="Path_255"
                data-name="Path 255"
                class="cls-2"
                d="M116.213,42.7a5.213,5.213,0,1,0,5.213,5.213A5.178,5.178,0,0,0,116.213,42.7Z"
                transform="translate(567.178 320.272)"
              />
              <circle
                id="Ellipse_85"
                data-name="Ellipse 85"
                class="cls-2"
                cx="5.213"
                cy="5.213"
                r="5.213"
                transform="translate(678.178 347.934)"
              />
              <circle
                id="Ellipse_86"
                data-name="Ellipse 86"
                class="cls-2"
                cx="5.213"
                cy="5.213"
                r="5.213"
                transform="translate(691.612 355.553)"
              />
              <path
                id="Path_256"
                data-name="Path 256"
                class="cls-2"
                d="M129.313,50.2a5.163,5.163,0,1,0,5.213,5.113A5.157,5.157,0,0,0,129.313,50.2Z"
                transform="translate(567.212 320.291)"
              />
              <path
                id="Path_257"
                data-name="Path 257"
                class="cls-2"
                d="M116.213,57.8a5.163,5.163,0,1,0,5.213,5.113A5.289,5.289,0,0,0,116.213,57.8Z"
                transform="translate(567.178 320.311)"
              />
              <circle
                id="Ellipse_87"
                data-name="Ellipse 87"
                class="cls-2"
                cx="5.213"
                cy="5.213"
                r="5.213"
                transform="translate(664.945 370.591)"
              />
              <path
                id="Path_258"
                data-name="Path 258"
                class="cls-2"
                d="M103.113,35.1A5.241,5.241,0,0,0,97.9,40.313a5.157,5.157,0,0,0,5.213,5.113,5.163,5.163,0,1,0,0-10.326Z"
                transform="translate(567.145 320.253)"
              />
            </g>
            <g id="Group_256" data-name="Group 256" transform="translate(416.826 204.277)">
              <g
                id="Rectangle_259"
                data-name="Rectangle 259"
                class="cls-3"
                transform="translate(0 0)"
              >
                <rect class="cls-4" width="534.448" height="337.546" rx="3" />
                <rect class="cls-5" x="1.5" y="1.5" width="531.448" height="334.546" rx="1.5" />
              </g>
              <g
                id="Rectangle_260"
                data-name="Rectangle 260"
                class="cls-3"
                transform="translate(0 0)"
              >
                <rect class="cls-4" width="534.448" height="42.193" rx="3" />
                <rect class="cls-5" x="1.5" y="1.5" width="531.448" height="39.193" rx="1.5" />
              </g>
              <g
                id="Rectangle_261"
                data-name="Rectangle 261"
                class="cls-3"
                transform="translate(0 0)"
              >
                <rect class="cls-4" width="534.448" height="337.546" rx="3" />
                <rect class="cls-5" x="1.5" y="1.5" width="531.448" height="334.546" rx="1.5" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stado: '',
    };
  }
  componentWillMount() {}
  render() {
    return (
      /*Se crean las rutas que serviran como las paginas a cargar*/
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginUser} />
            <PrivateRoute exact path="/logout" component={Logout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={LoginAdmin} />
            <Route exact path="/log-user" component={LoginUser} />
            <Route exact path="/Signup" component={Signup} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/project-new" component={NewProject} />
            <PrivateRoute exact path="/project-new-activities" component={NewProjectActivities} />
            <PrivateRoute exact path="/project-new-data" component={NewProjectData} />
            <PrivateRoute exact path="/project-new-kpis" component={NewProjectKPIs} />
            <PrivateRoute exact path="/project-new-specs" component={NewProjectSpecs} />
            <PrivateRoute
              exact
              path="/updateKPIToProject/:projectID-:projectMatrixID"
              component={UpdateKPI}
            />
            <PrivateRoute
              exact
              path="/updateActivitiesToProject/:projectID-:projectMatrixID"
              component={UpdateActivities}
            />
            <Route exact path="/loading" component={Loading} />

            <Route component={Error404} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById('root'));

registerServiceWorker();
