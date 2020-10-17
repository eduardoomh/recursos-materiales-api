require("dotenv").config({ path: ".env" });
const AWS = require("aws-sdk");

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

async function awsDeleteImage(filePath) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${filePath}`
    };

    try {
         const response = await s3.deleteObject(params).promise();
         return true;
    }
    catch (error) {
        console.log(error);
        throw new Error("La imagen no ha podido ser eliminada");
    }
}


module.exports = awsDeleteImage;