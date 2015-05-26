class PropertiesController < ApplicationController

	def index
		@properties = Property.all
		respond_with @properties
	end

	def create
		@property = Property.create(property_params)
		respond_with @property
	end

	def update
		@property = Property.find(params[:property][:id]).update_attributes(property_params)
		respond_with @property
	end

	def show
		@property = Property.find(params[:id])
		respond_with @property
	end

	def destroy
		@property = Property.find(params[:id])
		@property.destroy
		respond_with @property
	end

	private

	def property_params
		params.require(:property).permit(:name, :address_line, :city, :country)
	end

end