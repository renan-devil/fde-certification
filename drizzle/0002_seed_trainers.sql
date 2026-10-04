-- Seed the two FDE School trainers (requested by Renan). Edit tokens are random and unknown: admins edit these profiles.
INSERT INTO "humans" ("slug", "first_name", "last_name", "organization", "community_role", "bio", "email", "edit_token_hash")
VALUES
  ('renan-devillieres', 'Renan', 'Devillières', 'OSS Ventures', 'trainer', 'Teaches the FDE School with Nicolas.', 'renan@oss.ventures', md5(random()::text || clock_timestamp()::text) || md5(random()::text)),
  ('nicolas', 'Nicolas', '', 'OSS Ventures', 'trainer', 'Chief technology officer of OSS Ventures. Teaches the FDE School with Renan.', 'nicolas@oss.ventures', md5(random()::text || clock_timestamp()::text) || md5(random()::text))
ON CONFLICT ("slug") DO NOTHING;
