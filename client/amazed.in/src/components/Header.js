import React from 'react';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            loggedIn: false
        }
    }

    componentDidMount() {
        this.setState({
            userName: sessionStorage.getItem('userName')
        })
    }

    componentDidUpdate() {
        let user = sessionStorage.getItem('userName');

        if(user && !this.state.loggedIn) {
            this.setState({
                userName: user,
                loggedIn: true
            });
        }  
    }

    checkForAdmin = () => {
        if(sessionStorage.getItem('role') === 'Admin') {
            return (
                <li>
                    <button className="adminHeader">
                        <Link style={{textDecoration:'none', color:'white'}} to="/admin"><i className="fa fa-user"></i> Admin</Link>
                    </button>
                </li>
            );
        }
    }

    renderSearch = () => {
        const searchQuery = document.getElementsByClassName('search')[0];
        if(searchQuery.value){
            this.props.history.push(`/search?k=${searchQuery.value}&category=aps`);
            searchQuery.value = '';
        }
        else{
            alert("Search Box Should Not Be Empty.")
        }
    }

    renderEnter = (e) => {
        const searchBtn = document.getElementsByClassName('search-btn')[0];
        if(e.which === 13 || e.keyCode === 13) {
            searchBtn.click();
        }
    }

    handleLogout = () => {    
        this.setState({
            userName: '',
            loggedIn: false
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('_rtk');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('loggedInEmail');
        sessionStorage.removeItem('asin');
        sessionStorage.removeItem('clogin');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('createAdmin');
        this.props.history.push('/signin');   
    }

    CondtionalRender = () => {
        if(this.state.userName === '' || this.state.userName === undefined || this.state.userName === null){
            return(
                <>

                    <li>
                        <button className="logout"><Link className="logout" style={{textDecoration:'none'}} to="/signup">
                            <i className="fa fa-sign-in"></i> SignUp / SignIn</Link>
                        </button>
                    </li>
                
                </>
            );
        }
        else {
            return(
                <>
                    {/* <li className="welcome-messge">Welcome {sessionStorage.getItem('userName')}</li> */}
                    {this.checkForAdmin()}
                    <li>
                        <button className="logout">
                            <Link className="logout" style={{textDecoration:'none'}} to="/orders">
                                <i className="fa fa-list" aria-hidden="true"></i> Orders
                            </Link>
                        </button>
                    </li>

                    <li>
                        <button className="cart">
                            <Link style={{textDecoration:"none", color:'white'}} to="/cart"><i className="fa fa-cart-plus"></i> Cart</Link>
                        </button>
                    </li>   

                    <li>
                        <button className="logout" onClick={this.handleLogout}>
                            <i className="fa fa-sign-out"></i>Signout
                        </button>
                    </li>
                </>
            ) 
        }

    }
    
    render() { 
        return (
            <header>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="brandlink">
                                <Link to='/' className="navbar-brand"><b id="brand">amazed</b>.in</Link>
                            </span>
                        </div>

                        <div className="searchbar">
                            <input onKeyPress={this.renderEnter} className="search" type="text" placeholder="Search"/>

                            <button onClick={this.renderSearch} className="search-btn"><i className="fa fa-search"></i></button>
                        </div>
                            
                        <ul className="nav navbar-nav navbar-right">
                            {this.CondtionalRender()}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);