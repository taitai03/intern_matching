class ChatRoomsController < ApplicationController
  before_action :authenticate_user!


  def index
    chat_rooms = current_user.company? ? 
    ChatRoom.where(company: current_user).includes(:company, :applicant,:internship) : 
    ChatRoom.where(applicant: current_user).includes(:company, :applicant,:internship)

    render json: chat_rooms.as_json(
      include: {
        company: { only: [:id, :name] },
        applicant: { only: [:id, :name] },
        internship:{only:[:id,:title]}
      }
    )
  end

  def show
    chat_room = ChatRoom.find(params[:id])
    render json: chat_room, include: {
      messages: {},
      company: { only: [:id, :name] },
      applicant: { only: [:id, :name] },
      internship: { only: [:id, :title] }
    }
  end
end
