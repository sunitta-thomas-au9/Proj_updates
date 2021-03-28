import details from '../model/detailsModel.js';
import Details from '../model/detailsModel.js';
import Review from '../model/reviewModel.js';
import moment from 'moment';

//Add product detail
export const addNew = async (req, res) => {
    const { asin, title, description,reviews, price, discount, images, dimensions, weight, manufacturer, model_number, sold_by, brand } = req.body;
    const features = req.body.features.split(',');
    let cur_date = moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss');

    try {

        if(!req.session.user && req.session.user.role !=='Admin') {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        let data = {
            asin: asin,
            title: title,
            description: description,
            feature_bullets: features,
            reviews: reviews,
            price: price,
            total_images: images.length,
            images: images,
            product_information: {
                dimensions: dimensions,
                weight: weight,
                available_from: cur_date,
                available_from_utc: cur_date,
                manufacturer: manufacturer,
                model_number: model_number,
                sold_by: sold_by,
                fulfilled_by: "Amazed",
                brand: brand
            }
        }

        const asinPresent = await Details.findOne({"asin": asin});

        if(asinPresent) {
            return res.status(409).send({"err": "asin given by you is already present"})
        }

        const reviewData = {
            asin: asin
        }

        await Review.create(reviewData);

        const response = await Details.create(data);

        return res.status(200).send({"success":"Successfully Added the deatils"})
    }

    catch(error) {
        return res.status(409).send({"err":error.message});
    }
}

//Get detail
export const getDetail = async (req, res) => {
    try {
        const data = await details.findOne({"asin": req.params.asin});
        
        return res.status(200).send(data);
    }
    catch(error) {
        return res.status(409).send({"err": error.message});
    }
}

//Delete detail
export const deleteDetail = async (req, res) => {
    try {

        if(!req.session.user && req.session.user.role !=='Admin') {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const data = await Details.deleteOne({"asin": req.body.asin});

        return res.status(200).send({"success": "Deleted Successfully!"})
    }
    catch(error) {
        return res.status(409).send({"err": error.message});
    }
}