require './_class.rb'

ClassDiagram "SearchEngine" do

  siteSearchIfce = Interface "SiteSearch"
  
  pageableIfce   = Interface "Pageable"
  pageableIfce.attributes "+UNKNOWN_NUMBER_OF_PAGES : int = -1"
  pageableIfce.methods "+getNumberOfPages() : int", "+getFormat(int) : Format", "+getPrintable(int) : Printable"

  searchEngine = Class "SearchEngine"

  searchEngine.implements pageableIfce
  searchEngine.implements siteSearchIfce
end
