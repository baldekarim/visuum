SET SQL_MODE = "NO_BACKSLASH_ESCAPES";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Dumping data for table `type-of-shops`
--

INSERT INTO `type_of_shops` (`title`) VALUES
('Alimentation & Restauration'),
('Textile, Habillemement, Chaussures & Bijoux'), 
('Vente en ligne'),
('Transport et Logistique'),
('BTP & Matériaux de construction'),
('Electronique, Télécom & IT'),
('Commerce Générale & Distribution');

-- --------------------------------------------------------

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`name`, `acronym`, `logo`, `manager`, `address`, `phone_1`, `phone_2`, `phone_3`, 
                     `email`, `opening_date`, `pictures`, `region`, `prefecture`, `sub_prefecture`, `district`, 
                     `fbk_page`, `opening_hours`, `website`, `description`, `type_of_shops_id`) VALUES
("ACTOUM", "", "/actoum/actoum_logo.jpg", "", "", "662993244", "64077777", "620125351 ", "info@actoum.com", null, "/actoum/", "Basse Guinée", "Conakry", 
 "Ratoma", "Hamdallaye", "https://www.facebook.com/Actoum-459255998232322/", "", "www.actoum.com", "Première place de marché en 
 ligne de Conakry, Ouvrez une boutique en quelques clic et augmenter vos ventes. Depuis votre domicile ou votre bureau accéder aux 
 plus larges choix d'articles de tout genre.
 Actoum est une marketplace ou tout vendeur peut s'inscrire gratuitement et publier son catalogue de produit. Tout t'acheteur en 
 ligne peut visité également le site voir les article qui l'intéresse et les ajoute dans panier pour effectuer une commande. 
 La livraison est par Actoum ou par le vendeur lui meme", 3),
 ("AFRIANNONCES", "", "/afriannonces/afriannonces_logo.jpg", "Mamadou Sow", "A coté de l'ISSEG", "655950695", "655950695", "", "", null, 
 "/afriannonces/", "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/afriannonces/", "", "https://afriannonces.com/", 
 "Petites annonces gratuites avec Afriannonces le N°1 de l'Annonce Gratuite Pour les 54 pays Africains plus de 10.000 ANNONCES 100% GRATUITES en 
 Afrique. Véhicules, Immobilier, Offres D'emploi, Cours & Formations, High-Tech, Service & Aide à la Personne, Événements, Animaux, 
 Rencontres, Médecine Traditionnelle.", 3),
 ("AFRIMALIN", "", "/afrimalin/afrimalin-2.png", "", "Imm. Boussirya, 1er étage", "626654974", "628155887", "", "contact@afrimalin.com", null, 
  "/afrimalin/", "Basse Guinée", "Conakry", "Dixinn", "Camayenne", "https://www.facebook.com/Afrimalin/", "Lundi au Vendredi de 8H30 à 18H", 
  "https://www.afrimalin.com/", "Afrimalin, tout vendre et acheter à prix malins ! Le site des petites annonces pour particuliers
  et professionnels en Afrique francophone", 3),
("SOW BOUTIQUE", "", "/sow_boutique/sow_boutique.jpg", "", "", "664315282", "628529027", "", "th6moussa@gmail.com", null, "/sow_boutique/", 
 "Basse Guinée", "Conakry", "Kaloum", "", "", "", "", "Article prêt à porter Mode homme et femme", 2),
("GUSTAVE SHOP", "", "/gustave_shop/gustave_shop_1.jpg", "Mohamed Gustave", "Centre commercial", "628479926", "666424454", "", "mohamedgustavek@yahoo.fr", null, 
 "/gustave_shop/", "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/gustaveshop/", "", "", "Bienvenue chez Gustave shop, nous vendons des 
 habillement de tous genres pour homme.", 2),
("S.B.C GUINÉE SHOPPING", "", "/sbc_guinee_shopping/sbc_guinee_shopping_logo.jpg", "", "", "622412202", "622412202", "", "sbc.gshopping@gmail.com", null,
 "/sbc_guinee_shopping/", "", "", "", "", "https://www.facebook.com/sbcGShopping/", "", "", "une boutique en ligne. Commander en ligne et nous vous Livrons à 
 domicile", 3),
("BEIJA FLOOR", "", "/beija_floor/beija_floor-1.jpg", "", "Auto-Route", "628202814", "", "", "", null, "/beija_floor/", "Basse Guinée", "Kindia", 
 "Dubréka", "Kountia", "https://www.facebook.com/dmxbeijafloordiallo/", "", "", "Fast food Restaurant+ Cyber", 1),
("MANGOYAH CAJOU", "", "/mangoyah_cajou/mangoyah_cajou1.jpg", "", "", "623228110", "", "", "mangoyahtv@gmail.com", null, "/mangoyah_cajou/", "", "", "", 
 "", "", "", "", "Nous produisons des noix de cajou de qualité bien traitée et conditionnée pour la satisfaction de nos clients", 1),
("MADINA STORE", "", "/madina_store/madina_store-1.jpg", "", "MADINASTORES", "623983881", "", "", "contact@madinastores.com", null, "/madina_store/", 
 "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/gn.madinastores/", "Lundi au Vendredi de 9H à 17H", "https://madinastores.com/", "MadinaStores est le 
 1er distributeur guinéen de produits technologiques, de mode, de high-tech, de téléphonie sur internet vers la guinée.\r\nVous êtes à l'étranger, sélectionnez des produits 
 Informatique, Meubles, Puériculture, Téléphonie.", 3),
("GUISHOP", "", "/guishop/guishop-1.png", "", "", "629855666", "", "", "contact@gui-shop.com", null, "/guishop/", "Basse Guinée", "Conakry", "Matam", 
 "Madina", "https://www.facebook.com/guishop224/", "Lundi au Samedi de 9H à 17H", "https://gui-shop.com/", "Achetez les meilleurs produits électroniques aux meilleurs prix 
 chez Guishop.\r\nSmartphones des meilleures marques (Samsung, iPhone, Huawei, Nokia, Tecno), Ordinateurs (HP, LENOVO, DELL), Jeux Vidéo et accessoires.", 3),
("DIAGUISHOP", "", "/diaguishop/diaguishop_logo.jpg", "", "Bluezone", "623241094", "629634817", "", "diaguishop@gmail.com", null, "/diaguishop/", "Basse Guinée", "Conakry", 
 "Kaloum", "", "https://www.facebook.com/diaguishop/", "", "", "DiaguiShop est une plateforme de vente en ligne(e-commerce), notre activité constitue à vendre 
 des produits sur des services en ligne ou sur internet.\r\nNous nous appuyons sur des technologies telles que le commerce mobile et marketing internet", 3),
("LE GRAND BLEU", "", "/le_grand_bleu/le_grand_bleu-2.jpg", "", "Transit carrefour", "661474763", "", "", "kabamory033@gmail.com", null, "/le_grand_bleu/", 
 "Basse Guinée", "Conakry", "Ratoma", "Taouyah", "https://www.facebook.com/Le-Grand-Bleu-De-Conakry-Restaurant-Et-Bar-314953732302028/", "", "", "", 1),
("SOUM IMPORT - EXPORT", "", "/soum_import_export/soum_import_export_logo.jpg", "", "Petit Lac BP : 3976", "624199400", "654711003", "", "soumimportexport@gmail.com", 
 null, "/soum_import_export/", "Basse Guinée", "Conakry", "Ratoma", "Taouyah", "https://www.facebook.com/SOUM-Import-export-s-a-r-l-853120718089775/", "", "", 
 "Importations et distributions de pièces d'auto et groupe électrogène.\r\nVente en gros_ demi - gros_ détail", 4),
("STARSHOP GUINÉE", "", "/starshop_guinee/starshop_guinee-1.jpg", "", "", "621694506", "", "", "", null, "/starshop_guinee/", "Basse Guinée", "Conakry", 
 "Matoto", "", "https://www.facebook.com/starshopboutique/", "", "", "Shopping et vente au détail - Chaussures", 2),
("SODUGA", "", "/soduga/soduga-2.png", "", "", "629666427", "661640095", "", "support@soduga.com", null, "/soduga/", "Basse Guinée", "Conakry", "Matam", 
 "Madina", "https://www.facebook.com/SodugaOfficial", "", "https://soduga.com", "Le site Soduga.com est le numero 1 pour les achats et ventes e-commerce en Guinée Conakry.\r\n
 Nous mettons à la disposition des marchands et acheteurs un site web et une application mobile Android et iOS afin de faciliter les échanges.", 3),
("RESTAURANT LA DIVERSITÉ CONAKRY", "", "/resto_la_diversite/resto_la_diversite-2.jpg", "", "", "626717171", "", "", "", null, 
 "/resto_la_diversite/", "Basse Guinée", "Conakry", "", "", "https://www.facebook.com/Restaurant-la-Diversit%C3%A9-Conakry-165576863922530/", 
 "lundi au samedi de 7h à 22h.", "http://www.la-diversite2.fr/", "Le Restaurant la Diversité Conakry est un établissement de référence à Conakry.", 1),
("RESTAURANT AFRICAIN KIPÉ VILLAGE", "", "/resto_africain_kipe/resto_africain_kipe-2.jpg", "", "Transversale T2 Centre émetteur en Face de l'école grâce 
 divine", "623797968", "660612525", "", "", null, "/resto_africain_kipe/", "Basse Guinée", "Conakry", "Ratoma", "Kipé", 
 "https://www.facebook.com/Restaurant-Africain-Kip%C3%A9-Village-2032526743506638/", "24/24 ", "", "", 1), 
("LA HAUTE CLASSE GUINÉE", "", "/la_haute_classe_guinee/lhc_gn_logo.jpg", "", "Autoroute en face de l'ex-Mutragui", "662819029", "628413767", "655334881", 
 "lahauteclasseguinee@gmail.com", null, "/la_haute_classe_guinee/", "Basse Guinée", "Conakry", "Matam", "Coléah", 
 "https://www.facebook.com/La-Haute-Classe-Guin%C3%A9e-1206479786059420/", "", "", "Shopping et vente au détail : Robes de soirée, Costumes pour Hommes et Femmes, Chaussures, 
 Basket, Fond de teint, bazins, etc.", 2),
("FELLAH SHOP", "", "/fellah_shop/fellah_shop.jpg", "", "", "621102654", "625709809", "", "", null, "/fellah_shop/", "", "", "", "", 
 "https://www.facebook.com/Fellah-shop-104663191147612/", "", "", "Shopping et vente au détail - Vetement", 2),
("YEEYIRDE", "", "/yeeyirde/yeeyirde-1.png.jpg", "", "", "620501383", "", "", "", null, "/yeeyirde/", "Basse Guinée", "Conakry", "Matoto", "Matoto", 
 "https://www.facebook.com/yeeyirde/", "Lundi au Samedi de 9H à 17H", "", "Plateforme de vente en ligne", 3),
("OUR-MARKET", "", "/our_market/our_market-1.jpg", "", "Kaloum 002", "626172834", "626172908", "", "ourmarket16@gmail.com", null, "/our_market/", 
 "Basse Guinée", "Conakry", "Kaloum", "", "https://www.facebook.com/OurMarket16", "", "http://www.ourmarket.com/", "Our-Market le meilleur E-Commerce en Guinée qui vous offre des 
 produits imbattables à des prix incroyables.\r\nService client efficace fournissant des réponses en quelques heures.\r\nNous sommes disponibles pour toute question par e-mail ou 
 sur nos numeros", 3),
("BOULANGERIE PÂTISSERIE VÉLODROME", "", "/boulang_pat_velodrome/boulang_pat_velodrome-2.jpg", "", "En Face Station TOTALE", "661735764", "", "", "", null, 
 "/boulang_pat_velodrome/", "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/Boulangerie-P%C3%A2tisserie-v%C3%A9lodrome-183561962439735/", "", 
 "", "Vente de Pâtisserie pour tous les jours et vos événements (gâteau d’anniversaire, mariage...),du bon Pain, croissant etc.\r\nLe savoir faire Francais au RDV", 1), 
("ARABINENE.COM", "", "/arabinene_com/arabinene-2.jpg", "", "Carrefour Chinois 001 BP: 2265", "654900656", "657339215", "", "contact@arabinene.com", null, 
 "/arabinene_com/", "Basse Guinée", "Conakry", "Dixinn", "Minière", "https://www.facebook.com/arabinene.gn/", "", "http://www.arabinene.com/", "Arabinènè™ est une 
 société à responsabilité limitée unipersonnelle (SARLU) guinéenne de commerce électronique basée à Conakry, qui s’étendra bien sûr en S.A.R.L.\r\nElle se d’écrit comme le plus 
 grand centre commercial guinéen en ligne.\r\nUne « Marketplace », qui met en relation les vendeurs et les acheteurs, en mettant à leur disposition un service logistique, 
 permettant l'expédition et la livraison des produits via un service de paiement de vente à distance (VAD)", 3),
("BOUTIQUE FA-BI-TI", "", "/boutique_fa_bi_ti/fa_bi_ti.jpg", "Mme Zoum Salematou Fofana","En face de l'ANAFIC / En face de PACV après le carrefour de Mariador Palace", 
 "620680307", "627785347", "", "salemfof@gmail.com", null, "/boutique_fa_bi_ti/", "Basse Guinée", "Conakry", "Ratoma", "", "https://www.facebook.com/FabitiBoutique/", 
 "", "", "Boutique de produits cosmétiques - Beauté et remise en forme.\r\nVentes de divers articles Européens, Américains et Africains HOMME, FEMME ET ENFANT", 2),
("DIANGOLO", "", "/diangolo/diangolo_logo2.png", "", "", "624121306", "624121306", "", "obarry414@gmail.com", null, "/diangolo/", "Basse Guinée", "", "", 
 "", "https://www.facebook.com/Diangolo24/", "", "", "Diangolo est une plate-forme de vente en ligne de produits de qualité et services pour les clients et les professionnels 
 surtout Livraison gratuite pour tous.", 3),
("BIO INNOVATION", "", "/bio_innovation/bio_innovation-1.jpg", "", "", "621467697", "621467697", "", "bioinnovationgn@gmail.com", null, "/bio_innovation/",
 "Basse Guinée", "Kindia", "Coyah", "Sanoyah", "https://www.facebook.com/bioinnovationGN/", "", "http://bioinnovation224.blogspot.com/", "Bio Innovation est une plate forme de vente
 en ligne qui vous propose une large gamme de Produits Bio en terme de beauté santé et de bien être fait à la base de plantes, de fruits, d'acide de fruits, de légumes etc....", 3),
("SERVICE VENTE EN LIGNE GUINÉE", "SVL - GN", "/svl_gn/svl_guinee.jpg", "", "", "624425397", "661671567", "654972169", "pierregoumou@gmail.com", null, 
 "/svl_gn/", "", "", "", "", "https://www.facebook.com/serviceventelignegnconakry/", "", "", "C'est un service de vente en ligne qui va vous faciliter l'achat des 
 produits de la nouvelle technologie(pc, phones etc) avec 3 mois de garantie et suivi", 3),
("LUXA LINGERIE ET PARFUMS", "LuXa", "/luxa_ling_parfums/luxa-2.jpg", "", "Prima Center", "628614499", "", "", "luxalingerie@gmail.com", null, 
 "/luxa_ling_parfums/", "Basse Guinée", "Conakry", "Ratoma", "Kipé", "https://www.facebook.com/luxaprima/", "Mardi au Dimanche de 10H à 20H", "",
 "LuXa Lingerie et parfums est une boutique de lingerie basée en Guinée. Elle offre a sa clientèle une nouvelle façon de revoir la séduction a son meilleur.", 2),
("FASHION ADDICT", "", "/fashion_addict/fashion_addict-1.jpg", "", "Magasin coller à Nano shop", "660777766", "", "", "", null, "/fashion_addict/", 
 "Basse Guinée", "Conakry", "Kaloum", "Manquepas", "", "Lundi au Samedi de 9H à 17H", "", "Vente de vêtements,lingerie, accessoire, sacs zara, stradivarius, promod,mango et 
 pleins d'autres articles pour femme.", 2),
("CORPS ET CHEVEUX DE RÊVE BY KMD", "", "/corps_chev_reve_kmd/corps_chev_reve_kmd-1.jpg", "", "En face de l'université gamal", "657232172", "626647018", "", 
 "djessis97@yahoo.fr", null, "/corps_chev_reve_kmd/", "Basse Guinée", "Conakry", "Dixinn", "Dixinn Landréah", "https://www.facebook.com/filles.choco/", "", "", 
 "Vente de produits 100% naturels pour corps, cheveux et autres en ligne.", 2),
("MYFLINE", "", "/myfline/myfline_logo.png", "", "", "621163334", "629522626", "", "", null, "/myfline/", "Basse Guinée", "Conakry", "Kaloum", "", 
 "https://www.facebook.com/MyfLine/", "", "", "MyfLine est une plate forme de vente en ligne. Nous vous proposons des services fiables, des produits de qualités répondant a vos 
 besoins à petit prix et une livraison rapide et gratuite", 3),
("BIO EMPIRE", "", "/bio_empire/bio_empire-1.jpg", "", "", "627467540", "627467540", "", "madoussou27@gmail.com", null, "/bio_empire/", "Basse Guinée", 
 "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/IntimaConakry/", "Lundi au Dimanche de 6H30 à 23H30", "", "Bienvenues dans l'univers des petits trésors de la nature 
 pour votre hygiène intime et surtout votre séduction de femme fatale.", 3),
("RESTAURANT PAWENDÉ", "", "/restaurant_pawende/restaurant_pawende-2.jpg", "", "A côté de l'Université Mahatma Gandhi", "624619928", "", "", "", null, 
 "/restaurant_pawende/", "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/RestaurantPawende/", "", "", "Bienvenue au restaurant Pawendé 
 ('Grâce à Dieu' en mooré, langue des Mossis du Burkina Faso).\r\nSpécialités européennes et africaines vous y attendent dans un cadre sympathique et agréable réparti sur quatre 
 espaces : restaurant, salle climatisée VIP, salle de jeux et grande terrasse avec scène. Venez nous voir ! ", 1),
("SALIMA FAST FOOD", "", "/salima_fast_food/salima_fast_food-1.jpg", "", "Gomboyah mosquée juste après l'usine sodefa", "623999800", "", "", "", null, 
"/salima_fast_food/", "Basse Guinée", "Kindia", "Dubréka", "Gomboyah", "https://www.facebook.com/Salima-FAST-FOOD-600008617115447/", "", "", "restaurant, pâtisserie, 
loisirs, rafraîchissement et faites juste un tour", 1), 
("KARIM STORE 224", "", "/karim_store_224/karim_store_224-1.jpg", "", "", "621007598", "", "", "", null, "/karim_store_224/", "Basse Guinée", "Conakry", 
 "", "", "https://www.facebook.com/Karim-Store-224-572092310128912/", "", "", "KARIM STORE 224, votre boutique de proximité qui vous offre des vêtements de qualités et des 
 téléphones de nouvelles générations à un prix raisonnable.", 2),
("IB SHOPPING", "", "/ib_shopping/ib_shopping-2.jpg", "", "", "622730357", "622730357", "", "dialloibshopping13@gmail.com", null, "/ib_shopping/", 
 "Basse Guinée", "Conakry", "", "", "https://www.facebook.com/Ib-shopping-105837237711518/", "", "http://www.ibshopping.com/", "Ib Shopping est une plate-forme de vente en ligne 
 avec une livraison gratuite partout à Conakry.", 3),
("AMATI M'MA", "", "/amati_mma/amati_mma_logo.jpg", "", "Route le Prince", "622587996", "621214297", "655082508", "amatimma0@gmail.com", null, 
 "/amati_mma/", "Basse Guinée", "Conakry", "Ratoma", "Koloma II", "https://www.facebook.com/Amati-mma-881940611882295/", "", "", "Acheter devient du plaisir", 3),
("FAMILY FAST FOOD", "", "/family_fast_food/family_fast_food-1.jpg", "", "A 500m du Rond-point", "622322390", "664533295", "628373200", "", null, 
 "/family_fast_food/", "Basse Guinée", "Conakry", "Dixinn", "Minière", "https://www.facebook.com/Family-fast-food-882626901809910/", "", "", "", 1),
("KIM SNACK", "", "/kim_snack/kim_snack-3.jpg", "", "Ratoma dispensaire Immeuble Woulada", "627275042", "624300019", "", "", null, "/kim_snack/", 
 "Basse Guinée", "Conakry", "Ratoma", "Taouyah", "https://www.facebook.com/KIM-SNACK-193647671560266/", "", "", "Hummm un bon endroit pour vous faire plaisir KIMSNACK.", 1), 
("SOUM BOUTIQUE", "", "/soum_boutique/soum_boutique_taouyah.jpg", "", "En face de la Pharmacie le Venus", "+224662420222", "", "", "", null, 
 "/soum_boutique/", "Basse Guinée", "Conakry", "Ratoma", "Taouyah", "https://www.facebook.com/Soumimport/" , "", "", "Prêt à porter", 2),
("NBA SHOP", "", "/nba_shop/nba_shop-1.jpg", "", "", "628970093", "", "", "abdallahbah8@gmail.com", null, "/nba_shop/", "Basse Guinée", "Conakry", "", "", 
 "https://www.facebook.com/NBA_Shop-106505077719989/" , "", "", "Produit/service - Vêtements (Marque) - Magasin de chaussures", 2),
("A-KET", "", "/a_ket/a_ket_2.jpg", "", "Autoroute Fidel Castro Ruiz, Grand marché de Conakry, 1er étage, Bureau A125", "624153941", "624561546", "", 
 "meetelitafrica@gmail.com", null, "/a_ket/", "Basse Guinée", "Conakry", "Matoto", "Dabondy", "https://www.facebook.com/Aket-263211357681966/", "", 
 "http://www.a-ket.com/", "Nous vous offrons un service de vente en ligne, Mode Homme et Femme, Electroménager, Téléphone et Tablette, Equipement Informatique, Habillement Africains, 
 Accessoires Maison, etc.", 3),
("RESTAURANT MOZES", "", "/restaurant_mozes/restaurant_mozes-2.jpg", "", "Petit symbaya", "", "", "", "sowdalaba2013@gmail.com", null, "/restaurant_mozes/", 
 "Basse Guinée", "Conakry", "Ratoma", "Petit Symbayah", "https://www.facebook.com/Restaurant-MOZES-1877684102554331/", "", "", "le restaurant Mozes l'univers de la bonne bouff entre 
 amis collègues potes familles etc...\r\nChez nous, nous transformons vos moments de detente en souvenir", 1),
("RESTAURANT DJOUMA BOUTIQUE", "", "/restaurant_djouma/restaurant_djouma_boutique-2.jpg", "", "Bd. Diallo Telly", "622333551", "664211117", "669073927", "", null, 
 "/restaurant_djouma/", "Basse Guinée", "Conakry", "Kaloum", "Kouléwondy", "", "", "", "Activités de restaurants et de services de restauration mobiles", 1),
("TOOPETY", "", "/toopety/toopety-1.jpg", "Fatou Sadio Diallo", "Carrefour Ciment de Guinée", "620913051", "624484777", "", "toopetyshop@gmail.com", null, 
 "/toopety/", "Basse Guinée", "Conakry", "Ratoma", "Lanbanyi", "https://www.facebook.com/toopetyshop/", "Mardi au Dimanche de 10H à 18H30", "", "Magasin de vêtements 
 pour femmes, spécialisé dans la vente d’articles (tenue de classe, chaussures, colliers etc)", 2),
("GUINÉE BOUTIQUE", "", "/guinee_boutique/guinee_boutique-1.jpg", "", "", "620510210" , "621089133", "", "ibrakalil30@gmail.com", null, "/guinee_boutique/", 
 "Basse Guinée", "Conakry", "", "", "https://www.facebook.com/ibrakalil30/", "", "", "Produit/service - Vêtements (Marque) - Magasin de chaussures", 2),
("SPIKE BOUTIQUE", "", "/spike_boutique/spike_boutique-1.jpg", "", "Carrefour cosa 1", "622802225", "626412542", "624828703", "diallomamadoualiou621@gmail.com", null, 
 "/spike_boutique/", "Basse Guinée", "Conakry", "Ratoma", "Nongo", "https://www.facebook.com/spikeboutique224/", "", "", "Magasin de vêtements pour hommes Shopping, 
 conseil,sponsoring", 2),
("DISSA FAST FOOD", "", "/dissa_fast_food/dissa_fast_food_logo.jpg", "", "Sur la Corniche, vers Mariador Park", "625304630", "625627212", "628592960", "", null, 
 "/dissa_fast_food/", "Basse Guinée", "Conakry", "Ratoma", "Taouyah", "https://www.facebook.com/restaurantdissa/", "", "", "Restaurant Dissa, vous propose un menu très 
 riche de fast food, pizza et cuisine africaine. En famille ou entre amis, venez déguster toutes nos délices dans une espace confortable et convivial.", 1), 
("RESTAURANT MADIBA", "", "/restaurant_madiba/restaurant_madiba-1.jpg", "", "", "621367479", "662768736", "", "", null, "/restaurant_madiba/", 
 "Basse Guinée", "Conakry", "Matoto", "Kendekayah carrefour", "https://www.facebook.com/Restaurant-Madiba-695775360780975/", "", "", "", 1),
("CREPE AND DELICE", "", "/crepe_and_delice/", "", "En face Bikaz", "666477750", "628704140", "", "", null, "/crepe_and_delice/", "Basse Guinée", "Conakry", 
 "Dixinn", "Minière", "", "", "", "", 1),
 ("RÊVES DE FEMMES", "", "/reves_de_femmes/", "", "", "", "", "", "filleschocos@yahoo.com", null, "/reves_de_femmes/", "", "", "", "", "", 
 "Lundi au Samedi de 9H à 18H", "", "Rêves de femmes est une vente en ligne associée à notre compte Filles Chocos spécialisée en vente des produits cosmétiques et divers en 
 guinée", 2);

COMMIT;