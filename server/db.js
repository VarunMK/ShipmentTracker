const Pool=require('pg').Pool;
require('dotenv').config()

const pool=new Pool({
    user:'postgres',
    password:process.env.password,
    host:'localhost',
    port:5433,
    database:'shipment'
});

module.exports=pool; 