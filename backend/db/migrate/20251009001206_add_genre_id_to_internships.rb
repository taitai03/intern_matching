class AddGenreIdToInternships < ActiveRecord::Migration[8.0]
  def change
    add_reference :internships, :genre, null: true, foreign_key: true
  end
end
