# CS571-2023-05-Homework02
Please find below an Express application that connects to a MongoDB instance, each document has the following structure for `schools` collection:
```JavaScript
{
    "_id":1,
    "teachers": [
        {"_id":1, "name":"Asaad"},
        {"_id":2, "name":"Umur"}
    ],
    "courses":[
        {"_id":1, "title": "CS477", "students":[
            {"_id":1, "name":"John"},
            {"_id":2, "name":"Selin"}
        ]},
        {"_id":2, "title": "CS571", "students":[
            {"_id":1, "name":"Alican"},
            {"_id":2, "name":"Dean"}
        ]},
        {"_id":3, "title": "CS415", "students":[
            {"_id":1, "name":"Tina"},
            {"_id":2, "name":"Clyde"}
        ]}
    ]
}
```
Your are responsible on writing code for 6 MongoDB queries within 6 pre-defined routes in `app.js` file:
1. Add teacher
2. Update teacher
3. Delete teacher
4. Add a new student to specific course
5. Update a student's name
6. Delete a student
