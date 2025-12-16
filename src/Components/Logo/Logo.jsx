import React from 'react';
import logoPart1 from '../../assets/assetverse logo-01.png'
import logoPart2 from '../../assets/assetverse logo 2-01.png'

const Logo = () => {
    return (
        <div className='fixed top-5 left-10 '>
            <img className='w-30 absolute' src={logoPart1} alt="" />
            <img className='w-30 ' src={logoPart2} alt="" />
        </div>
    );
};

export default Logo;