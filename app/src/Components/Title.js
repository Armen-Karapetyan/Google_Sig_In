import React, { useEffect, useState } from 'react';

import { getComments } from '../Services/main';

const Title = ({ title, id }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(id).then(res => {
            // console.log('res', res);
            setComments(res?.comments);
        })
    }, []);

    return (
        <>
            <h1>{title}</h1>
            {comments?.map(comment => (
                <div key={comment?.id}>
                    <h4>{comment?.body}</h4>
                </div>   
            ))}
        </>
    )
}

export default Title;
