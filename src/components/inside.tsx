import React from "react";
import Paper from '@material-ui/core/Paper';

class Inside extends React.Component {

    render(){
        return(
            <div className="inside">
                <div className="leftPage">Left Page</div>
                <div className="rightPage"> 
                    <div className="right-top">top</div>
                    <div className="right-bottom">bottom</div>
                </div>

            </div>
        )
    }

}

export default Inside;