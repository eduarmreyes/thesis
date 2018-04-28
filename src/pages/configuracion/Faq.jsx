import React, { Component } from 'react'
import '../../assets/css/pages/general.css'
import { NavLink } from 'react-router-dom';
class Faq extends Component{
	constructor(props){
		super(props)

		this.state = {
			title:'FAQs',
			page:'FAQs',
			menu:'faq',
			show_content:false,
			labeltarjeta:'Editar'
		}
	}
	show_panel(event, estado) {
   		event.preventDefault()
   		this.setState({
   		 	show_content:!this.state.show_content
   		})
   		if (this.state.show_content === false) {
   			this.setState({
   				labeltarjeta:'Ocultar'
   			})
   		}else{
   			this.setState({
   				labeltarjeta:'Editar'
   			})
   		}   		
	}
	render(){
		return(
		<div>
			<div className="header-faq">
				<img src="/img/logotext.png" alt="" /> 

				<ul>
					<li>
					<NavLink to="/dashboard">
	                    IR A DASHBOARD
	                </NavLink>
					</li>
				</ul>
			</div>	
			<div className="page-faq none-margin">			
				<div id="wrapper">
					
					<div id="panel_div">
						<section className="header-content">
							<h1>FAQs</h1>
							<span>Frecuently answers and questions</span>
						</section>
						<section className="body-content">
							<details>
							 <summary>¿Lorem ipsum dolor sit amet'</summary>
							 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla leo id mauris viverra, in egestas sapien tristique. Sed at ornare felis, quis rutrum nisi. Aenean cursus lacus ac eros sagittis pharetra. Nullam in pretium ligula. Donec ullamcorper eros non gravida tincidunt. Nullam nec nisi a tortor feugiat adipiscing id quis nisi. Vivamus et bibendum ligula.</p>
							</details>

							<details>
							 <summary>¿Phasellus quis dui eu dolor?</summary>
							 <p>Phasellus quis dui eu dolor fringilla imperdiet. Curabitur iaculis metus a orci blandit volutpat. Nam imperdiet massa nec ipsum laoreet, ut pellentesque ante mattis. Aenean et tempus urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi consequat vehicula odio. Nullam tristique dui eu augue semper, non posuere ipsum tristique.</p>
							</details>

							<details>
							 <summary>¿Sed nisl odio, semper fermentum?</summary>
							 <p>Sed nisl odio, semper fermentum dui et, tincidunt laoreet justo. Maecenas a neque vitae libero iaculis sodales sed mollis risus. Phasellus velit nulla, sollicitudin id augue eget, laoreet rutrum enim. Mauris convallis pretium rutrum. Pellentesque ultrices nisi eu nulla ultrices, non vehicula purus suscipit.</p>
							</details>

							<details>
							 <summary>¿Etiam auctor, tortor eu hendrerit?</summary>
							 <p>Etiam auctor, tortor eu hendrerit scelerisque, orci leo aliquam enim, in cursus nunc metus sed ipsum. Fusce vel risus vitae odio auctor porttitor et non leo. Nullam congue, risus eu ultricies vehicula, purus erat sodales dolor, in semper nibh ligula eget odio. Curabitur vulputate consequat turpis eleifend tincidunt. Nullam auctor lacinia mauris eu lacinia. Nam a sem velit. Suspendisse potenti. Morbi risus diam, eleifend vel lectus quis, commodo adipiscing ipsum. Fusce at sagittis ipsum. Aliquam at ante id sem aliquam cursus.</p>
							</details>
						</section>
					</div>
				</div>						
			</div>	
		</div>
		)
	}
}

export default Faq