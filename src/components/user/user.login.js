import React from 'react';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
/* importing material */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


/* importing components */
import { renderTextField as InputField } from "../shared/form/Field";
import Snackbar from "../shared/Snackbar";
import { REQUIRED } from "../shared/form/Validation";
/* importing actions */
import { doLogin } from "../../store/modules/user/user.action";
/* importing css */
import "./style.css";

const form = "loginForm";

class UserLogin extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loading: false
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.profile){
            props.history.push("/");
            return {...state}
        }else if(props.loading !== state.loading){
            return {...state, loading: props.loading}
        }else{
            return state;
        }
    }

    onSubmit = (form) => {
        this.props.doLogin(form);
    }
    
    render(){
        const { handleSubmit } = this.props, {loading} = this.state;
        return (
            <div container component="main" id="main">
                {/* <Grid item xs={false} sm={4} md={7} className="left-image" /> */}
                {/* <Grid item xs={6} sm={6} md={6} component={Paper} elevation={6} square> */}

                    <div className="paper">
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className="login-form" noValidate id={form} onSubmit={handleSubmit(this.onSubmit)}>
                            
                            <Field component={InputField} type="text" variant="outlined" margin="normal" fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus validate={[REQUIRED]} disabled={loading}/>

                            <Field component={InputField} type="password" variant="outlined" margin="normal" fullWidth id="password" label="Password" name="password" validate={[REQUIRED]} disabled={loading}/>
                            
                            <Button type="submit" fullWidth variant="contained" color="primary" className="submit-btn" disabled={loading}>
                                Sign In &nbsp;{loading && <CircularProgress size={24}/>}
                            </Button>
                        </form>
                    </div>
                {/* </Grid> */}

                <Snackbar />
            </div>
        );
  }
}

const mapStateToProps = store => ({
    loading: store.user.loading || false,
    profile: store.user.profile || undefined,
});

export default connect(mapStateToProps, { doLogin })(reduxForm({form})(UserLogin));