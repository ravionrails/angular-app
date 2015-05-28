class Charge

	include Mongoid::Document

	field :name, type: String
	field :fixed_or_dynamic, type: Boolean
	field :fixed_rate, type: Float
	field :dynamic_rate, type: Float
	field :dynamic_qty, type: String

end