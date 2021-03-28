import Products from '../model/productsModel.js';
import Details from '../model/detailsModel.js';
import Review from '../model/reviewModel.js';
import moment from 'moment';

//add a product
export const addNew = async(req,res) => {

    const asin = req.body.asin.toUpperCase();
    const { category, product, type, price, reviews, title, thumbnail, description, images, dimensions, weight, manufacturer, model_number, sold_by, brand } = req.body;
    const newProduct = new Products({ asin, category, product, type, price, reviews, title, thumbnail });
    const features = req.body.features.split(',');

    let cur_date = moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss');

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

    const reviewData = {
        asin: asin
    }

    try {

        const asinPresent = await Details.findOne({"asin": asin});

        if(asinPresent) {
            return res.status(409).send({"err": "asin given by you is already present"})
        }
       
        await newProduct.save()

        await Details.create(data);

        await Review.create(reviewData);


        return res.status(200).send({"success":"Successfully Added the product"})
    }
    catch(error){
        res.status(409).send({"err":error.message})
    }
};

//add multiple products
export const addMultiple = async(req,res) => {

    if(!req.session.user && req.session.user.role !=='Admin') {
        return res.status(400).send('No Session Found! Please Login Again')
    }

    const data = req.body.products
    
    try {       
        const response = await Products.create(data)
        res.status(201).send({"success":"Successfully placed the order"})
    }
    catch(error){
        res.status(409).send({"err":error.message})
    }
 
};


//get all products
export const getProducts = async(req,res) => {
    try{

        if(!req.session.user) {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        const result = await Products.find({})
        if(result.length <1) return res.status(404).send({"err":"No Data Found"});
        res.status(200).send(result)
    }
    catch(error){
        res.status(404).send({"err":error.message})
    }
};

//get products by category or (product and type) or asin
export const getProdsByCategory = async(req,res) => {
    try{
        if(!req.session.user) {
            return res.status(400).send('No Session Found! Please Login Again')
        }
        const category = req.query.category;
        const product = req.query.product;
        const type = req.query.type;
        const asin = req.query.asin;

        if(category && product && type) {
            const result = await Products.find({
                $and:[{category:category}, {product:product}, {type:type}]
            })

            return res.status(200).send(result)
        }else if(category && (product || type)) {

            return res.status(409).send({"err": "Some paramter is missing"});           
        }else if(category){
            const result = await Products.find({category:category});

            return res.status(200).send(result)
        }else if(asin){
            const result = await Products.find({asin:asin});

            return res.status(200).send(result)
        }
    }
    catch(error){
        return res.status(404).send({"err":error.message})
    }
};

//delete product 
export const deleteProduct = async (req, res) => {
    try {
        
        if(!req.session.user && req.session.user.role !=='Admin') {
            return res.status(400).send('No Session Found! Please Login Again')
        }

        await Products.findByIdAndDelete(req.params.id);

        return res.status.send({"success": "Product deleted successfully"})
    }
    catch(error) {
        return res.status(409).send({"err": error.message})
    }
}