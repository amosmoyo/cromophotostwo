const Post = require('../model/post-schema');


exports.postCreate = (req, res, next) => {
  const url = req.protocol + "://" + req.get('host');
  let post = new Post({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + '/images/' + req.file.filename,
    creatorId: req.decodedTokenData.id,
    creatorName: req.decodedTokenData.name
  });

  post.save()
  .then(document => {
    res.status(200).json({
      message: 'The record was successfully added to database',
      document: document
    })
  })
}

exports.getPosts = (req, res, next) => {
      const pageSize = +req.query.pagesize;
      const currentPage = +req.query.page;
      const postQuery = Post.find().sort({createdAt: -1});
      let docs;
      if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      }
      postQuery.then(documents => {
        docs = documents;
        return Post.count();
      }).then((result)=>{
        res.status(200).json({
          message: 'This are all records',
          documents: docs,
          maxCount:result
      })
    })
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id, (err, doc) => {
      if(err){
        console.log(err);
      }

      console.log(doc);
      res.status(200).json({
        message: 'This is the derived document',
        document: doc
      })
  })

  /*.then(document => {
    res.status(200).json({
      message: 'This is the document you want',
      document: document
    })
  })*/
}

exports.updatePost = (req, res, next) => {
        let imagePath;
        let post;
        if (req.file) {
          const url = req.protocol + "://" + req.get('host');
          imagePath = url + '/images/' + req.file.filename;
          post = {
            title: req.body.title,
            description: req.body.description,
            imagePath: imagePath
          }
        } else {
          post = {
            title: req.body.title,
            description: req.body.description,
            imagePath: req.body.imagePath,
          }
        }
      Post.updateOne({_id: req.params.id, creatorId: req.decodedTokenData.id}, post)
      .then((document) => {
        if ( document.nModified > 0) {
          res.status(200).json({
            message: 'The record has been updated successfully',
            document: document
          })
        } else{
          res.status(401).json({
            message: 'You are not authirized to edit this document'
          })
        }
      })





      /*Post.findById(req.params.id, (err, document) => {
        if (!document) {
      throw new(Error('No such document in this database'));
      } else {
        let imagePath;
        if (req.file) {
          const url = req.protocol + "://" + req.get('host');
          imagePath = url + '/images/' + req.file.filename;
          document.title = req.body.title;
          document.description = req.body.description;
          document.imagePath = imagePath
        } else {
          document.title = req.body.title;
          document.description = req.body.description;
          document.imagePath = req.body.imagePath;
        }
        console.log(document);
        document.save().then(doc => {
          res.status(200).json({
            message: 'The record has been updated successfully',
            document: doc
          })
        })
      }
      });*/
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creatorId: req.decodedTokenData.id}).then(document => {
     if (document.n > 0) {
      res.status(200).json({
        message: 'The document has been deleted successfully'
      })
     } else{
      res.status(401).json({
        message: 'You are not authirized to delete this document'
      })
     }
  })
}
