import { Link } from 'react-router-dom';
import './SearchDisplay.css';

const SearchDisplay = (props) => {
    const renderSearch = (data) => {
        if(data){
            if(data.length > 0){
                return data.map((item) => {
                    return (
                        <div className="searchContainer" key={item.asin}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <center>
                                        <img src={item.thumbnail} alt="product-img"/>
                                    </center>
                                </div>

                                <div className="col-sm-8">
                                    <Link to={`/detail/${item.asin}`} style={{textDecoration:'none'}}><h3 className="link">{item.title}</h3></Link>
                                    <div>
                                        <p><b style={{color:'orange'}}>Rating: </b><span className="rating">{item.reviews.rating} </span>out of 5</p>
                                    </div>
                                    <div>
                                        <p>Rs.<b className="amount">{item.price.current_price}</b>&nbsp; &nbsp;<del>Rs.{item.price.before_price}</del></p>
                                    </div>
                                    <div>
                                        <p>You Save Rs.<b className="amount">{item.price.savings_amount}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            else{
                return (
                    <div className="noData">
                        <h3><b>No Data Found</b></h3>
                    </div>
                );
            }
        }
        else{
            return (
                <div className="loader">
                    <img src="/images/loader.gif" alt="loader"/>
                </div>
            );
        }
    }

    return (
        <div>
            {
                renderSearch(props.sData)
            }
        </div>
    );
}

export default SearchDisplay;