# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_03_162332) do
  create_table "chat_rooms", force: :cascade do |t|
    t.integer "internship_id", null: false
    t.integer "applicant_id", null: false
    t.integer "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["applicant_id"], name: "index_chat_rooms_on_applicant_id"
    t.index ["company_id"], name: "index_chat_rooms_on_company_id"
    t.index ["internship_id", "applicant_id", "company_id"], name: "unique_chat_room", unique: true
    t.index ["internship_id"], name: "index_chat_rooms_on_internship_id"
  end

  create_table "entries", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "internship_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["internship_id"], name: "index_entries_on_internship_id"
    t.index ["user_id"], name: "index_entries_on_user_id"
  end

  create_table "internships", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "requirements"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0, null: false
    t.index ["user_id"], name: "index_internships_on_user_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "chat_room_id", null: false
    t.integer "user_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_room_id"], name: "index_messages_on_chat_room_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "chat_rooms", "internships"
  add_foreign_key "chat_rooms", "users", column: "applicant_id"
  add_foreign_key "chat_rooms", "users", column: "company_id"
  add_foreign_key "entries", "internships"
  add_foreign_key "entries", "users"
  add_foreign_key "internships", "users"
  add_foreign_key "messages", "chat_rooms"
  add_foreign_key "messages", "users"
end
