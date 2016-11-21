from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
# Create the database
db = client.biliCam
# Create a collection (table) named "users" 
users = db.users
# Clear the collection
db.users.delete_many({})
# Insert a document (row) into "users"
# The fields could be anything you want; there are no hard coded fields
# Example 
# users.insert({"username":"Rustler", "password":"546s546sa485", "salt":"123Sheep"})
# users.insert({"username":"Rustler", "password":"546s546sa485", "salt":"123Sheep", "extra":"It is"})
# Both are legal commands
users.insert({"username":"Rustler", "password":"123Sheep", "salt":"5684s6a4s86a"})
users.insert({"username":"James", "password":"446Arse", "salt":"8648s4asa2s1a31"})
results = users.find()
# Tip: If the py is ran twice, the above will display twice
for result in results:
    print (result)