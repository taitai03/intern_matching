class CreateEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :entries do |t|
      t.references :user, null: false, foreign_key: true
      t.references :internship, null: false, foreign_key: true

      t.timestamps
    end
  end
end
