DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
COMMENT ON TABLE public.saves IS 'DEPRECATED: saves are now local-only (localStorage)';
COMMENT ON TABLE public.profiles IS 'DEPRECATED: accounts removed';