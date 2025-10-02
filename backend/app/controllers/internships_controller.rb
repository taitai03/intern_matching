# app/controllers/internships_controller.rb
class InternshipsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_company!, only: [:create, :update, :destroy]

  def index
    @internships = Internship.all
    render json: @internships
  end

  def create
    internship = current_user.internships.build(internship_params)
    if internship.save
      render json: internship, status: :created
    else
      render json: { errors: internship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def internship_params
    params.require(:internship).permit(:title, :description, :requirements)
  end

  def require_company!
    render json: { error: "企業ユーザーのみ利用可能です" }, status: :forbidden unless current_user.company?
  end
end

