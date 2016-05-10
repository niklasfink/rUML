require 'sinatra'
require 'sinatra/json'
require 'json'		#just because uncertainty



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

# post '/foo' do
#   json :rubyCode		#incoming"rubyCode", not the string, there is no string
#   request.accept		#no use of this actually
#   request.query_string
# end
post '/foo' do
	params[:name]
	content_type :json
  { :data => 'value1'}.to_json
end

get '/rubyCode' do
	puts params[:data]
end
#put '/index.output' do
#	rubyCode
#end

# get "/" do
#   t = %w[text/css text/html application/javascript]
#   request.accept              # ['text/html', '*/*']
#   request.accept? 'application/javascript'  # true
#   request.preferred_type(t)   # 'text/html'
#   request.body                # Request-Body des Client (siehe unten)
#   request.scheme              # "http"
#   request.script_name         # "/example"
#   request.path_info           # "/foo"
#   request.port                # 80 has to be 4711
#   request.request_method      # "GET"
#   request.query_string        # ""
#   request.content_length      # Länge des request.body
#   request.media_type          # Medientypus von request.body
#   request.host                # "example.com"
#   request.get?                # true (ähnliche Methoden für andere Verben)
#   request.form_data?          # false
#   request["editor"]			  # Wert von einem Parameter; [] ist die Kurzform für den params Hash
#   request.referrer            # Der Referrer des Clients oder '/'
#   request.user_agent          # User-Agent (verwendet in der :agent Bedingung)
#   request.cookies             # Hash des Browser-Cookies
#   request.xhr?                # Ist das hier ein Ajax-Request?
#   request.url                 # "http://example.com/example/foo"
#   request.path                # "/example/foo"
#   request.ip                  # IP-Adresse des Clients
#   request.secure?             # false (true wenn SSL)
#   request.forwarded?          # true (Wenn es hinter einem Reverse-Proxy verwendet wird)
#   request.env                 # vollständiger env-Hash von Rack übergeben
# end