class Internship < ApplicationRecord
  belongs_to :user
  has_many :entries

  enum :status, { open: 0, closed: 1 }

  validates :title, :description, presence: true
end
