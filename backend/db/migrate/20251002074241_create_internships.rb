class CreateInternships < ActiveRecord::Migration[8.0]
  def change
    create_table :internships do |t|
      t.string :title
      t.text :description
      t.text :requirements
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
