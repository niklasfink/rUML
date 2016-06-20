require './_class.rb'

ClassDiagram "Topic" do
  # define a class
  # the class topic is marked with the stereotype <subject>
  topic = Class "Topic"

  # define a class with methods (and no attributes)
  pub  = Class "Publisher"
  pub.methods "+ publish ( Topic )"
  # define a link between classes
  pub.connects topic, {:left => "publish\nto", :dir => true }

  # define another calss with methods
  sub1 = Class "Subscriber A"
  sub1.methods "+ subscribe ( Topic )"
  
  sub2 = Class "Subscriber B"
  sub2.methods "+ subscribe ( Topic )"

  # define some more connections between the classes
  sub1.connects topic, :left => "subscr\nto", :dir => true 
  sub2.connects topic, :left => "subscr\nto", :dir => true 
end