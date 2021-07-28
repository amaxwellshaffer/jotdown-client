import React from "react";
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface IProps { updateToken: (param1: string) => void };
interface IState { userName: string, password: string };
class Cover extends React.Component<IProps, IState> {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        };
    }

    serverurl: string = 'http://localhost:3005';

    //register User
    registerUser = (event) => {

        event.preventDefault(event);


        const usernameIsValid = () => {
            if (/^(?=.{4,})(?=.*\d)(?=.*\w)(?!.*\s).*$/.test(this.state.userName)) {
                return (true)
            } else { return (alert("username must be at least 4 characters and conatin at least one number or special character")) }
        }

        const passwordIsValid = () => {
            if (/^(?=.{5,})(?!.*\s).*$/.test(this.state.password)) {
                return (true)
            } else { return (alert("Password must be at least 5 characters")) }
        }

        if (usernameIsValid() && passwordIsValid()) {

            fetch(`${this.serverurl}/user/register`, {
                method: 'POST',
                body: JSON.stringify({ userName: this.state.userName, password: this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                console.log(data);

                this.props.updateToken(data.token);
                console.log('updated token from [cover]');

                //history.push("/profile");
            }).catch(err => console.log(err))

        } else {
            alert("Email, Username, and Password must be provided")
        }
    }

    //log a user in
    loginUser = (event) => {
        event.preventDefault(event);
        fetch(`${this.serverurl}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ userName: this.state.userName, password: this.state.password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.token);
            //history.push("/profile");
            console.log(`welcome back ${data.user.userName} from login function`);

        }).catch((err) => {
            console.log(err);
            alert("Valid Email and Password must be provided")
        })
    }



    render() {
        if (localStorage.getItem('token')) {
            return (<Redirect to="/journal" />);
        } else {

            return (
                <div className="cover">
                    <h1>JOTDOWN</h1>
                    <h4>bells whistles distractions</h4>
                    <TextField id="standard" label="username" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} />
                    <br />
                    <TextField id="standard" label="password" type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    <br />
                    <br />
                    <Button onClick={this.loginUser} variant="outlined" size="small">login</Button> &nbsp;
                    <Button onClick={this.registerUser} variant="outlined" size="small">register</Button>
                </div>
            )
        }
    }

}

export default Cover;