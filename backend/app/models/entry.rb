class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :internship

  after_create :create_chat_room

  private
  def create_chat_room
    ChatRoom.find_or_create_by(
      internship: internship,
      applicant: user
    )
  end

  
end
