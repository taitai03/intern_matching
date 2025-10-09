# db/seeds.rb

puts "🌱 Seeding database..."

# --- 既存データ削除 ---
Message.destroy_all
ChatRoom.destroy_all
Entry.destroy_all
Internship.destroy_all
Genre.destroy_all
User.destroy_all

# --- ユーザー（企業・学生） ---
company1 = User.create!(
  name: "Tech株式会社",
  email: "tech@example.com",
  password: "password",
  role: "company"
)

company2 = User.create!(
  name: "DesignWorks株式会社",
  email: "design@example.com",
  password: "password",
  role: "company"
)

intern1 = User.create!(
  name: "山田太郎",
  email: "taro@example.com",
  password: "password",
  role: "intern"
)

intern2 = User.create!(
  name: "佐藤花子",
  email: "hanako@example.com",
  password: "password",
  role: "intern"
)

# --- ジャンル ---
web = Genre.create!(name: "Web開発")
design = Genre.create!(name: "デザイン")
marketing = Genre.create!(name: "マーケティング")
ai = Genre.create!(name: "AI・データサイエンス")

# --- インターン募集 ---
internship1 = Internship.create!(
  title: "フロントエンド開発インターン",
  description: "Reactを使ったフロントエンド開発に携わります。",
  user: company1, # user_id に自動セット
  genre: web
)

internship2 = Internship.create!(
  title: "UI/UXデザインアシスタント",
  description: "デザインツールを用いたUI制作の補助を行います。",
  user: company2,
  genre: design
)

internship3 = Internship.create!(
  title: "AIデータ分析補助",
  description: "Pythonを用いたデータ分析やモデル作成を体験。",
  user: company1,
  genre: ai
)

internship4 = Internship.create!(
  title: "SNSマーケティング運用スタッフ",
  description: "企業SNSの投稿・分析をサポートします。",
  user: company2,
  genre: marketing
)

puts "✅ Done! Seed data created successfully."
