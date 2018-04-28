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
import actions from "../../../actions"
class General extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'General',
			page:'general',
			menu:'tareas',
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
            task:false,
            overlay_task_confirm:false
		}
		this.get_tareas = this.get_tareas.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.get_filter = this.get_filter.bind(this)
		this.changuefilter = this.changuefilter.bind(this)
		this.selectstardate = this.selectstardate.bind(this)
   		this.selectenddate = this.selectenddate.bind(this)
   		this.get_task_filter = this.get_task_filter.bind(this)
   		this.onChange  = this.onChange.bind(this)
   		this.show_overlay_task = this.show_overlay_task.bind(this)
   		this.list_admin = this.list_admin.bind(this)
   		this.selected_task = this.selected_task.bind(this)
   		this.close_overlay_task_confirm = this.close_overlay_task_confirm.bind(this)
   		this.asigned_task = this.asigned_task.bind(this)
	}
	componentDidMount(){
		this.get_tareas(1,13)
		this.get_csv()
		this.list_admin()
  	}
  	get_csv(){
	 const bearer = 'bearer '+ this.props.userToken;
 
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/tasks?page='+this.state.pagina+'&per_page='+ 15 +'',
        headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
      })
      .then(jsonresponse => { 
      	
	    const headers = [{
		  id: 'first',
		  display: 'First column'
		}];

		const rows = jsonresponse.data

		
		const btn = <CSVLink data={rows} filename="Tareas">Generar Reporte</CSVLink>;

		this.setState({
			download:btn
		})

		this.get_filter()

      })  
      .catch(error => {

      });
	} 
  	get_task_filter(e,page,per_page){
  		//e.preventDefault()
  		const bearer = 'bearer '+ this.props.userToken;
     	var startdate = this.state.startdate;
      	var enddate = this.state.enddate;
      	var date1 = startdate.format('YYYY-MM-DD');
     	var date2 = enddate.format('YYYY-MM-DD');
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/filters/tasks?start_date='+ date1 +'&end_date='+ date2 +'&admin='+ this.state.admin +'&page='+ page +'&per_page='+ per_page +'',
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
	       	     
		        return (  	 
				   <tr key={index} className="no-cursorpointer">
                      <td className="min-width">
                        <div className="status upcoming"><i className="md-icon">check</i></div>
                        <div className="title-wrapper">
                          <div className="title">{lista.account_code}</div>
                          <div className="subtitle">{lista.title}</div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar" ></div>
                        <div className="title-wrapper">
                          <div className="title">{lista.user_name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="key-value"><span>Emitido</span><strong>{lista.created_at}</strong></div>
                      </td>
                      <td>
                        <div className="key-value"><span>Fecha limite</span><strong>Sept. 28, 2017</strong></div>
                      </td>
                      <td className="actions min-width">
                        <div className="button-group"><a className="button" href="#" onClick={e => {this.selected_task(e,lista.id)}}>Edit</a></div>
                      </td>
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
  	get_tareas(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/tasks?page='+ page +'&per_page='+ per_page +'',
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
	      		     
		        return (  	 
				   <tr key={index} className="no-cursorpointer">
                      {/*<td className="min-width">
                        <div className="status upcoming"><i className="md-icon">check</i></div>
                        <div className="title-wrapper">
                          <div className="title">{lista.account_code}</div>
                          <div className="subtitle">{lista.title}</div>
                        </div>
                      </td>*/}
                      <td>
                        <div className="avatar" ></div>
                        <div className="title-wrapper">
                          <div className="title">{lista.user_name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="key-value"><span>Emitido</span><strong>{lista.created_at}</strong></div>
                      </td>
                      <td>
                        <div className="key-value"><span>Fecha limite</span><strong>Sept. 28, 2017</strong></div>
                      </td>
                      <td className="actions min-width">
                        <div className="button-group"><a className="button" href="#" onClick={e => {this.selected_task(e,lista.id)}} >Edit</a>{/*<a className="danger button"  href="#">Delete</a>*/}</div>
                      </td>
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

        /*if (e.target.name === 'admin') {
          this.select_admin(e.target.value)
        }*/
    } 	
	handlePageClick(data){
	   var pagina = data.selected + 1;




	   	if (this.state.filter === false) {
			this.get_tareas(pagina,this.state.per_page)
		}else{
	
			this.get_task_filter('',pagina,this.state.per_page)
		}
	   
	   this.setState({
	      pagina: pagina
	   })
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
				<span>Correo: </span>
			</li>
			<li>
				<input type="text" name="admin"   onChange={this.onChange} />
			</li>		
	          <li>
	              <label>Desde:</label>
	          </li>
	          <li>
	            <div className="form-group">
	                <DatetimePickerTrigger
	                  shortcuts={shortcuts} 
	                  moment={this.state.startdate}
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
	                  onChange={this.selectenddate}>
	                  <input type="text" value={this.state.enddate.format('YYYY-MM-DD')} readOnly />
	                </DatetimePickerTrigger>
	            </div>
	          </li>
	          <li>
	            <a className="btn-blue blue" href="#" onClick={e => {this.get_task_filter(e,1,15)}} > Aplicar</a>
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
	
    select_admin(id){
        /*const bearer = 'bearer '+ this.props.userToken;
        axios.request('get', {
          url:this.props.baseurl + '/v1/user_accounts/'+id+'',
          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
        })
        .then(jsonresponse => { 
          const data = jsonresponse.data

          const obj = {
              authorize:this.props.authorize,
              token: this.props.userToken,
              scope:this.props.scope,
              email:this.props.email,
              id:this.props.id,
              register:this.props.register,
              type:this.props.type,
              infouser:this.props.infouser,
              info_cuenta:data            
            }
            this.props.dispatch(actions.setAuth(obj))
            this.props.history.push("/loading")

        })  
        .catch(error => {

        });*/
    }
    selected_task(e,id){
		e.preventDefault(); 
	    const bearer = 'bearer '+ this.props.userToken;
	      setTimeout(() => { 
	        axios.request('get', {
	          url:this.props.baseurl + '/v1/tasks/'+id,
	          headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
	        })
	        .then(jsonresponse => { 
	          const data = jsonresponse.data
	          this.setState({
	          	assigned_to:data.assigned_to,
	          	task_active:data.id,
	          	done:data.done,
	          	task_title:data.title
	          })
	       
	       	  this.list_admin()
			  this.show_overlay_task()
	        })  
	        .catch(error => {
	        }); 
	      },20)
    }
    list_admin(){
        if (this.props.scope === 'admin') {
        const bearer = 'bearer '+ this.props.userToken;
          setTimeout(() => { 
            axios.request('get', {
              url:this.props.baseurl + '/v1/admins',
              headers: { 'Authorization': bearer,'Content-Type': 'application/json' }
            })
            .then(jsonresponse => { 
              const data = jsonresponse.data
              let content;
              content = jsonresponse.data.map((lista, index) => {        
                return (    
                  <option key={index} value={lista.id} selected={this.state.assigned_to == lista.email} >{lista.email}</option> 
                );
            });

              this.setState({
                list_admin:content
              })

              this.set_barrheader();
            })  
            .catch(error => {
            }); 
          },20)
        }
    } 

    asigned_task(e){
      e.preventDefault(); 

      this.setState({
        overlay_task_confirm:false
      }) 

      var date = moment();
      var trans_date = date.format('YYYY-MM-DD');

      const bearer = 'bearer '+ this.props.userToken;   
      const data =  new FormData();  
      data.append('id', this.state.task_active);    
      data.append('done', this.state.done);
      data.append('admin_id', this.state.admin);
      data.append('due_date', trans_date);    
      data.append('description', this.state.description);


        axios({
          method: 'PUT',
          url:'https://rupert-x.herokuapp.com/dashboard/v1/tasks/'+this.state.task_active,
          data: data,
          headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })
     
      .then(jsonresponse => { 
       this.showsucces()
      })  
      .catch(error => {
        this.showerror(error)   
       
        this.setState({
         task:true
        })  
      });
    }    

    show_overlay_task(){

    	this.setState({
    		task:!this.state.task
    	})
    }

    close_overlay_task_confirm(){
    	this.setState({
    		task:!this.state.task
    	})

    	this.setState({
    		overlay_task_confirm:!this.state.overlay_task_confirm
    	})    	
    }
 	showsucces(){
        let message = 'Los datos se guardaron correctamente!!';        
        this.setState({
          msj:message
        })
    }
    showerror(error){
        let message = '* Error al enviar los datos';        
        this.setState({
          msj:message
        })      
    }
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-header">
						{this.state.contentfilter}
					</div>
					
					<div className="table-responsive">
		                <table>
		                  <tbody>
		                  
		                    <tr className="heading" className="no-cursorpointer">
		                      <td colSpan={5}></td>
		                    </tr>
		              
		                    {this.state.tabla}
		                  
		                  </tbody>
		                </table>
		            </div>
		            <br/>
		            <br/>
		            <br/>
		            <br/>
		            <br/>
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
				<div id="Tareas" className={`overlay ${this.state.task === true ? "overlay_visible" : ""}`} >
                        <div className="popup popup-task">
                            <div className="popup-title">
                                 <a className="close" href="#" onClick={this.show_overlay_task}>x</a>
                                <ul>
                                    <li>
                                        <select className="btn-encargado" name="admin" id="admin" onChange={this.onChange}>
                                        <option value="">Seleccione</option>
                                          {this.state.list_admin}
                                        </select>
                                    </li>
                                    <li>
                                        {/*<span className="add-encargado">
                                            +
                                        </span>*/}

                                       <span>Asignada a: {this.state.assigned_to === 'not_assigned' ? "No Asignada" : this.state.assigned_to}</span>
                                    </li>
                                    <li>
                                       {/* <a href="#" id="more">
                                          <b></b>
                                          <b></b>
                                          <b><span>+</span></b>
                                        </a>*/}
                                    </li>
                                </ul>
                            </div>  
                            <div className="popup-body">
                                <div >
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group">
                                       <strong>{this.state.task_title}</strong>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                  
                                    <div className="form-group">
                                        <textarea  placeholder="Descripción." rows="5"  cols="50" name="description" id="description" value={this.state.description || ''} onChange={this.onChange}></textarea>
                                    </div>
                               		<div className="form-group msj">
                                        {this.state.msj}
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                    <div className="form-group section-btn">
                                        <a className=" btn-save-encargado" href="#" onClick={this.close_overlay_task_confirm}> ASIGNAR</a>
                                    </div>
                                    <div className="form-group">
                                        <br/>
                                    </div>
                                </div>
                            </div>                                      
                        </div>
                    </div>
                    <div id="changuepass" className={`overlay ${this.state.overlay_task_confirm === true ? "overlay_visible" : ""}`}>
                        <div className="popup">
                            <div className="popup-title">
                                <h4>Confirmación </h4>  
                                
                            </div>
                            <div className="popup-body">
                                    <p>
                                        ¿Esta seguro que desea aplicar la transacción ?
                                    </p>
                                    <div className="popup-retiro">
                                        <div className="form-group section-btn">
                                            <a className="close blue btn" href="#" onClick={this.close_overlay_task_confirm}>CANCELAR</a> <a className="blue btn" href="#" onClick={e => {this.asigned_task(e)}} > ACEPTAR</a>
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
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl
  }
}

export default withRouter(connect(mapStateToProps)(General))
