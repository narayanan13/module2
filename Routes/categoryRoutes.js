const express = require("express")
const router = express.Router()
const product = require('../Schema/productSchema');
const category = require("../Schema/categorySchema");

router.post('/categService', async (req, res) => {
    console.log("from the req in post api", req.body);
    const {categoryName}=req.body;
    try {
      // Check if the category name already exists in the database
      const existingCategory = await category.findOne({ categoryName});
  
      if (existingCategory) {
        return res.json({
          message: "Category name already exists",
        });
      }
      else{

        const data = new category(req.body);
        const result = await data.save();
    
        if (result) {
          res.json({
            message: "Success",
            id: result._id,
          });
        } else {
          res.json({
            message: "Failure",
          });
        }
      }
  
    } catch (err) {
      console.log("Error occurred in the API", err);
      res.json({
        message: "Failure",
      });
    }
  });
  
router.post('/addProductService', async(req, res)=>{
    console.log("from the req in post api", req.body);
    try{
        const data = new product(req.body);
        const result =await data.save();
        if(result){
            res.json({
                message:"success",
                id:result._id
            })
        }
        else{
            res.json({
                message:"failure"
            })
        }
    }
    catch(err){
        console.log("error occurred in the api ", err);
        res.json({
            message:"failure"
        })
    }
})

router.get('/getCategories', async(req,res)=>{
    const categories =await category.find();
    if(categories){
        res.json({
            categories:categories
        })
    }
    else{
        res.json({
            message:"no category found"
        })
    }
})

router.get('/getProducts', async(req,res)=>{
    const products =await product.find();
    if(products){
        res.json({
            products:products
        })
    }
    else{
        res.json({
            message:"no product found"
        })
    }
})
// router.post('/login', async(req,res)=>{
//     const {email, password} = req.body;
//     const users =await user.findOne({email});
//     if(users){
//         if(users.password == password){
//             res.json({
//                 message:"success"
//             })
//         }
//         else{
//             res.json({
//                 message:"wrong password"
//             })
//         }
//     }
//     else{
//         res.json({
//             message:"no user found"
//         })
//     }
// })
module.exports = router;