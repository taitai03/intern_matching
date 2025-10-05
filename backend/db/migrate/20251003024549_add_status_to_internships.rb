class AddStatusToInternships < ActiveRecord::Migration[8.0]
  def change
    add_column :internships, :status, :integer
  end
end
