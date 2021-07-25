import React from "react";
import Notepad from "./notepad";
import Checklist from "./checklist";
import Journal from "./journal";

interface IProps {};
interface IState {
    notes: (string | null),
    //checklist: (string | boolean | number)[],
    checklist: {title: string, isDone: boolean, id: number}[],
    journal: { date: string, entry: string, id: number }[]
    //reqHeaders: HeadersInit,
};
class Inside extends React.Component <IProps, IState>{

    constructor(props) {
        super(props)
        this.state = {
            notes:'',
            checklist:[],
            journal:[],
            //reqHeaders: []
          
        };
    }

    serverurl: string = 'http://localhost:3005';

    componentDidMount(){

    const reqHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("token")}`
    }

        fetch(`${this.serverurl}/user/`, {
            method: "GET",
            headers: reqHeaders,
          })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                console.log(json.foundUser[0].notepad[0].notes);
                
                this.setState({ notes: json.foundUser[0].notepad[0].notes });
                this.setState({ checklist: json.foundUser[0].checklist });
                this.setState({ journal: json.foundUser[0].logEntries });
              console.log('from inside', this.state.journal);
            });
        };
    

    render(){
        return(
            <div className="inside">
                <div className="leftPage">
                    <Notepad notes={this.state.notes}/>
                </div>
                <div className="rightPage"> 
                    <div className="right-top">
                        <Checklist checklist={this.state.checklist}/>
                    </div>
                    <div className="right-bottom">
                        <Journal journal={this.state.journal}/>
                    </div>
                </div>

            </div>
        )
    }

}

export default Inside;