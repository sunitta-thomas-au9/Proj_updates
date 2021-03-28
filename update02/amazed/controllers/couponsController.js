import Coupons from '../model/couponsModel.js';
import { checkNumber } from '../utils/validator.js';
import moment from 'moment';

//Add new Coupon
export const AddNewCoupon = async(req, res) => {
    try {

        let cur_date = moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss');
        let expiry_date = moment(new Date(req.body.expiryDate)).format('YYYY-MM-DD HH:mm:ss');

        if(!req.session.user && req.session.user.role !=='Admin') {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const IsValidCat = checkNumber(req.body.categoryNumber);
        if(!IsValidCat){
            res.send("Invalid category number")
        }

        const IsValidDiscount = checkNumber(req.body.discountPercent);
        if(!IsValidDiscount){
            res.send("Invalid discount")
        }

        let couponData = {
            couponName: req.body.couponName,
            couponCode: req.body.couponCode.toUpperCase(),    
            createdDate: cur_date,
            category: req.body.category,
            categoryNumber: req.body.categoryNumber,
            discountPercent: req.body.discountPercent,
            expiryDate: expiry_date
        }
        const response = await Coupons.create(couponData)
        res.status(201).send({"success":"Successfully added the coupon"})
    }

    catch(error){
        res.status(409).send({"err":error.message})
    }
};

//list all the Coupons
export const listCoupons = async(req, res) => {

    try {
        if(!req.session.user) {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const response = await Coupons.find({}).sort({createdDate: -1})
        res.status(200).send(response)
    }

    catch(error){
        res.status(409).send({"err":error.message})
    }

}

// get coupon by categoryNumber
export const listCouponsByCat = async(req, res) => {

    if(!req.session.user) {
        return res.status(400).send('No Session Found! Please Login Again')
    }
    
    if(req.query.category) {
        const query = req.query.category	
        try {	
            const response = await Coupons.find({category:query})	
            res.status(200).send(response)	
        }	
        catch(error){	
            res.status(409).send({"err":error.message})	
        }
    }else {
        const query = req.query.categoryNumber
        try {
            const response = await Coupons.find({categoryNumber:query})
            res.status(200).send(response)
        }

        catch(error){
            res.status(409).send({"err":error.message})
        }
    }
}


// get coupon details
export const couponById = async(req, res) => {
    const id = req.params.id

    if(!req.session.user) {
        return res.status(400).send('No Session Found! Please Login Again')
    }

    try {
        const response = await Coupons.findById(id)
        res.status(200).send(response)
    }

    catch(error){
        res.status(409).send({"err":error.message})
    }

}

// delete coupon 
export const deleteItem = async(req, res) => {
    const id = req.params.id;
    try {

        if(!req.session.user && req.session.user.role !=='Admin') {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const response = await Coupons.findByIdAndDelete(id);
        res.status(204).send({"success":"successfully deleted"})
    }

    catch(error){
        res.status(404).send({"err":error.message})
    }

}

//update coupon
export const update = async(req, res) => {
    const id = req.params.id;
    try {

        if(!req.session.user ) {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const response = await Coupons.update(
            {_id: id},
            {
                $push: {
                    usedBy: req.body.email
                }
            }
        )

        return res.status(200).send("Updated Successfully")
    }
    catch(error) {
        return res.status(409).send({"err": error.message})
    }
}