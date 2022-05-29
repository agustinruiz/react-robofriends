import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

// Para que el componente tenga un estado (lo que cambia en la aplicacion) debe ser una clase
class App extends React.Component {
    // El constructor es una de las clases del lifecycle de los componentes de react. Es la primera que se llama al crear el componente
    // Los campos que varian en un componente se tienen que declarar dentro de la variable state que se declara en el constructor
    constructor(){
        super();
        // Estos son los campos que van a variar en los hijos
        this.state = {
            robots: [],
            searchField: '',
        };
    }

    // Otra clase del lifecycle de react que se llama al crear el componente luego del primer render es:
    // componentDidMount. que te dice que se monto la pagina y ya se mostro algo/
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
        
    }

    // Para que el hijo, en este caso el search box, pueda actualizar los robots mostrados tiene que actualizar el estado del padre.
    // Para hacerlo se le pasa como parametro una funcion que el hijo llamara cuando modifique la variable que tenemos que analizar
    // Ppor eso defino en App(el padre) la funcion que utulizara el hijo cuando cambie el input text.
//    onSearchChange(event){ Especificado de esta forma es como que la funcion corre en el SearchBox. y por eso no identifica el this.state
    // Tendo que usar el arrow function ya que la funcion no es parte de react
    onSearchChange = (event) => { // especificada asi la funcion si corre en App y ve el state.
        // para decirle a react que algo del estado se actualizo utilizo this.setState
        this.setState({searchField: event.target.value});
        console.log(event.target.value);
    }

    render() {
        const {robots , searchField} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return !robots.lenght
            ? <h1>Loading...</h1>
            : (
                <div className="tc">
                    <h1 className="f1">Robo Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }
}

export default App;