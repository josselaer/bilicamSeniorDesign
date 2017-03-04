import tornado.ioloop
import tornado.web
import motor.motor_tornado
import os
import tornado.escape
import json
import urllib.parse
import tornado.httpserver
import ssl

db = motor.motor_tornado.MotorClient().Bilirubin


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("Admin")

class CreateUser(BaseHandler):
    """Create User"""

    def get(self):
        self.render("admin_create_user.html")
    # Have to use async since the database call is asynchronous.
    async def post(self):
        data = tornado.escape.json_decode(self.request.body)
        username = data["username"]
        password = data["password"]
        name = data["name"]
        hospital = data["hospital"]
        hospitalAddress = data["hospitalAddress"]
        city = data["city"]
        document = await db.patients.insert_one(
            {"username": username, "password": password, "name": name, "hospital": hospital,
             "hospitalAddress": hospitalAddress, "city": city})
        if document != None:
            response = {"CreatedUser": "True"}
            self.write(json.dumps(response))

#class IndexHandler(BaseHandler):
    # """Index Page"""

  #  @tornado.web.authenticated
   # def get(self):
    #    self.render("index.html")

class LoginHandler(BaseHandler):
    """Login Page"""

    def get(self):
        if not self.current_user:
            self.render("admin_login.html")
        #else:
            #self.redirect("")
    # Have to use async since the database call is asynchronous.
    async def post(self):
        data = tornado.escape.json_decode(self.request.body)
        username = data["username"]
        password = data["password"]
        document = await db.patients.find_one({"username": username, "password": password})

        # Need to add cookies or another authentication method
        if document != None:
            self.set_secure_cookie("Admin", username)
            response = {"LoggedIn": "True"}
            self.write(json.dumps(response))
        else:
            response = {"LoggedIn": "False"}
            self.write(json.dumps(response))


#class IndexHandler(BaseHandler):
    # """Index Page"""

  #  @tornado.web.authenticated
   # def get(self):
    #    self.render("index.html")

class LogoutHandler(tornado.web.RequestHandler):
    def get(self):
        self.clear_cookie("Admin")
        self.redirect("/")


settings = {
    "template_path": os.path.dirname(os.path.realpath(__file__)) + "\\website\\",
    "static_path": os.path.dirname(os.path.realpath(__file__)) + "\\website\\assets\\",
    "debug": True,
    "cookie_secret": os.urandom(32),
    "login_url": "/"
}

ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
# .crt = Certificate and .key = private key
ssl_ctx.load_cert_chain("server.crt", "server.key")

app = tornado.web.Application([
    (r"/", LoginHandler),
    (r"/Logout", LogoutHandler),
    (r"/CreateUser", CreateUser),
], db=db, **settings)

if __name__ == "__main__":
    server = tornado.httpserver.HTTPServer(app, ssl_options=ssl_ctx)
    server.listen(8888)
    tornado.ioloop.IOLoop.current().start()