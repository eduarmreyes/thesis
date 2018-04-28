import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
class General extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Usuarios',
			page:'general',
			menu:'usuarios',			tabla:null,
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
			per_page:''
		}

		this.get_general = this.get_general.bind(this)
		this.get_detalle = this.get_detalle.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
	}
	get_detalle(event,usuario){
		event.preventDefault()

		this.props.history.push("/detalleusuarios/"+usuario+"")
	}
	componentDidMount(){
		this.get_general(1,13)
  	}
  	get_general(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/users?page='+ page +'&per_page='+ per_page +'',
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

	

	       content = jsonresponse.data.map((lista, index) => {	
	         
		        return (  	
		        <tr key={index}  onClick={event => { this.get_detalle(event, lista.id ) }} className="no-cursorpointer">
		       		<td></td>
					<td> {lista.email}</td>
					<td></td>
					<td> { lista.created_at } </td>
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


	handlePageClick(data){
  	 console.log(data.selected)
	   var pagina = data.selected + 1;

	   this.get_general(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						<ul>
							<li>
								<a>Filtrar</a>
							</li>
							<li>
								<a>Generar Reporte</a>
							</li>
						</ul>
					</div>

					<div className="page-cliente-empty-paginate-toolbar">
					<ul className="left">
						<li>
							<a> &#60; </a>
						</li>
						<li>
							<a> {this.state.pagina}  </a>
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
							<a> 15 </a>
						</li>
						<li>
							<a> - </a>
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
										<td> Usuario  </td>
										<td> Correo electronico </td>
										<td> Tipo de usuario </td>
										<td> Fecha de registro</td>
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
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(General))