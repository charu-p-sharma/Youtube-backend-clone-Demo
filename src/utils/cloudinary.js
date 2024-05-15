import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded successfully on cloudinary", response.url);
        //fs.unlinkSync(localFilePath) //if the file has been uploaded succesfully then uncomment this
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); //removes the locally saved temporary file as the upload operation got failed  (we do this unlinkSync so that we can avoind the malicious codes)
        return null;
    }
}

export { uploadOnCloudinary }


