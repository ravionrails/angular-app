class Room

	include Mongoid::Document
 	# include Mongoid::Attributes::Dynamic
 	# fields types 
 	# Array, BigDecimal, Boolean, Date, DateTime, Float, Hash ,Integer, BSON::ObjectId, Moped::BSON::Binary, Range, Regexp, String, Symbol, Time, TimeWithZone


	field :room_no, type: String
	field :rate, type: Float
	field :occupants_no, type: Integer

	field :property_id, type: BSON::ObjectId

	embeds_many :charges

	validates :room_no, presence: true, uniqueness: true

end