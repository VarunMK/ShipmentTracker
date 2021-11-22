const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/getdata", async (req, res) => {
  try {
    const { table_name } = req.body;
    //const q1=await pool.query(`SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`);
    const data = await pool.query(`SELECT*from ${table_name};`);
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/gethisdata", async (req, res) => {
  try {
    const { client_id, pass } = req.body;
    const c = await pool.query(
      "select password from client where client_id=$1;",
      [client_id]
    );
    if (pass != c.rows[0]["password"]) {
      return res.status(201).json({
        message: "error",
      });
    }
    const data = await pool.query(
      "SELECT*from orderhistory where client_id=$1;",
      [client_id]
    );
    for (let i = 0; i < data.rows.length; i++) {
      data.rows[i]["delivered_date"] = String(
        data.rows[i]["delivered_date"]
      ).slice(0, 16);
    }
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});
app.post("/getdetails", async (req, res) => {
  try {
    const { client_id, pass } = req.body;
    const c = await pool.query(
      "select password from client where client_id=$1;",
      [client_id]
    );
    if (pass != c.rows[0]["password"]) {
      return res.status(201).json({
        message: "error",
      });
    }
    const data = await pool.query(
      "select*from order_details where client_id=$1;",
      [client_id]
    );
    for (let i = 0; i < data.rows.length; i++) {
      data.rows[i]["arrival_date"] = String(data.rows[i]["arrival_date"]).slice(
        0,
        16
      );
    }
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/update_data", async (req, res) => {
  try {
    const { client_id, password, name, ph_num, email, addr } = req.body;
    const c = await pool.query(
      "select password from client where client_id=$1;",
      [client_id]
    );
    if (password != c.rows[0]["password"]) {
      return res.status(201).json({
        message: "error",
      });
    }
    if (name != "") {
      const q1 = await pool.query(
        "UPDATE TABLE client set name=$1 where client_id=$2;",
        [name, client_id]
      );
    }
    if (ph_num != "") {
      const q2 = await pool.query(
        "UPDATE TABLE client set ph_num=$1 where client_id=$2;",
        [ph_num, client_id]
      );
    }
    if (email != "") {
      const q3 = await pool.query(
        "UPDATE TABLE client set email=$1 where client_id=$2;",
        [email, client_id]
      );
    }
    if (addr != "") {
      const q4 = await pool.query(
        "UPDATE TABLE client set addr=$1 where client_id=$2;",
        [addr, client_id]
      );
    }
  } catch (err) {
    return res.status(201).json({
      message: "error",
    });
  }
});
app.post("/update_order", async (req, res) => {
  try {
    const { client_id, password, sender,rec_add, fragile, reciever } = req.body;
    const c = await pool.query(
      "select password from client where client_id=$1;",
      [client_id]
    );
    if (password != c.rows[0]["password"]) {
      return res.status(201).json({
        message: "error",
      });
    } else {
      var today = new Date();
      var dd = String(today.getDate()+4).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      console.log(today)
        const q2 = await pool.query(
          "insert into Orders(arrival_date, fragile, prod_weight, status, rec_add, reciever, Sender, Vehicle_id, Client_ID, DS_id, W_id) values($1,$2,$3,'In-transit',$4,$5,$6,$7,$8,$9,$10);",
          [
            today,
            fragile,
            Math.floor(Math.random() * 70 + 1),
            rec_add,
            reciever,
            sender,
            Math.floor(Math.random() * 10 + 1),
            client_id,
            Math.floor(Math.random() * 10 + 1),
            Math.floor(Math.random() * 10 + 1),
          ]
        );
        res.json(q2.rows);
    }
  } catch (err) {
      console.log(err)
  }
});

app.post("/getcolname", async (req, res) => {
  try {
    const { table_name } = req.body;
    const q1 = await pool.query(
      `SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`
    );
    res.json(q1.rows);
  } catch (err) {
    return res.status(201).json({
      message: "error",
    });
  }
});

app.post("/add_data", async (req, res) => {
  try {
    const { table_name, values } = req.body;
    const q1 = await pool.query(
      `SELECT column_name,data_type from information_schema.columns where table_name='${table_name}';`
    );
    var vals = values.split(",");
    var s = "";
    for (let i = 0; i < q1.rows.length; i++) {
      if (
        q1.rows[i].data_type == "numeric" ||
        q1.rows[i].data_type == "integer"
      ) {
        s += String(vals[i]);
      } else {
        s += `'${vals[i]}'`;
      }
      s += ",";
    }
    s = s.slice(0, s.length - 1);
    const q2 = await pool.query(
      `INSERT INTO ${table_name} values(${String(s)});`
    );
    res.json(q2.rows[0]);
  } catch (error) {
    if (error.code == "23505") {
      return res.status(201).json({
        message: "Error",
      });
    } else {
      return res.status(202).json({
        message: "Error",
      });
    }
  }
});

app.listen(5000, () => {
  console.log("Server is running");
});
