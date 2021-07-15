import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class Footer extends React.Component {

    render() {
        return (
            <div>
                <ButtonGroup variant="text" aria-label="text primary button group" >
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/about">About</Button>
                    <Button>Logout</Button>
                </ButtonGroup>
            </div>

        )
    }

}

export default Footer;