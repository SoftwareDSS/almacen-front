import React       from 'react';
import { NavLink } from 'react-router-dom';
import Container   from '../../Containers/Container';
import HttpHelper  from '../../Helpers/Http';

class List extends React.Component {
    
    constructor( props ) {

        super( props );

    }
    
    render() {

        return (

            <div>
                <h1 className='text-xl text-center font-semibold p-4'>Lista de productos</h1>
            {
                ( this.props.products != null )
                    ?
                        this.props.products.map( ( product, index ) => {

                            return(
                                <div key={ 'key-'+index } className='bg-rose-500 w-6/12 mx-auto my-4 p-6 rounded text-neutral-200 mb-4 text-center'>
                                    
                                    <div className='text-sm'>Nombre: { product.nombre }</div>
                                    <div className='text-sm pb-2'>Marca: { product.marca }</div>
                                    <div className='text-sm'>SKU: { product.sku }</div>
                                    <div className='text-sm'>Costo: ${ product.costo } usd</div>
                                    <div className='text-sm pb-2'>Categoria: { product.categoria }</div>

                                    {
                                        product.atributos.map( ( attributes, attrIndex ) => {

                                            return <div key={'attr-'+attrIndex} className='text-sm'>{attributes.nombre}: { attributes.valor }</div>

                                        })
                                    }

                                </div>
                            )
        
                        })
                    :
                        null
            }


            </div>

        );

    }


}
export default List;
