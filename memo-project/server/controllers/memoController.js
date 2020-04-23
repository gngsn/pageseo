const express = require('express');
const Memo = require('../models/memo.js');

const memo = {
    readAll: async (req, res) => {
        const memos = await Memo.findAll();
        try {
            if (!memos.length)
                return res.status(404).send({
                    err: 'memo not found'
                });
            res.send(memos);
        } catch (err) {
            res.status(500).send(err)
        }
    },
    write: async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send('data를 입력해주세요.');
            return;
            }
            const result = await Memo.create(req.body);
            console.log("result : ", result);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = memo;