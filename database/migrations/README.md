# Migrations

Ye folder database schema changes ka record rakhta hai.

## Kaise Use Karein

Jab bhi database schema mein change karo (naya table, naya column, etc.):

1. Ek nayi file banao: `YYYYMMDD_description.sql`
   - Misal: `20261015_add_user_avatar.sql`

2. Usme SQL likho jo change kare:
   ```sql
   ALTER TABLE public.users ADD COLUMN avatar_url TEXT;