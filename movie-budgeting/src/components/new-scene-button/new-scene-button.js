import React from 'react';

class NewSceneButton extends React.Component {

	render() {
		return (
		<React.Fragment>
			<p className="side-bar-links">	
				<a name="NewProjectButton"  href="#project/create-project"> 
				<i className="fa fa-plus-square" aria-hidden="true"></i>
				 <span className="padding-left-12">New Project</span>
				 </a>
			</p>
			<p className="side-bar-links">	
				<a name="NewSceneButton"  href="#new-scene"> 
				<i className="fa fa-plus-square" aria-hidden="true"></i>
				 <span className="padding-left-12">New Scene</span>
				 </a>
			</p>
		</React.Fragment>
			);
	}
}

export default NewSceneButton;