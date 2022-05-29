import React from "react";

class ErrorBoundry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
        }
    }

    // funcion del lifecycle que se llama cuando surge un error
    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }

    render(){
        if(this.state.hasError){
            return <h1>Oooops. That is no good</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundry;