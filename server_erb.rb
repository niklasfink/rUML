#Kill the server: lsof -wni tcp:PORT
#kill -9 PID
#$ gem install erb,$ gem install sinatra
require 'sinatra'
require 'json'
require 'erb'

use Rack::Logger    #need for console log

set :port, 4711     #setting port to 4711
#set :bind, 127.0.0.1   #set the url/or ip
set :public_folder, 'views'


	#get '/' do     #not in use
	#  haml :index
	#end
get '/' do     #WARN: tilt autoloading 'tilt/erubis' in a non thread-safe way; explicit require 'tilt/erubis' suggested
  erb :index	#but it works
end

@umlstring	#just a var

# before do
#   if request.request_method == "POST"
#     body_parameters = request.body.read
#     @json = JSON.parse(body_parameters)
#   end
# end

post "/ :editor :form_data" do
  request.body.rewind # falls schon jemand davon gelesen hat
  daten = JSON.parse request.body.read
  "Hallo #{daten['name']}!"
end