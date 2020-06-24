const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { NotExtended } = require('http-errors');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    // errorHandling: 'manual',
    storage: multerS3({
        s3: s3,
        bucket: 'sopt-26',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
});

const one = async (req, res, next) => {
    await upload.single('image') (req, res, function (err) {
        console.log( 'req: ', req );
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('이것은  multer에 업로드할 때 생기는 오류');
            console.log('multer error : ', err);
            res.status(400).send('이미지를 잘못 요청하셨습니다.');
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('이것은 알 수 없는 오류');
        }
        // Everything went fine.
        console.log('Everything went fine.');
        next();
    });
}

const many = async (req, res, next) => {
    await upload.array('images') (req, res, function (err) {
        console.log(req.files.length);
        if (req.files.length !== 2) {
            return res.send('2장만 보내조');
        }
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('이것은  multer에 업로드할 때 생기는 오류');
            console.log('multer error : ', err);
            res.status(400).send('이미지를 잘못 요청하셨습니다.');
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('이것은 알 수 없는 오류');
        }
        // Everything went fine.
        console.log('Everything went fine.');
        next();
    });
}
module.exports = many;  