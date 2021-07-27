import React from 'react';
import { Checkbox, TextField, IconButton, ButtonGroup, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface IProps {
    //checklist: (string | boolean | number)[],
    checklist: { title: string, isDone: boolean, id: number }[]
    //checklist: {title: string, isDone: boolean, createdAt: string, id: number, updatedAt: string, userId: number}[],

};
interface IState { newItem: string };

// interface displayProps {
//     title: string,
//     isDone: boolean 
// }

class Checklist extends React.Component<IProps, IState> {

    constructor(props) {
        super(props)
        this.state = {
            newItem: '',

        };
    }

    serverurl: string = 'http://localhost:3005';

    clickHandle = () => {

        fetch(`${this.serverurl}/checklist/new`, {
            method: 'POST',
            body: JSON.stringify({ title: this.state.newItem, isDone: false }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
            console.log(json)

        }).catch((err) => {
            console.log(err);
            //alert("not added")
        })
    };


    deleteHandle = (itemId: number) => {

        fetch(`${this.serverurl}/checklist/delete/${itemId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
            console.log(json);

        }).catch((err) => {
            console.log(err);
            //alert("not deleted")
        })
    };

    checkBoxState = (isDone) => {
        if (isDone === true) {
            return (false)
        } else {
            return (true)
        }
    }


    checkHandle = (item) => {


        fetch(`${this.serverurl}/checklist/update/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({ isDone: this.checkBoxState(item.isDone) }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
            console.log(json);
            //this.forceUpdate();

        }).catch((err) => {
            console.log(err);
            //alert("not deleted")
        })
    };


    ListDisplay = (item) => {

        //console.log(item);

        return (
            <div className="list-item">
                <div className="item-text">
                    <form>
                        <Checkbox
                            className="item-checkbox"
                            color="default"
                            checked={item.isDone}
                            inputProps={{ 'aria-label': 'checkbox with default color', 'type': 'submit' }}
                            onClick={() => this.checkHandle(item)}
                        />
                        <p>{item.title}</p>
                    </form>
                </div>
                <div className="item-buttons">
                    <form>
                        {/* <IconButton><EditIcon fontSize="small" /></IconButton> */}
                        <IconButton onClick={() => this.deleteHandle(item.id)} type="submit"><HighlightOffIcon fontSize="small" /></IconButton>
                    </form>
                    {/* <ButtonGroup size="small" className="item-buttons">
                    </ButtonGroup> */}
                </div>

            </div>
        )
    };

    render() {

        //console.log('from checklist', this.props.checklist);


        return (
            <div className="checklist">
                {/* //greetings from checklist */}
                <div className="new-item">
                    <form>

                        <TextField
                            id="standard-size-small"
                            label="Add New item"
                            autoComplete="off"
                            value={this.state.newItem}
                            size="small"
                            inputProps={{ maxLength: 30 }}
                            onChange={e => this.setState({ newItem: e.target.value })} />
                        <IconButton onClick={this.clickHandle} type="submit" >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </form>
                </div>

                <div className="list-of-items">
                    {this.props.checklist.map(this.ListDisplay)}
                </div>

                {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.successOpen}
                    autoHideDuration={4000}
                    onClose={() => this.setState({successOpen: false})}
                    message="Item Not Added"
                /> */}
            </div>
        )
    }

}

export default Checklist;

