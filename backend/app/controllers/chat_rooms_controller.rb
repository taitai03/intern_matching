class ChatRoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    chat_rooms = current_user.company? ? ChatRoom.where(company: current_user) : ChatRoom.where(applicant: current_user)
    render json: chat_rooms
  end

  def show
    chat_room = ChatRoom.find(params[:id])
    render json: chat_room, include: :messages
  end
end
