const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Starting migration...");
    await client.query("BEGIN");

    // 1. Alter users table to relax student-only constraints
    await client.query(`
      ALTER TABLE users 
      ALTER COLUMN usn DROP NOT NULL,
      ALTER COLUMN parent_mobile DROP NOT NULL,
      ALTER COLUMN organization DROP NOT NULL;
    `);
    console.log("Relaxed users column constraints (usn, parent_mobile, organization)");

    // 2. Add status, rejection_reason, approved_at to users
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'approved',
      ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
      ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS approved_by INTEGER;
    `);
    console.log("Added status, rejection_reason, approved_at columns to users");

    // Ensure all existing students have status = 'approved'
    await client.query(`
      UPDATE users SET status = 'approved' WHERE status IS NULL;
    `);

    // 3. Create employers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS employers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(255) NOT NULL,
        industry VARCHAR(100),
        company_size VARCHAR(100),
        website VARCHAR(255),
        location VARCHAR(255),
        contact_person VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        rejection_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Ensured employers table exists");

    // 4. Create institutions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS institutions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        institution_name VARCHAR(255) NOT NULL,
        institution_type VARCHAR(100),
        admin_name VARCHAR(255),
        designation VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        website VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        rejection_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Ensured institutions table exists");

    // 5. Create opportunities table
    await client.query(`
      CREATE TABLE IF NOT EXISTS opportunities (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        employer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        type VARCHAR(50) DEFAULT 'Internship',
        location VARCHAR(255),
        stipend VARCHAR(100),
        duration VARCHAR(100),
        deadline DATE,
        skills TEXT[],
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        applicants_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Ensured opportunities table exists");

    // 6. Create admin_audit_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_audit_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER,
        action VARCHAR(100) NOT NULL,
        target_type VARCHAR(50) NOT NULL,
        target_id INTEGER,
        details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Ensured admin_audit_logs table exists");

    // 7. Seed Admin user if not exists
    const adminEmail = "admin@udyamsethu.com";
    const adminCheck = await client.query("SELECT id FROM users WHERE email = $1", [adminEmail]);
    if (adminCheck.rows.length === 0) {
      const hashedPassword = await bcrypt.hash("AdminPassword@123", 10);
      await client.query(`
        INSERT INTO users (full_name, email, mobile, password, role, status)
        VALUES ('System Administrator', $1, '9876543210', $2, 'admin', 'approved')
      `, [adminEmail, hashedPassword]);
      console.log("Seeded default admin user: admin@udyamsethu.com with password: AdminPassword@123");
    } else {
      console.log("Admin user already exists");
    }

    // 8. Seed sample opportunity if none exist
    const oppCheck = await client.query("SELECT id FROM opportunities LIMIT 1");
    if (oppCheck.rows.length === 0) {
      await client.query(`
        INSERT INTO opportunities (title, company_name, type, location, stipend, duration, skills, description, status, applicants_count)
        VALUES 
        ('Full Stack Web Developer Intern', 'TechCorp Solutions', 'Internship', 'Bangalore / Remote', '₹20,000 / month', '6 Months', ARRAY['React', 'Node.js', 'PostgreSQL'], 'Work on cutting-edge educational & workforce web solutions.', 'active', 14),
        ('AI / ML Research Associate', 'DataMinds AI Labs', 'Full-time', 'Hyderabad', '₹45,000 / month', 'Permanent', ARRAY['Python', 'Machine Learning', 'NLP'], 'Develop generative AI models and intelligent workflows for student assessments.', 'active', 28),
        ('UI/UX Product Design Intern', 'CreativeFlow Studio', 'Internship', 'Remote', '₹15,000 / month', '3 Months', ARRAY['Figma', 'Prototyping', 'User Research'], 'Design user-centric interfaces and wireframes for mobile & web apps.', 'active', 9)
      `);
      console.log("Seeded sample opportunities");
    }

    await client.query("COMMIT");
    console.log("Database migration finished successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

migrate();
