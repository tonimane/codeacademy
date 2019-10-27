const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');
const con = require('../database');

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
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

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getSpecificUser = async (req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }

    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createUserQuery = (Name, Surname, Email, Age, IsActive) => {
    const query = 'INSERT INTO USER(Name,Surname,Email,Age,IsActive) VALUES (?,?,?,?,?);';
    return new Promise((resolve, reject) => {
        con.query(query, [Name, Surname, Email, Age, IsActive], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

createUser = async (req, res, next) => {


    let isValid = emailValidator(req.body.Email);
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        next(error);
    }
    else {

        try {
            await createUserQuery(req.body.Name, req.body.Surname, req.body.Email, req.body.Age, req.body.IsActive)

            res.status(201).send("User has been created!");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

};





module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser
}