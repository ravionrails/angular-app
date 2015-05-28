class RoomMonthlyTransaction

	include Mongoid::Document
 	# include Mongoid::Attributes::Dynamic
 	# fields types 
 	# Array, BigDecimal, Boolean, Date, DateTime, Float, Hash ,Integer, BSON::ObjectId, Moped::BSON::Binary, Range, Regexp, String, Symbol, Time, TimeWithZone


 	field :room_id, type: BSON::ObjectId
	field :room_no, type: String
	field :rate, type: Float
	field :occupants_no, type: Integer
	field :is_paid, type: Float
	field :arrears, type: Float
	field :status, type: Array

	embeds_many :charges

end