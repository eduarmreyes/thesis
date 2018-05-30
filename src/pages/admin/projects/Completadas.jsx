import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../../../assets/css/pages/general.css'
import Backend from '../../../components/Layouts/Backend';
class Completadas extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Completadas',
			page:'completadas',
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
			per_page:''
		}
		this.get_tareas = this.get_tareas.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
	}
	componentDidMount(){
		this.get_tareas(1,13)
  	}
  	get_tareas(page,per_page){
  		const bearer = 'bearer '+ this.props.userToken;
     
	      axios.request('GUET', {
	        url:this.props.baseurl + '/v1/tasks/completed?page='+ page +'&per_page='+ per_page +'',
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
		                      <td className="min-width">
		                        <div className="status completed"><i className="md-icon">check</i></div>
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
		                        <div className="button-group"><a className="button" href={null}>Edit</a><a className="danger button"
		                                                                                            href={null}>Delete</a></div>
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
	handlePageClick(data){
  	 console.log(data.selected)
	   var pagina = data.selected + 1;

	   this.get_tareas(pagina,this.state.per_page)
	   this.setState({
	      pagina: pagina
	   })
	}	
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>			
				<div className="page-cliente-empty">
					{/*<div className="page-cliente-empty-header">
						<ul>
							<li>
								
							</li>
							<li>
								<a>Filtrar</a>
							</li>
						</ul>
					</div>*/}

				
					<div className="table-responsive">
		                <table>
		                  <tbody>		                 
		                    <tr  className="heading no-cursorpointer">
		                      <td colSpan={5}></td>
		                    </tr>
		                     {this.state.tabla}
		               
		                  </tbody>
		                </table>
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

export default withRouter(connect(mapStateToProps)(Completadas))
