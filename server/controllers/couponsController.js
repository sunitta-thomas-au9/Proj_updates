import Coupons from '../model/couponsModel.js';
import moment from 'moment';

//Add new Coupon
export const AddNewCoupon = async(req, res) => {
    let cur_date = moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss');
    let exp_date = moment(new Date(req.body.expiryDate)).format('YYYY-MM-DD HH:mm:ss');
    let coupon = {
        couponName:req.body.couponName,
        couponCode:req.body.couponCode,    
        createdDate:cur_date,
        discount: req.body.discount,
        expiryDate:exp_date
    }

    try {
        const response = await Coupons.create(coupon)
        res.status(201).send({"success":"Successfully added the coupon"})
    }

    catch(error){
        res.status(409).send({"err":error.message})
    }
};

//list all the Coupons
export const listCoupons = async(req, res) => {

    try {
        const response = await Coupons.find({})
        res.status(201).send(response)
    }

    catch(error){
        res.status(409).send({"err":error.message})
    }

}

