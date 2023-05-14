# CS571-2023-05-assignment02
## If you do not have MongoDB, create DB at https://www.mongodb.com/ 
## Create a Express server from scratch
* Create a new folder
* Initialize the project in the above directory using: npm init -y
* Install and setup nodemon to run the app by: npm start
## Connect this app to Mongo Atlas using MongoDB
## Given the collection 'products'. Please implement the following functions
```JavaScript
{
    "_id":1,
    "name": "iPhone 14",
    "properties": [
        {"_id": 1, name: "Pro Max", "color": "silver"},
        {"_id": 2, name: "Pro Max", "color": "black"},
        {"_id": 3, name: "Pro", "color": "white"},
    ]
}
```
* Insert a new product
* Update the name of a product by _id
* Add a new property
* Update the color of a properties by _id
* Delete a property by _id
