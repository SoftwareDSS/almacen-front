import React       from 'react';
import { NavLink } from 'react-router-dom';
import Container   from '../../Containers/Container';
import HttpHelper  from '../../Helpers/Http';

class CreateProduct extends React.Component {
    
    constructor(props) {

        super( props );

        this.state = {

            categories: null,
            attributes: null,
            formInput: {

                nombre_producto: '',
                sku: '',
                marca: '',
                costo: '',
                category: '-1',
                attr1: '-1',
                attr2: '-1'

            }

        }

        this.changeCategoryHandler  = this.changeCategoryHandler.bind( this );
        this.changeFormInputHandler = this.changeFormInputHandler.bind( this );
        this.changeAttributeHanlder = this.changeAttributeHanlder.bind( this );
        this.saveProductHandler     = this.saveProductHandler.bind( this );

    }

    async componentDidMount() {

        if( this.state.categories == null ) {

            const response = await HttpHelper.GET( 'categories/all' );

            this.setState( {
                categories: response.data.data
            });

        }
        
    }

    async componentDidUpdate( prevProps, prevState ) {

        if( this.state !== prevState ) {
        }

    }
    
    async changeCategoryHandler( { target } ) {

        const value       = target.value;
        let newState      = this.state.formInput;
        newState.category = target.value;       

        if( value != "-1" ) {

            let response      = await HttpHelper.GET( 'categories/category/'+value+'/attributes/values' );
            let attributesArr = [];

            for( let i in response.data.data ) {

                attributesArr.push({

                    name: i,
                    items: response.data.data[ i ]


                });

            }

            this.setState({

                attributes: attributesArr,
                formInput: newState

            });

        }

    }

    changeFormInputHandler( { target }, key ) {

        let newState    = this.state.formInput;
        newState[ key ] = target.value;

        this.setState({
            formInput: newState
        });        

    }

    changeAttributeHanlder( { target }, attribute ) {

        let newState                   = this.state.formInput;
        newState[ 'attr' + attribute ] = target.value;

        this.setState({
            formInput: newState
        });

    }

    async saveProductHandler() {

        const formInput = this.state.formInput;

        if( formInput.nombre_producto == '' ){

            alert( "Nombre del producto es requerido" );

        }
        else if( formInput.sku == '' ){

            alert( "Sku es requerido" );

        }
        else if( formInput.sku.length > 16 ) {

            alert( "El SKU no puede tener mas de 16 caracteres" );

        }
        else if( formInput.marca == '' ){

            alert( "Marca es requerida" );

        }
        else if( formInput.costo == '' ){

            alert( "Costo es requerido" );

        }
        else if( formInput.category == '-1' ){

            alert( "Categoria es requerida" );

        }
        else if( formInput.attr1 == '-1' ){

            alert( "Atributo 1 es requerido" );

        }
        else if( formInput.attr2 == '-1' ){

            alert( "Atributo 2 es requerido" );

        }
        else {

            await HttpHelper.POST( 'products/create', this.state.formInput );

            window.location.href = "/";

        }

    }

    render() {

        return(

            <Container>
                <div className='bg-rose-500 w-6/12 mx-auto my-4 p-6 rounded text-neutral-200'>

                    <h3 className='mb-2 text-center'>CREAR NUEVO PRODUCTO</h3>
                    <hr className='mb-2'></hr>
                    <p className='mb-2'>Nombre del producto:</p>
                    <input value={ this.state.formInput.nombre_producto } onChange={ ( evt ) => this.changeFormInputHandler( evt, 'nombre_producto' ) } className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900' type="text" />
                    <p className='mb-2'>SKU:</p>
                    <input value={ this.state.formInput.sku } onChange={ ( evt ) => this.changeFormInputHandler( evt, 'sku' ) } className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900' type="text" />
                    <p className='mb-2'>Marca:</p>
                    <input value={ this.state.formInput.marca } onChange={ ( evt ) => this.changeFormInputHandler( evt, 'marca' ) } className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900' type="text" />
                    <p className='mb-2'>Costo:</p>
                    <input value={ this.state.formInput.costo } onChange={ ( evt ) => this.changeFormInputHandler( evt, 'costo' ) } className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900' type="text" />
                    <p className='mb-2'>Categoría:</p>

                    {
                        this.state.categories != null
                            ?
                                <select value={ this.state.formInput.category } onChange={ this.changeCategoryHandler } className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900'>
                                    <option value="-1">Seleccionar</option>
                                    {
                                        this.state.categories.map( ( category, index ) => {

                                            return <option key={ 'option-'+index } value={ category.id }>{ category.nombre }</option>

                                        })
                                    }
                                </select>
                            :
                                null
                    }
                    {
                        this.state.attributes != null
                            ?
                                this.state.attributes.map( ( attribute, index ) => {

                                    let items = attribute.items;

                                    return(
                                        <div key={ 'attribute-'+index }>
                                            <p className='mb-2'>{ attribute.name }</p>
                                            <select onChange={( evt ) => this.changeAttributeHanlder( evt, index+1 )} value={this.state.formInput[ 'attr'+( index+1 ) ]} className='w-full focus:outline-0 border border-rose-500 rounded focus:border-black px-2 py-2 mb-2 text-neutral-900'>
                                                <option value="-1">Seleccionar</option>
                                                {
                                                    items.map( ( item, itemIndex ) => {

                                                        return(

                                                            <option key={ 'item-'+itemIndex } value={ item.id }>{ item.valor }</option>

                                                        )

                                                    })
                                                }
                                            </select>
                                        </div>
                                    )

                                })
                            :
                                null
                    }

                    <div className='w-36 m-auto text-center px-4 py-2 rounded bg-neutral-200 text-neutral-800 cursor-pointer' onClick={ this.saveProductHandler }>Guardar</div>

                </div>

                <NavLink className="" to="/">
                    <div className='w-36 m-auto text-center px-4 py-2 rounded bg-rose-500 text-neutral-200 cursor-pointer'>
                        Lista
                    </div>
                </NavLink>

            </Container>


        );

    }

}
export default CreateProduct;
