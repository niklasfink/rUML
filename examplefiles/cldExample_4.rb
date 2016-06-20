
require './_class.rb'

ClassDiagram "Library" do

  library   = Class "Library"
  bookItem  = Class "BookItem"
  book      = Class "Book"
  catalog   = Class "Catalog"
  account   = Class "Account"
  customer  = Class "Customer"
  librarian = Class "Librarian"

  catalogIfce = Interface "Catalog"
  
  library.has bookItem, :right => "*"
  library.has account, :right => "*"
  library.owns catalog

  customer.has account, :right => "1"
  customer.uses catalogIfce

  librarian.uses catalogIfce

  bookItem.extends book

  catalog.implements catalogIfce
  catalog.connects bookItem, :left => "1", :center => "records", :right => "*", :dir => true

  account.connects bookItem, :right => "0..12", :center => "reserved", :dir => true
  account.connects bookItem, :right => "0..3", :center => "borrowed", :dir => true

end
