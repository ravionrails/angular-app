class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :name
      t.string :address_line
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end
