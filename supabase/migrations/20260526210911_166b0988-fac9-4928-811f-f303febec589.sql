
-- Admins table
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  added_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.admins (email, added_by) VALUES ('aarushsamanta@bernardsboe.com', 'system');

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admins TO authenticated;
GRANT ALL ON public.admins TO service_role;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS TEXT
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT lower(coalesce((auth.jwt() ->> 'email'), ''))
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE lower(email) = public.current_user_email())
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT public.current_user_email() = 'aarushsamanta@bernardsboe.com'
$$;

-- Players table
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  bullet_rating INTEGER,
  blitz_rating INTEGER,
  rapid_rating INTEGER,
  classical_rating INTEGER,
  bullet_games INTEGER NOT NULL DEFAULT 0,
  blitz_games INTEGER NOT NULL DEFAULT 0,
  rapid_games INTEGER NOT NULL DEFAULT 0,
  classical_games INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.players TO authenticated;
GRANT ALL ON public.players TO service_role;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Matches table
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  white_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  black_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  time_control TEXT NOT NULL CHECK (time_control IN ('bullet','blitz','rapid','classical')),
  result TEXT NOT NULL CHECK (result IN ('white','black','draw')),
  white_rating_before INTEGER,
  black_rating_before INTEGER,
  white_rating_after INTEGER NOT NULL,
  black_rating_after INTEGER NOT NULL,
  played_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by TEXT
);

CREATE INDEX idx_matches_white ON public.matches(white_id);
CREATE INDEX idx_matches_black ON public.matches(black_id);
CREATE INDEX idx_matches_played_at ON public.matches(played_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matches TO authenticated;
GRANT ALL ON public.matches TO service_role;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Authenticated can view admins" ON public.admins FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can add admins" ON public.admins FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Only super admin can delete admins" ON public.admins FOR DELETE TO authenticated USING (public.is_super_admin() AND lower(email) <> 'aarushsamanta@bernardsboe.com');

CREATE POLICY "Authenticated can view players" ON public.players FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update players" ON public.players FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete players" ON public.players FOR DELETE TO authenticated USING (public.is_admin());

CREATE POLICY "Authenticated can view matches" ON public.matches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert matches" ON public.matches FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete matches" ON public.matches FOR DELETE TO authenticated USING (public.is_admin());
