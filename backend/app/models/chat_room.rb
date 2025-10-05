class ChatRoom < ApplicationRecord
  belongs_to :internship
  belongs_to :company, class_name: "User"
  belongs_to :applicant, class_name: "User"

  has_many :messages, dependent: :destroy

  validates :internship_id, uniqueness: { scope: [:applicant_id, :company_id] }
end
