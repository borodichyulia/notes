import React from 'react';
import NoteItem from "./Notes/NotesItem"
import * as uuid from "uuid";
import Tags from "./Notes/Tags";

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        width: '100%',
    },

    button: {
        width: '60px',
        height: '60px',
    },

    div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
            id: '',
            tags: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleRemoveTag = this.handleRemoveTag.bind(this);
        this.searchNote = this.searchNote.bind(this);
    }

    render() {

        return (
            <div style={styles.div}>
                <form onSubmit={this.handleSubmit} style={styles.form}>
                    <input
                        className={"inputNote"}
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button style={styles.button}>
                        +
                    </button>
                </form>

                <div className={"listNotes"}>
                    {this.state.items.map((item) => (
                        <NoteItem
                            data={item}
                            key={item.id}
                            del={this.handleRemove}
                            edit={this.toggleEditing}
                            delAll={this.handleRemoveAll}
                        />
                    ))}

                </div>

                <div className={"listTags"}>
                    <h2>List of tags</h2>
                    {this.state.tags.map((tag) => (
                        <Tags
                            data={tag}
                            key={tag.id}
                            del={this.handleRemoveTag}
                            search={this.searchNote}
                        />
                    ))}

                </div>

            </div>)

    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let check = /#(\S){1,20}/g;
        let rez = new Set(this.state.text.match(check));
        let arr = [];
        if (rez !== null) {
            for (let tag of rez) {
                if (!this.state.tags.map(t => t.textTag).includes(tag)) {
                    const newTag = {
                        textTag: tag,
                        id: uuid.v4()
                    };
                    arr.push(newTag);
                }
            }
        }
        this.setState({
            tags: this.state.tags.concat(arr)
        });
        console.log(this.state.tags);

        if (this.state.text.length === 0) {
            return;
        }
        if (this.state.items.map(i => i.id).includes(this.state.id)) {
            let indexChange = this.state.items.indexOf(this.state.items.find(i => i.id === this.state.id));
            let arrayChange = [...this.state.items];
            arrayChange[indexChange].text = this.state.text;
            this.setState({
                items: arrayChange,
                text: '',
                id: ''
            });
        } else {
            const newItem = {
                text: this.state.text,
                id: uuid.v4(),
                Editing: false,
            };
            this.setState({
                items: this.state.items.concat(newItem),
                text: ''
            });
        }
    }


    handleRemove(id) {
        this.setState({
            items: this.state.items.filter((item) => {
                return item.id !== id;
            }),
        });
    }

    handleRemoveTag(id) {
        this.setState({
            tags: this.state.tags.filter((tag) => {
                return tag.id !== id;
            }),
        });
    }

    handleRemoveAll() {
        this.setState({
            items: []
        });
    }

    toggleEditing(id) {
        this.setState({
            text: this.state.items.find(i => i.id).text,
            id: id
        });
    }

    searchNote(id) {
        let searchTagIndex = this.state.tags.indexOf(this.state.tags.find(tag => tag.id === id));
        let searchTagText = this.state.tags[searchTagIndex].textTag;

        let foundTexts = this.state.items.filter(i => i.text.includes(searchTagText));
        foundTexts.forEach(item => item)
    }

}
