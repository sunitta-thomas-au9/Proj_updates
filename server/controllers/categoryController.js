const Category = require('../model/categoryModel');

//add a category
exports.addNew = async(req,res) => {
    try {
        const data = {
            category:req.body.category,
            products:req.body.products
        }
        const response = await Category.create(data)
        res.status(200).send({"success":"Successfully Added the category"})
    }
    catch(error){
        res.status(200).send({"err":error.message})
    }
 
};

//get all category
exports.getCategory = async(req,res) => {
    try{
        const result = await Category.find({})
        if(result.length <1) return res.status(404).send({"err":"No Data Found"});
        res.status(200).send({"success":result})
    }
    catch(error){
        res.status(200).send({"err":error.message})
    }
};

//get category by name
exports.getCatByName = async(req,res) => {
    try{
        const category = req.params.category
        const result = await Category.findOne({category:category})
        if(result.length <1) return res.status(404).send({"err":"No Data Found"});
        res.status(200).send({"success":result})
    }
    catch(error){
        res.status(200).send({"err":error.message})
    }
};
//get category by Id
exports.getCatById = async(req,res) => {
    console.log("test1 ")
    try{
        const Id = req.params.id
        console.log(Id)
        const result = await Category.findById(Id)
        if(result.length <1) return res.status(404).send({"err":"No Data Found"});
        res.status(200).send({"success":result})
    }
    catch(error){
        res.status(200).send({"err":error.message})
    }
};

