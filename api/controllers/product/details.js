/**
 * Module dependencies
 */

// ...


/**
 * product/list.js
 *
 * List product.
 */
module.exports = async function list(req, res) {

    Product.findOne({id:req.params.id}).exec(function(err, product){
        if(err){
            res.send(500,{error:'db error'})
        }
        res.view('pages/product-details', {product:product})
    });
  
  };
  