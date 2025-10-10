class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from StandardError, with: :handle_internal_error

  private

  def authenticate_user!
    unless current_user
      render json: { error: "ログインが必要です" }, status: :unauthorized
    end
  end

  def record_not_found
    render json: { error: "データが見つかりません" }, status: :not_found
  end

  def invalid_token
    render json: { error: "認証エラーが発生しました" }, status: :unauthorized
  end

  def handle_internal_error(error)
    Rails.logger.error(error.full_message)
    render json: { error: "サーバー内部でエラーが発生しました" }, status: :internal_server_error
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role])
  end
end
