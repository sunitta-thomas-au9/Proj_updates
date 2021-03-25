import express from 'express';
const transactionsRoutes = express.Router();
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../model/transctions.js';
// import config from '../config.js';
transactionsRoutes.route('/order').post(function(req,res){
    let instance = new Razorpay({
      key_id: 'rzp_test_7lDVwruhXd4VIB',
      key_secret: 'VDyuqiLigYUc13rlhhiBUPGo'
    })
    let options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture : 1
    };
    instance.orders.create(options, function(err, order) {
        if(err){
        return res.send(err)}
        else{
        return res.json(order)}
    });
  });

transactionsRoutes.route('/payment').post(function(req,res) {
    const generated_signature = crypto.createHmac('sha256','VDyuqiLigYUc13rlhhiBUPGo')
    generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.transactionid)
    if ( generated_signature.digest('hex') === req.body.razorpay_signature){
            const transaction = new Transaction({
              transactionid:req.body.transactionid,
              transactionamount:(req.body.transactionamount)/100,
          });
          transaction.save(function(err, savedtransac){
            if(err){
                console.log(err);
                return res.status(500).send("Some Problem Occured");
            }
            res.send({transaction: savedtransac});
        });
    }
    else{
      return res.send('failed');
    }
});

  export default transactionsRoutes;