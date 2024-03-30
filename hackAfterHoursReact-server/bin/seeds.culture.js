// Require Mongoose
const mongoose = require('mongoose');

// Require Culture Model
const Culture = require('../models/Culture.model.js');

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/hackAfterHoursReact-server';

const cultureSpots = [
  {
    name: 'Museu do Fado',
    address: 'Alfama, Largo do Chafariz de Dentro 1, 1100-139 Lisboa',
    miniDescription:
      'Exhibition on traditional fado, with audiovisual displays & archives, plus a cafe with concerts.',
    description: `The Museu do Fado is one of the must-visit places in Lisbon. Besides representing one of the region’s most important cultural legacies, it also has a restaurant and a themed shop where you can spend some time to catch the spirit of saudade (nostalgia). \n\n

    Totally devoted to fado and the guitar, it has a permanent exhibition and temporary ones, alongside a document centre and an auditorium with regular events and a very interesting programme. \n
    
    With songs by the greatest Portuguese artists illustrating an art form that Portugal gave to the world, the museum’s artistic quality will surprise you. \n
    
    The restaurant serves typical Portuguese food and helps to give your visit a traditional flavour.\n
    
    But technology, in the form of interactive stations documenting fado’s history throughout the museum and audioguides allowing you to listen to dozens of fado songs composed and sung down the decades, lets you delve further into history.\n
    
    Time and the music fly, in a restored building of national interest right next door to the neighbourhoods where you can hear fado being sung at night.`,
    spotUrl: 'http://www.museudofado.pt/',
    imgUrl: '/images/museu-do-fado.jpg',
    schedule: '10:00 - 18:00',
  },
  {
    name: 'Rua Augusta Arch',
    address: 'Rua Augusta, Terreiro do Paço',
    miniDescription:
      'The Arco da Rua Augusta is a neoclassical triumphal arch in Lisbon, Portugal, built in 1873.',
    description: `The Arco da Rua Augusta, also known as the Rua Augusta Arch, is an iconic triumphal arch located in the heart of Lisbon, Portugal. It is one of the most famous landmarks in the city and holds historical and cultural significance. The arch is situated at the northern end of the bustling Rua Augusta, a vibrant pedestrian street that leads to the historic Praça do Comércio (Commerce Square) and the Tagus River waterfront.

    Key features:
    
    Architectural Style: The arch was designed in the neoclassical architectural style by Portuguese architect Santos de Carvalho and was completed in 1873. It is characterized by its grand and monumental design, featuring ornate detailing, sculptures, and decorative elements that reflect the artistic trends of the time.
    
    Triumphal Design: The arch's primary purpose is to commemorate important historical events and figures, symbolizing the city's resilience and triumph. It consists of a central archway flanked by two smaller arches, creating a visually striking and balanced composition.
    
    Inscriptions and Sculptures: The arch is adorned with intricate sculptures and decorative reliefs that depict various allegorical and symbolic representations. These include figures representing Glory, Valour, Genius, and Bravery, as well as historical figures and scenes that celebrate Portugal's maritime achievements and explorations.
    
    Viewpoint: Visitors can ascend the arch's interior staircase to reach a panoramic viewpoint located on the top terrace. From this vantage point, visitors are treated to breathtaking views of the surrounding cityscape, including the Praça do Comércio, the Tagus River, and Lisbon's historic districts.
    
    Symbol of Lisbon: The Arco da Rua Augusta serves as a symbol of Lisbon's rich history, resilience, and cultural heritage. It is a popular gathering place for both locals and tourists, often hosting events, celebrations, and performances.
    
    Pedestrian Access: The arch is conveniently located at the northern entrance of Rua Augusta, a bustling pedestrian street known for its shops, cafes, and lively atmosphere. It serves as a gateway connecting the commercial center of the city to the historic waterfront area.
    `,
    spotUrl: 'https://www.visitlisboa.com/pt-pt/locais/arco-da-rua-augusta',
    imgUrl: '/images/arco_rua_augusta.JPG',
    schedule: '10:00 - 19:00',
  },
  {
    name: 'Lisboa Story Center',
    address: 'Terreiro do Paço',
    miniDescription: `The Lisboa Story Centre in Lisbon, Portugal, is an interactive museum offering an engaging journey through the city's history.`,
    description: `The Lisboa Story Centre is an interactive multimedia museum located in Lisbon, Portugal. It provides an engaging and immersive experience that takes visitors through the history and evolution of the city of Lisbon, showcasing its rich cultural heritage, significant events, and transformative moments.

    Key features:
    
    Interactive Exhibits: The museum features a series of interactive exhibits that utilize multimedia technology, including audiovisual presentations, projections, animations, and touchscreens. These elements create a dynamic and engaging environment for visitors to explore.
    
    Historical Narrative: The centre presents a chronological narrative of Lisbon's history, highlighting key periods, milestones, and cultural influences that have shaped the city over centuries. Visitors are guided through various historical eras and pivotal moments.
    
    Immersive Atmosphere: The Lisboa Story Centre aims to transport visitors back in time using lifelike reenactments, soundscapes, and visual effects that recreate scenes from the past. This immersive approach helps visitors connect with the city's history on a deeper level.
    
    Multilingual Experience: The museum typically offers multilingual support, allowing visitors to choose from various languages for audio guides or captions, ensuring a comprehensive understanding of the content.
    
    Central Themes: The exhibits often explore themes such as Lisbon's maritime heritage, its role in global exploration, cultural interactions, architecture, and urban development. These themes contribute to a well-rounded portrayal of the city's identity and significance.
    
    Visitor Engagement: The Lisboa Story Centre encourages active participation and engagement. Visitors are often invited to touch, listen, and interact with the exhibits, making the learning experience both educational and enjoyable.
    
    Location: The museum is strategically situated in the Baixa district of Lisbon, making it easily accessible to tourists exploring the city center.
    `,
    spotUrl: 'https://www.lisboastorycentre.pt/',
    imgUrl: '/images/lisboa-story-centre.jpg',
    schedule: '10:00 - 19:00',
  },
  {
    name: 'São Jorge Castle',
    address: 'R. de Santa Cruz do Castelo, 1100-129 Lisboa',
    miniDescription:
      'The Castelo de São Jorge in Lisbon, Portugal, is a historic fortress with diverse architectural styles and a rich history dating back to Roman times.',
    description: `The Castelo de São Jorge (Castle of São Jorge) is a historic fortress located on a hilltop overlooking the city of Lisbon, Portugal. It is one of the most iconic landmarks in the city and holds significant historical, cultural, and architectural importance.

    Key features:
    
    Historical Significance: The castle has a rich history dating back to Roman times and has served various purposes over the centuries, including as a Moorish fortress and a royal residence for Portuguese kings.
    
    Architectural Marvel: The castle's architecture is a blend of different styles, reflecting its diverse history. It features thick stone walls, towers, battlements, and a fortified entrance gate. The layout of the castle includes various courtyards and terraces that offer panoramic views of Lisbon and the Tagus River.
    
    Exhibition Spaces: Within the castle complex, visitors can explore various exhibition spaces that provide insights into the history, archaeology, and cultural heritage of the castle and the city. Artifacts and multimedia displays help visitors understand the castle's evolution and its role in shaping Lisbon's identity.
    
    Tower of Ulysses: One of the prominent features of the castle is the Tower of Ulysses, which offers a vantage point for breathtaking views of Lisbon's historic neighborhoods, the river, and beyond. The tower's name is linked to the mythological hero Ulysses and his legendary connection to Lisbon.
    
    Castle Grounds: The castle grounds encompass expansive areas with gardens, pathways, and outdoor spaces where visitors can stroll, relax, and enjoy the surroundings. The well-preserved walls and structures create a sense of stepping back in time.
    
    Cultural Events: The castle often hosts cultural events, exhibitions, and performances that celebrate Portuguese heritage, music, and arts. These events contribute to the castle's role as a cultural hub within the city.
    
    Accessibility: While the castle is located on a hilltop, it is accessible by foot or via the historic Tram 28. The uphill walk provides an opportunity to enjoy Lisbon's charming streets and neighborhoods.`,
    spotUrl: 'https://castelodesaojorge.pt/',
    imgUrl: '/images/castelo-sao-jorge.jpg',
    schedule: '09:00 - 21:00',
  },
  {
    name: 'Santa Justa Lift',
    address: 'Rua Santa Justa, Lisbon',
    miniDescription:
      'The Elevador de Santa Justa in Lisbon, Portugal, is a historic wrought-iron elevator designed in a captivating Gothic-Moorish style.',
    description: `The Elevador de Santa Justa, also known as the Santa Justa Lift, is an iconic wrought-iron elevator located in the heart of Lisbon, Portugal. It serves as both a functional transportation link and a historical architectural landmark.

    Key features:
    
    Architectural Marvel: The elevator was designed by Portuguese engineer Raoul Mesnier du Ponsard and was completed in 1902. Its design features a captivating blend of Gothic and Moorish architectural styles, with intricate wrought-iron detailing that adds to its ornate and visually striking appearance.
    
    Vertical Transportation: The Elevador de Santa Justa was initially constructed to provide a convenient connection between the lower streets of the Baixa district and the higher Carmo Square. It functions as an elevator, transporting passengers between the two levels, saving them from a steep uphill climb.
    
    Observation Deck: One of the highlights of the elevator is the panoramic viewing platform located at the top. Visitors who ride the elevator can access this platform, which offers stunning vistas of Lisbon's historic cityscape, including landmarks such as the Carmo Convent and the Tagus River.
    
    Lisbon Landmark: The elevator's unique design and historical significance have made it a cherished landmark in Lisbon. It attracts both tourists and locals who are interested in its architectural beauty and the opportunity to enjoy sweeping views of the city.
    
    Tourist Attraction: The Elevador de Santa Justa has become a popular tourist attraction, and visitors often line up to take a ride and experience the elevator's charming ambiance and elevated views.
    
    Location: The elevator is conveniently located within the Baixa district, making it easily accessible for visitors exploring the city center.
    `,
    spotUrl: 'https://www.visitlisboa.com/pt-pt/locais/elevador-de-santa-justa',
    imgUrl: '/images/elevador-santa-justa.jpg',
    schedule: '07:30 - 23:00',
  },
  {
    name: 'Chafariz de El-Rei',
    address: 'R. Cais de Santarém 23, 1100-603 Lisbon',
    miniDescription: `The Chafariz de El-Rei is a historic fountain in Lisbon, Portugal, dating back to the 13th century.`,
    description: `The Chafariz de El-Rei, also known as the King's Fountain, is a historic fountain located in Lisbon, Portugal. It holds cultural and architectural significance, representing an important element of the city's heritage.
    It served as a crucial water supply source for the city and is known for its classic architectural design. Situated near the main gate, it played a role in public gatherings and symbolizes Lisbon's history and resilience. Today, it remains a cultural landmark and tourist attraction, showcasing the city's heritage and importance of public spaces.

    Key features:
    
    Historical Importance: The fountain dates back to the 13th century and was built during the reign of King Dinis of Portugal. It has stood as a source of water supply for the city for centuries, serving both practical and symbolic purposes.
    
    Architectural Design: The Chafariz de El-Rei features a classic and elegant architectural design, characterized by its stone construction, decorative elements, and a central water spout. Its design reflects the aesthetic of the era in which it was built.
    
    Water Supply: In medieval times, the fountain played a crucial role in providing clean drinking water to the residents of Lisbon. It was strategically located near the city's main gate, facilitating access for both locals and travelers.
    
    Public Gathering Place: Fountains like the Chafariz de El-Rei often served as important public spaces where people would gather, socialize, and exchange news. They were focal points of urban life.
    
    Cultural Symbolism: The fountain's connection to historical events and its enduring presence make it a symbol of Lisbon's history and resilience. It stands as a reminder of the city's past and its ability to adapt and evolve over time.
    
    Location: The Chafariz de El-Rei is typically situated in the Alfama district of Lisbon, a historic neighborhood known for its narrow streets, charming atmosphere, and cultural landmarks.
    
    Tourist Attraction: Today, the Chafariz de El-Rei remains an attraction for both tourists and locals, drawing visitors interested in exploring Lisbon's historical and architectural treasures.`,
    spotUrl: 'https://chafarizdelrei.com/',
    imgUrl: '/images/chafariz-del-rei.jpeg',
    schedule: 'Open 24 hours',
  },
  {
    name: 'Convento do Carmo',
    address: 'Largo do Carmo, 1200-092 Lisboa',
    miniDescription: `The Convent of Our Lady of Mount Carmel is a former Catholic convent located in the civil parish of Santa Maria Maior, municipality of Lisbon.`,
    description: `The ruined Carmo Convent is said to be Lisbon's loveliest church, despite the fact it hasn’t had a roof since it fell in during the 1755 earthquake. It now stands as a reminder of the earthquake and a memorial. The beautiful gothic arches still stand and are well worth viewing. Much of the architecture dates back to the 1300s, while Manueline (Portuguese Gothic) windows and other details were added later, in the 16th and 18th centuries. You'll even be able to spot eerie South American mummies (a young boy and a young girl from Peru) if you like closely.`,
    spotUrl: 'http://www.museuarqueologicodocarmo.pt/',
    imgUrl: '/images/carmo.jpg',
    schedule: 'May-Sep: Mon-Sat 10am-7pm; Oct-Apr: Mon-Sat 10am-6pm',
  },
  {
    name: 'Teatro São Luiz',
    address: 'R. António Maria Cardoso 38, 1200-027 Lisboa',
    miniDescription: `The Teatro São Luiz is a theatre located in the Chiado district of the Portuguese capital of Lisbon.`,
    description: `The Teatro Municipal São Luiz is one of Lisbon’s most important theatres. Built in the late 19th century in the Parisian style favoured by the age, it was also the first cinema to show sound films in Portugal.

    With a troubled history of fires, today it is one of the city’s most dymanic cultural venues. It is home to the Companhia Teatral do Chiado and teatro-estúdio Mário Viegas, one of the great thinkers and drivers behind it.
    
    The Jardim de Inverno is one of the most sought after for conferences, debates and book launches, as well as a more informal venue for stand-up comedy, amongst other things.
    
    There’s also the Mini-Bar, a gastro-bar run by Chef José Avillez where you can try the famous ferrero rocher de foie gras.
    
    Sticking closely to topic, it’s one of the capital’s hotspots.`,
    spotUrl: 'https://www.teatrosaoluiz.pt/',
    imgUrl: '/images/sao-luis.jpg',
    schedule: 'May-Sep: Mon-Sat 10am-7pm; Oct-Apr: Mon-Sat 10am-6pm',
  },
];

async function insertCulture() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log('Database is now connected');

    // Create Culture Spots in our database with the seeds array
    let CultureCreated = await Culture.create(cultureSpots);

    // Feedback about Culture Spots creation
    console.log(`Created ${CultureCreated.length} Culture Spots!`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log('An error occurred while connecting to DB', error);
  }
}
insertCulture();
