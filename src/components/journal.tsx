import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Journal extends React.Component {

    render(){
        return(
            <div className="Journal">
                <div className="leftPage"></div>
                <div className="RightPage"></div>
            </div>
        )
    }

}

export default Journal;