import mongoose from "mongoose";
const TansactionSchema = mongoose.Schema({
    transactionid:{
        type:String
    },
    transactionamount:{
        type:String
    },
});
const transactions = new mongoose.model('transactions',TansactionSchema);

export default transactions