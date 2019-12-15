import React from 'react';
import { connect } from "react-redux";
import { colors } from "../../constant";
import session from "../../services/session";
/* importing material */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {DebounceInput} from 'react-debounce-input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

/* importing actions */
import { setNotification } from "../../store/modules/application/application.action";
/* importing api */
import { __api_searchPlanets } from "../../api/planet/api";
/* importing css */
import "./style.css";

const form = "loginForm";

class UserDashboard extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            search: "",
            planets: [],
            max: 0
        }
    }

    logout = () => {
        session.clear("profile");
        window.location.href = "/";
    }

    onChange = (evt) => {
        this.setState({ search: evt.target.value, loading: true })
        __api_searchPlanets({ search: evt.target.value})
        .then(response => {
            if(response.data && response.data.results){
                this.setState({ planets: response.data.results, max: this.getMaxPopulation(response.data.results), loading: false });

                if(!response.data.results.length) this.props.setNotification({ message: "No Planet Found! :(", type: "red"});
            }
        })
        .catch(err => this.setState({ planets: [], max: 0, loading: false }))     
    }

    getMaxPopulation = (planets) => Math.max.apply(Math, planets.map(o => (parseInt(o.population) || 0)));

    setWidth = (population) => {
        let w = (parseInt(population)/this.state.max)*100;
        return w >= 100 ? "100%" : `${w}%`;
    }
    
    render(){
        let { planets, loading, search } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12} sm={8} md={12} component={Paper} elevation={0} square>
                    <div className="">
                        <Typography className="heading" component="h1" variant="h5">
                            Search for Planets...
                        </Typography>
                        <div className = "container">
                            <Button type="button"  variant="contained" color="primary" className="submit-btn" onClick={this.logout}>
                                Logout
                            </Button>
                        </div>
                        <form className="login-form" noValidate id={form}>
                            <DebounceInput element={TextField} minLength={1} debounceTimeout={300} type="text" variant="outlined" margin="normal" fullWidth id="planet" label="Planet" name="search" onChange={this.onChange}/>
                        </form>
                    </div>
                </Grid>
                <div   className="result" sm={4} md={7}>
                    <div className='spinner-position'>
                        {loading && <CircularProgress />}
                        {search && !loading && <div className="planets">
                            {planets.map((planet, idx) => <Row key={planet.name} idx={idx} planet={planet} setWidth={this.setWidth} />)}
                        </div>}
                    </div>

                    <footer>
            
                    </footer>
                </div>
            </React.Fragment>
        );
  }
}

const Row = ({planet, idx, setWidth}) => {
    return(
        <div className="rowcont" id={idx} color={colors[idx]}>
            <div className="planet-title">&nbsp;{planet.name} &nbsp;<small>Total Population: {planet.population}</small></div>
            <div className="planet-color" style={{width: setWidth(planet.population), backgroundColor: colors[idx]}} key={planet.name}></div> 
        </div>
    );
}
const mapStateToProps = store => ({
    loading: store.user.loading || false,
    profile: store.user.profile || undefined,
});

export default connect(mapStateToProps, { setNotification })(UserDashboard);