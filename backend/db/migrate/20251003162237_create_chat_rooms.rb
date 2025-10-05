class CreateChatRooms < ActiveRecord::Migration[8.0]
  def change
    create_table :chat_rooms do |t|
      t.references :internship, null: false, foreign_key: true
      t.references :applicant, null: false, foreign_key: { to_table: :users }
      t.references :company, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :chat_rooms, [:internship_id, :applicant_id, :company_id], unique: true, name: "unique_chat_room"
  end
end
