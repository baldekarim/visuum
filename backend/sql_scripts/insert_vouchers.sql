-- --------------------------------------------------------------------
-- Dumping data for table `user`
-- --------------------------------------------------------------------

INSERT INTO `user` (`last_name`, `first_name`, `address`, `city`, `zip_code`, `country`, `phone_number`, `email`, `password`, `is_admin`) VALUES
('BARRY', 'Ammar', '15 rue Henri Barbusse', 'Limeil Brevannes', 94450, 'FRANCE', '+33 7 53 77 19 04', 'ambarry85@gmail.com', 'testMP1', 0), 
('DIALLO', 'Fatima', 'Hamdallaye Pharmacie', 'Conakry', 99330, 'GUINEE', '+224 622 05 32 88', 'fatima.diallo@orange.fr', 'testMP2', 1), 
('BALDÉ', 'Karim', '4 Avenue Paul Verlaine', 'Villeneuve Saint-Georges', 94190, 'FRANCE', '+33 6 2 74 37 94', 'abdkarim.balde@gmail.com', 'testMP3', 0);

INSERT INTO `withdrawal` (`name`, `description`, `manager`, `phone_number`, `email`) VALUES
('Marché Madina', "Vente de produit en tout genre, échange de devises", 'Abdoulaye BAH', '+224 664 21 15 89', 'abdoulaye.bah78@example.com'),
('Bambéto rond point', "Vente de téléphone et équipement électroniques", 'Aïssatou SYLLA', '+224 621 15 02 97', 'aicha-sy@gmail.com'),
('Dixinn Terasse', "Cyber café", 'Ismail FOFANA', '+224 622 48 10 53', 'fof_ismo@yahoo.fr'),
('Cosa rail', "Télécentre vente de carte de crédit, transfert Orange Money", 'Souleymane DIALLO', '+224 664 88 46 20', 'soul_telecentre@example.com'),
('Enco 5', "Cyber café", 'Fatoumata OULARÉ', '+224 621 10 47 96', 'fatou.oulare@gmail.com'),
('Kipé Prima Center', "Centre commercial", 'Hafsatou BALDÉ', '+224 665 72 25 46', 'hafsa.magasin@orange.fr'),
('Kaloum', "Magasin de réparation équipements électroniques", 'Abdoulaye SOUMAH', '+224 664 50 13 38', 'ablo89@test.gn'),
('Matoto', "Télécentre", 'Abdourahmane DIALLO', '+224 622 16 88 24', 'doura.center@yahoo.fr'),
('Taouyah Petit-lac', "Magasin de pièces détachées", 'Hadiatou BARRY', '+224 664 55 11 78', 'hadiatou.barry@example.com'),
('Lambanyi', "Épicerie vente de produits alimentaires", 'Abdoul-Rahim SOUMAH', '+224 620 45 99 01', 'soumah_services@hotmail.fr');