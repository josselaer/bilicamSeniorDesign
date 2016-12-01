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

# Field "Picture" just holds the location of the picture in the server, content is random
# Can be taken out

db.pictures.insert(
    {
    "_id":"asa9s048a9s40a890",
    "TimeStamp" : "10\/21\/2016 14:26:29:68",
    "Other" : "False",
    "Obstruction" : "False",
    "PoorLighting" : "False",
    "BlurryGrainy" : "False",
    "Flash" : "False",
    "Glare" : "False",
    "Shadow" : "False",
    "picture":"Baby.jpeg",
    "user_id":0123456789
    }
)

db.pictures.insert(
    {
    "_id":"6as46as4a68s4",
    "TimeStamp" : "10\/21\/2016 14:26:34:36",
    "Other" : "False",
    "Obstruction" : "False",
    "PoorLighting" : "False",
    "BlurryGrainy" : "False",
    "Flash" : "False",
    "Glare" : "False",
    "Shadow" : "False",
    "picture":"Baby2.jpeg",
    "user_id":0123456789
    }
)