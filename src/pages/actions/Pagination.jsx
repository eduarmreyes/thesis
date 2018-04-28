import React, { Component } from 'react'

class Pagination extends Component{
	constructor(props){
		super(props)

		this.state = {
			pagina:this.props.obj.pagina,
			total_page:this.props.obj.total_page,
			total_count:this.props.obj.total_count,
			next:'',
			back:'',
			list_min:[],
			list_max:[],
			listactualpage:'',
			listmin:'',
			listmax:'',
			pagination:'',
			content:'',
			per_page:this.props.obj.per_page
		}


		this.get_next_and_back = this.get_next_and_back.bind(this)
		this.create_pagination = this.create_pagination.bind(this)
	}
	create_pagination(){

		    var actualpage = this.props.obj.pagina;
		    var rango = 0;
		    if (this.state.pagina >= 5) {
		    	if (this.props.obj.total_page === actualpage ) {
		    		rango = 4;
		    	}else{
		    		rango = 2;
		    	}
		    }else{
		    	rango = 5;		    	
		    }
		    
		    var min_value = actualpage - rango;
		    var max_value = 0;
		    if (this.state.pagina >= 5) {
		    	max_value = actualpage + rango + 1 ;
		    }else{
		    	switch(actualpage){
	    			case 1:
	    				max_value = actualpage + 5;
	    			break;
	    			case 2:
	    				max_value = actualpage + 4;
	    			break;
	    			case 3:
	    				max_value = actualpage + 3;
	    			break;
	    			case 4:
	    				max_value = actualpage + 2;
	    			break;
	    			case 5:
	    				max_value = actualpage + 1;
	    			break;
	    			default:

	    			break;	    		
	    			
	    		}
		    }


		    this.setState({
		    	list_min:[]
		    })
		    this.setState({
		    	list_max:[]
		    })
		    var i = 0;
		    var ini = 0;
		    for ( i = min_value; i < actualpage; i++) {
		    	ini = ini + 1;
		    	if (actualpage >= 5 && ini === 1) {
		    			this.setState({     
		                  list_min: [...this.state.list_min, 1]
		                }) 	
		    			this.setState({     
		                  list_min: [...this.state.list_min, '...']
		                }) 			                
		    		
		    	}else{

		    	}
		    	if (i > 0) {
		    		this.setState({     
	                  list_min: [...this.state.list_min, i]
	                }) 
		    	}else{

		    	}
		    }
		    let afternumb = max_value - 1;  
		    for ( i = actualpage + 1; i < max_value; i++) {
		    	if ( i <= this.state.total_page ) {
	    			this.setState({     
	                  list_max: [...this.state.list_max, i]
	                }) 
		    	}
		    	if ( i === afternumb ) {
		    		if (max_value < this.state.total_page ) {
		    			
		    				this.setState({     
			                  list_max: [...this.state.list_max, '...']
			                })
		    		
			    		 	
		                this.setState({     
		                  list_max: [...this.state.list_max, this.state.total_page]
		                }) 		    			
		    		}
		    	}
		    }
		  
		    let listactualpage ;
			let listmin;
			let listmax;
			let pagination;
			





				if (this.state.total_count > 0 && this.state.pagina > 0 ) {
					listactualpage = <li className="list"><a className="item actualpage"> {actualpage} </a></li>;
				}else{
					listactualpage = "";
				}
			   	

			    listmin = this.state.list_min.map((number) =>
				  <li key={number.toString()} className="list">
				    <a onClick={event => { this.props.onGetpageClick( event, number ) }} className="item "> {number} </a>
				  </li>
				);
				listmax = this.state.list_max.map((number) =>
				  <li key={number.toString()} className="list">
				    <a onClick={event => { this.props.onGetpageClick(event,number ) }} className="item"> {number} </a>
				  </li>
				);
			
			this.setState({
	          listactualpage: listactualpage,
	          listmin:listmin,
	          listmax:listmax
	        })
			pagination = <div className="content-footer">
				<div className="pagination">
					<ul className="back">
						{this.state.back}
					</ul>
					<ul className="list">
						{this.state.listmin}
						{this.state.listactualpage}
						{this.state.listmax}
					</ul>						
					<ul className="next">
						{this.state.next}
					</ul>
				</div>
			</div>; 



	        this.setState({
	          content:pagination
	        })
	}
	get_next_and_back(){
		let next;
	    let back;
	   	let number;
            back = <li className="list"><a onClick={event => { this.props.onBackpageClick(event, number ) }} className="item siguiente"> Anterior   </a></li>;
            next = <li className="list"><a onClick={event => { this.props.onNextpageClick(event, number ) }} className="item siguiente"> Siguiente </a></li>;
		    if (this.state.pagina  === this.state.total_page ) {
	    	    back = <li className="list"><a onClick={event => { this.props.onBackpageClick(event, number ) }} className="item siguiente"> Anterior   </a></li>;
	    	    next = '';
	    	    next = <li className="list"><a className="item anterior"> Siguiente </a></li>;
		    }else{
		    	if (this.state.pagina  < this.state.total_page && this.state.pagina > 1) {

		    		back = <li className="list"><a onClick={event => { this.props.onBackpageClick(event, number ) }} className="item siguiente"> Anterior   </a></li>;
		    		next = <li className="list"><a onClick={event => { this.props.onNextpageClick(event, number ) }} className="item siguiente"> Siguiente </a></li>;
		    	}
		    	if (this.state.pagina  < this.state.total_page && this.state.pagina  === 1) {
		    		back = '';
		    		back = <li className="list"><a className="item anterior"> Anterior   </a></li>;
		    		next = <li className="list"><a onClick={event => { this.props.onNextpageClick(event, number ) }} className="item siguiente"> Siguiente </a></li>;
		    	}
		    }

		    if (this.state.pagina === 1 ) {
		    	back="";
		    }
		   
		    if (this.state.total_page < 1 || this.state.total_page === 1) {
		    	next="";
		    }


	    this.setState({
          next: next,
          back:back
        })	
	}
	componentDidMount(){

		setTimeout(() => {  
			console.log(this.props)
			this.get_next_and_back();
			this.create_pagination();	      	
	     }, 100) 		
	}
	render(){
		return(
			<div className="page-cliente-empty-pagination">
				{this.state.content}
			</div>
		)
	}
}

export default Pagination