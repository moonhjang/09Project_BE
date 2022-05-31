const express = require('express');
const router = express.Router();
const db = require('../config');
const mysql = require('mysql');
const authMiddleware = require('../middlewares/auth');

// domain/user


// Review 작성
router.get('/me/:postId', authMiddleware, (req, res) => {
    // writerId : 글쓴이Id, userId : 방장Id
    const writerId = res.locals.user.postId; 
    const postId = Number(req.params.userId);
    const { userId, review } = req.body       

    // Review 생성
    const sql_1 =
        'INSERT INTO `Like` (`Post_postId`,`User_userId`,`review`, `writerId`) VALUES (?,?,?,?)';
    const param_1 = [postId, userId, review, writerId]
    const sql_1s = mysql.format(sql_1, param_1 );

    // JoinPost에서 Review 상태 변경
    const sql_2 =
        'UPDATE JoinPost SET needReview = 0 WHERE Post_postId = ? AND User_userId = ?'
    const param_2 = [postId, writerId]
    const sql_2s = mysql.format(sql_2, postId);

    db.query(sql_1s + sql_2s, (err, results) => {
        if(err) console.log(err)
        res.send({ msg: 'success' });
    });

});



// // Review 조회
// router.get('/me/review', authMiddleware, (req, res) => {
//     // writerId : 글쓴이Id, userId : 방장Id
//     const writerId = res.locals.user.userId;  
//     const { postId, userId, review } = req.body       

//     const sql =
//         'SELECT R.review, R.createdAt, U.reUserImage userImage, U.userName FROM Review R INNER JOIN User U On U.userId = R.writerId WHERE User_userId = ?';

//     db.query(sql, userId, (err, rows) => {
//         if (err) console.log(err);
//         res.send({ msg: 'success' , review : row[0] });
//     });
// });