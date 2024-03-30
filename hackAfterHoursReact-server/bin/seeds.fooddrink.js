// Require Mongoose
const mongoose = require('mongoose');

// Require Fooddrink Model
const Fooddrink = require('../models/Fooddrink.model.js');

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/hackAfterHoursReact-server';

const fooddrinkSpots = [
  {
    name: 'O Cofre',
    address: 'R. dos Bacalhoeiros 2, 1100-069 Lisboa',
    miniDescription:
      'Restaurant in a great location with a wide selection of food and drinks.',
    description: `Unveil an atmosphere of allure and mystery at O Cofre, Lisboa. Located in the heart of the city, our establishment beckons you to a world of culinary secrets.
    Step into an elegant setting where sophistication meets curiosity, setting the stage for a memorable dining experience. Our thoughtfully curated menu invites you to explore a fusion of tradition and innovation, each dish a masterpiece of flavor.
    Experience a gastronomic journey that leaves an indelible mark, where every bite tells a unique story. At O Cofre, Lisboa, we invite you to uncover extraordinary culinary delights and create lasting memories.`,
    spotUrl: 'http://ocofre.eatbu.com/',
    imgUrl: '/images/cofre.jpg',
    schedule: '08:30 - 23:30',
  },
  {
    name: 'Sol e Pesca',
    address: 'Rua Nova do Carvalho, 44 Lisboa',
    miniDescription: 'It was fished, now it will be eaten',
    description: `There are places that, because of their quirkiness, are brought to our attention rather quickly, and this is one of them. On the Cais do Sodré, where there once existed a famed fishing shop, is now a place to get together, where you can taste what has been fished... and canned.

    In memory of the old fishing shop, rods, wires, baits, nets, reels, floats, hooks and boats still bring life to the space, but this time in honor of another concept: a relaxed spot where you can taste great Portuguese canned fish.
    
    Here you can enjoy tasting Portuguese preserves, as well as the snacks that are created based on them. Besides the famous bluefin tuna, also known as the ham of tuna, there are various options: sardines, trout, eel, tuna, trout, mackerel, cod, as well as sardine roe.
    
    The wines are national and the canned fish is accompanied by Alentejo bread. If you don’t want to taste one of these preserves while relaxing in one of the colorful chairs, you can always buy some and take them home.
    
    The door is open to everyone, every day.`,
    spotUrl: 'http://www.solepesca.com',
    imgUrl: '/images/sol-e-pesca.jpg',
    schedule: '12:00 - 02:00',
  },
  {
    name: 'Time Out Market Lisboa',
    address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
    miniDescription:
      'Time Out Market Lisboa is a food hall located in the Mercado da Ribeira at Cais do Sodré in Lisbon, Portugal.',
    description:
      'A food hall located in the Ribeira Market in Cais do Sodré.The concept aims to bring together under one roof the best chefs, restaurants, and culinary projects in the Portuguese capital, based on recommendations from Time Out magazine critics and contributors.',
    spotUrl: 'https://www.timeoutmarket.com/lisboa/',
    imgUrl: '/images/timeout-market.jpg',
    schedule: '10:00 - 24:00',
  },
  {
    name: 'Nosolo Italia',
    address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
    miniDescription:
      'Where Authentic Italian Flavors Meet the Heart of Lisbon.',
    description: `Nosolo Italia embodies a high-quality, unmistakably clear visual image. A team of skilled professionals crafts layouts for interior and exterior projects (advertising) and strategically designs interior spaces, all while considering the context in which they will fit.

    Maintaining a consistent identity across all locations is paramount. The harmonized image and established work system play pivotal roles in conveying our distinct standards and quality ideals effectively.`,
    spotUrl: 'https://nosoloitalia.com/',
    imgUrl: '/images/nosolo-italia.jpg',
    schedule: '10:00 - 24:00',
  },
  {
    name: 'Basilio',
    address: 'Rua dos Bacalhoeiros, 111, 1100-068 Lisboa',
    miniDescription:
      'Located in the heart of old Lisbon, Basilio is the perfect place for your brunch, lunch or just a healthy snack! ',
    description: `Basílio, the cousin of Nicolau: His stubbornness and courage cut Amazonian savannahs and opened the way for the Holy Grail of Brazil: the coffee.

    Basílio, a playful and temperamental entrepreneur became one of the greatest coffee barons of the 19th century and when the coffee cycle grew, the independence of Basílio jumped out and he took a chance in his own farm. He challenged his cousin Nicolau and they prosper together with the export of coffee to all the European capitals. But the homesickness beat strongly and Basílio returned, has become a bohemian and “bon vivant” of Lisbon but always near his cousin.
    
    Cafe Basílio at Bacalhoeiros reflects the mind of Basílio: lively, good looking and where we feel the presence of this coffee baron.
    `,
    spotUrl: 'https://www.ilovenicolau.com/pt/onde-estamos/basilio/',
    imgUrl: '/images/basilio.jpg',
    schedule: '08:30 - 19:00',
  },
  {
    name: 'Nicolau',
    address: 'Rua dos Bacalhoeiros, 111, 1100-068 Lisboa',
    miniDescription:
      'Located in the heart of old Lisbon, Nicolau is the perfect place for your brunch, lunch or just a healthy snack!',
    description: `We are told that when he arrived, nor the Lisbon girl and child has resisted him:  Nicolau, the proud aristocrat with German blood (but Latin good talking) grew and became a reference of the capital.

    The curious and brave “engaging of the downtown” travelled the world (and many Lisbon princesses) but it was from Brazil that he brought the smells and tastes he shares with passion for food to whom enters in his café.
    
    With his chic and very tropical style, Nicolau continues walking through Lisbon, but now their delicious dishes are the delight of those who go there.
    
         
    Nicolau recommends:
    
    - Pancake Nicolau for the more greedy ones    
    - Salad with Quinoa and smoked salmon for a healthy lunch    
    - Carob Cake without gluten and super tasty    
    - Green Juice of Nicolau to give a boost to your day    
    - Our açaí with a wonderful granola without sugar but plenty of flavour`,
    spotUrl: 'https://www.ilovenicolau.com/pt/onde-estamos/basilio/',
    imgUrl: '/images/nicolau.jpg',
    schedule: '08:30 - 19:00',
  },
  {
    name: 'Las Ficheras',
    address: 'Rua dos Remolares, 34, 1200-371 Lisboa',
    miniDescription:
      'Eclectic hub dishing up creative tacos, enchiladas & mezcal in a vibrant, art-filled space.',
    description: `Authentic modern Mexican food in Lisbon.
    Inspired by a journey to Mexico and experience of tasting authentic Mexican food.
    The perception of Mexican cuisine is shifting. Lovers of real Mexican food are no longer satisfied with more main stream tex mex offer .Costumers want to experience the real taste of Mexico. And we want to offer you the fascinating quality of Mexican food remaining true to traditional cooking methods and flavours.`,
    spotUrl: 'http://www.lasficheras.com/',
    imgUrl: '/images/las-ficheras.jpg',
    schedule: '12:00 - 01:00',
  },
  {
    name: 'Potato Project',
    address: 'Rua do Comércio 2, 22, 1100-016 Lisboa',
    miniDescription:
      'Potato fries shop offering fries with various toppings, including vegan mayonnaise.',
    description: `The Potato Project, located in Lisbon's downtown, has quickly become a favorite among locals for its classic hand-cut French fries and an array of flavorful sauces. Situated at 8 Rua da Conceição, near Lisbon Cathedral, the establishment offers a traditional approach, with potatoes cut daily and a choice of 11 sauces, three cheeses, and 14 toppings. The selection of the potato variety, known for its sustainable food source, and the use of gluten and lactose-free ingredients showcase the thoughtfulness behind the menu. A visit to the Potato Project promises a personalized and delectable experience, allowing you to enjoy your own customized traditional French fries in just a matter of minutes.`,
    spotUrl: 'https://www.potatoprojectpt.com',
    imgUrl: '/images/potato-project.jpg',
    schedule: '10:00 - 01:30',
  },
  {
    name: 'Manteigaria - Pastéis de Nata',
    address: 'Rua Augusta 195-197, Baixa, 1100-619 Lisboa',
    miniDescription: 'Authentic Pastéis de Nata',
    description: `Manteigaria is already a reference when it comes to making Pastéis de Nata (custard tarts). With five venues in total - three in Lisbon and two in Porto - Manteigaria is distinguished by the flavour that it gives to these traditional sweets and also by the experience it provides!

    Here, the Pastéis de Nata are absolutely delicious. We cannot say whether the secret lies in the selection of the best raw ingredients or the artisanal process, but we know that these are two of the main reasons why we recommend Manteigaria. The whole process is special, from beginning to end, and at Manteigaria, in Rua Augusta, you can monitor it! Upon entering the Portuguese building - where we used to find the iconic Camisaria Pitta - we can watch the whole cooking process. The factory is in plain sight, which makes visiting the store an even cooler experience!
    
    Since all the baking happens on the spot, there are always new batches of warm pastries. For this reason, when visiting Manteigaria you can taste pastries, fresh from the oven, creamy and crispy, and delight yourself while you enjoy the view over one of the most beautiful and busy streets in the capital.
    
    The truth is that regardless of how you prefer your Pastel de Nata - with sugar, cinnamon or plain - you will live a real Portuguese moment, which will make you want to stop time and enjoy it in the best possible way!
    
    Our suggestion for a delightful snack is to do like we have done: side your Pastéis de Nata with a cappuccino. Let yourself relax, after all, you are in Lisbon tasting the best the city has to offer.
    
    Cool Tip: Manteigaria in Rua Augusta is the third store opening in Lisbon. If you are in Chiado or Cais do Sodré, you can visit one of these places to get to know the cream and crispy Pastéis de Nata.`,
    spotUrl: 'https://www.facebook.com/pg/manteigaria.oficial/',
    imgUrl: './images/manteiga.jpg',
    schedule: '08:00 - 00:00',
  },
  {
    name: 'Quiosque Ribeira das Naus',
    address: 'Av. Ribeira das Naus 5, 1200-000 Lisboa',
    miniDescription:
      'Ideal corner to enjoy a drink or light snacks, enjoying the Tagus breeze.',
    description: `What can be better than saying goodbye to a sunny day by the river? With its prime location, the Quiosque Ribeira das Naus (“Ribeira das Naus Kiosk”) is perfect for this experience and many more!

    The Quiosque Ribeira das Naus is not just any kiosk! It all starts with the location, which is perfect. Situated on the Ribeira das Naus Avenue, which connects the Cais do Sodré and the Praça do Comércio, it is so close to the river that you can almost feel the water on your feet! This place has a nice terrace where you can choose a table or, if you want to relax or read a book while sunbathing, go for one of the available sun loungers.
    
    The atmosphere is relaxed and Portuguese is easily mixed up with many other languages. After all, the view is stunning and captivates anyone who passes by, whether tourist or local. The Tejo River is the main scenario, with its out of sight beauty.
    
    Besides being the perfect place to watch the sunset in the evening, it is also a good choice for lunch. The options are many: there are pizzas and sandwiches and dinner menus. Accompanying it, may we suggest refreshing lemonade or, if you prefer, sangria.
    
    The surroundings make this kiosk a must visit spot. And of one thing we have no doubt, the first visit will most certainly be the first of many!`,
    spotUrl: 'https://www.facebook.com/RibeiradasNausLisboa',
    imgUrl: './images/ribeira das naus.jpg',
    schedule: '10:00 - 00:00',
  },
  {
    name: 'Musicbox Lisboa',
    address: 'Rua do Comércio 2, 22, 1100-016 Lisboa',
    miniDescription:
      'Venue under the arches with cavern rooms, offering live music, DJs and neon-lit bar',
    description: `Musicbox Lisboa is the club that is at the epicenter of the work developed by CTL – Cultural Trend Lisbon. With its doors open for 16 years, it is a hybrid between a concert hall and a dance space. presents an eclectic author program, giving visibility to relevant artists and authors in the national and international scene, boosting new projects
    and following new trends.
    Musicbox values ​​the technical quality of the show in terms of sound, lighting and image projection, betting on the best possible conditions for the show, in an intimate room that promotes proximity between the artists and the public.
    An integral part of the cultural life of the city of Lisbon, driving the cultural offer of Cais do Sodré, Musicbox promotes numerous partnerships with leading events, cultural agents and publishers that result in programmatic spaces, testimony of the most relevant cultural movements in the city.`,
    spotUrl: 'https://musicboxlisboa.com/mb/',
    imgUrl: '/images/musicbox.jpg',
    schedule: '23:00 - 06:00',
  },
  {
    name: 'Pensão Amor',
    address: 'R. do Alecrim 19, 1200-292 Lisboa',
    miniDescription:
      'This lively bar in the red light district bears the imprint of its bordello roots, with red wallpaper and images of cavorting naked men.',
    description: `Original? Bold? Burlesque? In Lisbon love is lived and in this space you feel that its originality also celebrates it. Pensão Amor has a bar where there are different shows, whether of burlesque, jazz concerts, plays or DJ. There are even nooks and crannies for those who are more shy, tasty cocktails, conversations and different entertainment every day.

    The theme is inviting, as is the uniqueness of the atmosphere. What was once a rundown boarding house, is now a space worthy of watching a burlesque show, having one of its signature cocktails or simply hanging out with friends. Go to Pensão Amor, discover its corners with your friends, boyfriend/girlfriend, alone... here you will be greeted with the smile of open minds, which gave the city of Lisbon and this old building – a new life, based on the original idea.`,
    spotUrl: 'https://pensaoamor.com/',
    imgUrl: '/images/pensão-amor.jpg',
    schedule: '12:00 - 03:00',
  },
  {
    name: 'Confeitaria Nacional',
    address: 'Praça da Figueira, 18 B',
    miniDescription:
      'A sweet haven in the heart of Lisbon, Confeitaria Nacional invites you to savor the art of exquisite pastries.',
    description: `Confeitaria Nacional was founded in 1829 by Balthazar Roiz Castanheiro.
    In 1829, the population of Portugal (metropolis) was just over 3 million.
    There was a troubled period in Portugal – which was in the middle of the Civil War, fought between liberals and absolutists – at stake was the respect for the rules of succession to the Portuguese throne.
    Nothing intimidated the young Balthazar, who inaugurated a space that quickly became a place of choice for Lisbon's elites.
    The quality always demonstrated made the distinctions add up over the years. Balthazar Roiz Castanheiro has known how to achieve fame and recognition for 40 years.`,
    spotUrl: 'https://confeitarianacional.com/',
    imgUrl: '/images/confeitaria-nacional.jpg',
    schedule: '08:30 - 20:00',
  },
  {
    name: 'B.Leza',
    address: 'Cais Gás 1, 1200-161 Lisboa',
    miniDescription:
      'Upbeat locale featuring a stage for a lineup of live music, along with a dance floor & a bar.',
    description: `B.Leza is a Luso-African nightclub in Lisbon, mainly linked to the culture and community of Cape Verde. A space for African dances and live music, it has always been open to other styles, but the rhythms of African music such as Kizomba, Funaná and Coladeira, among others, prevail. Its name is a tribute to one of the great figures of Cape Verdean culture and music, Francisco Xavier da Cruz, known as B.Leza.

    Created in 1994 (by the musician Tito Paris under the name Baile) and directed by Alcides Gonçalves, and the sisters Madalena and Sofia Saudade e Silva, son of the great Cape Verdean singer Bana. It operated at the 17th-century Almada Carvalhais Palace, a building belonging to Casa Pia Atlético Clube, located at 50 Largo do Conde Barão, in Lisbon. Closed in 2007, since then there has been a movement to restore the B. Leza in another location and occasional initiatives in a roaming through various cultural spaces and other night spots in the city.`,
    spotUrl: 'https://www.facebook.com/BlezaClube/',
    imgUrl: '/images/bleza.jpg',
    schedule: '22:30 - 04:00',
  },
  {
    name: 'Titanic Sur Mer',
    address: 'Cais da Ribeira Nova, Armazém B Cais do Sodré, Lisboa',
    miniDescription:
      'Titanic Sur Mer is the spiritual successor of the late Maxime, but with a musically more eclectic schedule.',
    description: `It is one of the faces of a Cais do Sodré that is flooded with people every weekend. Manuel João Vieira – although it may not seem like it – knows what he does. He took a building that served the fish auction and turned it into a bar / concert hall that couldn't be closer to the sea. Titanic Sur Mer is the spiritual successor of the late Maxime, but with a musically more eclectic schedule. Depending on the night, you can listen to jazz, samba and forró, African music and indie rock. Plus the occasional Ena Pá 2000. And there are also parties, almost always with the bar, such as Beyoncé Fest, It's A Trap, Alienação, Mundo Mestiço, Cabaré Tropical, among others. Between cups and concerts is to choose what you like best.`,
    spotUrl: 'https://www.facebook.com/titanicsurmer',
    imgUrl: '/images/titanic.jpg',
    schedule: '23:00 - 06:00',
  },
  {
    name: 'Boteco da DRI',
    address: 'Cais da Ribeira Nova, Armazém B Cais do Sodré, Lisboa',
    miniDescription:
      'From Rio to Lisbon, they bring the finest Brazilian flavors to you in a relaxed and sophisticated ambiance.',
    description: `Embark on a captivating culinary journey that seamlessly intertwines the vibrant flavors of Rio with the enchanting ambiance of Lisbon. Our establishment is a testament to the fusion of both worlds, curating an exquisite menu that captures the very essence of Brazilian taste in the heart of this charming Portuguese city.
    Elevate your senses as you experience the dynamic spirit of Rio through each meticulously crafted dish. Our menu pays homage to the rich tapestry of Brazilian cuisine, infusing traditional recipes with a refined touch, delivering a symphony of flavors that transport you to bustling markets and lively streets.
    Within an environment that harmoniously merges casual comfort with timeless sophistication, immerse yourself in a dining encounter that encapsulates the liberating atmosphere of Rio while embracing the enduring allure of Lisbon. Whether you find yourself enjoying a leisurely luncheon or relishing in a memorable evening amongst dear companions, our establishment guarantees an odyssey of flavors and sensations that will linger in your memory long after your meal concludes.
    Join the celebration of the harmonious amalgamation of Rio and Lisbon, where the culinary artistry of Brazil converges with the grace of the Portuguese capital. Discover the flawless unity of cultures and tastes at our venue, where every dish is a testament to a profound dedication to bringing Brazil's finest to your table.`,
    spotUrl: 'https://www.facebook.com/botecodadri/?locale=pt_BR',
    imgUrl: '/images/boteco-dri.jpg',
    schedule: '18:00 - 00:00',
  },
  {
    name: 'La Fugitiva Taco Bar',
    address: 'Rua de S. Paulo 186, 1200-249 Lisboa',
    miniDescription:
      'There are no burritos or chili con carne here. At La Fugitiva there is no Tex-Mex cuisine.',
    description: `The hardest part was remembering that we were in Lisbon. The music was loud and upbeat and the walls were painted with pictures of cornfields and people in colorful costumes. Portuguese was hardly heard, which went unnoticed among other languages, such as Spanish and English. On the tables on the terrace or inside, there are nachos, tacos and margaritas. La Fugitiva, open since summer on the busy Rua de São Paulo, in Cais do Sodré, wants to be a trip to Mexico, without the need for suitcases and luggage.`,
    spotUrl: 'https://www.facebook.com/lafugitivatacobar/',
    imgUrl: '/images/fugitiva.jpg',
    schedule: '17:00 - 23:00',
  },
  {
    name: 'Lupita Pizzaria',
    address: 'Rua de S. Paulo 79, 1200-427 Lisboa',
    miniDescription: 'Naturally leavened pizza and natural wines',
    description: `Indulge in a slice of heaven at Lupita Pizzaria Lisboa! This pizzeria is a culinary haven where traditional Italian flavors meet the vibrant spirit of Lisbon.
    Savor the irresistible aroma of freshly baked pizzas crafted with love and expertise. Each slice is a harmonious dance of premium ingredients, from the finest cheeses to the most flavorful toppings, all brought together on a perfectly crispy crust.
    Step into a cozy ambiance and let the warmth of hospitality embrace you. Whether you're seeking a casual lunch, a romantic dinner, or a delightful meal with friends, Lupita Pizzaria Lisboa is the place to be.
    Join in for an unforgettable gastronomic journey where every bite tells a story of passion and culinary excellence. Your search for the perfect pizza ends here – come taste the magic at Lupita Pizzaria Lisboa!`,
    spotUrl: 'https://www.facebook.com/lupita.pizzaria/',
    imgUrl: '/images/lupita-pizzaria.jpg',
    schedule: '12:00 - 15:00; 18:00 - 23:30',
  },
];

async function insertFooddrink() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log('Database is now connected');

    // Create Food and Drinks Spots in our database with the seeds array
    let FooddrinkCreated = await Fooddrink.create(fooddrinkSpots);

    // Feedback about Food and Drink Spots creation
    console.log(`Created ${FooddrinkCreated.length} Fooddrink Spots!`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log('An error occurred while connecting to DB', error);
  }
}
insertFooddrink();
