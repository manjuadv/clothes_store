/**
 * Module dependencies
 */

// ...


/**
 * home.js
 *
 * Home something.
 */
module.exports = async function home(req, res) {

    Product.find({}).exec(function(err, products){
      if(err){
          res.send(500,{error:'db error'})
      }
      res.view('pages/homepage',{products:products});
    });

};
