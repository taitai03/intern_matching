class Genre < ApplicationRecord
  has_many :internships
  validates :name, presence: true, uniqueness: true
end
