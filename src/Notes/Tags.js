import React from 'react';
import {Button} from 'reactstrap';

export default function Tags({data, del, search}){
    return(
        <div className={"tag"}>
            <p className={"hel"}>{data.textTag}</p>
            <Button onClick={()=>del(data.id)}>Delete</Button>
            <Button onClick={()=>search(data.id)}>Search</Button>
        </div>
    );

}