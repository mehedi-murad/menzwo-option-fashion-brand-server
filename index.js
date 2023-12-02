const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();


app.use(cors());

app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l9kydno.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const productCollection = client.db('productDB').collection('product');
    const brandCollection = client.db('productDB').collection('brand');
    const userCollection = client.db('productDB').collection('user');
    const newsletterCollection = client.db('productDB').collection('newsletter');
    const bookingCollection = client.db('productDB').collection('bookings');

    
    

    app.get('/product', async(req, res) =>{
      const result = await productCollection.find().toArray();
      res.send(result)
    })

    //for adidas products
    app.get('/product/adidas', async(req, res) =>{
      const adidasProducts = await productCollection.find({brand: 'Adidas'}).toArray()
      res.send(adidasProducts)
    })

    //for Nike products
    app.get('/product/nike', async(req, res) =>{
      const nikeProducts = await productCollection.find({brand: 'Nike'}).toArray()
      res.send(nikeProducts)
    })

    //for Puma products
    app.get('/product/puma', async(req, res) =>{
      const pumaProducts = await productCollection.find({brand: 'Puma'}).toArray()
      res.send(pumaProducts)
    })
    
    //for Levis products
    app.get('/product/levis', async(req, res) =>{
      const levisProducts = await productCollection.find({brand: 'Levis'}).toArray()
      res.send(levisProducts)
    })
    //for Gucci products
    app.get('/product/gucci', async(req, res) =>{
      const gucciProducts = await productCollection.find({brand: 'Gucci'}).toArray()
      res.send(gucciProducts)
    })
    //for Zara products
    app.get('/product/zara', async(req, res) =>{
      const zaraProducts = await productCollection.find({brand: 'Zara'}).toArray()
      res.send(zaraProducts)
    })

    //for job details endpoint
    app.get('/product/:id', async(req,res) =>{
      const id = req.params.id;
      // console.log(id)
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.findOne(query)
      res.send(result)
    })

    //for cart collection post endpoint
    app.post('/bookings', async(req, res) => {
      const prodItem = req.body;
      const result = await bookingCollection.insertOne(prodItem)
      res.send(result)
    })

    //for getting products to add cart
    app.get('/bookings', async (req, res) => {
      console.log(req.query.email);

      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
  })
    //user added endpoint
    app.post('/user', async(req, res) =>{
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.send(result)
      })

      //for deleting cartitem endpoint
    app.delete('/bookings/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })

  //   //for add products
  //   app.post('/product', async(req, res) =>{
  //     const newProduct = req.body;
  //     const result = await productCollection.insertOne(newProduct);
  //     res.send(result)
  // })

  //   //for detail API
  //   app.get('/product/brand/:id', async(req,res) =>{
  //     const id = req.params.id;
  //     const query = {_id: new ObjectId(id)}
  //     const result = await productCollection.findOne(query)
  //     res.send(result)
  //   })

  //   // for update API
  //   app.get('/product/:id', async(req,res) =>{
  //     const id = req.params.id;
  //     const found = {_id: new ObjectId(id)}
  //     const result = await productCollection.findOne(found)
  //     res.send(result)
  //   })
  //   app.get('/product/:brand', async(req,res) =>{
  //     const brand = req.params.brand;
  //     const found = {brand: brand}
  //     const result = await productCollection.findOne(found)
  //     res.send(result)
  //   })


    
  //   app.put('/product/:id', async(req, res) =>{
  //     const id = req.params.id;
  //     const filter = {_id: new ObjectId(id)}
  //     const options = {upsert:true}
  //     const updatedProduct = req.body;
  //     const product = {
  //         $set: {
  //             name: updatedProduct.name,
  //             brand: updatedProduct.brand,
  //             type: updatedProduct.type,
  //             price: updatedProduct.price,
  //             rating: updatedProduct.rating,
  //             photo: updatedProduct.photo,
  //             description: updatedProduct.description,
  //         }
  //     }
  //     const result = await productCollection.updateOne(filter, product, options)
  //     res.send(result)
  // })

  //   //get place order API
  //   app.get('/product/:id', async(req,res) =>{
  //     const id= req.params.id;
  //     const query = {_id: new ObjectId(id)}
  //     const options = {
  //       projection: {name: 1, photo: 1, price: 1},
  //     }
  //     const result = await productCollection.findOne(query, options)
  //     res.send(result)
  //   })

  //   // product booking related API

  //   app.get('/bookings/:email', async(req, res) =>{
  //     console.log(req.query)
  //     let query={}
  //     if(req.query?.email){
  //       query = {email: req.query.email}
  //     }
  //     const result = await bookingCollection.find(query).toArray()
  //     res.send(result)
  //   })

  //   app.post('/bookings', async(req, res) =>{
  //     const orders = req.body;
  //     console.log(orders)
  //     const result = await bookingCollection.insertOne(orders)
  //     res.send(result)
  //   })

  //   app.delete('/bookings/:id', async(req, res) =>{
  //     const id = req.params.id;
  //     const query = {_id: new ObjectId(id)}
  //     const result = await bookingCollection.deleteOne(query)
  //     res.send(result)
  //   })



  //   // for the brand adidas
  //   app.get('/product/adidas', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Adidas'} );
  //     const adidasFashion = await cursor.toArray();
  //     res.send(adidasFashion);
  //   })

  //   // for the brand Nike
  //   app.get('/product/nike', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Nike'} );
  //     const nikeFashion = await cursor.toArray();
  //     res.send(nikeFashion);
  //   })

  //   // for the brand Puma
  //   app.get('/product/puma', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Puma'} );
  //     const pumaFashion = await cursor.toArray();
  //     res.send(pumaFashion);
  //   })

  //   // for the brand Levis
  //   app.get('/product/levis', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Levis'} );
  //     const levisFashion = await cursor.toArray();
  //     res.send(levisFashion);
  //   })

  //   // for the brand Gucci
  //   app.get('/product/gucci', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Gucci'} );
  //     const gucciFashion = await cursor.toArray();
  //     res.send(gucciFashion);
  //   })
  //   // for the brand Zara
  //   app.get('/product/zara', async(req,res) =>{
  //     const cursor = productCollection.find( {brand : 'Zara'} );
  //     const zaraFashion = await cursor.toArray();
  //     res.send(zaraFashion);
  //   })


    

    // //for brand
    // app.get('/brand', async(req,res) =>{
    //     const cursor =brandCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })

    // app.post('/brand', async(req, res) => {
    //     const newBrand = req.body;
    //     const result = await brandCollection.insertOne(newBrand);
    //     res.send(result)
    // })

    
    // //user APIs

    // app.post('/newsletter', async(req, res) =>{
    //   const subscriber = req.body;
    //   const result =await newsletterCollection.insertOne(subscriber);
    //   res.send(result)
    // })

    

    // app.patch('/user', async(req, res) => {
    //   const user = req.body;
    //   const filter = {email: user.email}
    //   const updateDoc = {
    //     $set: {
    //       lastLoggedAt : user.lastLoggedAt
    //     }
    //   }
    //   const result = await userCollection.updateOne(filter, updateDoc)
    //   res.send(result)
    // })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Fashion brand server is running')
})

app.listen(port, () =>{
    console.log(`Fashion brand server is running on port: ${port}`)
})