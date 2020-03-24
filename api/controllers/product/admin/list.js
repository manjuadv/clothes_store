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

  Product.find({}).exec(function(err, products){
    if(err){
        res.send(500,{error:'db error'})
    }
    res.view('admin/product-list',{products:products});
  });

};
