const mongoose=require('mongoose');
const ImageSchema=({
    imageName:{
        type:String,
        required:true

    },
   url : {
    type:String,
    required:true

   }

})
module.exports=mongoose.model('Image',ImageSchema);