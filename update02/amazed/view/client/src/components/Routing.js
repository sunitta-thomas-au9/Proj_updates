import { BrowserRouter, Route } from 'react-router-dom';	
import Header from './Header';	
import Footer from './Footer';	
import Home from '../container/Home';	
import Search from '../container/Search';	
import Detail from '../container/Detail';	
import About from './About';	
import ContactUs from '../container/ContactUs';	
import PlaceOrder from '../container/PlaceOrder';	
import Cart from '../container/Cart';	
import SignIn from '../container/SignInLogin/SignIn';	
import SignUp from '../container/SignInLogin/SignUp';	
import Dashboard from '../container/AdminDashboard';	
import GetUser from '../container/SignInLogin/GetUser';	
import Myorder from '../container/Myorder';	
import Coupon from '../container/Coupon';	
import CreateCoupon from '../container/CreateCoupon';	
import Profile from '../container/UserProfile';	
import UserCoupon from '../container/UserCoupons';	
import Product from '../container/Product';
import CreateProducts from '../container/CreateProducts';
import NotSignedIn from './SignInLogin/NotSignedIn';	
import PaymentProcess from '../container/PaymentProcess';	
import ThankYou from './ThankYou';	

const Routing = () => {	
    return (	
        <BrowserRouter>	
            <Header/>	
            <Route exact path='/' component={Home}/>	
            <Route path='/search' component={Search}/>	
            <Route path='/detail/:id' component={Detail}/>	
            <Route path='/buynow' component={PlaceOrder}/>	
            <Route path='/customer_cart' component={Cart}/>	
            <Route path='/about' component={About}/>	
            <Route path='/contact' component={ContactUs}/>	
            <Route path='/signin' component={SignIn}/>	
            <Route path='/signup' component={SignUp}/>	
            <Route path='/customer_orders' component={Myorder}/>	
            <Route path='/admin' component={Dashboard}/>	
            <Route path='/getUser' component={GetUser}/>	
            <Route path='/coupon' component={Coupon}/>	
            <Route path='/create_coupon' component={CreateCoupon}/>	
            <Route path='/usercoupon' component={UserCoupon}/>	
            <Route path='/profile' component={Profile}/>
            <Route path='/product' component={Product}/>	
            <Route path='/create_product' component={CreateProducts}/>
            <Route path='/notSignedIn' component={NotSignedIn}/>	
            <Route path='/payment' component={PaymentProcess}/>	
            <Route path='/thankyou' component={ThankYou}/>	
            <Footer/>	
        </BrowserRouter>	
    );	
}
	
export default Routing;	