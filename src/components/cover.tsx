import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Cover extends React.Component {

    render(){
        return(
            <div className="cover">
                <h1>JOTDOWN</h1>
                <h4>bells whistles distractions</h4>
                <TextField id="standard" label="username" />
                <br />
                <TextField id="standard" label="password" />
                <br />
                <br />
                <Button onClick={() => { alert('clicked') }} variant="outlined">login</Button>
                <Button onClick={() => { alert('clicked') }} variant="outlined">register</Button>
            </div>
        )
    }

}

export default Cover;