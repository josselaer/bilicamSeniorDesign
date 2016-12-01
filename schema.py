from pymongo import MongoClient
import datetime

# client = MongoClient('server')
db = client.biliCam
user = db.user
pictures = db.pictures
# The following fields: zipcode, state and country; were meant for foreign patients
# Email and or phone could be optional but one must be required for contact
# _id is primary key 
# Idea is a single user (Rustler James) has many pictures of the baby
db.user.insert(
    {
    "_id":0123456789
    "name":"Rustler James",
    "username":0123456789,
    "salt":"slansaldnsk",
    "password":"DoobieBoobie",
    "phone":9724578138,
    "email":"asasa@live.com",
    "address":"Fake St. 123",
    "zipcode":75208,
    "state":"TX",
    "country":"USA"
    }
)

db.pictures.insert(
    {
    "_id":"asa9s048a9s40a890",
    "date":datetime.datetime.utcnow(),
    "picture":"Baby.jpeg",
    "user_id":0123456789
    }
)

db.pictures.insert(
    {
    "_id":"s6a4s8da4d89sada4d98dsa",
    "date":datetime.datetime.utcnow(),
    "picture":"Baby2.jpeg",
    "user_id":0123456789
    }
)