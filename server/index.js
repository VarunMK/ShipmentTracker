const express=require('express');
const cors=require('cors');
const pool=require('./db');

const app=express();

app.use(cors());
app.use(express.json());


app.post("/getdata",async(req,res)=>{
    try {
        const {table_name}=req.body;
        //const q1=await pool.query(`SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`);
        const data=await pool.query(`SELECT*from ${table_name};`);
        res.json(data.rows)
    } catch (error) {
        console.log(error);
    }
})

app.post("/getcolname",async(req,res)=>{
    try{
        const {table_name,values}=req.body;
        const q1=await pool.query(`SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`);
        res.json(q1.rows);
    }catch(err){
        return res.status(201).json({
            message:"error"
        })
    }
})

app.post("/add_data",async(req,res)=>{
    try{
        const {table_name,values}=req.body;
        const q1=await pool.query(`SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`);
        var vals=values.split(',');
        var s="";
        for(let i=0;i<q1.rows.length;i++){
            if(q1.rows[i].data_type=='numeric' || q1.rows[i].data_type=='integer'){
                s+=String(vals[i]);
            }
            else{
                s+=`'${vals[i]}'`
            }
            s+=','
        }
        s=s.slice(0,s.length-1);
        const q2=await pool.query(`INSERT INTO ${table_name} values(${String(s)});`);
        res.json(q2.rows[0]);
    }catch(error) {
        return res.status(201).json({
            message:'Error'
        })
    }
})

app.listen(5000,()=>{
    console.log('Server is running');
});