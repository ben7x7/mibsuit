class ErrorsController < ApplicationController
  def not_found
    render status: 404
  end

  def unacceptable
    render status: 422
  end

  def servver_error
    render status: 500
  end
end
