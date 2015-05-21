class HomeController < ApplicationController

	def index
		render 'index.html.erb'#, layout: nil
	end

end