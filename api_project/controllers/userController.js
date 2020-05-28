const statusCode = require('../module/utils/statusCode');
const resMsg = require('../module/utils/responseMessage');
const util = require('../module/utils/util');

const encrypt = require('../module/encryption');
const express = require('express');
const User = require('../models/user.js');

const user = {
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        console.log(id, password);
        if (!id || !password) {
            const missParameters = Object.entries({
                id,
                password
            }).filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST, `${resMsg.NULL_VALUE} ${missParameters}`));
            return;
        }
        try {
            const {
                code,
                json
            } = await User.signin(id, password);
            if (id == 'JY') {
                return res.status(code).send(util.successTrue(statusCode.OK, resMsg.SIGN_IN_SUCCESS, '재용 ㅎㅇ~'));
            }
            res.status(code).send(json);
        } catch (err) {
            console.log('user Controller err : ', err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMsg.INTERNAL_SERVER_ERROR));
        }
    },
    signup: async (req, res) => {
        const {
            id,
            password,
            name,
            email,
            phone
        } = req.body;
        if (!id || !password || !name || !email || !phone) {
            const missParameters = Object.entries({
                id,
                password,
                name,
                email,
                phone
            }).filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST, `${resMsg.NULL_VALUE} ${missParameters}`));
            return;
        }
        const isThere = await User.userCheck(id);
        if (!isThere) {
            return res.status(statusCode.OK).send(util.successFalse(statusCode.OK, resMsg.ALREADY_ID));
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        try {
            const {
                code,
                json
            } = await User.signup(id, name, hashed, salt, email, phone);
            res.status(code).send(json);
        } catch {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMsg.INTERNAL_SERVER_ERROR));
        }
    },
    updateProfile : async (req, res) => {
        const userIdx = req.decoded.idx;
        const {
            name,
            email,
            phone
        } = req.body;
        let profileImg = req.file;
        console.log(profileImg);
        if (profileImg !== undefined){
            profileImg = profileImg.location;
            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg'&& type !== 'png') {
                return res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMsg.UNSUPPORTED_TYPE));
            }
        }
        if (!name && !email && !phone && !profileImg)
            return res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMsg.NO_CHANGE));
        const result = await User.updateProfile(name, email, phone, profileImg, userIdx);
        res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMsg.UPDATE_PROFILE_SUCCESS, result));
    }
}

module.exports = user;