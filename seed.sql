-- Seed data for testing D1
INSERT INTO projects (title, description, image_url) VALUES 
('Midnight Studio Alpha', 'Our first major production', 'https://via.placeholder.com/600x400'),
('Project Nebula', 'A high-end cinematic experience', 'https://via.placeholder.com/600x400');

INSERT INTO site_settings (key, value) VALUES 
('maintenance_mode', 'false'),
('site_name', 'Midnight Media Studio');
