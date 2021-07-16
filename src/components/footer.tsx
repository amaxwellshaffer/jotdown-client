import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

interface IProps { clearToken : () => void};
interface IState {};
class Footer extends React.Component <IProps, IState> {

    render() {
        return (
            <div>
                <ButtonGroup variant="text" aria-label="text primary button group" >
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/about">About</Button>
                    <Button onClick={this.props.clearToken} component={Link} to="/">Logout</Button>
                </ButtonGroup>
            </div>

        )
    }

}

export default Footer;