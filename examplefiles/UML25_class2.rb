
require './_class.rb' 

ClassDiagram "Account" do

  account = Class "Account"
  account.addNote "Account can beassociated eitherwith a person orwith a corporation"
  
  pers    = Class "Person"
  corp    = Class "Corporation"
  constr  = Constraint "{ xor }"

  pers.has constr
  corp.has constr

  constr.connects account, { :dir => true }
  constr.addNote "Default UML style canbecome cluttered;in DOT edges cannot be linkedwe need a node"
  
end
