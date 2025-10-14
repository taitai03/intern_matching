class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  enum :role, { intern: 0, company: 1 }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
          :jwt_authenticatable,
          jwt_revocation_strategy: JwtDenylist
  self.skip_session_storage = [:http_auth, :params_auth]

  has_many :internships, dependent: :destroy
  has_many :likes, dependent: :destroy
has_many :liked_internships, through: :likes, source: :internship
end
