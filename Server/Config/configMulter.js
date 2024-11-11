import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter = (req,file,cb)=>{

    // this function tell that nulter will upload file in the disk if only if the type of document is jpeg,jpg,png if not in this this will not store the file in disk 
    if(!file)   cb(null, false);
    else if(file.mimetype === 'jpeg' || file.mimetype === 'jpg' || file.mimetype === 'png')  cb(null, true);
    else    cb(null,false);

}

const uploads = multer({ storage , fileFilter });

export default uploads 