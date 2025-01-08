const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const menuItemSchema = require('./schema.js');

if(process.env.NODE_ENV !== "PRODUCTION"){
  require('dotenv').config({
    path : './.env',
  });
};

const app = express();
const port = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to Database Successfully"))
  .catch((er) => console.log(er, "Connection to Database Failed"));

app.post('/menu', async (req, res) => {
  try {
    const newItem = new menuItemSchema(req.body);
    await newItem.save();
    res.status(200).json(newItem)
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await menuItemSchema.find()
    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Item not available',
      error: error.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
