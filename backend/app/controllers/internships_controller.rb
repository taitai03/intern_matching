# app/controllers/internships_controller.rb
class InternshipsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_company!, only: [:create, :update]
  before_action :set_internship, only: [:show, :update]

  # GET /internships
  def index
    if current_user.company?
      # 企業ユーザーは自分が作った募集だけ
      internships = current_user.internships.includes(:genre)
    else
      # 学生ユーザーは全ての募集
      internships = Internship.includes(:genre).all
    end
  
    # ジャンルで絞る場合
    if params[:genre_id].present?
      internships = internships.where(genre_id: params[:genre_id])
    end

    render json: internships.as_json(include: :genre)
  end

  # GET /internships/:id
  def show
    render json: @internship
  end

  # POST /internships
  def create
    internship = current_user.internships.new(internship_params)
    if internship.save
      render json: internship, status: :created
    else
      render json: { errors: internship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /internships/:id
  def update
    if @internship.user_id != current_user.id
      return render json: { error: "自分の投稿しか編集できません" }, status: :forbidden
    end
  
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
    params.require(:internship).permit(:title, :description, :requirements, :status,:genre_id)
  end

  def require_company!
    render json: { error: "企業ユーザーのみ利用可能です" }, status: :forbidden unless current_user.company?
  end
end
