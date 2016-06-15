require './_ucd.rb'
UseCaseDiagram :name => 'cruise control system' do
driver = Actor 'Driver'
can    = Actor 'CAN'
activate = UseCase 'activate cruise control'
driver.link activate
activate = UseCase 'enable speed control'
driver.link activate
increase1 = UseCase 'increase speed by 1'
driver.link increase1
increase5 = UseCase 'increase speed by 5'
increase5.extends increase1
decrease1 = UseCase 'decrease speed by 1'
driver.link decrease1
decrease5 = UseCase 'decrease speed by 5'
decrease5.extends decrease1
disable = UseCase 'disable speed control'
driver.link disable
can.link disable
deactivate = UseCase 'deactivate cruise control'
driver.link deactivate
end
