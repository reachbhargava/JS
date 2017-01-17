var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

Post = mongoose.model('Post')

router.use(function(req, res, next) {
	// GET allow irrespective of whether logged in or not.
	console.log('req.method --> ' + req.method)

	if (req.method === 'GET') {
		return next();
	}

	if (!req.isAuthenticated()) {
		return res.redirect('/#login')
	}

	return next();
})

router.route('/posts')

	.get(function(req, res) {

		Post.find(function(err, posts) {
			if(err) {
				return res.send(500, err);
			}
			return res.send(posts)
		})

	})

	.post(function(req, res){
		console.log('req.body.created_by ' + req.body.created_by)
		console.log('req.body.text ' + req.body.text)		
		var newPost = new Post();
		newPost.username = req.body.created_by
		newPost.created_at = req.body.created_at
		newPost.text = req.body.text
		newPost.save(function (err, user) {
                    if (err) {
                        return res.send(500, err);
                    }
                    console.log('Post saved' + req.body.text);
                    return res.json(newPost)                      
                })
	
	})

router.route('/posts/:id')
	.get(function(req, res) {

		Post.findById(req.params.id, function(err, post) {
			if(err) {
				res.send(err);
			}
            res.json(post);
        });

	})
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);

            post.username = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post){
                if(err)
                    res.send(err);

                res.json(post);
            });
        });
	})

	.post(function(req, res){
		res.send({message: 'todo: CREATE the post ' + req.params.id})
	})

	.delete(function(req, res) {
        Post.remove({ _id: req.params.id }, 
        		function(err) {
					if (err) {
					    res.send(err);
					}
					res.json("deleted :(");
        		})
    })



module.exports = router;
