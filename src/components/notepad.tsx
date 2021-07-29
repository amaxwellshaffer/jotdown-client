import React from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../helpers/environment";

interface IProps {
    notes: (string | null),
};
interface IState { notes: (string | null) };

class Notepad extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.state = {
            notes: ''
        };
    }

    serverurl: string = APIURL;

    clickHandle = () => {
        //console.log(this.state.notes);

        fetch(`${this.serverurl}/notepad/`, {
            method: 'PUT',
            body: JSON.stringify({ notes: this.state.notes }),
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
            alert("not saved")
        })
    }

    render() {

        //console.log(this.props.notes);

        return (
            <div className="notepad">
                <TextField
                    id="standard-multiline-flexible"
                    margin="normal"
                    multiline
                    rows={26}
                    //value={this.state.notes}
                    defaultValue={this.props.notes}
                    onChange={e => this.setState({ notes: e.target.value })}
                    fullWidth
                />
                <Button onClick={this.clickHandle}>Save</Button>
            </div>
        )

    }

}

export default Notepad;