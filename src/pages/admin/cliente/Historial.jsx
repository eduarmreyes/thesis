import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import {CSVLink, CSVDownload} from 'react-csv';
class Historial extends Component {
		constructor(props){
		super(props)

		this.state = {
			title:'Bitacora',
			page:'bitacora',
			menu:'bitacora',
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
		}

		this.get_data = this.get_data.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_filter = this.get_filter.bind(this)
		this.changuefilter = this.changuefilter.bind(this)
		this.selectstardate = this.selectstardate.bind(this)
   		this.selectenddate = this.selectenddate.bind(this)
   		this.get_historia_filter = this.get_historia_filter.bind(this)
   		this.onChange  = this.onChange.bind(this)
	}
	get_detalle(event){
		this.props.history.push("/detalle-cliente")
	}
	componentDidMount(){
		this.get_data(1,13)
		this.get_csv()
  	}
  	get_csv(){
	  const bearer = 'bearer '+ this.props.userToken; 
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/logs?page='+this.state.pagina+'&per_page='+ 15 +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => {       	
	    const headers = [{
		  id: 'first',
		  display: 'First column'
		}];

		const rows = jsonresponse.data
		const btn = <CSVLink data={rows} filename="Bitacora">Generar Reporte</CSVLink>;

		this.setState({
			download:btn
		})

		this.get_filter()

      })  
      .catch(error => {

      });

	} 
  	get_data(page,per_page){
	  const bearer = 'bearer '+ this.props.userToken;
     
      axios.request('GET', {
        url:this.props.baseurl + '/v1/logs?page='+ page +'&per_page='+ per_page +'',
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

       const type_trans = 'Ninguna'

       content = jsonresponse.data.map((lista, index) => {	
       		if (lista.type_of_user === true) {
       			type_trans === 'Retiro'
       		}
      
	        return (  	
	        <tr key={index} className="no-cursorpointer">
				<td> {lista.auditable_type}</td>
				<td> {lista.action}</td>
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
  	get_historia_filter(e,page,per_page){
  		console.log(e);
  		//e.preventDefault()
  		const bearer = 'bearer '+ this.props.userToken;
 		var startdate = this.state.startdate;
      	var enddate = this.state.enddate;
      	var date1 = startdate.format('YYYY-MM-DD');
     	var date2 = enddate.format('YYYY-MM-DD');
	      axios.request('GET', {
	        url:this.props.baseurl + '/v1/logs?start_date='+ date1 +'&end_date='+ date2 +'&admin_id='+ this.state.admin_id +'&page='+ page +'&per_page='+ per_page +'',
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

	       const type_trans = 'Ninguna'

	       content = jsonresponse.data.map((lista, index) => {	
	       		if (lista.type_of_user === true) {
	       			type_trans === 'Retiro'
	       		}
	      
		        return (  	
		        <tr key={index} className="no-cursorpointer">
					<td> {lista.auditable_type}</td>
					<td> {lista.action}</td>
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
	onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });             
    } 	
	handlePageClick(data){
	   var pagina = data.selected + 1;



    	if (this.state.filter === false) {
			this.get_data(pagina,this.state.per_page)
		}else{
	
			this.get_historia_filter('',pagina,this.state.per_page)
		}
	   this.setState({
	      pagina: pagina
	   })
	}
	get_detalle(event){
		this.props.history.push("/detalle-pendiente")
	}
	get_filter(){
		setTimeout(() => { 
		const shortcuts = {
	      'Today': moment(),
	      'Yesterday': moment().subtract(1, 'days')
	    };
		const content_filter_one = <ul>
			<li>
				<a href="#" onClick={this.changuefilter}>Filtrar</a>
			</li>
			<li>
				{this.state.download}
			</li>
		</ul>;

		const content_filter_two= <ul className="filter_date">
			<li>
				<span>ID: </span>
			</li>
			<li>
				<input type="text" name="admin_id"   onChange={this.onChange} />
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
	                  closeOnSelectDay ={true}
	                  moment={this.state.enddate}
	                  onChange={this.selectenddate}>
	                  <input type="text" value={this.state.enddate.format('YYYY-MM-DD')} readOnly />
	                </DatetimePickerTrigger>
	            </div>
	          </li>
	          <li>
	            <a className="btn-blue blue" href="#" onClick={e => {this.get_historia_filter(e,1,15)}} > Aplicar</a>
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
		}, 100) 
		
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
										<td> Nombre </td>
										<td> Descripcion </td>
										<td> Fecha </td>
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
export default withRouter(connect(mapStateToProps)(Historial))