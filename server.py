# Machiavellian
# Assignment 12
# 11/14/16

import json
import pprint
from pymongo import MongoClient
import re
import tornado.ioloop
import tornado.web

# Handles requests for "/"
class MyFormHandler(tornado.web.RequestHandler):
    def get(self):
        # Connect to database
        client = MongoClient()
        db = client['database']
        dictionary = db['dictionary']

        # HELPER FUNCTIONS
        # stores data into mongodb given id, key, and value
        def storeData(id, key, value, collection):
            pattern = re.compile("[a-zA-Z][\w]*")
            if pattern.match(id):
                post = {"id": id,
                        "key": key}
                collection.insert_one(post)
            return

        # returns the most recent data given id and key as a string
        def retrieveDataForIdKey(id, key, collection):
            returnString = ""
            cursor = collection.find_one({"id": id, "key": key})
            return pprint.pformat(cursor)

        # returns all data for a given id as a string
        def retrieveDataForId(id, collection):
            returnString = ""
            for post in collection.find({"id": id}):
                returnString = returnString + pprint.pformat(post)
            return returnString

        # returns all data as a string
        def retrieveEverything(collection):
            returnString = ""
            for post in collection.find():
                returnString = returnString + pprint.pformat(post) 
            return returnString

        # Conditions to run the above functions
        if len(self.request.arguments) == 0:
            self.write(retrieveEverything(dictionary))
        if "id" in self.request.arguments:
            if len(self.request.arguments) == 1:
                self.write(retrieveDataForId(self.get_argument("id"), dictionary))
            if "key" in self.request.arguments:
                if len(self.request.arguments) == 2:
                    self.write(retrieveDataForIdKey(self.get_argument("id"), self.get_argument("key"), dictionary))
                if "value" in self.request.arguments:
                    if len(self.request.arguments) == 3:
                        storeData(self.get_argument("id"), self.get_argument("key"), self.get_argument("value"), dictionary)

# Binds directory to tornado class
application = tornado.web.Application([
    (r"/", MyFormHandler),
])

# Listens to port and creates application
if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

   
