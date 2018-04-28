import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import ReactPaginate from 'react-paginate';
class Detalleusuarios extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Usuarios',
			page:'general',
			menu:'detalleusuarios',
			pagina:1,
			total_page:1,
			total_count:0,
			id_useracount:props.match.params.id_user,
			uuid:props.match.params.uuid
		}
		this.get_transaction = this.get_transaction.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_infoacount  = this.get_infoacount.bind(this)
	}
	componentDidMount()
	{
		this.get_transaction(1,15)
		this.get_infoacount()
	}
	get_infoacount(){
  		const bearer = 'bearer '+ this.props.userToken;
	    axios.request('GUET', {
	      url:this.props.baseurl + '/v1/accounts/'+this.state.uuid+'',
	      headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	    })
	    .then(jsonresponse => { 

	    	const json = jsonresponse.data;
	    	console.log(json)
	        this.setState({
	      	able_to_withdraw:json.able_to_withdraw,
	      	account_performance:json.account_performance,
	      	balance:json.balance,
	      	total_debits:json.total_debits,
	      	total_earnings:json.total_earnings,
	      	uuid:json.uuid,
	      	current_performance:json.current_performance,
	      	initial_amount:json.initial_amount,
	      	user_id:json.user_id,
	      	code:json.code,
	      	username:json.username


	      })

	    })
	    .catch(error => {


	    });  


	    
  	}
 	get_transaction(page,per_page){
	  const bearer = 'bearer '+ this.props.userToken;
 
      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/accounts/'+this.state.uuid+'/transactions?page='+page+'&per_page='+per_page+'',
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
       if (jsonresponse.data.length === 0) {
       		content = <tr>
				<td colSpan={5}> No se encontraron registros</td>					
			</tr>
       		this.setState({
	       	tabla:content
	       })
       }else{
       	content = jsonresponse.data.map((lista, index) => {	
    	     
	        return (  	
	        <tr key={index} >
				<td> {lista.name_user}</td>
				<td> {lista.amount}</td>
				<td>{ lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>
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
	   console.log(pagina)
	   this.get_transaction(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>	
						
				<div className="page-cliente-empty none-margin">
					<div className="page-cliente-empty-paginate-toolbar">
				
					</div>
					<div className="page-info height-card ">
						<div className="card-user">
							<h2 className="purple">{this.state.username}</h2>
							<span> {this.state.code} </span>
							<label>Persona Juridica</label>
						</div>
					
							
						<div className="card-detail-col">
							<strong className="purple">{this.state.balance}</strong>
							<br/>
							<span>Saldo actual</span>
						</div>
						<div className="card-detail-col">
							<strong className="whiteblue">{this.state.total_earnings}</strong>
							<br/>
							<span>Total de ganancia</span>
						</div>
						<div className="card-detail-col">
							<strong className="whiteblue">{this.state.able_to_withdraw}</strong>
							<br/>
							<span>Total permitido a retirar</span>
						</div>
											
						
					</div> 

					<div className="page-cliente-empty-paginate-toolbar margin50">
					<div>
						<table>
							<thead>
								<tr>
									<td className="width10"><span>Historial</span></td>
									<td className="width90"><hr/></td>
								</tr>
							</thead>
						</table>
					</div>
					<ul className="left">
						<li>
							<a> &#60; </a>
						</li>
						<li>
							<a>{this.state.pagina}  </a>
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
				
					</div>
					<div className="page-cliente-empty-content margin50">
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> Usuario  </td>
										<td> Monto  </td>
										<td> Transacción</td>
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
					<ReactPaginate previousLabel={"previous"}
		                       nextLabel={"next"}
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

export default withRouter(connect(mapStateToProps)(Detalleusuarios))