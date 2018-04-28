import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import '../../../assets/css/pages/popup.css'
import Backend from '../../../components/Layouts/Backend';
import moment from 'moment';
import Moment from 'moment';
import ReactPaginate from 'react-paginate';
import {CSVLink, CSVDownload} from 'react-csv';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
class Depositos extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Depositos',
			page:'depositos',
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
			filter:false,
			startdate: moment(),
            enddate: moment(),
            status:'trans_initial'
		}
		this.get_depositos = this.get_depositos.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_filter = this.get_filter.bind(this)
		this.changuefilter = this.changuefilter.bind(this)
		this.selectstardate = this.selectstardate.bind(this)
   		this.selectenddate = this.selectenddate.bind(this)
   		this.get_depositos_filter = this.get_depositos_filter.bind(this)
   		this.onChange  = this.onChange.bind(this)

	}
	componentDidMount(){
		this.get_depositos(1,15)
		this.get_csv()
  	}
	onChange(e){

        this.setState({
            [e.target.name]: e.target.value
        });     
    }
  	get_depositos(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     	const uuid =  this.props.info_cuenta['uuid']
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/account_transactions/trans_deposit?page='+ page +'&per_page='+ per_page +'&uuid='+uuid+'',
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
					<td> <a href={lista.voucher}><i className="md-icon">attach_file</i>  </a></td>
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
  	get_depositos_filter(){

  	}
  	set_pages_response(total_count){
		const paginas = (total_count / this.state.per_page)			
		var pages = Math.ceil(paginas)
	
		this.setState({
          total_page: pages
        })	
	}
 	get_csv(){
	  const bearer = 'bearer '+ this.props.userToken;
 
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/user_accounts/'+this.state.id_cuenta+'/transactions?page='+ this.state.pagina +'&per_page='+ 15 +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
      	
	    const headers = [{
		  id: 'first',
		  display: 'First column'
		}];

		const rows = jsonresponse.data

		
		const btn = <CSVLink data={rows} filename="Transacciones">Generar Reporte</CSVLink>;
		console.log(btn)
		this.setState({
			download:btn
		})

		this.get_filter()

      })  
      .catch(error => {
      	this.get_filter()
      });
	} 
	handlePageClick(data){
	   var pagina = data.selected + 1;

	   if (this.state.filter === false) {
			this.get_depositos(pagina,this.state.per_page)
		}else{
	
			this.get_depositos_filter('',pagina,this.state.per_page)
		}
	   this.setState({
	      pagina: pagina
	   })
	}
	get_filter(){
		const shortcuts = {
	      'Today': moment(),
	      'Yesterday': moment().subtract(1, 'days')
	    };
		const content_filter_one = '';

		const content_filter_two= <ul className="filter_date">
			<li>
				<span>Estatus: </span>
			</li>
			<li>
				<select name="status" onChange={this.onChange} value={this.state.status}>
					<option value="trans_initial"> Transaccion Inicial    </option>
					<option value="trans_gaining"> Transaccion Ganada     </option>
					<option value="trans_deposit"> Transaccion de deposito</option>
					<option value="trans_retirement">Transaccion de retiro</option>
				</select>
			</li>		
	          <li>
	              <label>Desde:</label>
	          </li>
	          <li>
	            <div className="form-group">
	                <DatetimePickerTrigger
	                  shortcuts={shortcuts} 
	                  moment={this.state.startdate}
	                  closeOnSelectDay ={true}
	                  onChange={this.selectstardate}>
	                  <input type="text" value={this.state.startdate.format('YYYY-MM-DD')} readOnly />
	                </DatetimePickerTrigger>
	            </div>
	          </li>
	          <li>
	              <label>Hasta:</label>
	          </li>
	          <li>
	            <div className="form-group">
	                <DatetimePickerTrigger
	                  shortcuts={shortcuts} 
	                  moment={this.state.enddate}
	                  closeOnSelectDay ={true}
	                  onChange={this.selectenddate}>
	                  <input type="text" value={this.state.enddate.format('YYYY-MM-DD')} readOnly />
	                </DatetimePickerTrigger>
	            </div>
	          </li>
	          <li>
	            
	          </li>              
			<li>
				<a className="btn-blue blue" href="#" onClick={e => {this.get_depositos_filter(e,1,15)}} > Aplicar</a>
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
 	selectstardate(startdate){
  		setTimeout(() => { 
		    this.setState({
		      startdate
		    });

		    this.get_filter()
	    }, 100) 
  	}
    selectenddate(enddate){
	  	setTimeout(() => { 
	    this.setState({
	      enddate
	    });
	    this.get_filter()
	    }, 100) 
    }
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>
						
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						
						{this.state.contentfilter}
					</div>

					<div className="page-cliente-empty-paginate-toolbar">
						<ul className="left filter-list">
							<li>
								<a className="blue-btn" href="#Deposito"> Aumento a Capital</a>
							</li>
							<li>
								<a href="#" onClick={this.changuefilter}> <i className="md-icon">find_in_page</i> <span>Filtrar</span> </a>
							</li> 

							<li>
								<div>
									<i className="md-icon">content_copy</i> 
									{this.state.download}
								</div>
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
								<a><span> {this.state.total_count} registros</span></a>
							</li>
							
						</ul>
						<ul className="right">
							<li>
								<a><span> &#60; </span></a>
							</li>
							<li>
								<a><span> {this.state.pagina} </span></a>
							</li>
							<li>
								<a><span> - </span></a>
							</li>
							<li>
								<a> <span>{this.state.total_page} pag </span></a>
							</li>
							<li>
								<a>
									<span>&#62;</span>
								</a>
							</li>
						</ul>
					</div>

					<div className="page-cliente-empty-content">
						<div className="table-content">
							<table>
								<thead>
									<tr>
										<td> Nombre </td>
										<td> Monto </td>
										<td> Fecha de aprobación </td>
										<td> Comprobante </td>
										
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
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
    
  }
}

export default withRouter(connect(mapStateToProps)(Depositos))
