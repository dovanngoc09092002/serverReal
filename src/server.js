//khoi tao fw express
const express = require("express");

const bodyParser = require("body-parser");

const db = require("../src/models/index");

const cors = require("cors");
const server = express();
server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const port = 5657;


// truyen qua body
server.post("/create/data", async (req, res) => {
  const data = {
    nhietdo: req.body.nhietdo,
    doam: req.body.doam,
  };

  const result = await db.Test.create({
    nhietdo: data.nhietdo,
    doam: data.doam,
  });
  if (result) {
    return res.json({
      errCode: 0,
      data: result,
    });
  } else {
    return res.json({
      errCode: 1,
      data: null,
    });
  }
});

//truyen qua query
server.get("/query",async (req, res) => {
  // console.log("this is rq : " , req.query);
  const query = req.query;

  const result = await db.Test.create({
    nhietdo: parseInt(query.nhietdo),
    doam: parseInt(query.doam),
  });

  console.log("this is result : " , result);
  if (result) {
    return res.json({
      errCode: 0,
      data: result,
    });
  } else {
    return res.json({
      errCode: 1,
      data: null,
    });
  }
});


//lấy tất cả dữ liệu từ db về 
server.get("/getData" ,async (req , res)=>{

  const result = await db.Test.findOne({
    where : {
      id : 1
    }
  })

  return res.json(result)


})

server.listen(port, () => {
  console.log(`Example server listening on port ${port}`);
});
