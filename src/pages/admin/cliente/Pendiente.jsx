import React,{ Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import ReactPaginate from 'react-paginate';
class Pendiente extends Component {
		constructor(props){
		super(props)

		this.state = {
			title:'Pendiente',
			page:'pendiente',
			menu:'cliente',
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
			per_page:''
		}

		this.get_data = this.get_data.bind(this)
		this.handlePageClick  = this.handlePageClick.bind(this)
	}
	get_detalles(e,id){
		this.props.history.push("/detalle-pendiente/"+id)
	}
	componentDidMount(){
		this.get_data(1,13)
  	}
  	get_data(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GET', {
	        url:this.props.baseurl + '/v1/users/pending?page='+ page +'&per_page='+ per_page +'',
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
		        <tr key={index}  onClick={e => {this.get_detalles(e,lista.id)}}>
					<td> { (lista.name === null || lista.name === "" || lista.name === " ") ? 'N/A' : lista.name }</td>
					<td> {lista.email}</td>
					<td> { (lista.type_of_user === 0) ? 'Natural' : 'Jurídica' } </td>
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
	   var pagina = data.selected + 1;

	   this.get_data(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}
	get_detalle(event){
		this.props.history.push("/detalle-pendiente")
	}

	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">

			

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
									<tr onClick={this.get_detalle.bind(this)} className="no-cursorpointer">
										<td> Nombre </td>
										<td> Correo Electronico </td>
										<td> Persona </td>
									</tr>
								</thead>
								<tbody>
									{this.state.tabla}
								</tbody>
							</table>
						</div>
					</div>
					<div className="page-cliente-empty-pagination">
						<ReactPaginate previousLabel={"anteriror"}
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
export default withRouter(connect(mapStateToProps)(Pendiente))
