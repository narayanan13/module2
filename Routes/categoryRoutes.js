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
  
// router.post('/addProductService', async(req, res)=>{
//     console.log("from the req in post api", req.body);
//     try{
//         const data = new product(req.body);
//         const result =await data.save();
//         if(result){
//             res.json({
//                 message:"success",
//                 id:result._id
//             })
//         }
//         else{
//             res.json({
//                 message:"failure"
//             })
//         }
//     }
//     catch(err){
//         console.log("error occurred in the api ", err);
//         res.json({
//             message:"failure"
//         })
//     }
// })

router.post('/addProductService', async (req, res) => {
  try {
      const { productName,categoryName,dateType,expiryDate,reminderDate } = req.body;

      // Check if a product with the same details (excluding expiryDate) already exists
      const existingProduct = await Product.findOne({productName,categoryName,dateType,expiryDate,reminderDate});

      if (existingProduct) {
          // Check if the expiry dates are different
          if (existingProduct.expiryDate !== expiryDate) {
              // If different expiry date, create a new product entry
              const newProduct = new Product({
                  productName,
                  categoryName,
                  dateType,
                  expiryDate,
                  reminderDate,
              });

              const result = await newProduct.save();
              res.json({
                  message: "success",
                  id: result._id
              });
          } else {
              // If the same expiry date, return a message or handle as needed
              res.json({
                  message: "failure"
              });
          }
      } else {
          // If it doesn't exist, create a new product entry
          const newProduct = new Product({
              productName,
              categoryName,
              dateType,
              expiryDate,
              reminderDate,
          });

          const result = await newProduct.save();
          res.json({
              message: "success",
              id: result._id
          });
      }
  } catch (err) {
      console.log("Error occurred in the API: ", err);
      res.status(500).json({
          message: "failure"
      });
  }
});

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