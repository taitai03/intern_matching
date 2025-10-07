class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    chat_room = ChatRoom.find(params[:chat_room_id])
    messages = chat_room.messages.includes(:user)
    render json: messages.as_json(include: { user: { only: [:id, :name] } })
  end

  def create
    chat_room = ChatRoom.find(params[:chat_room_id])
    message = chat_room.messages.build(message_params.merge(user: current_user))

    if message.save
      # 保存後にブロードキャスト（ActionCable経由）
      ChatRoomChannel.broadcast_to(chat_room, {
        id: message.id,
        content: message.content,
        user_id: message.user_id,
        user_name: message.user.name,
        user: { id: current_user.id, name: current_user.name },
        created_at: message.created_at
      })
      render json: message.as_json(include: { user: { only: [:id, :name] } }), status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
