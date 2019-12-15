import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';

/* importing components */
import UserLogin from "./components/user/user.login";
import UserDashboard from "./components/user/user.dashboard";
import Snackbar from "./components/shared/Snackbar";
import "./App.css";

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      profile: null
    }
  }

  static getDerivedStateFromProps(props, state){
    if(!props.profile){
      /* if user is not logged in  */
      props.history.push("/login");
      return null;
    }else{
      return {profile: props.profile};
    }
  }

  render(){
    let {profile} = this.props;

    return (
      <Grid container component="main" id="main">
          {profile ? <UserDashboard /> : <UserLogin />}
          <Snackbar />
      </Grid>
    );
  }
}

const mapStateToProps = store => ({
  profile: store.user.profile || undefined,
});

export default connect(mapStateToProps)(App);