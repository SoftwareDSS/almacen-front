import React       from 'react';
import { NavLink } from 'react-router-dom';
import Container   from '../../Containers/Container';
import List        from './List';
import HttpHelper  from '../../Helpers/Http';

class ProductList extends React.Component {
    
    constructor( props ) {

        super( props );

        this.state = {

            products: null,
            jsxCode: null

        }

    }

    async componentDidMount() {

        if( this.state.products == null ){

            const response = await HttpHelper.GET( 'products/all' );

            this.setState({

                products: response.data.data

            });

        }
        
    }

    async componentDidUpdate( prevProps, prevState ) {

        if( this.state.products !== prevState.products ) {

            if( this.state.products.length == 0 && this.state.jsxCode == null ) {

                const jsx = (

                    <Container>
                        <h1 className='p-4 text-center font-semibold'>Aún no se crean productos</h1>
                        <NavLink className="" to="/crear-producto">
                            <div className='w-36 m-auto text-center px-4 py-2 rounded bg-rose-500 text-neutral-200 cursor-pointer'>
                                Crear producto
                            </div>
                        </NavLink>
                    </Container>

                );

                this.setState({

                    jsxCode: jsx

                });

            }

        }

    }

    render() {

        if( this.state.products == null ) {

            return(
                <Container>
                    <h1 className='p-4 text-center'>Cargando productos</h1>
                </Container>
            );

        }
        else if( this.state.jsxCode != null ){

            return( this.state.jsxCode );

        }
        else{
            return (
                <Container>
                    <List products={ this.state.products } />
                    <div className='w-36 m-auto text-center px-4 py-2 rounded bg-rose-500 text-neutral-200 cursor-pointer'>
                        <NavLink className="" to="/crear-producto">Crear producto</NavLink>
                    </div>
                </Container>
            )
        }

    }

}
export default ProductList;
