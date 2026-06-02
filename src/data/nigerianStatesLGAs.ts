// Nigerian States and Local Government Areas
export interface StateLGA {
  state: string;
  lgas: string[];
}

export const NIGERIAN_STATES_LGAS: StateLGA[] = [
  {
    state: "Abia",
    lgas: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"]
  },
  {
    state: "Adamawa",
    lgas: ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"]
  },
  {
    state: "Akwa Ibom",
    lgas: ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"]
  },
  {
    state: "Anambra",
    lgas: ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"]
  },
  {
    state: "Bauchi",
    lgas: ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"]
  },
  {
    state: "Bayelsa",
    lgas: ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"]
  },
  {
    state: "Benue",
    lgas: ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"]
  },
  {
    state: "Borno",
    lgas: ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"]
  },
  {
    state: "Cross River",
    lgas: ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"]
  },
  {
    state: "Delta",
    lgas: ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"]
  },
  {
    state: "Ebonyi",
    lgas: ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"]
  },
  {
    state: "Edo",
    lgas: ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"]
  },
  {
    state: "Ekiti",
    lgas: ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"]
  },
  {
    state: "Enugu",
    lgas: ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo-Uwani"]
  },
  {
    state: "FCT - Abuja",
    lgas: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"]
  },
  {
    state: "Gombe",
    lgas: ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"]
  },
  {
    state: "Imo",
    lgas: ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Onuimo", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West"]
  },
  {
    state: "Jigawa",
    lgas: ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"]
  },
  {
    state: "Kaduna",
    lgas: ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"]
  },
  {
    state: "Kano",
    lgas: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"]
  },
  {
    state: "Katsina",
    lgas: ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"]
  },
  {
    state: "Kebbi",
    lgas: ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"]
  },
  {
    state: "Kogi",
    lgas: ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"]
  },
  {
    state: "Kwara",
    lgas: ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"]
  },
  {
    state: "Lagos",
    lgas: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"]
  },
  {
    state: "Nasarawa",
    lgas: ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"]
  },
  {
    state: "Niger",
    lgas: ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"]
  },
  {
    state: "Ogun",
    lgas: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"]
  },
  {
    state: "Ondo",
    lgas: ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"]
  },
  {
    state: "Osun",
    lgas: ["Atakunmosa East", "Atakunmosa West", "Aiyedaade", "Aiyedire", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"]
  },
  {
    state: "Oyo",
    lgas: ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo", "Oyo East", "Saki East", "Saki West", "Surulere"]
  },
  {
    state: "Plateau",
    lgas: ["Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang South", "Langtang North", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"]
  },
  {
    state: "Rivers",
    lgas: ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"]
  },
  {
    state: "Sokoto",
    lgas: ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"]
  },
  {
    state: "Taraba",
    lgas: ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"]
  },
  {
    state: "Yobe",
    lgas: ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"]
  },
  {
    state: "Zamfara",
    lgas: ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Tsafe", "Zurmi"]
  }
];

// United States: states and a representative set of major cities per state.
export const US_STATES_CITIES: StateLGA[] = [
  { state: "Alabama", lgas: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"] },
  { state: "Alaska", lgas: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka"] },
  { state: "Arizona", lgas: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Tempe", "Chandler"] },
  { state: "Arkansas", lgas: ["Little Rock", "Fayetteville", "Fort Smith", "Springdale", "Jonesboro"] },
  { state: "California", lgas: ["Los Angeles", "San Diego", "San Francisco", "San Jose", "Sacramento", "Fresno", "Oakland", "Long Beach"] },
  { state: "Colorado", lgas: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"] },
  { state: "Connecticut", lgas: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury"] },
  { state: "Delaware", lgas: ["Wilmington", "Dover", "Newark", "Middletown"] },
  { state: "Florida", lgas: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Tallahassee", "Fort Lauderdale"] },
  { state: "Georgia", lgas: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon"] },
  { state: "Hawaii", lgas: ["Honolulu", "Hilo", "Kailua", "Kapolei", "Pearl City"] },
  { state: "Idaho", lgas: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"] },
  { state: "Illinois", lgas: ["Chicago", "Aurora", "Naperville", "Springfield", "Peoria", "Rockford"] },
  { state: "Indiana", lgas: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington"] },
  { state: "Iowa", lgas: ["Des Moines", "Cedar Rapids", "Davenport", "Iowa City", "Ames"] },
  { state: "Kansas", lgas: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"] },
  { state: "Kentucky", lgas: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"] },
  { state: "Louisiana", lgas: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"] },
  { state: "Maine", lgas: ["Portland", "Lewiston", "Bangor", "Augusta", "Biddeford"] },
  { state: "Maryland", lgas: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Annapolis"] },
  { state: "Massachusetts", lgas: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"] },
  { state: "Michigan", lgas: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Flint", "Sterling Heights"] },
  { state: "Minnesota", lgas: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"] },
  { state: "Mississippi", lgas: ["Jackson", "Gulfport", "Southaven", "Biloxi", "Hattiesburg"] },
  { state: "Missouri", lgas: ["Kansas City", "Saint Louis", "Springfield", "Columbia", "Independence"] },
  { state: "Montana", lgas: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"] },
  { state: "Nebraska", lgas: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"] },
  { state: "Nevada", lgas: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"] },
  { state: "New Hampshire", lgas: ["Manchester", "Nashua", "Concord", "Dover", "Rochester"] },
  { state: "New Jersey", lgas: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Edison"] },
  { state: "New Mexico", lgas: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"] },
  { state: "New York", lgas: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"] },
  { state: "North Carolina", lgas: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"] },
  { state: "North Dakota", lgas: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"] },
  { state: "Ohio", lgas: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"] },
  { state: "Oklahoma", lgas: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"] },
  { state: "Oregon", lgas: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Bend"] },
  { state: "Pennsylvania", lgas: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Harrisburg"] },
  { state: "Rhode Island", lgas: ["Providence", "Warwick", "Cranston", "Pawtucket", "Newport"] },
  { state: "South Carolina", lgas: ["Columbia", "Charleston", "North Charleston", "Greenville", "Myrtle Beach"] },
  { state: "South Dakota", lgas: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"] },
  { state: "Tennessee", lgas: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"] },
  { state: "Texas", lgas: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso"] },
  { state: "Utah", lgas: ["Salt Lake City", "West Valley City", "Provo", "Ogden", "St. George"] },
  { state: "Vermont", lgas: ["Burlington", "Montpelier", "Rutland", "Essex", "Colchester"] },
  { state: "Virginia", lgas: ["Virginia Beach", "Norfolk", "Richmond", "Arlington", "Alexandria", "Chesapeake"] },
  { state: "Washington", lgas: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Olympia"] },
  { state: "West Virginia", lgas: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"] },
  { state: "Wisconsin", lgas: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"] },
  { state: "Wyoming", lgas: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"] },
];

export type Country = "Nigeria" | "US";

export const COUNTRIES: Country[] = ["US", "Nigeria"];

function datasetFor(country: Country): StateLGA[] {
  return country === "US" ? US_STATES_CITIES : NIGERIAN_STATES_LGAS;
}

export function getStates(country: Country = "Nigeria"): string[] {
  return datasetFor(country).map(s => s.state);
}

export function getLGAsForState(state: string, country: Country = "Nigeria"): string[] {
  const found = datasetFor(country).find(s => s.state === state);
  return found ? found.lgas : [];
}
