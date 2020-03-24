/**
 * Module dependencies
 */

// ...


/**
 * product/create.js
 *
 * Create product.
 */
module.exports = async function create(req, res) {

  var name = req.body.name;
  var display_price = req.body.display_price;
  var description = req.body.description;


  req.file('display_image').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.serverError(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }

    var display_image = uploadedFiles[0].filename;

    // Get the base URL for our deployed application from our custom config
    // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
    //var baseUrl = sails.config.custom.baseUrl;

    Product.create({name:name, display_image:display_image, display_price:display_price, description:description}).exec(function(err){
      if(err){
          res.send(500,{error:'db error'})
      }
      res.redirect('/admin/product/list');
  });

  });

};
