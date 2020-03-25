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

  await req.file('display_image_file').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000,
    //dirname: require('path').resolve(sails.config.appPath, 'uploads/images/display'),
  },async function whenDone(err, uploadedFiles) {
    if (err) {
      return res.serverError(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }

    var display_image = uploadedFiles[0].filename;

  try {
    var prod = await Product.create({name:name, display_image:display_image, display_price:display_price, description:description}).fetch();
  
    var fs = require('fs');
    var file_name = require('path').resolve(sails.config.appPath, 'uploads/images/display') + '\\' + prod.id + '.jpg';
    var src = uploadedFiles[0].fd;

    fs.copyFile(src,  file_name, (err) => {
      if (err) throw err;
      
    });

    var messages = { success: [], error: [], warning: [] };
    messages['success'].push('Product added successfully');
    return res.view('admin/new-product',{layout: 'layouts/layout-admin', messages:messages});

  } catch (err) {
    if (err && err.code === 'E_UNIQUE') {
      return res.sendStatus(409);
    } else if (err && err.name === 'UsageError') {
      return res.badRequest();
    } else if (err) {
      return res.serverError(err);
    }
  }

  });

};
