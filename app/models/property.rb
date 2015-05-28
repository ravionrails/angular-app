class Property
	include Mongoid::Document
	field :name, type: :string
	field :address_line, type: :string
	field :city, type: :string
	field :country, type: :string

	embeds_many :rooms

end
