import React from 'react';
import {Button} from 'reactstrap';

export default function NoteItem({data, del, edit, delAll, bg}) {

    return (
        <div className={"note"}>
            <h3>Note</h3>
            <p style={{backgroundColor: bg}}>{data.text}</p>
            <Button onClick={() => del(data.id)}>Delete</Button>
            <button onClick={() => edit(data.id)}>Edit</button>
            <button onClick={() => delAll()}>Delete All</button>
        </div>
    );
}