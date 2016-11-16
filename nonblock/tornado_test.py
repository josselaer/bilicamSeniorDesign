#!/usr/bin/python
'''Starts and runs the tornado with BaseHandler '''

# database imports
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

# tornado imports
import tornado.web
from tornado.web import HTTPError
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.options import define, options

# custom imports
#from basehandler import BaseHandler
#import examplehandlers as eh
import handler as h

# Setup information for tornado class
define("port", default=8000,
       help="run on the given port", type=int)

# Utility to be used when creating the Tornado server
# Contains the handlers and the database connection
class Application(tornado.web.Application):
    def __init__(self):
        '''Store necessary handlers,
        connect to database
        '''

        handlers = [
                    #(r"/[/]?",             ),
                    (r"/GetExample[/]?",   h.TestHandler),
                    #(r"/DoPost[/]?",       eh.PostHandlerAsGetArguments),
                       # needs nginx running to work           
                    ]


        try:
            self.client  = MongoClient(serverSelectionTimeoutMS=5) # local host, default port
            print(self.client.server_info()) # force pymongo to look for possible running servers, error if none running
            # if we get here, at least one instance of pymongo is running
            self.db = self.client.test2 # database with labeledinstances, models
            
        except ServerSelectionTimeoutError as inst:
            print('Could not initialize database connection, skipping')
            print(inst)

        settings = {'debug':True}
        tornado.web.Application.__init__(self, handlers, **settings)

    def __exit__(self):
        self.client.close()


def main():
    '''Create server, begin IOLoop 
    '''
    tornado.options.parse_command_line()
    http_server = HTTPServer(Application(), xheaders=True)
    http_server.listen(options.port)
    IOLoop.instance().start()

if __name__ == "__main__":
    main()
