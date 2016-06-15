
def ComponentDiagram ( *options, &block )
  @@subject = options[0]
  puts "digraph G { "
  puts "    fontname=\"Bitstream Vera Sans\""
  puts "    rankdir=LR"
  puts "    node [fontname=\"Bitstream Vera Sans\", fontsize=8.0] "
  puts "    edge [fontname=\"Bitstream Vera Sans\", fontsize=8.0, minlen=1, arrowsize=0.8, labeldistance=1.5, labelangle=35.0] "
  block.call
  puts "}"
end

def Component( name ) 
  return Component.new name
end

def Assembly( name )
  return Assembly.new name
end 

def Topic( name )
  return Topic.new name
end

class Component 
  attr_reader :name
  attr_reader :provided
  attr_reader :acquired
  def initialize( name )
    @name = name
    puts " #{self.object_id} [shape=component, label=\"#{@name}\"] "
  end
  def provides( assembly )
    puts " #{self.object_id} -> #{assembly.object_id} [arrowhead=\"none\"]"
  end
  def acquires( assembly )
    puts " #{assembly.object_id} -> #{self.object_id} [dir=\"both\", arrowhead=\"none\", arrowtail=\"tee\", arrowsize=0.5]"
  end
  def publishTo( *topic )
    topic.each do |t|
      puts " #{self.object_id} -> #{t.object_id} [arrowhead=\"vee\", arrowsize=0.5, fontsize=5.0, label=\"<pub>\"]"
    end
  end
  def subscribeTo( *topic )
    topic.each do |t|
      puts " #{t.object_id} -> #{self.object_id} [dir=\"both\", arrowhead=\"vee\", arrowtail=\"none\", arrowsize=0.5, fontsize=5.0, label=\"<sub>\"]"
    end
  end
end

class Assembly 
  attr_reader :name
  def initialize( *options )
    if options[0] != nil then
      @name = options[0]
    else
      @name = ""
    end
    puts " #{self.object_id} [shape=circle, fixedsize=true, width=0.2, fontsize=5.0, label=\"\n\n\n\n\n#{@name}\" ] "
  end
end

class Topic 
  attr_reader :name
  def initialize( *options )
    if options[0] != nil then
      @name = options[0]
    else
      @name = ""
    end
    puts "  #{self.object_id} [shape=doublecircle, fixedsize=true, width=0.2, fontsize=5.0, label=\"\n\n\n\n\n\n<topic>\n#{@name}\" ] "
  end
end

def align( *nodes )
  print "    { rank=same "
  nodes.each { |n| print "#{n.object_id} " }
  puts  "}"
end 
