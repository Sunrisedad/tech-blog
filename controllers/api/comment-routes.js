const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

//GETS ALL COMMENTS

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {console.log(err);
            res.status(500).json(err);
        });});

//MAKE COMMENTS

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {console.log(err);
            res.status(400).json(err);
        });});

//DELETE COMMENTS

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({where: {id: req.params.id}
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found!' });
                return;}
            res.json(dbCommentData);})
        .catch(err => {console.log(err);
            res.status(500).json(err);
        });});

module.exports = router;