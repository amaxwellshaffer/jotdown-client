import React from "react";

interface IProps {};
interface IState {
   users: (string | boolean )[]
};

class AdminAccess extends React.Component <IProps, IState>{

    constructor(props) {
        super(props)
        this.state = {
            users: []
          
        };
    }

    serverurl: string = 'http://localhost:3005';

    componentDidMount(){

            fetch(`${this.serverurl}/user/users`, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                })
              })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    this.setState({users: json.users});
                    console.log(this.state.users);
                    
                })
                .catch((err) => {
                    alert('admin access only')
                }
                );
            };

            userListDisplay = (user) => {
                return(
                    <li><a href={`${this.serverurl}/user/users/${user.userName}`}>{`${user.userName}`}</a></li>
                )
            }


render(){
    return(
        <div className="admin-page">
            <div>
                <ul>
                {this.state.users.map(this.userListDisplay)}
                </ul>
            </div>
        </div>
    )
}

};

export default AdminAccess;