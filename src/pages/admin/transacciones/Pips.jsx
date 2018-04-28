import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Moment from 'moment';
class Pips extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'PIPs',
			page:'pips',
			menu:'transacciones',
			tabla:null,
			pagina:1,
			total_page:1,
			next:'',
			back:'',
			list_min:[],
			list_max:[],
			listactualpage:'',
			listmin:'',
			listmax:'',
			pagination:'',
			per_page:'',
			overlay_run:false,
			overlay_confirm_run:false,
			overlay_run_pip:false

		}

		this.get_pits = this.get_pits.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.run_pips = this.run_pips.bind(this)

		this.close_overlay_confirm_run = this.close_overlay_confirm_run.bind(this)
		this.overlay_run = this.overlay_run.bind(this)

		this.close_overlay_confirm_pip = this.close_overlay_confirm_pip.bind(this)
		this.overlay_pip = this.overlay_pip.bind(this)
	}
	componentDidMount(){
		this.get_pits(1,13)
  	}
  	get_pits(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/pips?page='+ page +'&per_page='+ per_page +'',
	        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	      })
	      .then(jsonresponse => { 
	       let content;
	        console.log(jsonresponse)
	        this.setState({
	          total_count: jsonresponse.headers['x-total'],
	          pagina:page,
	          per_page:per_page
	        })
	       this.set_pages_response(this.state.total_count)
	       this.setState({
		        data: jsonresponse.data
		    }); 

	       const type_trans = 'Ninguna'

	       content = jsonresponse.data.map((lista, index) => {	
	       		if (lista.trans_retirement === true) {
	       			type_trans === 'Retiro'
	       		}	     
		        return (  	
		        <tr key={index} className="no-cursorpointer">
					<td> {lista.pip}</td>
					<td> {lista.status}</td>
					<td> { lista.date }</td>
					<td><a onClick={e => {this.overlay_pip(e,lista.created_at)}}> <i className="md-icon">play_arrow</i></a></td>
					{/*<td> <i className="md-icon">create</i></td>*/}
				</tr>		         
		        );
		    });
	      	


	       this.setState({
	       	tabla:content
	       })

	      })  
	      .catch(error => {

	      });
  	}
  	set_pages_response(total_count){
		const paginas = (total_count / this.state.per_page)			
		var pages = Math.ceil(paginas)
	
		this.setState({
          total_page: pages
        })	
	}
	run_pip(e,date){
		const bearer = 'bearer '+ this.props.userToken;
		var dateString = date;
		var dateObj = new Date(dateString);
		var momentObj = moment(dateObj);
		var momentString = momentObj.format('YYYY-MM-DD');

		const data =  new FormData();    
        data.append('date', momentString);

	    axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/pips/pip_run',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
	    .then(jsonresponse => { 
	  		/*this.get_pits(1,13)*/
	    })
	    .catch(error => {

	    	this.get_pits(this.state.pagina,this.state.per_page)
	    });

	    this.close_overlay_confirm_pip()
	}
	run_pips(e){

		const bearer = 'bearer '+ this.props.userToken;
	

	     axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/pips/pips_run',
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
	    .then(jsonresponse => { 
	  		
	    })
	    .catch(error => {


	    }); 

	    this.close_overlay_confirm_run()
	}
	handlePageClick(data){
	   var pagina = data.selected + 1;
	   this.get_pits(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}	
	close_overlay_confirm_run(){
        this.setState({
            overlay_run:false
        })  
    }
    overlay_run(){
        this.setState({
            overlay_run:true
        })  
    }

    close_overlay_confirm_pip(){
        this.setState({
            overlay_run_pip:false
        })  
    }
    overlay_pip(e,date){
        this.setState({
            overlay_run_pip:true
        })  
        this.setState({
        	pip:date
        })
    }


	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						<ul className="">
							<li>
								<a className="btn-blue blue" href="#pips" /*onClick={e => {this.get_transaction_filter(e,1,15)}} */ > Nuevo</a>
							</li>
							<li>
								<a className="btn-blue blue" href="#" onClick={this.overlay_run} > <i className="md-icon">done</i> Correr todos los PIPs</a>
							</li>
						</ul>
					</div>
					<div className="page-cliente-empty-paginate-toolbar">
						<ul className="left">
							<li>
								<a> &#60; </a>
							</li>
							<li>
								<a> {this.state.pagina} </a>
							</li>
							<li>
								<a> - </a>
							</li>
							<li>
								<a> {this.state.total_page} pag </a>
							</li>
							<li>
								<a>
									&#62;
								</a>
							</li>
						</ul>
						<ul className="right">
							<li>
								<a>  </a>
							</li>
							<li>
								<a>  </a>
							</li>
							<li>
								<a> {this.state.total_count} registros</a>
							</li>
							
						</ul>
					</div>
					<div className="page-cliente-empty-content">
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> PIPs </td>
										<td> Estatus </td>
										<td> Fecha de transaccion</td>
										<td>Run</td>
									</tr>
								</thead>
								<tbody>
									{this.state.tabla}
								</tbody>
							</table>
						</div>
					</div>
					<div className="page-cliente-empty-pagination">
						<ReactPaginate previousLabel={"anterior"}
		                       nextLabel={"siguiente"}
		                       breakLabel={<a href="">...</a>}
		                       breakClassName={"break-me"}
		                       pageCount={this.state.total_page}
		                       marginPagesDisplayed={2}
		                       pageRangeDisplayed={5}
		                       onPageChange={this.handlePageClick}
		                       containerClassName={"pagination"}
		                       subContainerClassName={"pages pagination"}
		                       activeClassName={"active"} />
					</div>
				</div>
				<div id="addretiroconfirm" className={`overlay ${this.state.overlay_run === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Confirmación </h4>                                  
                        </div>
                        <div className="popup-body">
                                <p>
                                    ¿ Esta seguro que desea aplicar la transacción ?
                                </p>
                                <div className="popup-retiro">
                                    <div className="form-group section-btn">
                                        <a className="close blue btn" href="#" onClick={this.close_overlay_confirm_run}>CANCELAR</a> <a className="blue btn" href="#" onClick={e => {this.run_pips(e)}} > ACEPTAR</a>
                                    </div>
                                </div>                        
                        </div>                                      
                    </div>
                </div>


                <div id="addretiroconfirm" className={`overlay ${this.state.overlay_run_pip === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Confirmación </h4>                                  
                            </div>
                            <div className="popup-body">
                                    <p>
                                        ¿ Esta seguro que desea aplicar la transacción ?
                                    </p>
                                    <div className="popup-retiro">
                                        <div className="form-group section-btn">
                                            <a className="close blue btn" href="#" onClick={this.close_overlay_confirm_pip}>CANCELAR</a> <a className="blue btn" href="#" onClick={e => {this.run_pip(e,this.state.pip)}} > ACEPTAR</a>
                                        </div>
                                    </div>                        
                            </div>                                      
                        </div>
                    </div>
			</Backend>
		)
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(Pips))
