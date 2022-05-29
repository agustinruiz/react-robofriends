import React, { useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

// A partir de los hooks se puede poner estados a funciones
function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(
        () => {
            fetch('https://jsonplaceholder.typicode.com/users')
            //fetch('https://jsonplaceholder.cypress.io/todos')
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(users => {
                    console.log(users);
                    setRobots(users)
                });
            console.log(count, robots, searchField);

        },
        // el use effect lo llama siempre que un estdo varia porque lo usa en el ciclo de vida como si fuera el render (cuando se crea o cambia un estado)
        // Esto genera que si no pase nada se este ejecutando en loop. 
        // Para evitar eso hay un segundo parametro que le dice que se ejecute cuando cambia alguno de los parametros mostrados en la lista.
        // Para que se ejecute como si fuera componentDidMount hay que poner una lista vacia.
        //[] // es igual a decir que solo lo corra una vez cuando se monto el componente componentDidMount.
        [count] // Solo corre esto cuando cambia count.
    );

    const onSearchChange = (event) => { // especificada asi la funcion si corre en App y ve el state.
        setSearchField(event.target.value);
        console.log(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
            <div className="tc">
                <h1 className="f1">Robo Friends</h1>
                <button onClick={() => setCount(count+1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default App;