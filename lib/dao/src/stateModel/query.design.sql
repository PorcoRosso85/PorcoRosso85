-- BEGIN------------------------------
-- /user_account./:user_id./user_info.name: GetUser :one
-- name: GetUser :one
-- ユーザー情報を取得するクエリ { users }
SELECT * FROM users WHERE email = $1;

-- ------------------------------END

-- BEGIN------------------------------
-- name: InsertUser :one
-- ユーザー情報を追加するクエリ { users }
INSERT INTO users (user_id, user_name, email, registered_at) VALUES ($1, $2, $3, $4) RETURNING *;

-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- 認証するためのクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- 認証するためのクエリ


-- ------------------------------END

-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- 認証するためのクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- 認証するためのクエリ


-- ------------------------------END

-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.オーダー現状をwait＞pendingに変更するクエリ
-- 認証するためのクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- オーダー現状をwait＞pendingに変更するクエリ


-- ------------------------------END


-- BEGIN------------------------------
-- /order./:orderId./verification.認証するためのクエリ
-- 認証するためのクエリ


-- ------------------------------END

