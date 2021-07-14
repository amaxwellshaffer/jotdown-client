import React from "react";

class Inside extends React.Component {

    render(){
        return(
            <div className="Inside">
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