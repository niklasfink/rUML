# DSL that creates an internal representation of a use case diagram


$options = {}
$layout  = :circo   # standard layout :circo; alternatives :dot :neato :twopi :fdp :sfdp :patchwork :osage
$rankdir = :LR      # standard ranking direction of the graph :LR (left to right)

def displayOpen( options={} ) # open the graph (preamble)
  $options = options
  if $options != nil then
    if $options.has_key? :layout  then $layout  = options[:layout]   end
    if $options.has_key? :rankdir then $rankdir = options[:rankdir]  end
  end
  puts "digraph G {"
  puts "    rankdir=#{$rankdir}"
  puts "    layout=\"#{$layout}\""
  puts "    fontname = \"Bitstream Vera Sans\""
  puts "    ucd [shape=plaintext, fontsize=18, label=\"#{$name}\"] " if $layout == :circo
end

def displayActors( actors ) # display all actors
  actors.each do |a|
    puts "    #{a.object_id} [shape=plaintext, color=blue, fontcolor=blue, label=\"<Actor>\\n#{a.name}\"]"
    a.uc.each do |n|
      if n.class == UseCase then
        puts "    #{a.object_id} -> #{n.object_id} [arrowhead=\"none\"]"
      end
    end
  end
end

def displayUseCases( usecases ) # display all use cases
  # if :dot layout -> actors are outside of the subgraph (big box)
  # if :dot layout -> use cases lie inside of the subgraph (big box)
  puts "    subgraph clusterSystems {"     if $layout == :dot
  puts "        label = \"#{$options[:name]}\"" if $layout == :dot
  usecases.each do |uc|
    puts "        #{uc.object_id} [label=\"#{uc.name}\"] // use case"
  end
  puts "    }" if $layout == :dot # close subgraph
end

def displayLinks( usecases ) # display links between the use cases
  usecases.each do |uc|
    uc.LINKS.each do |n|
      if n.class == UseCase then
        puts "    #{uc.object_id} -> #{n.object_id} [style=\"dashed\", arrowhead=\"open\"]"
      end
    end
    uc.INCLUDES.each do |n|
      if n.class == UseCase then
        puts "    #{uc.object_id} -> #{n.object_id} [label=\"<includes>\", style=\"dashed\", arrowhead=\"open\"]"
      end
    end
    uc.USES.each do |n|
      if n.class == UseCase then
        puts "    #{uc.object_id} -> #{n.object_id} [label=\"<uses>\", style=\"dashed\", arrowhead=\"open\"]"
      end
    end
    uc.EXTENDS.each do |n|
      if n.class == UseCase then
        puts "    #{uc.object_id} -> #{n.object_id} [label=\"<extends>\", style=\"dashed\", arrowtail=\"empty\", shape=\"onormal\"]"
      end
    end
  end
end

def displayClose() # close the graph
  puts "}"
end

$actors   = []
$usecases = []
$name     = "<<use case diagram>>"

# simple syntax for creating a use case diagram
# UseCaseDiagram ( :option => :value, ...  ) do ... end
def UseCaseDiagram( options={}, &block )
  # options :name => "Name of the Diagram"
  $name = "#{$name}\n#{options[:name]}" if options.has_key? :name
  # first create internal model,
  # i.e. the <code> in the DSL is executed
  # UseCaseDiagram () do ...<code>... end is executed
  # thereby building the internal use case diagram representation
  block.call
  # display the model
  displayOpen options           # display preamble, also provide specific options for the display
  displayUseCases $usecases     # display all use cases
  displayLinks    $usecases     # display links between the use cases
  displayActors   $actors       # display actors and their links to use cases
  displayClose                  # display epilogue
end # UseCaseDiagram

# simple syntax for creating an actor:
# DSL> ac = Actor "<name>"
def Actor( name )
  return Actor.new name
end
# simple syntax for creating a use case:
# DSL> uc = UseCase "<name>"
def UseCase( name )
  return UseCase.new name
end

class Actor
  attr_accessor :name
  attr_accessor :uc
  def initialize(name)
    @name = name
    @uc = []
    $actors << self
  end
  # connect actor to use case(s)
  # DSL> ac.link <uc>, <uc>, <uc>
  def link(*uc)
    uc.each { |u| @uc << u }
  end
end

class UseCase
  attr_accessor :name
  attr_accessor :LINKS
  attr_accessor :INCLUDES
  attr_accessor :USES
  attr_accessor :EXTENDS
  def initialize(name)
    @name = name
    @LINKS    = []
    @INCLUDES = []
    @USES     = []
    @EXTENDS  = []
    $usecases << self
  end
  def link(*nodes)
    nodes.each { |n| @LINKS << n if n.class == UseCase}
  end
  def includes(*nodes)
    nodes.each { |n| @INCLUDES << n if n.class == UseCase }
  end
  def uses(*nodes)
    nodes.each { |n| @USES << n if n.class == UseCase }
  end
  def extends(*nodes)
    nodes.each { |n| @EXTENDS << n if n.class == UseCase }
  end
end
