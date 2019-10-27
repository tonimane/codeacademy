const con = require('../database');


getAllPostQuery = () => {
    const query = 'SELECT * FROM post';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getAllPosts = async(req, res) => {
    try {
        const posts = await getAllPostQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificPostQuery = (postId) => {
    const query = 'SELECT * FROM post WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificPost = async(req, res, next) => {
    const postId = req.params.id;

    if (postId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const post = await getSpecificPostQuery(postId);
        res.status(200).send(post[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPostQuery = (Text, Likes) => {
    const query = 'INSERT INTO POST(Text, Likes, CreatedOn) VALUES (?,?,curdate());';
    return new Promise((resolve, reject) => {
        con.query(query, [Text, Likes], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

createPost = async (req, res, next) => {


    

    try {
        await createPostQuery(req.body.Text, req.body.Likes)

            res.status(201).send("New Post has been created!");
        } catch (error) {
            res.status(500).send(error.message);
        }
    

};

module.exports = {
    getSpecificPost,
    getAllPosts,
    createPost
}