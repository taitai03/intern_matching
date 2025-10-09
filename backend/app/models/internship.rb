class Internship < ApplicationRecord
  belongs_to :user
  has_many :entries
  belongs_to :genre

  enum :status, { open: 0, closed: 1 }

  validates :title, :description,:genre_id, presence: true
end
