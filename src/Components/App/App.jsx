import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductList from '../ProductsList/ProductList';
import CreateProduct from '../CreateProduct/CreateProduct';

class App extends React.Component {

    render() {

        return(
            <Router>
                <Routes>
                    <Route path='/' element={ <ProductList /> } />
                </Routes>
                <Routes>
                    <Route path='/crear-producto' element={ <CreateProduct /> } />
                </Routes>
            </Router>
        );

    }

}
export default App;
