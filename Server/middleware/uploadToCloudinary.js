import cloudinary  from "../Config/configCloudinary.js";

const uploadToCloudinary = async (req,res,next)=>{

    const options = {
        folder: "food-odering-app",
        public_id: req.accessToken.email,   // each-user has unique emailId and i want a overwritting cloud url for it 
        overwrite: true,                    // delete the before image from cloudinary if user edit their profile pic
        transformation: [
            { quality: "auto" },            // compresion level of file according to size
            { fetch_format: "auto" },       // choose the best visual format accordint to browser( modern - webp / older - jpeg/jpg )
            { dpr: "auto" },                //according to sreen-size/resolution
        ],                    
        tags: ["profilePictures"],          // to manually search for the document is easier if we tag them 
    }

    // multer does next using 'fileFilter', maybe i would be adding validation in between but idk where all i gonna use it 
    // #SafeSide
    if(!req.file)   next();

    try{
        const upload = await cloudinary.uploader.upload(req.file.path,options);
        req.cloudinaryUrl = upload.secure_url;
    }
    catch(e){
        console.log('Error while uploading to Cloudinary ------- path middleware/uploadToCloudinary.js');
        res.status(500).json({message: 'unable to upload to cloudinary'});
    }

}

export default uploadToCloudinary;