
INSERT INTO users (id, name, email, password) VALUES (1, 'Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
(2, 'Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES 
(1, 1, 'Speed lamp', 'description', 'www.thumbnail1.com', 'www.cover1.com', 930, 2, 3, 4, 'canada', 'holmes boul', 'toronto', 'ontario', 'm3n2n4', TRUE),
(2, 2, 'Speed bags', 'description', 'www.thumbnail2.com', 'www.cover2.com', 700, 4, 2, 1, 'canada', 'frank ave', 'toronto', 'ontario', 'm3b2n4', TRUE),
(3, 3, 'Speed stream', 'description', 'www.thumbnail3.com', 'www.cover3.com', 599, 5, 2, 3, 'canada', 'brent ave', 'toronto', 'ontario', 'm3n2n6', TRUE);
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) VALUES 
(1, 1, 1, '2018-09-11', '2018-09-26'),
(2, 2, 2, '2019-01-04', '2019-02-01'),
(3, 3, 3, '2021-10-01', '2021-10-14');
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) VALUES
(1, 1, 1, 1, 5, 'great'),
(2, 2, 2, 2, 3, 'good'),
(3, 3, 3, 3, 2, 'bad');