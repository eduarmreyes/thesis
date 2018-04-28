import React,{ Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import ReactPaginate from 'react-paginate';
import {CSVLink, CSVDownload} from 'react-csv';
class General extends Component {
	constructor(props){
		super(props)

		this.state = {
			title:'General',
			page:'general',
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
			per_page:'',
			filter:false,
			code:'',
			firstname:'',
			lastname:''

		}

		this.get_general = this.get_general.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_filter = this.get_filter.bind(this)
		this.changuefilter = this.changuefilter.bind(this)
		this.get_csv =  this.get_csv.bind(this)
		this.onChange  = this.onChange.bind(this)
		
	}
	
	get_detalle(e,user_id,uuid){
		this.props.history.push("detalle-cliente/"+user_id+'/'+uuid)
		//this.props.history.push("perfiladmin/"+uuid+'/'+user_id)
	}
	onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });      
    } 
	componentDidMount(){
		this.get_general(1,15)
		this.get_csv()
  	}
  	get_general(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/accounts?page='+ page +'&per_page='+ per_page +'',
	        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	      })
	      .then(jsonresponse => { 

	      	console.log(jsonresponse)
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

	       const type_trans = 'Ninguna'

	       content = jsonresponse.data.map((lista, index) => {	
	       		if (lista.trans_retirement === true) {
	       			type_trans === 'Retiro'
	       		}	     
		        return (  	
		        <tr className="" key={index} onClick={e => {this.get_detalle(e,lista.user_id,lista.uuid)}}>
					<td> { (lista.code === null) ? 'N/A' : lista.code }</td>
					<td> { (lista.username === null || lista.username === "" || lista.username === " ") ? 'N/A' : lista.username }</td>
					<td> {lista.balance}</td>
					<td> {lista.created_at}</td>					
				</tr>		         
		        );
		    });
	      	

	      	const obj = {
	            total_count: this.state.total_count,
	          	pagina:this.state.pagina,
	          	per_page:this.state.per_page,
	          	total_page:	 this.state.total_page           
	        }

	       /* setTimeout(() => {  
	        	const pagination = <Pagination onGetpageClick={this.getpage} onNextpageClick={this.nextpage} onBackpageClick={this.backpage} obj={obj}/>;
		      	this.setState({
		      		pagination:pagination
		      	})
		      }, 100) */

	       this.setState({
	       	tabla:content
	       })
	      
	      })  
	      .catch(error => {

	      });
  	}
  	get_cuenta_filter(e,page,per_page){
  		//e.preventDefault()
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/filters/accounts?code='+this.state.code+'firstname='+this.state.firstname+'lastname='+this.state.lastname+'&page='+ page +'&per_page='+ per_page +'',
	        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	      })
	      .then(jsonresponse => { 

	      	console.log(jsonresponse)
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

	       const type_trans = 'Ninguna'

	       content = jsonresponse.data.map((lista, index) => {	
	       		if (lista.trans_retirement === true) {
	       			type_trans === 'Retiro'
	       		}	     
		        return (  	
		        <tr className="no-cursorpointer" key={index} onClick={e => {this.get_detalle(e,lista.user_id,lista.uuid)}}>
					<td> {lista.code}</td>
					<td> {lista.username}</td>
					<td> {lista.balance}</td>
					<td> {lista.created_at}</td>					
				</tr>		         
		        );
		    });
	      	const obj = {
	            total_count: this.state.total_count,
	          	pagina:this.state.pagina,
	          	per_page:this.state.per_page,
	          	total_page:	 this.state.total_page           
	        }

	       /* setTimeout(() => {  
	        	const pagination = <Pagination onGetpageClick={this.getpage} onNextpageClick={this.nextpage} onBackpageClick={this.backpage} obj={obj}/>;
		      	this.setState({
		      		pagination:pagination
		      	})
		      }, 100) */

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



	    if (this.state.filter === false) {
			this.get_general(pagina,this.state.per_page)
		}else{
	
			this.get_cuenta_filter('',pagina,this.state.per_page)
		}
	   
	   this.setState({
	      pagina: pagina
	   })
	}
	get_filter(){
		
		const content_filter_one = <ul>
			<li>
				<a href="#" onClick={this.changuefilter}>Filtrar</a>
			</li>
			<li>
			
				{this.state.download}
			</li>
		</ul>;

		const content_filter_two= <ul className="filter_cuenta">
			<li>
				<input type="text" placeholder="Code" name="code" onChange={this.onChange}/>
			</li>
			<li>
				<input type="text" placeholder="Nombre" name="firstname" onChange={this.onChange}/>
			</li>
			<li>
				<input type="text" placeholder="Apellido" name="lastname" onChange={this.onChange}/>
			</li>
			<li>
			</li>
			<li>
	            <a className="btn-blue blue" href="#" onClick={e => {this.get_cuenta_filter(e,1,15)}} > Aplicar</a>
	          </li> 
			<li>
				<a href="#"  onClick={this.changuefilter}>Salir</a>
			</li>
		</ul>;
		if(this.state.filter === true){
			this.setState({
				contentfilter:content_filter_two
			})
		}else{
			this.setState({
				contentfilter:content_filter_one
			})
		}
	}
	changuefilter(){

		let filter = this.state.filter;
		setTimeout(() => { 
		if(filter === false){
			this.setState({
				filter:true
			})
		}else{
			this.setState({
				filter:false
			})
		}

		this.get_filter()
		}, 100) 	
	}
	get_csv(){

	
			const bearer = 'bearer '+ this.props.userToken;
	     
		      axios.request('GUET', {
		        url:this.props.baseurl + '/v1/accounts?page='+this.state.pagina+'&per_page='+ 15 +'',
		        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
		      })
		      .then(jsonresponse => { 
		      	
			    const headers = [{
				  id: 'first',
				  display: 'First column'
				}];

				const rows = jsonresponse.data
		
				
				const btn = <CSVLink data={rows} filename="Cuentas">Generar Reporte</CSVLink>;
				console.log(btn)
				this.setState({
					download:btn
				})

				this.get_filter()

		      })  
		      .catch(error => {

		      });
	} 
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						{this.state.contentfilter}
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
									<tr className="no-cursorpointer" onClick={this.get_detalle.bind(this)}>
										<td> Cuenta </td>
										<td> Nombre </td>
										<td> Balance </td>
										<td> Fecha de creación </td>
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