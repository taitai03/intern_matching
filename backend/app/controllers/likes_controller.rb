class LikesController < ApplicationController
# app/controllers/likes_controller.rb

  before_action :authenticate_user!
  before_action :set_internship, only: [:create, :destroy]

  def index
    # 自分がいいねした募集一覧
    likes = current_user.likes.includes(:internship)
    render json: likes.map { |like| like.internship.as_json(include: :genre) }
  end

  def create
    like = current_user.likes.find_or_create_by(internship: @internship)
    render json: like, status: :created
  end

  def destroy
    like = current_user.likes.find_by(internship: @internship)
    like.destroy if like
    head :no_content
  end

  private

  def set_internship
    @internship = Internship.find(params[:internship_id])
  end


end
