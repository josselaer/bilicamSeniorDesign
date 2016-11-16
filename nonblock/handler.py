import tornado.web

from tornado.web import HTTPError
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.options import define, options
from tornado.escape import recursive_unicode

# convenience imports
import datetime
import decimal
import json
import os
import os.path


class TestHandler(tornado.web.RequestHandler):
	def get(self):
		self.write("Hello World")

	def post(self):
		self.write("This isnt right")