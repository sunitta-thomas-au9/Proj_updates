import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component{
    constructor(){
        super()

        this.state={
            userName:'',
            loggedInEmail:'',
            error:''
        }
    }

    handleLogout=() => {
        sessionStorage.removeItem('_ltk');
        sessionStorage.removeItem('_rtk');
        this.props.history.push('/login')
    }

    render(){
        return(
            <div className="container">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h2>User profile details</h2>
                        <h2>{this.state.error}</h2>
                    </div>
                    <div className="panel-body">
                        <h2>Your registered user name is {this.state.userName}</h2>
                        <h3>Your registered email id is {this.state.userEmail}</h3>
                        <h4>You can find your previous orders @ <Link to="/orders" style={{color:"red"}}>Orders</Link></h4>
                        <h4>You can find your items on cart @ <Link to="/cart" style={{color:"red"}}>Cart</Link></h4>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            userName:sessionStorage.getItem('userName'),
            userEmail:sessionStorage.getItem('loggedInEmail')
        })
    }
}


export default Profile