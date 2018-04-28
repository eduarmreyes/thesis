import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import {CSVLink} from 'react-csv';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
class Retiros extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Retiros',
			page:'retiros',
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
			filter:false,
			startdate: moment(),
            enddate: moment(),
            status:'trans_initial'
		}
		this.get_retiros = this.get_retiros.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_filter = this.get_filter.bind(this)
		this.changuefilter = this.changuefilter.bind(this)
		this.selectstardate = this.selectstardate.bind(this)
   		this.selectenddate = this.selectenddate.bind(this)
   		this.get_retiros_filter = this.get_retiros_filter.bind(this)
   		this.onChange  = this.onChange.bind(this)
	}
	componentDidMount(){
		this.get_retiros(1,13)
		this.get_csv()
  	}
  	onChange(e){

        this.setState({
            [e.target.name]: e.target.value
        });
             
    }
  	get_retiros(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/transactions/trans_retirement?page='+ page +'&per_page='+ per_page +'',
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
	        console.log(this.state.total_page)

	       this.set_pages_response(this.state.total_count)
	       this.setState({
		        data: jsonresponse.data
		    }); 



	       content = jsonresponse.data.map((lista, index) => {	
	       	

		        return (  	
		        <tr key={index} className="no-cursorpointer">
		        	<td>{lista.code} </td>
					<td> {lista.name_user}</td>
					<td> {lista.amount}</td>
					<td> { lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>
					<td> { lista.trans_date } </td>
					<td> { lista.status === null ? "Pendiente" : lista.status}</td>
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
	get_retiros_filter(e,page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
 		var startdate = this.state.startdate;
      	var enddate = this.state.enddate;
      	var date1 = startdate.format('YYYY-MM-DD');
     	var date2 = enddate.format('YYYY-MM-DD');
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/transactions/trans_retirement?start_date='+ date1 +'&end_date='+ date2 +'&page='+ page +'&per_page='+ per_page +'',
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

	       
	       console.log(jsonresponse)
	       content = jsonresponse.data.map((lista, index) => {	

	 		     
		        return (  	
		        <tr key={index} className="no-cursorpointer">
		        
		       		<td> {lista.name_user}</td>	
					<td> {lista.amount}</td>					
					<td> { lista.trans_date } </td>
					<td> { lista.trans_gaining === true ? "Ganada" : ""}{ lista.trans_deposit === true ? "Deposito" : ""}{ lista.trans_initial === true ? "Inicial" : ""} { lista.trans_lost === true ? "Perdida" : ""} { lista.trans_retirement === true ? "Retiro" : ""}</td>
					<td> <a href={lista.voucher}><i className="md-icon">attach_file</i>  </a></td>
					<td> { lista.status === null ? "Pendiente" : lista.status}</td>
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
 	get_csv(){
	  const bearer = 'bearer '+ this.props.userToken;
 
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/transactions/trans_retirement?page='+ this.state.pagina +'&per_page='+ 15 +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 

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
			this.get_retiros(pagina,this.state.per_page)
		}else{
	
			this.get_retiros_filter('',pagina,this.state.per_page)
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
		const content_filter_one = <ul>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li>
				<a href={null} onClick={this.changuefilter}>Filtrar</a>
			</li>
			<li>
				{this.state.download}
			</li>
		</ul>;

		const content_filter_two= <ul className="filter_date">
			<li>
			
			</li>
			<li>
			
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
	            <a className="btn-blue blue" href={null} onClick={e => {this.get_retiros_filter(e,1,15)}} > Aplicar</a>
	          </li>              
			<li>
				<a href={null}  onClick={this.changuefilter}>Salir</a>
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
										<td> Cuenta Asociada </td>
										<td> Cliente </td>
										<td> Monto </td>
										<td> Tipo de transacción </td>
										<td> Fecha de aprobación </td>
										<td> Estatus </td>
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

export default withRouter(connect(mapStateToProps)(Retiros))