import React from 'react';
import {useQuery} from '@apollo/client';
import { QUERY_ALL_PROBLEMS } from '../../utils/queries'

function Hero (){

    const { loading, data} = useQuery(QUERY_ALL_PROBLEMS);
    console.log(data)

    return (
        <div>
            Hello
        </div>
    )
}

export default Hero;