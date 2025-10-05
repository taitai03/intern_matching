class EntriesController < ApplicationController  
  before_action :authenticate_user!

  # 応募作成
  def create
    @internship = Internship.find(params[:internship_id])
    entry = Entry.new(
      user_id: current_user.id,
      internship_id: @internship.id
    )

    if entry.save
      # 応募者（current_user）と企業（インターン作成者）でチャットルームを作成または取得
      chat_room = ChatRoom.find_or_create_by!(
        internship: @internship,
        applicant_id: current_user.id,
        company_id: @internship.user_id
      )

      render json: { 
        message: "応募が完了しました", 
        entry: entry,
        chat_room_id: chat_room.id   
      }, status: :created
    else
      render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 応募一覧（ユーザーの応募）
  def index
    @entries = current_user.entries.includes(:internship)
    render json: @entries, include: :internship
  end

  # 応募削除（キャンセル）
  def destroy
    entry = current_user.entries.find(params[:id])
    if entry.destroy
      render json: { message: "応募を取り消しました" }, status: :ok
    else
      render json: { errors: entry.errors.full_messages }, status: :unprocessable_entity
    end
  end



end
