import { Link } from 'react-router-dom';
import './CartDisplay.css';

const CartDisplay = (props) => {

    const renderCartData = (data) => {
        const productData = (e) => {
            const product = JSON.parse(e.target.value);

            sessionStorage.setItem('login', 'false');
            sessionStorage.setItem('productData', JSON.stringify({"product":product}));
        }

        const removeItem = (e) => {
            e.preventDefault();
            props.remove(e.target.value);
        }

        if(data.cartData) {
            if(data.cartData.length > 0) {
                return data.cartData.map((item) => {
                    return (
                        <div className="cartContainer" key={item.id}>
                            <div className="row">
                                <div className="col-sm-5">
                                    <center>
                                        <img className="cartImage" src={item.product.main_image} alt="cartImage"/>
                                    </center>
                                </div>

                                <div className="col-sm-7">
                                    <Link to={`/detail/${item.product.asin}`} style={{textDecoration:'none'}}><h3 className="link">{item.product.title}</h3></Link>
                                    <p><b style={{color:'orange'}}>Rating: </b><span className="rating">{item.product.reviews.rating}</span> out of 5</p>
                                    <p><b>M.R.P: </b><del>Rs. {item.product.price.before_price}</del></p>
                                    <p><b>Price: </b>Rs.<b className="amount">{item.product.price.current_price}</b></p>
                                    <p><b>Saving: </b>Rs.{item.product.price.savings_amount}</p>
                                    <Link to="/buynow"><button onClick={productData} className="btn btn-warning" value={JSON.stringify(item.product)}>Buy Now</button></Link>
                                    &nbsp;
                                    &nbsp;
                                    <button onClick={removeItem} className="btn btn-danger" value={item.id}>Remove</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            else {
                return (
                    <div className="emptyCart">
                        <b>Oops...! Your Cart Is Empty</b>
                    </div>
                );
            }
        }
    }

    return (
        <div className="container">
            <h2 className="cartHeading">Shopping Cart</h2>
            {renderCartData(props)}
        </div>
    );
}

export default CartDisplay;