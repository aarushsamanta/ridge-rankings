
REVOKE EXECUTE ON FUNCTION public.current_user_email() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC, anon, authenticated;
