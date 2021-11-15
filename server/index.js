const express=require('express');
const cors=require('cors');
const pool=require('./db');

const app=express();

app.use(cors());
app.use(express.json());

app.post("/createclient",async(req,res)=>{
    try{
        const {client_id,name,ph_num,email,addr}=req.body;
        const q1=await pool.query('INSERT INTO client values($1,$2,$3,$4,$5);',[client_id,name,ph_num,email,addr]);
        res.json(q1.rows[0]);
    }catch(err){
        return res.status(201).json({
            message:'Error'
        })
    }
});

app.post("/addpartner",async(req,res)=>{
    try{
        const {partner_id,products}=req.body;
        const q1=await pool.query('INSERT INTO PARTNERS values($1,$2);',[partner_id,products]);
        res.json(q1.rows[0]);
    }
    catch(err){
        return res.status(201).json({
            message:'Error'
        })
    }
})

app.post("/adddelstaff",async(req,res)=>{
    try{
        const {DS_id,name,reg_num,Start_date,Salary,ph_num,email,addr}=req.body;
        const q1=await pool.query('INSERT INTO DELIVERY_STAFF values($1,$2,$3,$4,$5,$6,$7,$8);',[DS_id,name,reg_num,Start_date,Salary,ph_num,email,addr])
        res.json(q1.rows[0]);
    }catch(error) {
        return res.status(201).json({
            message:'Error'
        })
    }
})

app.listen(5000,()=>{
    console.log('Server is running');
});