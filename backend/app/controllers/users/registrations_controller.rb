class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json



  private
  

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        user: {
          id: resource.id,
          email: resource.email,
          name: resource.name,
          role: resource.role # ← "intern" or "company" で返る
        },
        message: 'Signed up successfully.'
      }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
