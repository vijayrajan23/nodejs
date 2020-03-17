const express = require('express');
const multer = require('multer');
const dateFormat = require('dateformat');

const app = express();
const db = require('./db');
const cors = require('cors');
const parser = require('body-parser');
const geoip = require('geoip-lite');
var payumoney = require('payumoney-node');
payumoney.setKeys('tmlFmBeB', 'WftqXiC8o6', 'Il0pEGDZiGMBDBD7DXVcJK/Jd5JGgjdzfZWjN77ojdg=');
payumoney.isProdMode(false);

app.use(parser.json());
app.use(parser.urlencoded({extended : false}));
app.use(cors());

app.post('/location',function(req,res){
       if(req.body.state=='all'){
        var qry="SELECT * FROM location_master"
       }else{
        var qry="SELECT * FROM location_master WHERE state='"+req.body.state+"'"
       }
      
      db.query(qry, function(err, result) {
        if (err) throw err;
        res.send(result);
              // header part
      });
    });

app.post('/get_region',function(req,res){
    db.query("SELECT region_id,region_name FROM region_master where status='Y'", function(err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.post('/get_location',function(req,res){
    db.query("SELECT location_id,location_name FROM location_master where status='Y'", function(err, result) {
      if (err) throw err;
      res.send(result);
    }); 
});
app.post('/get_client',function(req,res){
    db.query("SELECT client_id,client_name FROM client_master where status='Y'", function(err, result) {
      if (err) throw err;
      res.send(result);
    });  
});
app.post('/get_customer',function(req,res){
    db.query(`SELECT customer_id,customer_name FROM cust_master where status='Y' and client_id=${req.body.clientId}`, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
});


// get customer for shop details raman 2020-02-07
app.post('/get_customer_onload',function(req,res){
  db.query(`SELECT customer_id,customer_name FROM cust_master where status='Y'`, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
 
app.post('/shopData',function(req,res){
  db.query(`INSERT INTO shop_details1 (shop_id, cust_id, div_name, point_pincode, point_location, radiant_loi_id, loi_date,customer_code, customer_pointcode,point_location_code, point_name, point_address, point_hierarchy, point_subcus_code, point_sol_id, point_div_code, point_phoneno, point_contact_name, point_mobile_no,point_email, point_servicetype, point_cash_limit,point_bank_type,point_pickup_type,point_type,point_activatio_date,point_deactivate_date, update_date, status) VALUES (NULL, '${req.body.customerName}', '${req.body.divName}', '${req.body.pointPinCode}', '${req.body.pointLocation}', '${req.body.radiantLoiId}','${dateFormat(req.body.loiDate, "yyyy-mm-dd")}', '${req.body.customerCode}', '${req.body.customerPointCode}', '${req.body.pointLocationCode}', '${req.body.pointName}', '${req.body.pointAddress}', '${req.body.pointHierarchy}', '${req.body.pointSubCusCode}', '${req.body.pointSolId}', '${req.body.pointDivCode}', '${req.body.pointPhoneNo}', '${req.body.pointContactName}', '${req.body.pointMobileNo}', '${req.body.pointEmail}', '${req.body.pointServiceType}', '${req.body.pointCashLimit}', '${req.body.pointBankType}', '${req.body.pointPickupType}', '${req.body.pointType}', '${dateFormat(req.body.pointActivateDate, "yyyy-mm-dd")}','${dateFormat(req.body.pointDeactivationDate, "yyyy-mm-dd")}','${dateFormat(new Date(), "yyyy-mm-dd:h:mm:ss")}', 'Y')`, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
}); 

app.post('/get_shop_onload',function(req,res){
  db.query(`SELECT * FROM shop_details1 where status='Y'`, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/deleteShop',function(req,res){
  db.query(`DELETE  FROM shop_details1 where shop_id=${req.body.shopId}`, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/UpdateShop',function(req,res){
  console.log();
  db.query(`UPDATE shop_details1 SET 
  cust_id='${req.body.customerName}', div_name='${req.body.divName}', point_pincode='${req.body.pointPinCode}', point_location='${req.body.pointLocation}', radiant_loi_id='${req.body.radiantLoiId}', loi_date='${dateFormat(req.body.loiDate, "yyyy-mm-dd")}',customer_code='${req.body.customerCode}', customer_pointcode='${req.body.customerPointCode}',point_location_code='${req.body.pointLocationCode}', point_name='${req.body.pointName}', point_address='${req.body.pointAddress}', point_hierarchy='${req.body.pointHierarchy}', point_subcus_code='${req.body.pointSubCusCode}', point_sol_id='${req.body.pointSolId}', point_div_code='${req.body.pointDivCode}', point_phoneno='${req.body.pointPhoneNo}', point_contact_name='${req.body.pointContactName}', point_mobile_no='${req.body.pointMobileNo}',point_email='${req.body.pointEmail}', point_servicetype='${req.body.pointServiceType}', point_cash_limit='${req.body.pointCashLimit}',point_bank_type='${req.body.pointBankType}',point_pickup_type='${req.body.pointPickupType}',point_type='${req.body.pointType}',point_activatio_date='${dateFormat(req.body.pointActivateDate, "yyyy-mm-dd")}',point_deactivate_date='${dateFormat(req.body.pointDeactivationDate, "yyyy-mm-dd")}', update_date='${dateFormat(new Date(), "yyyy-mm-dd:h:mm:ss")}' where shop_id='${req.body.shopId}'`, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
// raman end 2020-02-07

app.post('/get_shopinfo',function(req,res){
    db.query(`SELECT shop_id,shop_name FROM shop_details where status='Y' and cust_id=${req.body.custId}`, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.post('/push_trans',function(req,res){
    db.query(`INSERT INTO  transaction(transaction_type,
      upload_status,transaction_date,amount,region_id,
      client_id,customer_id,shop_id,shop_name,ce_id,
      remarks,status,deposit_type,approval_status)VALUES('${req.body.pickupType}','0','${req.body.pickupDate}','${req.body.pickupAmount}','${req.body.regionName}','${req.body.clientName}','${req.body.customerName}','${req.body.shopCode}','${req.body.shopName}','${req.body.ceName}','done','Y','deposite','0')`, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
});
/// import and insert transaction using xlsx 

app.post('/bulk_trans',function(req,res){
  var data = req.body;
  console.log(data.length);
  for (let index = 1; index < data.length; index++) 
  {
  
    if(data[index][0] != undefined){
    
  var queryString="INSERT INTO `transaction`(transaction_type,upload_status,transaction_date,amount,region_id,client_id,customer_id,shop_id,shop_name,ce_id,remarks,status,deposit_type,approval_status) VALUES ('"+data[index][6]+"','0','2020-02-04','"+data[index][5]+"','"+data[index][0]+"','"+data[index][1]+"','"+data[index][2]+"','"+data[index][3]+"','"+data[index][4]+"','"+data[index][7]+"','done','Y','deposite','0')";
    db.query(queryString, function(err, result) {
    if (err) throw err;
    }); 
  
  } 
  } 
  });
  

//////  ------------------------------------
app.post('/push_at_load_transaction',function(req,res){
  var qry="SELECT transaction.*,region_master.region_id,region_master.region_name,cust_master.customer_name,client_master.client_name,client_master.client_id,cust_master.customer_id FROM transaction JOIN cust_master ON transaction.customer_id=cust_master.customer_id JOIN region_master ON transaction.region_id=region_master.region_id  JOIN client_master ON cust_master.client_id=client_master.client_id WHERE  transaction.status='Y' AND transaction.upload_status=0"
  db.query(qry,function(err,result){
  res.send(result);
  })
   });
  
  app.post('/delete_transaction',function(req,res){
  var id=req.body.id;
  console.log(id);
  var qry="DELETE FROM `transaction` WHERE id='"+id+"'"
  db.query(qry,function(err,result){
  res.send(result);
  })
   });
   
   app.post('/update_transaction_view',function(req,res){
   var id=req.body.tx_id;
   
  var qry="UPDATE `radmus`.`transaction` SET transaction_type='"+req.body.pickupType+"',transaction_date='"+req.body.pickupDate+"',amount='"+req.body.pickupAmount+"',region_id='"+req.body.regionName+"', client_id='"+req.body.clientName+"',customer_id='"+req.body.customerName+"',shop_id='"+req.body.shopCode+"',shop_name='"+req.body.shopName+"',ce_id='"+req.body.ceName+"' WHERE id='"+id+"'"
  console.log(qry);
  db.query(qry,function(err,result){
  res.send(result);
  })
  });
//////  ------------------------------------


app.post('/bulk_trans',function(req,res){
var data = req.body;
console.log(data.length);
for (let index = 1; index < data.length; index++) 
{

  if(data[index][0] != undefined){
  
var queryString="INSERT INTO `transaction`(transaction_type,upload_status,transaction_date,amount,region_id,client_id,customer_id,shop_id,shop_name,ce_id,remarks,status,deposit_type,approval_status) VALUES ('"+data[index][6]+"','0','"+data[index][8]+"','"+data[index][5]+"','"+data[index][0]+"','"+data[index][1]+"','"+data[index][2]+"','"+data[index][3]+"','"+data[index][4]+"','"+data[index][7]+"','done','Y','deposite','pending')";
  db.query(queryString, function(err, result) {
  if (err) throw err;
  }); 

} 
} 
});


/// vijay receipt upload 

app.post('/register',function(req,res){
  var name=req.body.name;
 
    var qry="INSERT INTO `radmus`.`user_master` (  `username` , `email` , `password` ,  `phone` ,`role`) VALUES ('"+req.body.name+"', '"+req.body.email+"','"+req.body.password+"','"+req.body.mobile+"','"+req.body.designation+"')";
    console.log(qry)
    db.query(qry,function(err,result){
        res.send(result);
    })
  });
  
  app.post('/region_data', function (req, res) {          
    var qry="SELECT region_id,region_name FROM `region_master` WHERE status='Y'";
    db.query(qry,function(err,result){
      
          res.send(result);
    });
  });
  app.post('/client_data', function (req, res) {          
    var qry="SELECT client_id,client_name FROM `client_master` WHERE status='Y'";
    db.query(qry,function(err,result){
        res.send(result);
        
    });
  });
  app.post('/customer_data',function(req,res){
    var qry="SELECT customer_id,customer_name FROM `cust_master` WHERE client_id='"+req.body.client_id+"'";
    db.query(qry,function(err,result){  
      res.send(result);
    })
    
  });
  app.post('/transaction',function(req,res){
  
    var qry="SELECT transaction.*,region_master.region_name,cust_master.customer_name,client_master.client_name FROM transaction JOIN cust_master ON transaction.customer_id=cust_master.customer_id JOIN region_master ON transaction.region_id=region_master.region_id  JOIN client_master ON cust_master.client_id=client_master.client_id WHERE transaction.transaction_type='"+req.body.Transaction_type+"' AND transaction.upload_status='"+req.body.Transaction_status+"' AND transaction.transaction_date='"+req.body.Date+"' AND transaction.region_id='"+req.body.Region_Name+"' AND  transaction.customer_id='"+req.body.Customer_Name+"' AND transaction.ce_id='"+req.body.CEs_Name+"' AND transaction.status='Y'";
    
    db.query(qry,function(err,result){
      res.send(result);
    });

  });
  app.post('/at_load_transaction',function(req,res){
    var qry="SELECT transaction.*,region_master.region_name,cust_master.customer_name,client_master.client_name FROM transaction JOIN cust_master ON transaction.customer_id=cust_master.customer_id JOIN region_master ON transaction.region_id=region_master.region_id  JOIN client_master ON cust_master.client_id=client_master.client_id WHERE  transaction.status='Y'"
    db.query(qry,function(err,result){
        res.send(result);
    })
  });


// end vijay

// receipt upload start

app.post('/submit_receipt',function(req,res){
  var Transaction_id=req.body.Transaction_id;
  var json=req.body.addresses;
  var len= Object.keys(json).length;
  var record=[];
  for (var i = 0; i < len; i++) {
       
      var si=req.body.addresses[i].Scan_image;
      var Scan_image=si.replace('C:\\fakepath\\','');
      record.push([Transaction_id,Scan_image, req.body.addresses[i].amount, req.body.addresses[i].receipt_no, req.body.addresses[i].type_deposite,req.body.addresses[i].dep_branch, req.body.addresses[i].collection_remark,req.body.addresses[i].remark1,'Y'])

  }

 
 console.log(Transaction_id)
  var qry="INSERT INTO receipt_upload ( `transaction_id`, `receipt_image`, `pickup_amount`, `receipt_no`, `deposite_type`, `deposite_branch`, `collection_remarks`, `other_remarks`, `status`) VALUES ?;UPDATE transaction SET upload_status='1' WHERE id=?";
      db.query(qry, [record,Transaction_id],function(err,result){
 
      });

  
});

// receipt upload end

// view trans start 
 //raghu start
 app.post('/view_trans',function(req,res){
  var sql = "SELECT * FROM transaction AS trans LEFT JOIN receipt_upload AS receipt ON trans.id=receipt.transaction_id WHERE trans.status='Y' AND receipt.status='Y' AND trans.id ='"+req.body.trans_id+"' ";
  db.query(sql,function(err,result){
  res.send(result);
   });
  });
  app.post('/trans',function(req,res){
    var sql = "SELECT transaction.*,region_master.region_name,cust_master.customer_name,client_master.client_name FROM transaction JOIN cust_master ON transaction.customer_id=cust_master.customer_id JOIN region_master ON transaction.region_id=region_master.region_id  JOIN client_master ON cust_master.client_id=client_master.client_id JOIN receipt_upload  ON transaction.id=receipt_upload.transaction_id  WHERE transaction.status='Y' AND receipt_upload.status='Y' group by receipt_upload.transaction_id";
    db.query(sql,function(err,result){
    res.send(result);
     });
    });
  //end raghu
// view trans  end 

//ram start start
app.post('/approve_status',function(req,res){
  var sql = "UPDATE transaction SET approval_status='"+req.body.ap_status+"' where  id ='"+req.body.tx_id+"' ";
  db.query(sql,function(err,result){
  res.send(result);
   });
  });
// ram end 
// selva 
//user's info
app.post('/get_userinfo',function(req,res){
  db.query(`SELECT * FROM user_master` , function(err, result) {
   // if (err) throw err;
    res.send(result);
  });
});
//login user's info
app.post('/loginUserInfo',function(req,res){
  db.query(`SELECT * FROM user_master where username ='${req.body.username}' and password='${req.body.password}'` , function(err, result) {
   console.log(result.length)
  if (result.length == 0)
  {
    res.send([{"error":"Entered username and password are invalid"}]);
   }
   else{
    res.send(result);
   }
  });
});

//user's info Add
app.post('/userinfoAdd',function(req,res){
  db.query(`INSERT INTO user_master(username, email, password, phone, role) VALUES('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', '${req.body.role}')`, function(err, result) {
    res.send(result);
  });
});
//user's info Update
app.post('/userinfoUpdate',function(req,res){
  db.query(`UPDATE user_master SET username = '${req.body.username}', email = '${req.body.email}', password = '${req.body.password}', phone = '${req.body.phone}', role = '${req.body.role}' WHERE user_master.id = '${req.body.id}'`
  , function(err, result) {
    res.send(result);
  });
});

//user's info delete
app.post('/userinfoDelete',function(req,res){
  db.query(`DELETE  FROM user_master where id ='${req.body.id}'` , function(err, result) {
   
    res.send(result);
  });
});

//client view start
app.post('/get_clientCustomer',function(req,res){
  db.query(` SELECT * FROM cust_master WHERE client_id = '17'`, function(err, result) {
   // if (err) throw err;
    res.send(result); 
  });
});



app.post('/get_clientCustomerData',function(req,res){
  db.query(`SELECT  t.id,t.transaction_type,ru.receipt_image,ru.deposite_type, t.transaction_date,t.ce_id,t.amount, t.region_id, t.shop_name,cm.customer_name,rg.region_name  FROM transaction t inner join cust_master cm on (cm.customer_id = t.customer_id) inner join region_master rg on (rg.region_id =t.region_id) inner join receipt_upload ru on (t.id =ru.transaction_id)  WHERE t.transaction_type='${req.body.serviceType}' and t.upload_status='1' and  t.transaction_date ='${req.body.Date}' and t.region_id ='${req.body.regionId}' and ru.deposite_type='${req.body.depositType}' and t.customer_id ='${req.body.customerId}' and   t.status ='Y' `,function(err,result){
    if(err) throw err;
    res.send(result);
     
  });

});

//client view end
// selva end

// file upload start ----------------------
var storage = multer.diskStorage({
 destination: './src/assets/uploads',
 filename: function (req, file, cb) {

     cb(null, file.originalname)
 
 }
});
const upload = multer({ storage: storage });
// // type 1 end +`-`
app.post('/upload_reciept', upload.single('scan_image'), (req, res, next) => {
 const file = req.file;
 if (!file) {
   const error = new Error('No File')
   return next(error)
 }
   res.send(file);
});
//payment
app.post('/find_ip',function(req,res){
var ipd=req.body.ip_address;
var ip = ipd;
var geo = geoip.lookup(ip);
res.send(geo);
});

app.post('/add_user_cart',function(req,res,next){
 
    var qry="INSERT INTO `cart_user` ( User_name, Password, Email, Mobile, DOB, Address, skils, Gender) VALUES ('"+req.body.uname+"','"+req.body.password+"','"+req.body.email+"','"+req.body.Mobile+"','"+req.body.date_of_birth+"','"+req.body.address+"','"+req.body.skils+"','"+req.body.gender+"');"

    db.query(qry,function(err,result){
      res.send(result);
    });

});

app.post('/get_product_for_display',function(req,res,next){
 //var cn=;
 console.log(req.body.country);
  var qry="SELECT * FROM shoping_product WHERE country='"+req.body.country+"'"
  console.log(qry)
  db.query(qry,function(err,result){
    res.send(result);
  });

});
app.post('/pay',function(req,res,next){
  console.log('work')

var paymentData = {
  productinfo: req.body.productinfo,
  txnid: "1312deq31231233",
  amount:req.body.amount,
  email:req.body.email,
  phone: req.body.phone,
  lastname:req.body.lastname,
  firstname:req.body.firstname,
  surl:  "http://18.212.126.242:4200/home",
  furl:  "http://18.212.126.242:4200/home"
};
payumoney.makePayment(paymentData, function(error, response) {
  if (error) {
    console.log(11)
       } else {
        var jj={'payment_link':response}
        res.send(jj);
       
       }
});

// payumoney.paymentResponse("txnid", function(error, response) {
//   if (error) {
//   } else {
//     console.log(response);
//   }
// });
});

//paymant gateway end
app.listen(3008,(err)=>{
 console.log("port listening on 3008");
});