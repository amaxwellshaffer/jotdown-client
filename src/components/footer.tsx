import React from 'react';
//import { Link } from 'react-router-dom';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';


interface IProps { clearToken: () => void };
interface IState { };

class Footer extends React.Component<IProps, IState> {

    
    // needLogout = () => {
    //     if(localStorage.getItem("token") ) {
    //         return(<Link href="/" onClick={this.props.clearToken}> LOGOUT</Link>)
    //     } else{ return(null)}
    // }


    render() {
        return (
            <div className="footer-links">
                {/* <ButtonGroup variant="text" aria-label="text primary button group" color="secondary">
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/about">About</Button>
                    <Button onClick={this.props.clearToken} component={Link} to="/">Logout</Button>
                </ButtonGroup> */}

                <Link href="/" >home</Link>&nbsp;|&nbsp; 
                <Link href="/about" >about</Link>&nbsp;|&nbsp;   
                <Link href="/" onClick={this.props.clearToken}>logout</Link>
                {/* {() => this.needLogout} */}
            </div>

        )
    }

}

export default Footer;