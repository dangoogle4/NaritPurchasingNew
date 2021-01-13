var express = require('express');
var router = express.Router();
const { ObjectId, Int32 } = require("mongodb");
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydata";


router.post("/initializeCollection", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydata");
    dbo.createCollection("user", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("data", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("shop", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    dbo.createCollection("maintable", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
});

router.post("/api/regis", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo.collection("user").insertOne(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        priority: req.body.priority,
      },
      function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

// router.post("/get/user", function (req, res, next) {
//   MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("Purchasing");
//     dbo.collection("user").count({}, function (err, result_count_user) {
//       if (err) throw err;
//       // console.log(result_count_user);
//       dbo
//         .collection("user")
//         .find(
//           {},
//           {
//             projection: {
//               _id: 1,
//               name: 1,
//               surname: 1,
//               username: 1,
//               email: 1,
//               priority: 1,
//             },
//           }
//         )
//         // .skip(paging_admin)
//         // .limit(per_page_admin)
//         .sort({ _id: -1 })
//         .toArray(function (err, result) {
//           if (err) throw err;
//           // console.log(userid);
//           res.send([result, result_count_user]);
//           db.close();
//         });
//     });
//   });
  // res.send("ok" + req.body.tabel);
// });

router.post("/get/user", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo.collection("user").count({}, function (err, result_count_user) {
      if (err) throw err;
      // console.log(result_count_user);
      dbo
        .collection("user")
        .find({})
        // .skip(paging_admin)
        // .limit(per_page_admin)
        .toArray(function (err, result) {
          if (err) throw err;
          // console.log(userid);
          res.send([result, result_count_user]);
          db.close();
        });
    });
  });
  // res.send("ok" + req.body.tabel);
});

router.post("/api/addmaintable", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myitem = {
        order: req.body.name,
        respon: req.body.lastname,
        amount: req.body.email,
        nameorder: req.body.phone,
        status: req.body.password,
        reason: req.body.reason,
        deldummymaintable: req.body.DeleteForDummyMainTable,
        //group: req.body.group,
        //department: req.body.department,
    };
    dbo.collection("maintable").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

router.post("/api/addmaintableadmin", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  console.log("Dannwqpdokqwpod"+ req.body.LetServerGetDataOrderFromMainTable);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { order: req.body.LetServerGetDataOrderFromMainTable};
    //console.log(myquery);
    var myitem = { 
      //status: req.body.status,
      $set: { status: [req.body.status], reason: [req.body.reason]
      
       },
       
    };
    // { $set: { [status: req.body.status],
    //   reason: req.body.reason,}
        
        //group: req.body.group,
        //department: req.body.department,
     //};
    dbo.collection("maintable").updateOne(myquery,myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});


router.post("/api/adddata", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Danooo"+ req.body.item);
    var dbo = db.db("Purchasing");
    var myitem = {
      //shop: req.body.shop, //--> come from shoptable (must add shop first)
      item: req.body.item,
      partnumber: req.body.partnumber,
      price: parseFloat(req.body.price),
      amount: parseInt(req.body.amount),
      priceadmin:parseFloat(req.body.priceadmin),
      amountadmin:parseInt(req.body.amountadmin),
      sumprice: parseFloat(req.body.sumprice),
      sumpriceadmin:parseFloat(req.body.sumpriceadmin),
      responsibleperson: req.body.responsibleperson,
      shopid: ObjectId(req.body.storage),
      mainid: req.body.mainid,
      statusz: req.body.statusz, //--> come from admin table (admin must add this thing)
      picture: req.body.picture,
       //--> can't do this rightnow (don't have knowlage to do)
      //reason:  req.body.reason, --> from admin cuz admin can add this thing into maintable
        //group: req.body.group,
        //department: req.body.department,
    };
    
    dbo.collection("data").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});

router.post("/api/addshop", function (req, res, next) {
  // res.send("ok - "+ req.body.dbname);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myitem = {
      nameOfShop: req.body.shop, //--> come from shoptable (must add shop first)
      typeOfShop: req.body.type,
      tax: req.body.tax,
     
    };
    dbo.collection("shop").insertOne(myitem, function (err, result) {
        if (err) throw err;
        res.send(true);

        db.close();
      }
    );
  });
});



router.post("/get/maintable", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("maintable")
      .find({})
      .toArray(function (err, result_category) {
        if (err) throw err;
         //console.log("DDannn" + result._id);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/data", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    dbo
      .collection("data")
      .find({})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin2", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdAdmin", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

router.post("/get/dataForSearchTableMainIdUser", function (req, res, next) {
  // console.log("hkr");
  // res.send("HRK");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("DataMapow-->"+ req.body._ID)
    dbo
      .collection("data")
      .find({mainid: req.body._ID})
      .toArray(function (err, result_category) {
        if (err) throw err;
        // console.log(result.name);
        res.send(result_category);
        db.close();
      });
  });
});

var getDataId = "";

router.post("/save/editmain", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("MAINMAINMAINMAINMAIN    "+req.body.deldummymaintablenew);
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        order: req.body.ordernew,
        respon: req.body.responnew,
        amount: req.body.amountnew,
        nameorder: req.body.nameordernew,
        status: req.body.statusnew,
        //deldummymaintable: 1,
        //status: req.body.status,
      },
    };
    dbo
      .collection("maintable")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});

router.post("/save/editmaindummydrop", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("MAINMAINMAINMAINMAIN    ");
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        deldummymaintable: 1,
        //status: req.body.status,
      },
    };
    dbo
      .collection("maintable")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});

router.post("/save/recovermain", function (req, res, next) {
 
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("MAINMAINMAINMAINMAIN    ");
    
    console.log(req.body.ordernew);
    var newvalues = {
      $set: {
        deldummymaintable: 0,
        //status: req.body.status,
      },
    };
    dbo
      .collection("maintable")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});

router.post("/save/editdata", function (req, res, next) {
  //console.log('DDDD');
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("DAN" + req.body.ServergetDataId);
    console.log(req.body.shopnew);
    console.log(req.body.itemnew);
    var newvalues = {
      $set: {
        //shop:req.body.shopnew,
        item:req.body.itemnew,
        partnumber:req.body.partnumbernew,
        price:parseFloat(req.body.pricenew),
        amount:parseInt(req.body.amountnew),
        priceadmin:parseFloat(req.body.pricenewedit),
        amountadmin:parseInt(req.body.amountnewedit),
        sumprice:parseFloat(req.body.sumpricenew),
        sumpriceadmin:parseFloat(req.body.sumpricenewedit),
        responsibleperson:req.body.responsiblepersonnew,
       // picture: picture,
        statusz:req.body.statusznew,
        //shopid: ObjectId(req.body.shopid),
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("data")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});

router.post("/save/editdataadmin", function (req, res, next) {
  console.log('DDDD');
  // res.send("save me" + "  " +req.body.name+" "+req.body.surname+" "+req.body.iduser);
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var myquery = { _id: ObjectId(req.body.ServergetDataId) };
    console.log("DAN" + req.body.ServergetDataId);
    console.log(req.body.shopnew);
    console.log(req.body.itemnew);
    var newvalues = {
      $set: {
        //shop:req.body.shopnew,
        item:req.body.itemnew,
        partnumber:req.body.partnumbernew,
        price:parseFloat(req.body.pricenew),
        amount:parseInt(req.body.amountnew),
        priceadmin:parseFloat(req.body.pricenewedit),
        amountadmin:parseInt(req.body.amountnewedit),
        sumprice:parseFloat(req.body.sumpricenew),
        sumpriceadmin:parseFloat(req.body.sumpricenewedit),
        responsibleperson:req.body.responsiblepersonnew,
       // picture: picture,
        statusz:req.body.statusznew,
        //shopid: ObjectId(req.body.shopid),
        //mainid: ObjectId(req.body.mainid),
      },
    };
    dbo
      .collection("data")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        // console.log("updata complete!!");
        db.close();

        res.send(true);
      });
  });
});


router.post("/get/shop", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //var query = { _id: ObjectId(req.body.profile) };
    //console.log(query);
    dbo
      .collection("shop")
      //.find({shopid: req.body.shop})
       .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        db.close();
      });
  });
});

router.post("/get/showshopnameintable", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  console.log('Dan');

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    // console.log("asdsadsad");
    // var query = { _id: req.body._ID }; // ไแกกกกกก --- ก้ทำเหมือน Edit ไง ส่งค่า post มา
    //console.log(query);
    dbo
      .collection("data")
      //.find({shopid: req.body.shop})
       .find({shopid: ObjectId(req.body._ID)}) //เย้ ติดมาประมาน 7 วัน อันตราย ขนลุกเลย
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
  
});

router.post("/get/showshopnameintableinadminaccess", function (req, res, next) {
  // res.send("ok post complete"+" "+req.body.nameuser);
  //console.log('Danqq'+ _ID2);

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    // console.log("asdsadsad");
     // query = { shopid: ObjectId(req.body._ID)}; // ไแกกกกกก --- ก้ทำเหมือน Edit ไง ส่งค่า post มา
    //console.log(query);
    dbo
      .collection("data")
      //.find({shopid: req.body.shop})

       //.find( {shopid: ObjectId(req.body._ID)},
       .find({mainid: req.body._MAINID ,shopid: ObjectId(req.body._ID)}) //เย้ ติดมาประมาน 7 วัน อันตราย ขนลุกเลย

      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
  
});

router.post("/get/shopforadd", function (req, res, next) {

  
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    //Find all documents in the customers collection:
    dbo
      .collection("shop")
      .find({})
      .sort({nameOfShop : 1})
      .toArray(function (err, roomName) {
        for(let i = 0;i < roomName.length;i++){
          //console.log("resultsearchroom   "+roomName[i].room)
        }
        if (err) throw err;
        // console.log([category_result,result_owner]);
        //console.log("room      "+roomName[1].room);
        res.send(roomName);
        // owner_name(result_owner);

        db.close();
      });
  });
});


router.post("/drop/mainTable", function (req, res, next) {
  // console.log("Hi category");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("maintable").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});

router.post("/drop/DataKrup", function (req, res, next) {
  // console.log("Hi category");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("data").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});

router.post("/drop/dataAdmin", function (req, res, next) {
  // console.log("Hi category");
  // console.log(req.body.drop_id_category);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    var dropcategory = { _id: ObjectId(req.body.dropRoomId) };
    dbo.collection("data").deleteOne(dropcategory, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Dan');
      db.close();
    });
  });
});


router.post("/users/login", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Purchasing");
    console.log("Server test")
    //Find the first document in the customers collection:
    dbo
      .collection("user")
      .findOne(
        { userName: req.body.userName, password: req.body.password },
        function (err, result) {
          if (err) throw err;
          db.close();
          // console.log(result.email);
          // res.send(result);

          if (result != null) {
            // console.log(result);
            // create cookies
            let result2 = {
              id: result._id,
              name: result.name,
              surname: result.surname,
              priority: result.priority,
            };

            let Max_Age = 1000 * 60 * 60 * 12; //อายุ cookie ครึ่งวัน 12 ชั่วโมง
            res.cookie("CookieUser", JSON.stringify(result2), {
              maxAge: Max_Age,
            });
            res.send(true);
          } else {
            res.send(false);
          }
        }
      );
  });
});









// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Purchasing");
//   dbo.collection("maintable").updateOne(
    
    
//     myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });


module.exports = router;
