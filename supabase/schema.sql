-- =============================================================================
-- DigiCitizen — Digital Citizenship Awareness Platform
-- Complete PostgreSQL Database Schema & Initial Seed Data
-- =============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =============================================================================
-- 1. PROFILES TABLE
-- =============================================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  avatar_url text,
  points integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for leaderboard queries
create index if not exists idx_profiles_points on public.profiles(points desc);
create index if not exists idx_profiles_role on public.profiles(role);

-- =============================================================================
-- 2. CATEGORIES TABLE
-- =============================================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text default 'Shield',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================================================
-- 3. MODULES TABLE
-- =============================================================================
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  order_index integer not null default 1,
  estimated_time text not null default '20 mins',
  icon text not null default 'Shield',
  description text not null,
  learning_objectives jsonb not null default '[]'::jsonb,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_modules_order on public.modules(order_index asc);

-- =============================================================================
-- 4. MODULE_PROGRESS TABLE
-- =============================================================================
create table if not exists public.module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  last_accessed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, module_id)
);

create index if not exists idx_module_progress_user on public.module_progress(user_id);

-- =============================================================================
-- 5. QUIZZES TABLE
-- =============================================================================
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id) on delete cascade unique not null,
  title text not null,
  description text,
  passing_score integer not null default 70,
  time_limit_minutes integer not null default 15,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================================================
-- 6. QUESTIONS TABLE
-- =============================================================================
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  question_text text not null,
  order_index integer not null default 1,
  explanation text not null,
  points integer not null default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_questions_quiz on public.questions(quiz_id, order_index asc);

-- =============================================================================
-- 7. QUIZ_OPTIONS TABLE
-- =============================================================================
create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references public.questions(id) on delete cascade not null,
  option_text text not null,
  is_correct boolean not null default false,
  order_index integer not null default 1
);

create index if not exists idx_quiz_options_question on public.quiz_options(question_id, order_index asc);

-- =============================================================================
-- 8. QUIZ_ATTEMPTS TABLE
-- =============================================================================
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  score integer not null,
  total_questions integer not null,
  percentage numeric(5,2) not null,
  passed boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_quiz_attempts_user on public.quiz_attempts(user_id);
create index if not exists idx_quiz_attempts_quiz on public.quiz_attempts(quiz_id);

-- =============================================================================
-- 9. SCENARIOS TABLE
-- =============================================================================
create table if not exists public.scenarios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  context_story text not null,
  options jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================================================
-- 10. SCENARIO_ATTEMPTS TABLE
-- =============================================================================
create table if not exists public.scenario_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  scenario_id uuid references public.scenarios(id) on delete cascade not null,
  chosen_option_id text not null,
  points_earned integer not null default 0,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, scenario_id)
);

create index if not exists idx_scenario_attempts_user on public.scenario_attempts(user_id);

-- =============================================================================
-- 11. BADGES TABLE
-- =============================================================================
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text not null,
  icon text not null default 'Award',
  criteria text not null,
  points_reward integer not null default 50,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================================================
-- 12. STUDENT_BADGES TABLE
-- =============================================================================
create table if not exists public.student_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, badge_id)
);

create index if not exists idx_student_badges_user on public.student_badges(user_id);

-- =============================================================================
-- 13. CERTIFICATES TABLE
-- =============================================================================
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  certificate_number text not null unique,
  title text not null default 'Certified Digital Citizen',
  completion_details jsonb not null default '{}'::jsonb,
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_certificates_user on public.certificates(user_id);

-- =============================================================================
-- 14. ACTIVITY_LOGS TABLE
-- =============================================================================
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_activity_logs_created on public.activity_logs(created_at desc);

-- =============================================================================
-- HELPER FUNCTIONS & TRIGGERS
-- =============================================================================

-- Updated timestamp trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger tr_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger tr_modules_updated_at
  before update on public.modules
  for each row execute function public.update_updated_at_column();

-- Function to check if calling user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Auto-create profile trigger upon Supabase auth.users signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_first_login_badge_id uuid;
begin
  -- Always set default role to student for new signups
  insert into public.profiles (id, email, full_name, role, points)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student',
    20
  )
  on conflict (id) do nothing;

  -- Attempt to award "First Login" badge automatically
  select id into v_first_login_badge_id from public.badges where code = 'first_login' limit 1;
  if v_first_login_badge_id is not null then
    insert into public.student_badges (user_id, badge_id)
    values (new.id, v_first_login_badge_id)
    on conflict do nothing;
  end if;

  -- Log student registration
  insert into public.activity_logs (user_id, action, details)
  values (
    new.id,
    'STUDENT_REGISTERED',
    jsonb_build_object('email', new.email, 'source', 'supabase_auth')
  );

  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if existing, then attach to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.modules enable row level security;
alter table public.module_progress enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_options enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.scenarios enable row level security;
alter table public.scenario_attempts enable row level security;
alter table public.badges enable row level security;
alter table public.student_badges enable row level security;
alter table public.certificates enable row level security;
alter table public.activity_logs enable row level security;

-- 1. Profiles Policies
-- Public can view profiles for leaderboard (names, points, avatars)
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can only update their own profile; cannot change role directly to admin
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and (role = (select role from public.profiles where id = auth.uid()) or public.is_admin()));

-- 2. Categories Policies
create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

create policy "Admins can manage categories"
  on public.categories for all using (public.is_admin());

-- 3. Modules Policies
create policy "Modules are viewable by everyone"
  on public.modules for select using (true);

create policy "Admins can manage modules"
  on public.modules for all using (public.is_admin());

-- 4. Module Progress Policies
create policy "Users can view own module progress"
  on public.module_progress for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own module progress"
  on public.module_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own module progress"
  on public.module_progress for update
  using (auth.uid() = user_id);

-- 5. Quizzes Policies
create policy "Quizzes are viewable by everyone"
  on public.quizzes for select using (true);

create policy "Admins can manage quizzes"
  on public.quizzes for all using (public.is_admin());

-- 6. Questions Policies
create policy "Questions are viewable by everyone"
  on public.questions for select using (true);

create policy "Admins can manage questions"
  on public.questions for all using (public.is_admin());

-- 7. Quiz Options Policies
create policy "Quiz options are viewable by everyone"
  on public.quiz_options for select using (true);

create policy "Admins can manage quiz options"
  on public.quiz_options for all using (public.is_admin());

-- 8. Quiz Attempts Policies
create policy "Users can view own quiz attempts"
  on public.quiz_attempts for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can submit own quiz attempts"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- 9. Scenarios Policies
create policy "Scenarios are viewable by everyone"
  on public.scenarios for select using (true);

create policy "Admins can manage scenarios"
  on public.scenarios for all using (public.is_admin());

-- 10. Scenario Attempts Policies
create policy "Users can view own scenario attempts"
  on public.scenario_attempts for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can record own scenario attempts"
  on public.scenario_attempts for insert
  with check (auth.uid() = user_id);

-- 11. Badges Policies
create policy "Badges are viewable by everyone"
  on public.badges for select using (true);

create policy "Admins can manage badges"
  on public.badges for all using (public.is_admin());

-- 12. Student Badges Policies
create policy "Student badges are viewable by everyone"
  on public.student_badges for select using (true);

create policy "Users can earn own badges"
  on public.student_badges for insert
  with check (auth.uid() = user_id);

-- 13. Certificates Policies
create policy "Certificates are viewable by everyone"
  on public.certificates for select using (true);

create policy "Users can issue own certificates"
  on public.certificates for insert
  with check (auth.uid() = user_id);

-- 14. Activity Logs Policies
create policy "Users can view own logs or admins view all"
  on public.activity_logs for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users and system can record activity logs"
  on public.activity_logs for insert
  with check (auth.uid() = user_id or auth.uid() is null);

-- =============================================================================
-- SEED DATA (CATEGORIES & BADGES)
-- =============================================================================

insert into public.categories (id, name, slug, description, icon) values
  ('c1111111-1111-1111-1111-111111111111', 'Digital Safety & Fundamentals', 'fundamentals', 'Foundational literacy and safe practices in the modern internet age.', 'Shield'),
  ('c2222222-2222-2222-2222-222222222222', 'Cyber Threat Defense', 'cybersecurity', 'Understanding attack vectors, social engineering, and protective hygiene.', 'Lock'),
  ('c3333333-3333-3333-3333-333333333333', 'Information Integrity', 'integrity', 'Evaluating digital sources, misinformation, and ethical participation.', 'FileCheck')
on conflict (id) do nothing;

insert into public.badges (id, code, title, description, icon, criteria, points_reward) values
  ('b1111111-1111-1111-1111-111111111111', 'first_login', 'First Login', 'Took the first step into the DigiCitizen digital citizenship community.', 'LogIn', 'Sign in to DigiCitizen for the first time.', 20),
  ('b2222222-2222-2222-2222-222222222222', 'first_module_completed', 'First Module Completed', 'Completed your first comprehensive digital citizenship awareness module.', 'BookOpenCheck', 'Mark any learning module as completed.', 50),
  ('b3333333-3333-3333-3333-333333333333', 'cyber_learner', 'Cybersecurity Learner', 'Acquired foundational literacy in cyber threats, malware, and social engineering.', 'Shield', 'Complete the Cybersecurity Awareness module.', 75),
  ('b4444444-4444-4444-4444-444444444444', 'privacy_protector', 'Privacy Protector', 'Mastered data sovereignty, tracking countermeasures, and identity hygiene.', 'Lock', 'Complete the Online Privacy and Data Protection module and score 80%+ on its quiz.', 100),
  ('b5555555-5555-5555-5555-555555555555', 'quiz_master', 'Quiz Master', 'Passed all six module assessment quizzes with flying colors.', 'Award', 'Pass all 6 learning module quizzes with a score of 70% or higher.', 150),
  ('b6666666-6666-6666-6666-666666666666', 'digital_citizen_champion', 'Digital Citizen Champion', 'Achieved mastery across all modules, quizzes, scenarios, and security assessments.', 'Crown', 'Complete all 6 modules, pass all quizzes, complete all safety scenarios, and earn certificate.', 250)
on conflict (code) do nothing;


-- =============================================================================
-- SEED DATA (MODULES & SCENARIOS)
-- =============================================================================

insert into public.modules (id, category_id, title, slug, order_index, estimated_time, icon, description, learning_objectives, content) values
  (
    'm1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Digital Citizenship Fundamentals',
    'digital-citizenship-fundamentals',
    1,
    '25 mins',
    'Compass',
    'Master the core pillars of digital citizenship, digital footprint management, and responsible online behavior.',
    '["Understand the definition and 9 core themes of digital citizenship.", "Analyze your permanent digital footprint and active vs. passive data trails.", "Cultivate positive digital communication and empathetic digital etiquette (Netiquette).", "Recognize your rights and responsibilities in global digital spaces."]'::jsonb,
    '# Digital Citizenship Fundamentals\n\n### 1. Introduction: Living in a Connected World\nDigital citizenship refers to the responsible, ethical, and safe use of digital technologies and the internet. In an era where work, education, civic engagement, and social connections happen online, digital citizenship is no longer optional—it is a core life competency.\n\nA responsible digital citizen understands that digital actions carry real-world consequences, that digital rights correspond with personal duties, and that the internet should remain a safe, constructive space for everyone.\n\n### 2. The Nine Elements of Digital Citizenship\n1. Digital Access\n2. Digital Commerce\n3. Digital Communication\n4. Digital Literacy\n5. Digital Etiquette (Netiquette)\n6. Digital Law\n7. Digital Rights & Responsibilities\n8. Digital Health & Wellness\n9. Digital Security'
  ),
  (
    'm2222222-2222-2222-2222-222222222222',
    'c2222222-2222-2222-2222-222222222222',
    'Cybersecurity Awareness',
    'cybersecurity-awareness',
    2,
    '30 mins',
    'ShieldAlert',
    'Learn to identify phishing campaigns, malware, ransomware, social engineering tactics, and fundamental defense strategies.',
    '["Identify phishing, spear-phishing, smishing, and vishing attack patterns.", "Understand different classes of malware: Trojans, spyware, keyloggers, and ransomware.", "Deploy multi-layered defense: Multi-Factor Authentication (MFA), patch hygiene, and safe network habits.", "Respond systematically to security breaches and suspicious incidents."]'::jsonb,
    '# Cybersecurity Awareness & Defense\n\n### 1. The Anatomy of Cyber Threats\nCybersecurity is the practice of protecting systems, networks, software, and data from digital attacks.\n\n### 2. Social Engineering: Hacking the Human\nSocial engineering exploits human psychology rather than software vulnerabilities: Phishing, Spear Phishing, Smishing, and Vishing.\n\n### 3. Malware Ecosystem\nRansomware, Trojans, Keyloggers, and Spyware represent major vectors.\n\n### 4. Multi-Layered Defense Strategies\n1. Multi-Factor Authentication (MFA)\n2. Software Patching\n3. Zero Trust Principles'
  ),
  (
    'm3333333-3333-3333-3333-333333333333',
    'c1111111-1111-1111-1111-111111111111',
    'Online Privacy and Data Protection',
    'online-privacy-data-protection',
    3,
    '25 mins',
    'EyeOff',
    'Demystify cookies, trackers, data broker economies, privacy regulations (GDPR/CCPA), and identity protection.',
    '["Differentiate between first-party cookies, third-party tracking cookies, and device fingerprints.", "Understand how data brokers aggregate browsing patterns into behavioral advertising profiles.", "Exercise legal privacy rights granted under frameworks like GDPR and CCPA.", "Configure browser privacy extensions, encrypted communications, and password managers."]'::jsonb,
    '# Online Privacy and Data Protection\n\n### 1. Privacy is a Fundamental Right\nOnline privacy encompasses the protection of Personally Identifiable Information (PII).\n\n### 2. How the Tracking Economy Operates\nFirst-Party vs. Third-Party Cookies, Browser Fingerprinting, and Data Brokers.\n\n### 3. Global Privacy Legislation\nGDPR (General Data Protection Regulation) and CCPA.'
  ),
  (
    'm4444444-4444-4444-4444-444444444444',
    'c1111111-1111-1111-1111-111111111111',
    'Cyberbullying and Online Harassment',
    'cyberbullying-online-harassment',
    4,
    '20 mins',
    'HeartHandshake',
    'Recognize various forms of online harassment, dox tactics, flaming, psychological impacts, and active upstander intervention.',
    '["Identify behaviors categorized as cyberbullying, trolling, doxxing, and harassment.", "Understand the psychological and legal ramifications of digital abuse.", "Apply effective evidence collection and reporting protocols.", "Transition from passive bystander to active, empathetic upstander."]'::jsonb,
    '# Cyberbullying and Online Harassment\n\n### 1. Understanding Cyberbullying\nBullying that takes place over digital devices like cell phones, computers, and social networks.\n\n### 2. Common Manifestations\nHarassment, Doxxing, Impersonation (Fraping), Cyberstalking, and Exclusion.\n\n### 3. Upstander Action\nActive upstanders document abuse, offer private solidarity, and report violations.'
  ),
  (
    'm5555555-5555-5555-5555-555555555555',
    'c3333333-3333-3333-3333-333333333333',
    'Digital Ethics and Intellectual Property',
    'digital-ethics-intellectual-property',
    5,
    '25 mins',
    'Scale',
    'Explore copyright laws, Fair Use doctrine, Creative Commons licensing, open-source software, and ethical AI utilization.',
    '["Navigate copyright, trademarks, patents, and intellectual property in digital spaces.", "Differentiate between commercial infringement, Fair Use, and public domain works.", "Apply Creative Commons (CC) licenses accurately to creative and academic work.", "Address emerging ethical questions in generative AI and digital provenance."]'::jsonb,
    '# Digital Ethics and Intellectual Property\n\n### 1. Foundations of Intellectual Property\nCopyright protects original works in tangible mediums.\n\n### 2. Fair Use Doctrine\nCriticism, education, scholarship, and commentary.\n\n### 3. Creative Commons\nCC BY, CC BY-SA, CC BY-NC, CC BY-ND, and CC0.'
  ),
  (
    'm6666666-6666-6666-6666-666666666666',
    'c3333333-3333-3333-3333-333333333333',
    'Fake News and Misinformation',
    'fake-news-and-misinformation',
    6,
    '25 mins',
    'AlertTriangle',
    'Learn verification strategies, deepfake identification, lateral reading techniques, and cognitive bias awareness.',
    '["Distinguish between Misinformation, Disinformation, and Malinformation.", "Perform Lateral Reading and reverse image verification like a professional fact-checker.", "Recognize cognitive biases (confirmation bias, emotional anchoring) exploited by bad actors.", "Identify deepfake synthetic media and manipulative editing techniques."]'::jsonb,
    '# Fake News and Misinformation\n\n### 1. The Information Disorder Spectrum\nMisinformation, Disinformation, and Malinformation.\n\n### 2. Lateral Reading Technique\nFact checkers verify claims by opening new tabs and investigating independent reporting.\n\n### 3. The CRAAP Test\nCurrency, Relevance, Authority, Accuracy, Purpose.'
  )
on conflict (id) do nothing;

-- Create Quizzes for each module
insert into public.quizzes (id, module_id, title, passing_score, time_limit_minutes) values
  ('z1111111-1111-1111-1111-111111111111', 'm1111111-1111-1111-1111-111111111111', 'Digital Citizenship Fundamentals Quiz', 70, 15),
  ('z2222222-2222-2222-2222-222222222222', 'm2222222-2222-2222-2222-222222222222', 'Cybersecurity Awareness Quiz', 70, 15),
  ('z3333333-3333-3333-3333-333333333333', 'm3333333-3333-3333-3333-333333333333', 'Online Privacy and Data Protection Quiz', 70, 15),
  ('z4444444-4444-4444-4444-444444444444', 'm4444444-4444-4444-4444-444444444444', 'Cyberbullying and Online Harassment Quiz', 70, 15),
  ('z5555555-5555-5555-5555-555555555555', 'm5555555-5555-5555-5555-555555555555', 'Digital Ethics and Intellectual Property Quiz', 70, 15),
  ('z6666666-6666-6666-6666-666666666666', 'm6666666-6666-6666-6666-666666666666', 'Fake News and Misinformation Quiz', 70, 15)
on conflict (id) do nothing;
