class SetDefaultStatusOnInternships < ActiveRecord::Migration[8.0]
  def up
    # 既存レコードで NULL のものは 0 (open) にする
    execute <<-SQL.squish
      UPDATE internships
      SET status = 0
      WHERE status IS NULL;
    SQL

    # 今後の挿入のデフォルトを 0 に設定
    change_column_default :internships, :status, from: nil, to: 0

    # NOT NULL 制約を付ける（NULL が残っていないことを前提）
    change_column_null :internships, :status, false, 0
  end

  def down
    # rollback: NOT NULL を外し、デフォルトを nil に戻す
    change_column_null :internships, :status, true
    change_column_default :internships, :status, from: 0, to: nil
  end
end
