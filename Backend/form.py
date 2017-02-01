import tornado.ioloop
import tornado.web
import motor.motor_tornado
import asyncio
import os
import tornado.escape
import json
import urllib.parse
import pprint

db = motor.motor_tornado.MotorClient().Bilirubin

# All HTML pages need assets to fully function
class LoginHandler(tornado.web.RequestHandler):
    """Login Page"""
    def get(self):
        self.render("login.html")
    
    # Have to use async since the database call is asynchronous.
    async def post(self):
        data = tornado.escape.json_decode(self.request.body)
        username = data["username"]
        password = data["password"]
        document = await db.patients.find_one({"username":username, "password":password})

        # Need to add cookies or another authentication method
        if document != None:
            response = {"LoggedIn":"True"}
            self.write(json.dumps(response))
        else:
            response = {"LoggedIn":"False"}
            self.write(json.dumps(response))

class IndexHandler(tornado.web.RequestHandler):
    """Index Page"""
    def get(self):
        self.render("index.html")

class SearchByBiliHandler(tornado.web.RequestHandler):
    async def get(self):
        data = urllib.parse.parse_qs(self.request.query)
        num1 = float(data["num1"][0])
        num2 = float(data["num2"][0])
        cursor = db.patients.find({"bilirubin":{"$gt":num1, "$lt":num2}})
        document = await cursor.to_list(length=100)

class SearchByNameHandler(tornado.web.RequestHandler):
    async def get(self):
        data = urllib.parse.parse_qs(self.request.query)
        name = str(data["name"][0]).strip()
        document = await db.patients.find_one({"name":name})

class SearchByIdHandler(tornado.web.RequestHandler):
    async def get(self):
        data = urllib.parse.parse_qs(self.request.query)
        num = int(data["idNum"][0])
        document = await db.patients.find_one({"id":num})

class SearchByEthnicityHandler(tornado.web.RequestHandler):
    async def get(self):
        data = urllib.parse.parse_qs(self.request.query)
        ethnicities = [x.title() for x in data["ethnicities[]"]]
        cursor = db.patients.find({"ethnicity":{"$in":ethnicities}})
        document = await cursor.to_list(length=100)

settings = {
    "template_path":os.path.dirname(os.path.realpath(__file__)) + "\\website\\",
    "static_path":os.path.dirname(os.path.realpath(__file__)) + "\\website\\assets\\",
    "debug":True
}

app = tornado.web.Application([
    (r"/", LoginHandler),
    (r"/Index", IndexHandler),
    (r"/SearchByBili", SearchByBiliHandler),
    (r"/SearchByName", SearchByNameHandler),
    (r"/SearchById", SearchByIdHandler),
    (r"/SearchByEthnicity", SearchByEthnicityHandler),
], db=db, **settings)

if __name__ == "__main__":
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()