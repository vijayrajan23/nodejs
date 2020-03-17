const express = require('express');
const dateFormat = require('dateformat');
const cors = require('cors');
const parser = require('body-parser');
const { Pool, Client } = require('pg');
const app = express();

const PORT = 3010;

app.use(parser.json());
app.use(parser.urlencoded({extended : false}));
app.use(cors());
//const connectionString = 'postgressql://postgres:root@localhost:56703/test';

const pool = new Pool({
  //  connectionString:connectionString
    host: '18.209.99.140',
    user: 'radiant',
    password:'radiant',
    database: 'testdb',
}) 
pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack) 
    } else {    
      console.log('connected')
    }
  })
  pool.query('SELECT * from  shop_details1', function(err, res) { 
    if(err) { 
    return console.error('error running query', err); 
    } 
    console.log('number:', res.fields[0].name);
    });
    
    app.get('/', (req, res) => {
    res.send({ message: 'endpoint working' });
    });
  


    /////////////////////////////////
  
     
    app.post('/shopData',function(req,res){
      console.log(34354354353535)
      console.log(req.body)
     pool.query(`INSERT INTO shop_details1 ( cust_id, div_name, point_pincode, point_location, radiant_loi_id, loi_date,customer_code, customer_pointcode,point_location_code, point_name, point_address, point_hierarchy, point_subcus_code, point_sol_id, point_div_code, point_phoneno, point_contact_name, point_mobile_no,point_email, point_servicetype, point_cash_limit,point_bank_type,point_pickup_type,point_type,point_activatio_date,point_deactivate_date, update_date, status) VALUES ( '${req.body.customerName}', '${req.body.divName}', '${req.body.pointPinCode}', '${req.body.pointLocation}', '${req.body.radiantLoiId}','${dateFormat(req.body.loiDate, "yyyy-mm-dd")}', '${req.body.customerCode}', '${req.body.customerPointCode}', '${req.body.pointLocationCode}', '${req.body.pointName}', '${req.body.pointAddress}', '${req.body.pointHierarchy}', '${req.body.pointSubCusCode}', '${req.body.pointSolId}', '${req.body.pointDivCode}', '${req.body.pointPhoneNo}', '${req.body.pointContactName}', '${req.body.pointMobileNo}', '${req.body.pointEmail}', '${req.body.pointServiceType}', '${req.body.pointCashLimit}', '${req.body.pointBankType}', '${req.body.pointPickupType}', '${req.body.pointType}', '${dateFormat(req.body.pointActivateDate, "yyyy-mm-dd")}','${dateFormat(req.body.pointDeactivationDate, "yyyy-mm-dd")}','${dateFormat(new Date(), "yyyy-mm-dd:h:mm:ss")}', 'Y')`, function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    }); 

    app.post('/get_shop_onload',function(req,res){
      pool.query(`SELECT * FROM shop_details1 where status='Y'`, function(err, result) {
        if (err) throw err;
        res.send(result.rows);
              // header part
      });
    });


    app.post('/UpdateShop',function(req,res){
      console.log();
      pool.query(`UPDATE shop_details1 SET 
      cust_id='${req.body.customerName}', div_name='${req.body.divName}', point_pincode='${req.body.pointPinCode}', point_location='${req.body.pointLocation}', radiant_loi_id='${req.body.radiantLoiId}', loi_date='${dateFormat(req.body.loiDate, "yyyy-mm-dd")}',customer_code='${req.body.customerCode}', customer_pointcode='${req.body.customerPointCode}',point_location_code='${req.body.pointLocationCode}', point_name='${req.body.pointName}', point_address='${req.body.pointAddress}', point_hierarchy='${req.body.pointHierarchy}', point_subcus_code='${req.body.pointSubCusCode}', point_sol_id='${req.body.pointSolId}', point_div_code='${req.body.pointDivCode}', point_phoneno='${req.body.pointPhoneNo}', point_contact_name='${req.body.pointContactName}', point_mobile_no='${req.body.pointMobileNo}',point_email='${req.body.pointEmail}', point_servicetype='${req.body.pointServiceType}', point_cash_limit='${req.body.pointCashLimit}',point_bank_type='${req.body.pointBankType}',point_pickup_type='${req.body.pointPickupType}',point_type='${req.body.pointType}',point_activatio_date='${dateFormat(req.body.pointActivateDate, "yyyy-mm-dd")}',point_deactivate_date='${dateFormat(req.body.pointDeactivationDate, "yyyy-mm-dd")}', update_date='${dateFormat(new Date(), "yyyy-mm-dd:h:mm:ss")}' where shop_id='${req.body.shopId}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
    app.post('/deleteShop',function(req,res){
      pool.query(`DELETE  FROM shop_details1 where shop_id=${req.body.shopId}`, function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
     app.post('/location',function(req,res){
       if(req.body.state=='all'){
        var qry="SELECT * FROM location_master"
       }else{
        var qry="SELECT * FROM location_master WHERE state='"+req.body.state+"'"
       }
      
      pool.query(qry, function(err, result) {
        if (err) throw err;
        res.send(result.rows);
              // header part
      });
    });
    app.post('/state',function(req,res){
      pool.query(`SELECT state FROM location_master GROUP BY state`, function(err, result) {
        if (err) throw err;
        res.send(result.rows);
              // header part
      });
    });

    app.post('/location_data', function(req, res) { 
  pool.query(`SELECT * FROM location_master ORDER BY RANDOM()` , function(err, result) {
      if(err) throw err;
      res.send(result.rows)
console.log(result.rows);
    });
});
    
    /////////////////////////////////
    app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
    });
