require "shikashi"
include Shikashi
s = Sandbox.new
priv = Privileges.new
priv.allow_method :require
priv.allow_method :ClassDiagram
priv.allow_method :Class
priv.allow_method :methods
priv.allow_method :connects
priv.allow_method :ComponentDiagram
priv.allow_method :Component
priv.allow_method :Topic
priv.allow_method :publishTo
priv.allow_method :Assembly
priv.allow_method :subscribeTo
priv.allow_method :provides
priv.allow_method :acquires
priv.allow_method :align
priv.allow_method :UseCaseDiagram
priv.allow_method :UseCase
priv.allow_method :link
priv.allow_method :Actor
priv.allow_method :extends

s.run(priv, '
