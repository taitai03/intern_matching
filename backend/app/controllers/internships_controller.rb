# app/controllers/internships_controller.rb
class InternshipsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_company!, only: [:create, :update]
  before_action :set_internship, only: [:show, :update]

  # GET /internships
  def index
    @internships = Internship.all
    render json: @internships
  end

  # GET /internships/:id
  def show
    render json: @internship
  end

  # POST /internships
  def create
    internship = current_user.internships.build(internship_params)
    if internship.save
      render json: internship, status: :created
    else
      render json: { errors: internship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /internships/:id
  def update
    if @internship.update(internship_params)
      render json: @internship, status: :ok
    else
      render json: { errors: @internship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # 共通処理として before_action で呼ばれる
  def set_internship
    @internship = Internship.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "インターンシップが見つかりません" }, status: :not_found
  end

  def internship_params
    params.require(:internship).permit(:title, :description, :requirements, :status)
  end

  def require_company!
    render json: { error: "企業ユーザーのみ利用可能です" }, status: :forbidden unless current_user.company?
  end
end
