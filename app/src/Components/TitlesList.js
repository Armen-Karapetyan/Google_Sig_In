import React, { useEffect, useState } from "react";

import Title from './Title';

import { getTitles } from '../Services/main';

const TitlesList = () => {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTitles().then(res => {
            setIsLoading(false);
          //  console.log('res', res);
            setTitles(res?.posts);       
        })
    }, []);

console.log('titles', titles);

    return (
        <div>
            <div>{titles?.map(title => (
                <Title key={title?.id} id={title?.id} title={title?.title} /> 
            ))}</div>
        </div>
    )
};

export default TitlesList;