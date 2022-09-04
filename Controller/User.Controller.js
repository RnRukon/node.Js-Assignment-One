const fs = require('fs');
const users = require('../userData.json');



/* *********@get random user******** */
module.exports.getRandomUsers = (req, res) => {
    try {
        const randomNumber = Math.floor(Math.random() * users.length)
        const randomUser = users[randomNumber];
        res.status(200).json({
            massage: `User found`,
            users: randomUser
        });
    } catch (error) {
        res.status(400).send({
            massage: 'Server Error'
        })
    }
}
/* *********@get all limit user******** */
module.exports.getUsersAll = (req, res) => {
    try {
        const limit = req.query.limit;
        const getAllUser = users.slice(0, limit)
        res.status(200).json({
            massage: 'Get limit data successfully',
            user: getAllUser
        })
    } catch (error) {
        res.status(400).send('Server Error')
    }
}

/* *********@post user******** */
module.exports.postUser = (req, res) => {
    try {
        const { id, name, address, contact, photoUrl } = req.body;

        if (
            typeof id === "number" &&
            typeof name === "string" &&
            typeof address === "string" &&
            typeof contact === "string" &&
            typeof photoUrl === 'string') {
            if (
                id &&
                name &&
                address &&
                contact &&
                photoUrl) {

                const filter = users.filter(user => user);
                filter.push(req.body);

                fs.writeFileSync(
                    'userData.json',
                    JSON.stringify(filter),
                    'utf-8');

                res.status(200).json({
                    massage: "Save User successfully",
                    users: filter
                });

            } else {
                res.status(300).json({
                    massage: "please input Valid data"
                });
            }
        } else {
            res.status(300).json({
                massage: "Type Error"
            });
        }

    } catch (error) {
        res.status(400).send({
            massage: 'Server Error'
        })
    }
}
/* *********@Delete tools******** */
module.exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const filter = users.filter(user => user.id !== Number(id))

        fs.writeFileSync('userData.json', JSON.stringify(filter), 'utf-8');


        res.status(200).json({
            massage: 'delete user',
            user: filter
        });
    } catch (error) {
        res.send("server err")
    }

}


/* *********@Patch tools******** */
module.exports.patchUser = (req, res) => {
    try {
        const id = req.params.id;
        const { name, gender, contact, address, photoUrl } = req.body;
        const filter = users.find(user => user.id === Number(id));
        filter.name = name;
        filter.gender = gender;
        filter.contact = contact;
        filter.address = address;
        filter.photoUrl = photoUrl;
        res.status(200).json({
            massage: 'Update successfully',
            updatedData: filter
        });
    } catch (error) {
        res.send("server err")
    }
}




