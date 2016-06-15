# DSL that creates an internal representation of a use case diagram

require './_ucd2dot.rb' # turn use case representation into dot language 

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
