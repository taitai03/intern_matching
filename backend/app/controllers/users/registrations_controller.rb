class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json



  private
  

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { user: resource, message: 'Signed up successfully.' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
