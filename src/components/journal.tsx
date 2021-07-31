import React from 'react';
import { Button, TextField, IconButton, ButtonGroup, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import APIURL from "../helpers/environment";

interface IProps {
    journal: { date: string, entry: string, id: number }[]

};
interface IState { newEntry: string, newDate: (string | null), setModalOpen: boolean, id: number | null };

class Journal extends React.Component<IProps, IState>{

    constructor(props) {
        super(props)
        this.state = {
            newEntry: '',
            newDate: `${Date()}`,
            setModalOpen: false,
            id: null
        };
    }

    handleDateChange = (date: string | null) => {
        this.setState({ newDate: date });
        // console.log('from handledatechange', date);
    };

    handleClickOpen = (item) => {
        this.setState({ setModalOpen: true });
        this.setState({ newDate: item.date });
        this.setState({ newEntry: item.entry });
        this.setState({ id: item.id });
       // console.log(this.state);
    };

    handleClickClose = () => {
        this.setState({ setModalOpen: false });
        //console.log('from close button', this.state.setModalOpen);
    };


    serverurl: string = APIURL;

    newEntryHandle = () => {

        fetch(`${this.serverurl}/captainslog/new`, {
            method: 'POST',
            body: JSON.stringify({ date: this.state.newDate, entry: this.state.newEntry }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
           // console.log(json);

        }).catch((err) => {
            console.log(err);
            //alert("not added")
        })

        setTimeout(() => window.location.reload(), 500);
    };

    updateEntryHandle = (item) => {

        fetch(`${this.serverurl}/captainslog/update/${item}`, {
            method: 'PUT',
            body: JSON.stringify({ date: this.state.newDate, entry: this.state.newEntry }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
            //console.log(json);

        }).catch((err) => {
            console.log(err);
            //alert("not added")
        })

        setTimeout(() => window.location.reload(), 500);
    };

    deleteHandle = (itemId: number) => {

        fetch(`${this.serverurl}/captainslog/delete/${itemId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }).then(
            (response) => response.json()
        ).then((json) => {
            //console.log(json);

        }).catch((err) => {
            console.log(err);
            //alert("not deleted")
        })

        setTimeout(() => window.location.reload(), 500);
    };
    
    
    ListDisplay = (item) => {
        
        //console.log(item);

        return (
            <div className="list-item">
                <div className="item-text">
                    <p>{item.date.slice(4, 15)} - </p>
                    <p>{item.entry}</p>
                </div>
                <div className="item-buttons">
                    <form>
                        <ButtonGroup size="small" className="item-buttons">
                            <IconButton onClick={() => this.handleClickOpen(item)}><EditIcon fontSize="small" />
                            </IconButton>
                            <Dialog open={this.state.setModalOpen} onClose={this.handleClickClose} aria-labelledby="form-dialog-title">
                                <DialogContent>
                                    <form>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                size="small"
                                                //id="date-picker-inline"
                                                //label="Date picker inline"
                                                //defaultValue={item.date}
                                                value={this.state.newDate}
                                                onChange={(date) => this.handleDateChange(`${date}`)}
                                                // KeyboardButtonProps={{
                                                    //     'aria-label': 'change date',
                                                    // }}
                                                    />
                                        </MuiPickersUtilsProvider>

                                        <TextField
                                            id="standard-size-small"
                                            label="Update Entry"
                                            autoComplete="off"
                                            defaultValue={this.state.newEntry}
                                            value={this.state.newEntry}
                                            size="small"
                                            inputProps={{ maxLength: 30}}
                                            onChange={e => this.setState({ newEntry: e.target.value })} />
                                        <IconButton  onClick={() => this.updateEntryHandle(this.state.id)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClickClose} color="primary">
                                        Cancel
                                        </Button>

                                </DialogActions>
                            </Dialog>
                            <IconButton onClick={() => this.deleteHandle(item.id)} ><HighlightOffIcon fontSize="small" /></IconButton>
                        </ButtonGroup>
                    </form>
                </div>

            </div>
        )
    };


    render() {
        return (
            <div className="journal">
                <div className="new-Entry">
                    <form>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                size="small"
                                //id="date-picker-inline"
                                //label="Date picker inline"
                                value={this.state.newDate}
                                onChange={(date) => this.handleDateChange(`${date}`)}
                            // KeyboardButtonProps={{
                            //     'aria-label': 'change date',
                            // }}
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            id="standard-size-small"
                            label="Add New item"
                            autoComplete="off"
                            value={this.state.newEntry}
                            size="small"
                            inputProps={{ maxLength: 30 }}
                            onChange={e => this.setState({ newEntry: e.target.value })} />
                        <IconButton  onClick={this.newEntryHandle}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </form>
                </div>
                <div className="list-of-items">
                    {(this.props.journal ?? []).sort((x, y) => +new Date(x.date) - +new Date(y.date)).map(this.ListDisplay)}
                </div>
            </div>
        )
    }
}


export default Journal;