import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import { clearError } from "../../store/modules/application/application.action";
import SnackbarContent from '@material-ui/core/SnackbarContent';

class Snack extends React.Component{
    constructor(props){
        super(props);

        this.state = { open: false };
    }

    handleClose = (event, reason) => {
        if (reason === 'timeout') { 
            this.props.clearError();
        }
    };

    static getDerivedStateFromProps(props, state){
        if(props.error && props.error.message){
            return {open:true}
        }else{
            return {open:false};
        }
    }

    render(){
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={6000}
                ContentProps={{ 'aria-describedby': 'message-id' }}
            >
                <SnackbarContent 
                    style={{ backgroundColor: this.props.error.type }}
                    message={<span id="client-snackbar">{this.props.error.message}</span>}
                />
            </Snackbar>
          );
    }
}

const mapStateToProps = state => ({ error: state.application.error });

const mapDispatchToProps = { clearError };

export default connect(mapStateToProps, mapDispatchToProps)(Snack);