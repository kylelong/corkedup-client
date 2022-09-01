import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({button}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: button ?  '33%' : ''}}>
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#9fbfff" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )

}
export default Loader;