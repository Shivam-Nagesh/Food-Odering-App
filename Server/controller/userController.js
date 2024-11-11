import User from '../model/user.js';
import bcrypt from 'bcrypt';

const createNewUser = async (req,res)=>{

    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;

    const hashedpassword = await bcrypt.hash(password,15);
    try{
        const user = await User.create({
            fullName,
            email,
            phone,
            address,
            password: hashedpassword,
        });
        console.log("userCreated ---- userController.js/createNewUser", user);
    }
    catch(e){
        console.log('Could not create user', e);
        return res.status(500).json({message: "Could not create user"});
    }
}

const updateUser = async(req,res)=>{

    const accessToken = req.accessToken;
    if(!req.body)   return res.status(400).json({message: 'no body passed'});

    try{
        const user = await User.findByIdAndUpdate(accessToken._id, req.body,{new: true});
        console.log('updated profile',user);
    }
    catch(e){
        return res.status(500).json({message: 'cannot find user'});
    }

    return res.status(200).json({message: 'user updated successfully'});

}

const deleteUser = async(req,res)=>{

    try{
        await User.findByIdAndDelete(req?.accessToken?._id);
        console.log('account deleted');
        res.clearCookie(refreshToken,{httpOnly: true, sameSite: 'lax'});
    }
    catch(e){
        console.log("Cannot find user", req?.accessToken?._id);
    }

    res.json(200).json({message: 'account deleted'});
}


const profilePicture = async (req,res)=>{

    if(!req.file)   return res.json(400).json({message: "File not sent"});
    const cloudinaryUrl = req.cloudinaryUrl;

    // I have req.accessToken from verifyJWT in which all the details of the user except password is there
    try{
        const oldUser = await User.findByIdAndUpdate(req.accessToken._id,{
            avatar: cloudinaryUrl
        })
        console.log(`old cloudinary url(userController.js/profilePicture): ${oldUser.avatar}`);
        console.log(`new cloudinary url(userController.js/profilePicture): ${cloudinaryUrl}`);
    }
    catch(e){
        console.log('Unable to find user or change url ---- userController.js/profilePicture');
        res.status(500).json({message: 'not able to update User Model'});
    }

    return res.status(200).json({message: 'profile picture changed', cloudinaryUrl});
}

export default { createNewUser, updateUser, deleteUser, profilePicture };