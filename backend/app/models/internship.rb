class Internship < ApplicationRecord
  belongs_to :user
  has_many :entries
  belongs_to :genre
  has_many :likes, dependent: :destroy
  has_many :liked_by_users, through: :likes, source: :user

  enum :status, { open: 0, closed: 1 }

  validates :title, :description,:genre_id, presence: true
end
