var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');

var Product = require('../models/product');
var Order = require('../models/order');
const Poll =require('../models/poll');

const { Paynow } = require("paynow");

var path = require('path');


/*
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



var upload = multer({
    storage:storage
})
*/





router.get('/',function(req, res, next){
    var successMsg = req.flash('success')[0];
    Product.find({status:'best'},function (err, docs) {
        console.log(docs.length,'size')
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('index',{products: productChunks,successMsg: successMsg, noMessages: !successMsg})
    })
   
    
  })

  /*
router.get('/about',function(req,res){
    res.render('abt')
})
*/

router.get('/shop',function(req, res, next){
    Product.find({},function (err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('all',{products: productChunks})
    })
   
    
  })


  router.get('/cart', function(req, res, next) {

    if (!req.session.cart) {
        return res.render('cartX', {products: null});
    } 
     var cart = new Cart(req.session.cart);
     console.log(cart.generateArray(),'vhura cart')
     res.render('cartX', {products: cart.generateArray(), totalPrice: cart.totalPrice});
 });


  router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    console.log(productId,'smolich')
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var total

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/sec');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(product.id,'product')
        console.log(productId,'productId')
      
       
        //res.send(cart);
       // console.log(req.session.cart);
       res.send(cart);
    });
});



router.get('/add-to-cart1/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    });
});



router.post('/checkout',isLoggedIn,  function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        "sk_test_IbxDt5lsOreFtqzmDUFocXIp0051Hd5Jol"
    );

   

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source:  "tok_mastercard", // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
       
            console.log(err.message)
            console.log(req.body.slot,'ma1')
            return res.redirect('/');
        }
        var order = new Order({
         
            cart: cart,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            console.log('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    }); 
});




//enterprise A

router.get('/paynow',isLoggedIn, function(req,res){
    var m = moment()
  
    var date = moment().toString();

  
    const { Paynow } = require("paynow");
    // Create instance of Paynow class
    let paynow = new Paynow(14808, "e351cf17-54bc-4549-81f2-b66feed63768");
    var amount , pollCount, duration
    Subscriptions.find({},function(err,docs){
     // amount = docs[0].startup
     amount = 100
   
      
    
    let payment = paynow.createPayment("Subscription");
  
    
  // Add items to the payment list passing in the name of the item and it's price
  payment.add("Sparex Payment", amount);
  // Send off the payment to Paynow
  paynow.send(payment).then( (response) => {
  
      if(response.success) {
          // Get the link to redirect the user to, then use it as you see fit
          let link = response.redirectUrl;
  
          let pollUrl = response.pollUrl;
  
          var poll = new Poll();
   
          poll.pollUrl = pollUrl;
      
          poll.date = date;
          poll.amount = amount
         
          poll.save()
             .then(poll =>{
             
             
          
  
  
  
                res.redirect(link)
             })
      }
      else{
  res.redirect('/cart')
      }
    })
    })
  })
  

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

//pk_test_RBqRxgcTy9sSIwuiB62CEC5v00OTSiSYKr
//sk_test_IbxDt5lsOreFtqzmDUFocXIp0051Hd5Jol