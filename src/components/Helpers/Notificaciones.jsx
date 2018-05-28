import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Notificaciones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificacion: true,
        };
        this.get_notificacion = this.get_notificacion.bind(this);
    }
    componentDidMount() {
        this.get_notificacion();
    }

    get_notificacion() {
        const bearer = 'bearer ' + this.props.userToken;
        const scope = this.props.scope;

        let url;

        if (scope === 'user') {
            url = 'https://rupert-x.herokuapp.com/dashboard/v1/users/notifications';
        } else {
            url = 'https://rupert-x.herokuapp.com/dashboard/v1/admins/notifications';
        }

        axios
            .request('GUET', {
                url: url,
                headers: { Authorization: bearer, 'Content-Type': 'application/json' },
            })
            .then(jsonresponse => {
                let content;
                if (jsonresponse.data.length === 0) {
                    content = (
                        <tr>
                            <td>
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                                <label>
                                                    No se encontraron notificcaciones, revisa mas
                                                    tarde.
                                                </label>
                                            </li>
                                            {/*<li>
                                            <strong>Estatus:</strong> {lista.status}
                                        </li>*/}
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    );
                    this.setState({
                        tabla: content,
                    });
                } else {
                    content = jsonresponse.data.map((lista, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <ul>
                                        <li>
                                            <strong>{lista.title}</strong>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    <strong>Fecha:</strong> {lista.created_at}
                                                </li>
                                                {/*<li>
                                            <strong>Estatus:</strong> {lista.status}
                                        </li>*/}
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        );
                    });
                }

                this.setState({
                    tabla: content,
                });
            });
    }
    toggleBodyClass() {
        document.body.classList.toggle('content-side-open');
    }
    render() {
        return (
            <div className="Panel-notificaciones">
                <div className="notifi-header">
                    <h2>
                        NOTIFICACIONES
                        <a href={null} onClick={this.toggleBodyClass.bind(this)}>
                            <i className="md-icon">close</i>
                        </a>
                    </h2>
                </div>
                <div className="notifi-body">
                    <table>
                        <tbody>{this.state.tabla}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        authorize: state.mainReducer.auth.authorize,
        userToken: state.mainReducer.auth.token,
        scope: state.mainReducer.auth.scope,
        email: state.mainReducer.auth.email,
        id: state.mainReducer.auth.id,
        register: state.mainReducer.auth.register,
        type: state.mainReducer.auth.type,
        infouser: state.mainReducer.auth.infouser,
        info_cuenta: state.mainReducer.auth.info_cuenta,
    };
};

export default withRouter(connect(mapStateToProps)(Notificaciones));
