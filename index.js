import express from "express";
const app = express();


app.get('/api',(req,res)=>{
    res.send('hi')
})


app.listen(3039, () => {
    console.log('Server connected');
  });
  