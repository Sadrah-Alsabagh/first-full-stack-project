const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const axios=require('axios');

const app = express();
app.use(cors());
const port = process.env.PORT || 3004;

app.get('/',(req,res)=>{
    console.log('Im alive');
})

//handle search
app.get('/photos',async (req,res)=>{
    const photoName=req.query.photoName;
    console.log(photoName); //print it in terminal
    //send a req to api to get photo data.
    const url =`https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${photoName}`;
   const photoResponse= await axios.get(url);
   console.log(photoResponse.data.results);

   let allPhoto = photoResponse.data.results.map((photoObj) => {return new PhotoServer(photoObj)
});
res.send(allPhoto);
}); 
app.listen(port,()=>{
    console.log(`Im listening ${port}`);
})


class PhotoServer{
    constructor(object){
        this.img_url=object.urls.regular;
        this.description=object.alt_description;
        this.name=object.user.name;     
        this.description_alt=object.user.description_alt;
        }
}
