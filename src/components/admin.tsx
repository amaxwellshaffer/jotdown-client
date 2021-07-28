import React from "react";
import Link from '@material-ui/core/Link';

interface IProps { };
interface IState {
    users: (string | boolean)[],
    foundUser: (string | boolean | number)[],
    data: boolean,
    foundUserName: string,
    foundNotes: (string | null),
    foundChecklist: { title: string, isDone: boolean, id: number }[],
    foundJournal: { date: string, entry: string, id: number }[]
};

class AdminAccess extends React.Component<IProps, IState>{

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            foundUser: [],
            data: false,
            foundUserName: '',
            foundNotes: '',
            foundChecklist: [],
            foundJournal: [],
        };
    }

    serverurl: string = 'http://localhost:3005';

    componentDidMount() {

        fetch(`${this.serverurl}/user/users`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        })
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
                this.setState({ users: json.users });
                //console.log(this.state.users);
            })
            .catch((err) => {
                alert('admin access only')
            }
            );
    };

    fetchUserData = (user) => {

        this.setState({ data: true });

        fetch(`${this.serverurl}/user/users/${user}`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        })
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
                this.setState({ foundUser: json.foundUser[0] })
                //console.log(this.state.foundUser);
                this.setState({ foundUserName: json.foundUser[0].userName });
                this.setState({ foundNotes: json.foundUser[0].notepad[0].notes });
                this.setState({ foundChecklist: json.foundUser[0].checklist });
                this.setState({ foundJournal: json.foundUser[0].logEntries });
            })
            .catch((err) => {
                console.log(err);      
                alert('admin access only')
            }
            );
    };



    foundUserDisplay = () => {
        return (
            <div>
                <h3>user: {this.state.foundUserName}</h3>

                <h4>Checklist</h4>
                <ul>
                    {this.state.foundChecklist.map(this.userChecklist)}
                </ul>

                <h4>Dated Log</h4>
                <ul>
                    {this.state.foundJournal.map(this.userJournal)}
                </ul>

                <h4>Notepad</h4>
                <p>{this.state.foundNotes}</p>

            </div>
        )
    };

    userChecklist = (item) => {
        return (
            <li>{item.title}</li>
        )
    };

    userJournal = (item) => {
        return (
            <li>{item.date.slice(4, 15)} - {item.entry}</li>
        )
    };





    userListDisplay = (user) => {
        return (
            <li><Link onClick={() => this.fetchUserData(user.userName)}>{`${user.userName}`}</Link></li>
        )
    }


    render() {
        return (
            <div className="admin-page">
                <div className="user-list">
                    <ul>
                        {this.state.users.map(this.userListDisplay)}
                    </ul>
                </div>
                <div className="user-data">
                    {this.state.data ? this.foundUserDisplay() : null}
                </div>
            </div>
        )
    }

};

export default AdminAccess;