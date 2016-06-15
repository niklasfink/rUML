
require './_cmp.rb'

ComponentDiagram do 

  base1   = Component "Base\nStation 1"
  base2   = Component "Base\nStation 2"
  sent    = Topic "ADS-B\nSentence"
  
  base1.publishTo sent
  base2.publishTo sent
  
  adsbSentence = Assembly "ADS-B\nSentence"
  senSer = Component "Sentence\nServer"
  senSer.subscribeTo sent
  senSer.provides adsbSentence  

  adsbMessage = Assembly "ADS-B\nMessage"
  mesSer = Component "Message\nServer"
  mesSer.provides adsbMessage
  mesSer.acquires adsbSentence
 
  active = Component "Active\nAircraft"
  active.acquires adsbMessage

  align senSer, adsbSentence
  align mesSer, adsbMessage
  
end
