-- =========================================================
-- RESUME BUILDER DATABASE
-- =========================================================

-- =========================================================
-- 1. RESUME SETTINGS
-- =========================================================

CREATE TABLE IF NOT EXISTS resume_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

    base_slots INTEGER NOT NULL DEFAULT 2,

    extra_slots INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 2. RESUME TEMPLATES
-- =========================================================

CREATE TABLE IF NOT EXISTS resume_templates (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    slug VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    preview_image TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 3. RESUMES
-- =========================================================

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    template_id INTEGER REFERENCES resume_templates(id) ON DELETE SET NULL,

    title VARCHAR(150) NOT NULL,

    source_type VARCHAR(30) NOT NULL
        CHECK (
            source_type IN (
                'manual',
                'ai_generated',
                'uploaded'
            )
        ),

    status VARCHAR(30) NOT NULL DEFAULT 'draft'
        CHECK (
            status IN (
                'draft',
                'completed',
                'archived'
            )
        ),

    content JSONB NOT NULL DEFAULT '{}'::jsonb,

    original_file_name VARCHAR(255),

    stored_file_name VARCHAR(255),

    file_path TEXT,

    file_type VARCHAR(20),

    file_size BIGINT,

    extracted_text TEXT,

    ai_score INTEGER,

    ai_feedback JSONB,

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 4. AI HISTORY
-- =========================================================

CREATE TABLE IF NOT EXISTS resume_ai_history (
    id BIGSERIAL PRIMARY KEY,

    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    action_type VARCHAR(50) NOT NULL,

    input_data JSONB,

    output_data JSONB,

    score INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 5. INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_resumes_user_id
ON resumes(user_id);

CREATE INDEX IF NOT EXISTS idx_resumes_updated_at
ON resumes(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_resume_ai_history_resume_id
ON resume_ai_history(resume_id);


-- =========================================================
-- 6. DEFAULT TEMPLATES
-- =========================================================

INSERT INTO resume_templates
(name, slug, description)
VALUES
(
    'Modern',
    'modern',
    'Modern professional resume with clean sections and visual hierarchy.'
),
(
    'ATS Friendly',
    'ats',
    'Simple ATS-friendly resume designed for job application systems.'
),
(
    'Classic',
    'classic',
    'Traditional professional resume layout.'
),
(
    'Minimal',
    'minimal',
    'Minimal clean resume layout with strong typography.'
)
ON CONFLICT (slug) DO NOTHING;