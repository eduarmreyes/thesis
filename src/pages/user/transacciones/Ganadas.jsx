import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../../../assets/css/pages/general.css'
import '../../../assets/css/pages/popup.css'
import Backend from '../../../components/Layouts/Backend';
class Ganadas extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Depositos',
			page:'ganadas',
			menu:'transacciones-user',
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
			id_cuenta:this.props.info_cuenta['uuid']
		}
		this.get_ganadas = this.get_ganadas.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
	}
	componentDidMount(){
		this.get_ganadas(1,13)
  	}
  	get_ganadas(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	    axios.request('GUET', {
	        url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/transactions?page='+ page +'&per_page='+ per_page +'',
	        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 
	       let content;

	        this.setState({
	          total_count: jsonresponse.headers['x-total'],
	          pagina:page,
	          per_page:per_page
	        })
	       this.set_pages_response(this.state.total_count)
	       this.setState({
		        data: jsonresponse.data
		    }); 
	       content = jsonresponse.data.map((lista, index) => {	
		        return (  	
		        <tr key={index} className="no-cursorpointer">
		        	<td> {lista.name_user}</td>
					<td> {lista.amount}</td>					
					<td> { lista.trans_date } </td>
				</tr>		         
		        );
		    });     
	       this.setState({
	       	tabla:content
	       })
	    })  
	    .catch(error => {
	      	let content = <tr>
				<td colSpan={3}> No se encontraron registros</td>
			</tr>
	      	this.setState({
		       	tabla:content
		    })
	    });
  	}
  	set_pages_response(total_count){
		const paginas = (total_count / this.state.per_page)			
		var pages = Math.ceil(paginas)	
		this.setState({
          total_page: pages
        })	
	}
	handlePageClick(data){
	   var pagina = data.selected + 1;

	   this.get_ganadas(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>
						
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						
						<ul className="right">
							<li>
								{/*<a>Filtrar</a>*/}
							</li>
							<li>
								{/*<a>Generar Reporte</a>*/}
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
								<a> </a>
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
										<td>Nombre</td>
										<td> Monto </td>
										<td> Fecha de aprobación </td>
										
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
    type: state.mainReducer.auth.type,
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
    
  }
}

export default withRouter(connect(mapStateToProps)(Ganadas))
