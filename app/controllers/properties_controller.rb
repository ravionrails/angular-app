class PropertiesController < ApplicationController

	def index
		@properties = Property.all
		respond_with @properties
	end

	def create
		@property = Property.create(property_params)
		respond_with @property
	end

	private

	def property_params
		params.require(:property).permit(:name, :address_line, :city, :country)
	end

end