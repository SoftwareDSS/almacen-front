import React from 'react';

class Container extends React.Component {

    render() {

        return(
            <div className='max-w-screen-2xl'>
                { this.props.children }
            </div>
        );

    }

}
export default Container;
