require 'sinatra'
require 'sinatra/json'
require 'json'		#just because uncertainty
require './_class'	#working on binding ruml_class.rb


use Rack::Logger    #need for console log

set :port, 4711     #setting port to 4711
#set :bind, 127.0.0.1   #set the url/or ip
#set :haml, :format => :html5   #for haml rendering, not in use
set :public_folder, 'public'
@bar

get '/' do
#  content_type 'html5'
  File.read('public/index.html')  #work with css an js
# redirect '/public/index.html'   #same effect, but some browser don't accept the redirection
end

post '/foo' do
	params[ &code]
	x = _class.new			#try to send code to _class.rb
	x.ClassDiagram(:code);
	content_type :json
  {:data => params[x]}.to_json  #echo with the string

end
# development end, running out of time and lose one's head