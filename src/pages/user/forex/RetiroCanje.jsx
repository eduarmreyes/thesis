import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../../../assets/css/pages/general.css'
import '../../../assets/css/pages/popup.css'
import Backend from '../../../components/Layouts/Backend';
import * as NumberFormat from 'react-number-format';
import moment from 'moment';
class RetiroCanje extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'Retiro o Canje',
			page:'canje',
			menu:'forex',
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
			per_page:15,
			id_cuenta:this.props.info_cuenta_pfx['uuid'],
			retiro:false,
			nav:true,
			vale:false,
			efective:false,
			total_points:0,
			amount:500,
			amount_vale:20

		}
		this.get_transaction = this.get_transaction.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.set_pages_response = this.set_pages_response.bind(this)
		this.create_retirement = this.create_retirement.bind(this)
		this.showsucces = this.showsucces.bind(this)
		this.showerror = this.showerror.bind(this)
		this.show_overlay_new_amount_retirement = this.show_overlay_new_amount_retirement.bind(this)
		this.show_overlay_new_amount_retirement_vale = this.show_overlay_new_amount_retirement_vale.bind(this)
		this.show_vale = this.show_vale.bind(this)
		this.onChange = this.onChange.bind(this)

	}
	componentDidMount(){
		console.log(this.props)
		this.get_transaction(this.state.pagina,15)
		var points = this.props.info_cuenta_pfx['balance'].split('$')[1]
		var total_points = points.replace(',','')
		this.setState({
			total_points: parseFloat(total_points)
		})
  	}
  	get_transaction(page,per_page){
  	  const bearer = 'bearer '+ this.props.userToken;
      const uuid =  this.props.info_cuenta['uuid'];
      axios.request('GUET', {
        url:this.props.baseurl + '/v1/account_transactions/trans_retirement?page='+ page +'&per_page='+ per_page +'&uuid='+uuid+'',
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
       if (jsonresponse.data.length > 0) {
       	content = jsonresponse.data.map((lista, index) => {	       			     
	        return (  	
	        <tr key={index} className="no-cursorpointer">	      
	        	<td> {lista.name_user}</td>
				<td> {lista.amount}</td>				
				<td> { lista.trans_date } </td>
			</tr>		         
	        );
	    });
       }else{
       	content =  <tr className="no-cursorpointer">	      
	        	<td colSpan={3}> No se encontraron registros</td>
			</tr>;
       }
       
       this.setState({
       	tabla:content
       })
      })  
      .catch(error => {
      		let content = <tr>
				<td colSpan={5}> No se encontraron registros</td>
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
			this.get_transaction(pagina,this.state.per_page)
	
	   this.setState({
	      pagina: pagina
	   })
	}
	new_retiro(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	retiro:!this.state.retiro
   		})
   		this.setState({
   		 	nav:!this.state.nav
   		})
   		this.setState({
          msj:''
        })
	}
	new_vale(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	vale:!this.state.vale
   		})
   		this.setState({
   		 	nav:!this.state.nav
   		})
   		this.setState({
          msj:''
        })
	}
	show_vale(event, estado) {
   		event.preventDefault()   		
   		this.setState({
   			vale:false,
   		 	nav:true,
   		 	overlay_new_amount_retirement:false,
   		 	retiro:false,
   		 	msj:''
   		})

	}
	create_retirement(e){
        e.preventDefault(); 

        const bearer = 'bearer '+ this.props.userToken; 
        var date = moment();
        var trans_date = date.format('YYYY-MM-DD');
        
        const data =  new FormData(); 
        data.append('uuid', this.props.info_cuenta_pfx['uuid']);   
        data.append('trans_date', trans_date);
        data.append('trans_initial', false);
        data.append('trans_gaining', false);
        data.append('trans_deposit', false);
        data.append('trans_retirement', true);
        data.append('trans_lost', false);
        var total_centavos = 0;
        if (this.state.efective === true ) {
        	 total_centavos = this.state.amount * 100;
        	data.append('amount', total_centavos);
        	data.append('bonus_type', 'effective');
        	
        }else{
        	 total_centavos = this.state.amount_vale * 100;
        	data.append('amount', total_centavos);
        	data.append('bonus_type', this.state.bonus_type);
        }
  
        data.append('status', 'completed');
        axios({
              method: 'POST',
              url:this.props.baseurl + '/v1/user_accounts/'+this.props.info_cuenta_pfx['uuid']+'/transactions',
              data: data,
              headers: { 'Authorization': bearer,'Content-Type': 'application/json'}
        })         
        .then(jsonresponse => { 
           this.showsucces()

           this.setState({
            amount:''
           })
        })  
        .catch(error => {
            this.showerror()
            this.setState({
		        overlay_new_amount_retirement:!this.state.overlay_new_amount_retirement
		    })
            this.setState({
             amount:''
            }) 
        });
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
    show_overlay_new_amount_retirement(){
      this.setState({
          overlay_new_amount_retirement:!this.state.overlay_new_amount_retirement,
          efective:true,
          vale:false
      })

    }
    show_overlay_new_amount_retirement_vale(){
      this.setState({
          overlay_new_amount_retirement:!this.state.overlay_new_amount_retirement,
          efective:false,
          vale:true
      })
    }
    onChange(e){
      this.setState({
          [e.target.name]: e.target.value
      });     
    } 
	render(){
		return(
			<Backend title={this.state.title} page={this.state.page} menu={this.state.menu}>		
				<div className="page-cliente-empty">
					<div className="page-cliente-empty-content">
						<div className="forex-content">
							<div className="forex-header">
								<div className="puntos">
									<span><strong>{this.props.info_cuenta_pfx['balance'].split('$')[1]}</strong> puntos ganados</span>
								</div>
								<div className="forex-description">
									<p>
										Los puntos FOREX pueden ser retirados como una transacción de dinero en efectivo o canjearlos por tarjetas de regalo. Ingrese la cantidad de puntos FOREx a retirar
									</p>
								</div>
								<div className="form-group msj">
                                        {this.state.msj}
                                </div>
								<div  className={`forex-nav ${this.state.nav === true ? "active_block" : "inactive"}`} >
									<button  title={this.state.total_points < 500 ? 'Puntos insuficientes!'  :'Canjear por efectivo!'}  disabled={this.state.total_points < 500 ? true :false} className="btn" type="submit" onClick={event => { this.new_retiro(event, "active") }}>Efectivo </button>
									<button  title={this.state.total_points < 20  ? 'Puntos insuficientes!'  :'Canjear por vale!'}      disabled={this.state.total_points < 20 ? true :false}  className="btn" onClick={event => { this.new_vale(event, "active") }}> Canjear por vales</button>
								</div>
								<div  className={`forex-retiro ${this.state.retiro === true ? "active_block" : "inactive"}`}>{this.state.nombre} 

									  <NumberFormat placeholder="¿Cúantos puntos desea Retirar?" name="amount" id="amount"  className={`form-control ${this.state.amount > this.state.total_points ? "error" : ""}   ${this.state.amount < 500 ? "error" : ""}`} value={this.state.amount} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
                                        const { value} = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        this.setState({amount: value})
                                      }}/>
									<br/>
									<br/>
									<button disabled={this.state.amount > this.state.total_points ? true : false || this.state.amount < 500 ? true : false} className="btn btn-blue"   onClick={this.show_overlay_new_amount_retirement} >Nuevo Retiro </button>
									<a className="btn" onClick={event => { this.new_retiro(event, "active") }}>Cancelar </a>
								</div>
								<div   className={`table-content ${this.state.vale === false ? "active_block" : "inactive"}`}>
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
								<div className={`gift ${this.state.vale === true ? "active_block" : "inactive"}`}>
									<div className="row">
											<div className="col-12">
												 <NumberFormat title={this.state.amount_vale < 20 ? 'Puntos insuficientes!'  :'Canjear Vale!'}    placeholder="Valor de la GIFT Card" name="amount_vale" id="amount_vale"   className={`form-control amount-giftcard  ${this.state.amount_vale < 20 ? "error" : ""} ${this.state.amount_vale > this.state.total_points ? "error" : ""}`} value={this.state.amount_vale} thousandSeparator={true} prefix={'$'} decimalSeparator={'.'} decimalScale={2} onValueChange={(values) => {
	                                        const { value} = values;
	                                        // formattedValue = $2,223
	                                        // value ie, 2223
	                                        console.log(this.state.total_points)
	                                        console.log(value)
	                                        this.setState({amount_vale: value})
	                                      }}/>
										</div>
									</div>
									<div className="row">
									  <div className="col-6">
									  		<div className={`giftcard ${this.state.bonus_type === 'amazon' ? "border-blue" : "border-gray"}`}>
									  			<ul className="card_content">
									  				<li>
									  					<ul className="card_header">
									  						<li>
									  							{/*<img src="" />*/}
									  						</li>
									  						<li>
									  							<ul className="card_option">
									  								<li>
									  									<span>GIFT Card AMAZON</span>
									  								</li>
									  								<li>
									  									<label>Vale de regalo</label>
									  								</li>
									  							</ul>
									  							<div className="pretty p-default p-round p-radio">
															        <input type="radio" name="bonus_type" id="bonus_type" value="amazon"  onChange={this.onChange} title={this.state.total_points < 20  ? 'Puntos insuficientes!'  :'Canjear por vale!'}  disabled={this.state.amount_vale < 20 ? true :false || this.state.amount_vale > this.state.total_points ? true :false} />
															        <div className="state">
															            <label></label>
															        </div>
															    </div>
									  						</li>
									  					</ul>
									  				</li>
									  				<li>
									  					<p>Curabitur quis molestie ligula. Nam imperdiet feugiat lacus, eu aliquet justo blandit lacinia. Suspendisse potenti. In nec interdum velit,
									  					 a venenatis felis. Nunc quis auctor orci, vitae pulvinar dui.</p>
									  				</li>
									  			</ul>
									  		</div>
									  </div> 
									  <div className="col-6">
									  		<div className={`giftcard ${this.state.bonus_type === 'siman' ? "border-blue" : "border-gray"}`}>
									  			<ul className="card_content">
									  				<li>
									  					<ul className="card_header">
									  						<li>
									  							{/*<img src="" />*/}
									  						</li>
									  						<li>
									  							<ul className="card_option">
									  								<li>
									  									<span>GIFT Card SIMAN</span>
									  								</li>
									  								<li>
									  									<label>Vale de regalo</label>
									  								</li>
									  							</ul>
									  							<div className="pretty p-default p-round p-radio">
															        <input type="radio" name="bonus_type" id="bonus_type" value="siman"  onChange={this.onChange} title={this.state.total_points < 20  ? 'Puntos insuficientes!'  :'Canjear por vale!'}  disabled={this.state.amount_vale < 20 ? true :false || this.state.amount_vale > this.state.total_points ? true :false} />
															        <div className="state">
															            <label></label>
															        </div>
															    </div>
									  						</li>
									  					</ul>
									  				</li>
									  				<li>
									  					<p>Curabitur quis molestie ligula. Nam imperdiet feugiat lacus, eu aliquet justo blandit lacinia. Suspendisse potenti. In nec interdum velit,
									  					 a venenatis felis. Nunc quis auctor orci, vitae pulvinar dui.</p>
									  				</li>
									  			</ul>
									  		</div>
									  </div> 
									</div>

									<div className="row">
										<div className="col-12 align-center">
											<button className="btn-blue btn-canjear"  onClick={this.show_overlay_new_amount_retirement_vale} title={this.state.amount_vale < 20  ? 'Puntos insuficientes!'  :'Canjear por vale!'}  disabled={this.state.amount_vale < 20 ? true :false || this.state.amount_vale > this.state.total_points ? true :false}>Canjear</button>
											<a className="btn" onClick={this.show_vale}>Cancelar </a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div  className={`page-cliente-empty-pagination ${this.state.vale === false ? "active_block" : "inactive"}`}>
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

				<div id="add_new_acount_confirm" className={`overlay ${this.state.overlay_new_amount_retirement === true ? "overlay_visible" : ""}`}>
                    <div className="popup">
                        <div className="popup-title">
                            <h4>Confirmación </h4>  
                            
                        </div>
                        <div className="popup-body">
                            <p>
                                ¿Esta seguro que desea aplicar la transacción ?
                            </p>
                            <div className="popup-acountnew">
                                <div className="form-group section-btn">
                                    <a className="close blue btn" href={null} onClick={this.show_vale}>CANCELAR</a> <a className="blue btn" href={null} onClick={e => {this.create_retirement(e)}} > ACEPTAR</a>
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
    type: state.mainReducer.auth.type,
    infouser: state.mainReducer.auth.infouser,
    info_cuenta: state.mainReducer.auth.info_cuenta,
    baseurl:state.mainReducer.setBaseUrl.baseurl,
    info_cuenta_pfx:state.mainReducer.auth.info_cuenta_pfx
  }
}

export default withRouter(connect(mapStateToProps)(RetiroCanje))
