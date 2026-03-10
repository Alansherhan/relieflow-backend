// ============================================================================
// COMPREHENSIVE SEED DATA FOR RELIEFFLOW
// ============================================================================

// ============================================================================
// CALAMITY TYPES - Required for AidRequest references
// ============================================================================
export const calamityTypes = [
  { calamityName: 'Flood' },
  { calamityName: 'Earthquake' },
  { calamityName: 'Fire' },
  { calamityName: 'Cyclone' },
  { calamityName: 'Landslide' },
  { calamityName: 'Medical Emergency' },
  { calamityName: 'Power Outage' },
  { calamityName: 'Other' },
];

// ============================================================================
// ADMIN USERS - For dashboard access
// ============================================================================
export const adminUsers = [
  {
    email: 'admin@reliefflow.com',
    password: 'admin123',
    position: 'NGO',
  },
];

// ============================================================================
// RELIEF CENTERS - Kerala, India
// ============================================================================
export const reliefCenters = [
  {
    shelterName: 'Ernakulam District Relief Center',
    address: {
      addressLine1: 'Civil Station Road',
      addressLine2: 'Near Collectorate',
      addressLine3: 'Kakkanad, Ernakulam',
      pinCode: 682030,
      location: {
        type: 'Point',
        coordinates: [76.2673, 10.0159], // [longitude, latitude]
      },
    },
    coordinatorName: 'Dr. Sreekumar Menon',
    coordinatorNumber: '+91 9876543210',
  },
  {
    shelterName: 'Thiruvananthapuram Central Relief Camp',
    address: {
      addressLine1: 'PMG Junction',
      addressLine2: 'Opposite Secretariat',
      addressLine3: 'Thiruvananthapuram',
      pinCode: 695001,
      location: {
        type: 'Point',
        coordinates: [76.9366, 8.5241],
      },
    },
    coordinatorName: 'Anil Kumar R',
    coordinatorNumber: '+91 9845123456',
  },
  {
    shelterName: 'Kozhikode District Emergency Shelter',
    address: {
      addressLine1: 'Beach Road',
      addressLine2: 'Near Mananchira Square',
      addressLine3: 'Kozhikode',
      pinCode: 673001,
      location: {
        type: 'Point',
        coordinates: [75.7804, 11.2588],
      },
    },
    coordinatorName: 'Fatima Beevi K',
    coordinatorNumber: '+91 9447654321',
  },
  {
    shelterName: 'Kottayam Flood Relief Center',
    address: {
      addressLine1: 'Nagampadam',
      addressLine2: 'Near Medical College',
      addressLine3: 'Kottayam',
      pinCode: 686008,
      location: {
        type: 'Point',
        coordinates: [76.5222, 9.5916],
      },
    },
    coordinatorName: 'Thomas Mathew',
    coordinatorNumber: '+91 9961234567',
  },
  {
    shelterName: 'Wayanad Hill District Relief Camp',
    address: {
      addressLine1: 'Sultan Bathery Road',
      addressLine2: 'Near District Hospital',
      addressLine3: 'Kalpetta, Wayanad',
      pinCode: 673121,
      location: {
        type: 'Point',
        coordinates: [76.0774, 11.6087],
      },
    },
    coordinatorName: 'Priya Krishnan',
    coordinatorNumber: '+91 8547896321',
  },
];

// ============================================================================
// DISASTER TIPS DATA
// ============================================================================
export const disasterTips = [
  // 1. FLOODS
  {
    title: 'Floods',
    slug: 'floods',
    description: 'Monsoon & heavy rainfall safety',
    icon: 'Droplets',
    color: 'bg-blue-500',
    priority: 'high',
    region: ['kerala', 'india', 'global'],
    beforeTips: [
      {
        text: 'Create an emergency kit with water, food, medicines, flashlight, and batteries',
        critical: true,
        order: 1,
      },
      {
        text: 'Identify safe evacuation routes and shelter locations in your area',
        critical: true,
        order: 2,
      },
      {
        text: 'Store important documents in waterproof containers or bags',
        critical: false,
        order: 3,
      },
      {
        text: 'Keep emergency contact numbers saved and written down',
        critical: false,
        order: 4,
      },
      {
        text: 'Install check valves in plumbing to prevent water backup',
        critical: false,
        order: 5,
      },
      {
        text: 'Clear gutters and drainage systems around your home',
        critical: false,
        order: 6,
      },
      {
        text: 'Move valuable items to higher floors',
        critical: false,
        order: 7,
      },
      {
        text: 'Know how to turn off gas, electricity and water mains',
        critical: true,
        order: 8,
      },
    ],
    duringTips: [
      {
        text: 'Move to higher ground immediately if flooding begins',
        critical: true,
        order: 1,
      },
      {
        text: 'Never walk or drive through flood water - 6 inches can knock you down',
        critical: true,
        order: 2,
      },
      {
        text: 'Turn off electricity at the main breaker if water is approaching',
        critical: true,
        order: 3,
      },
      {
        text: 'Stay away from windows and doors during heavy flooding',
        critical: false,
        order: 4,
      },
      {
        text: 'Listen to local radio or TV for emergency updates',
        critical: false,
        order: 5,
      },
      {
        text: 'If trapped in a building, go to the highest level but not a closed attic',
        critical: true,
        order: 6,
      },
      {
        text: 'Do not touch electrical equipment if you are wet or standing in water',
        critical: true,
        order: 7,
      },
    ],
    afterTips: [
      {
        text: 'Return home only when authorities say it is safe',
        critical: true,
        order: 1,
      },
      {
        text: 'Avoid flood water as it may be contaminated with sewage or chemicals',
        critical: true,
        order: 2,
      },
      {
        text: 'Document property damage with photos for insurance claims',
        critical: false,
        order: 3,
      },
      {
        text: 'Check for structural damage before entering your home',
        critical: true,
        order: 4,
      },
      {
        text: 'Discard any food that came in contact with flood water',
        critical: false,
        order: 5,
      },
      {
        text: 'Clean and disinfect everything that got wet to prevent mold',
        critical: false,
        order: 6,
      },
      {
        text: 'Watch for broken glass, nails, and other sharp objects',
        critical: false,
        order: 7,
      },
    ],
    videos: [
      {
        title: 'Flood Evacuation Safety',
        url: 'https://www.youtube.com/watch?v=example1',
        duration: '2:45',
      },
      {
        title: 'Building Emergency Kit',
        url: 'https://www.youtube.com/watch?v=example2',
        duration: '3:20',
      },
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372', type: 'national' },
      { name: 'Kerala Disaster Management', number: '1077', type: 'state' },
      { name: 'Emergency Services', number: '112', type: 'national' },
    ],
  },

  // 2. EARTHQUAKES
  {
    title: 'Earthquakes',
    slug: 'earthquakes',
    description: 'Seismic activity preparedness',
    icon: 'Mountain',
    color: 'bg-amber-600',
    priority: 'medium',
    region: ['india', 'global'],
    beforeTips: [
      {
        text: 'Secure heavy furniture and appliances to walls',
        critical: true,
        order: 1,
      },
      {
        text: 'Practice "Drop, Cover, and Hold On" drills with family',
        critical: true,
        order: 2,
      },
      {
        text: 'Identify safe spots in each room (under sturdy tables, against interior walls)',
        critical: true,
        order: 3,
      },
      {
        text: 'Keep emergency supplies including first aid and tools',
        critical: false,
        order: 4,
      },
      {
        text: 'Store breakable items on low shelves in closed cabinets',
        critical: false,
        order: 5,
      },
      {
        text: 'Know how to shut off gas, water, and electricity',
        critical: true,
        order: 6,
      },
      {
        text: 'Keep heavy items away from beds and seating areas',
        critical: false,
        order: 7,
      },
    ],
    duringTips: [
      {
        text: 'DROP to your hands and knees immediately',
        critical: true,
        order: 1,
      },
      {
        text: 'COVER your head and neck under a sturdy table or desk',
        critical: true,
        order: 2,
      },
      {
        text: 'HOLD ON until shaking stops - be ready to move with the table',
        critical: true,
        order: 3,
      },
      {
        text: 'If outdoors, move away from buildings, trees, and power lines',
        critical: true,
        order: 4,
      },
      {
        text: 'If in a vehicle, pull over safely and stay inside',
        critical: false,
        order: 5,
      },
      {
        text: 'Stay away from windows, mirrors, and heavy objects that could fall',
        critical: false,
        order: 6,
      },
      { text: 'Do not run outside during shaking', critical: true, order: 7 },
    ],
    afterTips: [
      {
        text: 'Check yourself and others for injuries',
        critical: true,
        order: 1,
      },
      {
        text: 'Expect aftershocks - be ready to Drop, Cover, and Hold again',
        critical: true,
        order: 2,
      },
      {
        text: 'Inspect your home for damage and evacuate if unsafe',
        critical: true,
        order: 3,
      },
      {
        text: 'Use text messages instead of calls to avoid network congestion',
        critical: false,
        order: 4,
      },
      { text: 'Stay away from damaged buildings', critical: true, order: 5 },
      {
        text: 'Check for gas leaks - if you smell gas, turn it off and leave',
        critical: true,
        order: 6,
      },
    ],
    videos: [
      {
        title: 'Drop, Cover, Hold On',
        url: 'https://www.youtube.com/watch?v=example3',
        duration: '1:30',
      },
    ],
    emergencyContacts: [
      { name: 'Emergency Services', number: '112', type: 'national' },
      {
        name: 'National Disaster Response Force',
        number: '011-26105763',
        type: 'national',
      },
    ],
  },

  // 3. FIRES
  {
    title: 'Fires',
    slug: 'fires',
    description: 'Fire safety & evacuation',
    icon: 'Flame',
    color: 'bg-red-500',
    priority: 'critical',
    region: ['global'],
    beforeTips: [
      {
        text: 'Install smoke alarms on every level and test monthly',
        critical: true,
        order: 1,
      },
      {
        text: 'Create and practice a fire escape plan with two exits from each room',
        critical: true,
        order: 2,
      },
      {
        text: 'Keep fire extinguishers accessible and know how to use them',
        critical: true,
        order: 3,
      },
      { text: 'Never leave cooking unattended', critical: true, order: 4 },
      {
        text: 'Keep flammable items away from heat sources',
        critical: false,
        order: 5,
      },
      {
        text: 'Check electrical cords for damage regularly',
        critical: false,
        order: 6,
      },
      {
        text: 'Establish a meeting point outside your home',
        critical: true,
        order: 7,
      },
    ],
    duringTips: [
      {
        text: 'GET OUT immediately and call emergency services from outside',
        critical: true,
        order: 1,
      },
      {
        text: 'Crawl low under smoke - cleaner air is near the floor',
        critical: true,
        order: 2,
      },
      {
        text: 'If clothes catch fire: STOP, DROP, and ROLL',
        critical: true,
        order: 3,
      },
      {
        text: 'Feel doors before opening - if hot, use another exit',
        critical: true,
        order: 4,
      },
      {
        text: 'Never go back inside a burning building',
        critical: true,
        order: 5,
      },
      {
        text: 'Close doors behind you as you escape to slow fire spread',
        critical: false,
        order: 6,
      },
      {
        text: 'If trapped, seal cracks around doors with cloth and signal for help',
        critical: true,
        order: 7,
      },
    ],
    afterTips: [
      {
        text: 'Do not enter until fire department declares it safe',
        critical: true,
        order: 1,
      },
      {
        text: 'Contact your insurance company immediately',
        critical: false,
        order: 2,
      },
      {
        text: 'Discard any food exposed to heat, smoke, or soot',
        critical: false,
        order: 3,
      },
      {
        text: 'Watch for structural damage and hot spots',
        critical: true,
        order: 4,
      },
      {
        text: 'Take photos of damage for insurance claims',
        critical: false,
        order: 5,
      },
    ],
    videos: [
      {
        title: 'Stop, Drop & Roll',
        url: 'https://www.youtube.com/watch?v=example4',
        duration: '0:45',
      },
      {
        title: 'Fire Extinguisher Use',
        url: 'https://www.youtube.com/watch?v=example5',
        duration: '2:10',
      },
    ],
    emergencyContacts: [
      { name: 'Fire Services', number: '101', type: 'national' },
      { name: 'Emergency Services', number: '112', type: 'national' },
    ],
  },

  // 4. CYCLONES
  {
    title: 'Cyclones',
    slug: 'cyclones',
    description: 'Storm & wind preparedness',
    icon: 'Wind',
    color: 'bg-indigo-500',
    priority: 'high',
    region: ['kerala', 'coastal-india', 'india', 'global'],
    beforeTips: [
      {
        text: 'Monitor weather reports and cyclone warnings regularly',
        critical: true,
        order: 1,
      },
      {
        text: 'Secure outdoor objects or bring them inside',
        critical: false,
        order: 2,
      },
      {
        text: 'Board up windows or install storm shutters',
        critical: false,
        order: 3,
      },
      {
        text: 'Stock up on food, water, and medicines for at least 3 days',
        critical: true,
        order: 4,
      },
      {
        text: 'Charge all electronic devices and power banks',
        critical: false,
        order: 5,
      },
      {
        text: 'Fill bathtubs and containers with water',
        critical: false,
        order: 6,
      },
      {
        text: 'Know your evacuation route and shelter locations',
        critical: true,
        order: 7,
      },
    ],
    duringTips: [
      { text: 'Stay indoors and away from windows', critical: true, order: 1 },
      {
        text: 'Move to an interior room on the lowest floor',
        critical: true,
        order: 2,
      },
      {
        text: 'Listen to battery-powered radio for updates',
        critical: false,
        order: 3,
      },
      {
        text: 'Do not go outside even if it seems calm - the eye can pass over',
        critical: true,
        order: 4,
      },
      { text: 'Stay away from floodwater', critical: true, order: 5 },
      {
        text: 'If evacuating, do so immediately when ordered',
        critical: true,
        order: 6,
      },
    ],
    afterTips: [
      {
        text: 'Wait for official all-clear before going outside',
        critical: true,
        order: 1,
      },
      {
        text: 'Watch for fallen power lines and damaged structures',
        critical: true,
        order: 2,
      },
      { text: 'Avoid driving through flooded areas', critical: true, order: 3 },
      {
        text: 'Document damage with photos for insurance',
        critical: false,
        order: 4,
      },
      {
        text: 'Check on neighbors, especially elderly',
        critical: false,
        order: 5,
      },
      {
        text: 'Boil water before drinking if advised',
        critical: true,
        order: 6,
      },
    ],
    videos: [
      {
        title: 'Cyclone Safety Guide',
        url: 'https://www.youtube.com/watch?v=example6',
        duration: '3:15',
      },
    ],
    emergencyContacts: [
      {
        name: 'Cyclone Warning Centre',
        number: '1800-425-0505',
        type: 'national',
      },
      { name: 'Emergency Services', number: '112', type: 'national' },
      { name: 'Coast Guard', number: '1554', type: 'national' },
    ],
  },

  // 5. LANDSLIDES
  {
    title: 'Landslides',
    slug: 'landslides',
    description: 'Slope failure awareness',
    icon: 'Mountain',
    color: 'bg-stone-600',
    priority: 'high',
    region: ['kerala', 'himalayan-states', 'india'],
    beforeTips: [
      {
        text: 'Know the landslide warning signs in your area',
        critical: true,
        order: 1,
      },
      {
        text: 'Monitor weather forecasts during heavy rainfall',
        critical: true,
        order: 2,
      },
      {
        text: 'Plant ground cover on slopes to reduce erosion',
        critical: false,
        order: 3,
      },
      {
        text: 'Build channels to divert water away from slopes',
        critical: false,
        order: 4,
      },
      { text: 'Have an evacuation plan ready', critical: true, order: 5 },
      {
        text: 'Avoid building near steep slopes or mountain edges',
        critical: true,
        order: 6,
      },
    ],
    duringTips: [
      {
        text: 'Watch for unusual sounds - trees cracking, boulders knocking',
        critical: true,
        order: 1,
      },
      {
        text: 'Move away from the path of landslide immediately',
        critical: true,
        order: 2,
      },
      {
        text: 'If caught in landslide, curl into a ball and protect your head',
        critical: true,
        order: 3,
      },
      {
        text: 'Alert others in the area by shouting warnings',
        critical: false,
        order: 4,
      },
      { text: 'Do not cross landslide debris', critical: true, order: 5 },
    ],
    afterTips: [
      {
        text: 'Stay away from landslide area - more slides may occur',
        critical: true,
        order: 1,
      },
      {
        text: 'Watch for flooding which often follows landslides',
        critical: true,
        order: 2,
      },
      {
        text: 'Report broken utility lines to authorities',
        critical: false,
        order: 3,
      },
      {
        text: 'Check for injured and trapped persons',
        critical: true,
        order: 4,
      },
      {
        text: 'Replanting vegetation can reduce future risk',
        critical: false,
        order: 5,
      },
    ],
    videos: [
      {
        title: 'Landslide Warning Signs',
        url: 'https://www.youtube.com/watch?v=example7',
        duration: '2:20',
      },
    ],
    emergencyContacts: [
      { name: 'Emergency Services', number: '112', type: 'national' },
      { name: 'Kerala Disaster Management', number: '1077', type: 'state' },
      { name: 'NDRF', number: '9711077372', type: 'national' },
    ],
  },

  // 6. MEDICAL EMERGENCY
  {
    title: 'Medical Emergency',
    slug: 'medical-emergency',
    description: 'First aid & life-saving',
    icon: 'Activity',
    color: 'bg-emerald-500',
    priority: 'critical',
    region: ['global'],
    beforeTips: [
      { text: 'Learn basic first aid and CPR', critical: true, order: 1 },
      {
        text: 'Keep a well-stocked first aid kit accessible',
        critical: true,
        order: 2,
      },
      {
        text: 'Know emergency contact numbers by heart',
        critical: true,
        order: 3,
      },
      {
        text: 'Keep a list of family medical conditions and allergies',
        critical: false,
        order: 4,
      },
      { text: 'Store essential medicines properly', critical: false, order: 5 },
    ],
    duringTips: [
      {
        text: 'Call emergency services (108/112) immediately',
        critical: true,
        order: 1,
      },
      { text: 'Stay calm and assess the situation', critical: true, order: 2 },
      { text: 'Check for breathing and pulse', critical: true, order: 3 },
      {
        text: 'Stop any bleeding by applying pressure',
        critical: true,
        order: 4,
      },
      {
        text: 'Do not move person with suspected spine injury',
        critical: true,
        order: 5,
      },
      {
        text: 'For choking: perform Heimlich maneuver',
        critical: true,
        order: 6,
      },
      {
        text: 'For heart attack: have person sit and rest, give aspirin if available',
        critical: true,
        order: 7,
      },
    ],
    afterTips: [
      {
        text: 'Follow up with medical professionals',
        critical: true,
        order: 1,
      },
      { text: 'Restock first aid supplies used', critical: false, order: 2 },
      {
        text: 'Document what happened for medical records',
        critical: false,
        order: 3,
      },
    ],
    videos: [
      {
        title: 'CPR Training',
        url: 'https://www.youtube.com/watch?v=example8',
        duration: '4:30',
      },
      {
        title: 'Heimlich Maneuver',
        url: 'https://www.youtube.com/watch?v=example9',
        duration: '1:45',
      },
    ],
    emergencyContacts: [
      { name: 'Ambulance', number: '108', type: 'national' },
      { name: 'Emergency Services', number: '112', type: 'national' },
      { name: 'Poison Control', number: '1800-425-7111', type: 'national' },
    ],
  },

  // 7. POWER OUTAGE
  {
    title: 'Power Outage',
    slug: 'power-outage',
    description: 'Electrical safety tips',
    icon: 'Zap',
    color: 'bg-yellow-500',
    priority: 'low',
    region: ['global'],
    beforeTips: [
      {
        text: 'Keep flashlights and batteries in accessible locations',
        critical: false,
        order: 1,
      },
      {
        text: 'Have a battery-powered or hand-crank radio',
        critical: false,
        order: 2,
      },
      { text: 'Keep mobile phones fully charged', critical: false, order: 3 },
      {
        text: 'Know how to manually open garage doors',
        critical: false,
        order: 4,
      },
      { text: 'Keep backup power bank for phones', critical: false, order: 5 },
    ],
    duringTips: [
      {
        text: 'Unplug major appliances to prevent damage from power surge',
        critical: false,
        order: 1,
      },
      {
        text: 'Keep refrigerator and freezer doors closed',
        critical: false,
        order: 2,
      },
      {
        text: 'Use flashlights, not candles, to prevent fire',
        critical: true,
        order: 3,
      },
      {
        text: 'Turn off or disconnect appliances being used when power went out',
        critical: false,
        order: 4,
      },
      {
        text: 'Never use gas stoves or generators indoors',
        critical: true,
        order: 5,
      },
    ],
    afterTips: [
      {
        text: 'Wait a few minutes before turning appliances back on',
        critical: false,
        order: 1,
      },
      {
        text: 'Check food in refrigerator - discard if temperature above 40°F for 2+ hours',
        critical: false,
        order: 2,
      },
      { text: 'Reset digital clocks and devices', critical: false, order: 3 },
    ],
    emergencyContacts: [
      { name: 'Power Department', number: '1912', type: 'local' },
      { name: 'Emergency Services', number: '112', type: 'national' },
    ],
  },

  // 8. HOME SAFETY
  {
    title: 'Home Safety',
    slug: 'home-safety',
    description: 'General preparedness',
    icon: 'Home',
    color: 'bg-purple-500',
    priority: 'medium',
    region: ['global'],
    beforeTips: [
      {
        text: 'Install smoke and carbon monoxide detectors',
        critical: true,
        order: 1,
      },
      {
        text: 'Create a family emergency plan and communication strategy',
        critical: true,
        order: 2,
      },
      {
        text: 'Prepare an emergency kit with 3 days of supplies',
        critical: true,
        order: 3,
      },
      { text: 'Know locations of utility shut-offs', critical: true, order: 4 },
      {
        text: 'Keep important documents in waterproof container',
        critical: false,
        order: 5,
      },
      {
        text: 'Have emergency contacts written down',
        critical: false,
        order: 6,
      },
      {
        text: 'Install sturdy locks on doors and windows',
        critical: false,
        order: 7,
      },
    ],
    duringTips: [
      {
        text: 'Stay calm and follow your emergency plan',
        critical: true,
        order: 1,
      },
      {
        text: 'Gather family members in safe location',
        critical: true,
        order: 2,
      },
      { text: 'Listen to emergency broadcasts', critical: false, order: 3 },
      { text: 'Keep emergency kit accessible', critical: false, order: 4 },
    ],
    afterTips: [
      { text: 'Inspect home for damage', critical: true, order: 1 },
      { text: 'Document any damage with photos', critical: false, order: 2 },
      {
        text: 'Contact insurance company if needed',
        critical: false,
        order: 3,
      },
      { text: 'Restock emergency supplies used', critical: false, order: 4 },
    ],
    emergencyContacts: [
      { name: 'Emergency Services', number: '112', type: 'national' },
      { name: 'Police', number: '100', type: 'national' },
    ],
  },
];

// ============================================================================
// QUIZ QUESTIONS DATA
// ============================================================================
export const quizQuestions = [
  // FLOODS QUIZ
  {
    category: 'floods',
    type: 'multiple',
    question: 'How many inches of flowing water can knock you down?',
    options: [
      { id: 'a', text: '12 inches', correct: false, points: 0 },
      { id: 'b', text: '6 inches', correct: true, points: 10 },
      { id: 'c', text: '18 inches', correct: false, points: 0 },
      { id: 'd', text: '24 inches', correct: false, points: 0 },
    ],
    explanation:
      '6 inches of moving water can knock you down. Never walk or drive through flood water!',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'floods',
    type: 'yesno',
    question:
      'Do you have an emergency kit with 3 days of food, water, and medicines?',
    options: [
      { id: 'yes', text: 'Yes, fully stocked', correct: true, points: 10 },
      { id: 'partial', text: 'Partially prepared', correct: false, points: 5 },
      { id: 'no', text: 'No, not yet', correct: false, points: 0 },
    ],
    explanation:
      'An emergency kit should have at least 3 days of supplies. Start building yours today!',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },
  {
    category: 'floods',
    type: 'multiple',
    question: 'Where should you go during a flood?',
    options: [
      { id: 'a', text: 'Basement', correct: false, points: 0 },
      { id: 'b', text: 'Ground floor', correct: false, points: 0 },
      { id: 'c', text: 'Highest floor available', correct: true, points: 10 },
      { id: 'd', text: 'Stay where you are', correct: false, points: 0 },
    ],
    explanation:
      'Always move to higher ground or the highest floor. Never go to basements during floods.',
    points: 10,
    order: 3,
    difficulty: 'easy',
  },
  {
    category: 'floods',
    type: 'scenario',
    question:
      'You see water rising rapidly in your street. Your car is parked outside. What do you do?',
    options: [
      {
        id: 'a',
        text: 'Rush to move the car to higher ground',
        correct: false,
        points: 0,
      },
      {
        id: 'b',
        text: 'Leave the car and get to safety immediately',
        correct: true,
        points: 10,
      },
      {
        id: 'c',
        text: 'Wait and see if water stops rising',
        correct: false,
        points: 0,
      },
      {
        id: 'd',
        text: 'Drive through the water to escape',
        correct: false,
        points: 0,
      },
    ],
    explanation:
      'Your life is more valuable than any vehicle. Get to safety immediately. 2 feet of water can carry away most vehicles.',
    points: 10,
    order: 4,
    difficulty: 'medium',
  },
  {
    category: 'floods',
    type: 'multiple',
    question: 'When is it safe to return home after a flood?',
    options: [
      { id: 'a', text: 'As soon as water recedes', correct: false, points: 0 },
      { id: 'b', text: 'When neighbors return', correct: false, points: 0 },
      {
        id: 'c',
        text: "Only when authorities say it's safe",
        correct: true,
        points: 10,
      },
      { id: 'd', text: 'After 24 hours', correct: false, points: 0 },
    ],
    explanation:
      'Wait for official clearance. Hidden dangers like structural damage and contamination may exist.',
    points: 10,
    order: 5,
    difficulty: 'easy',
  },

  // EARTHQUAKES QUIZ
  {
    category: 'earthquakes',
    type: 'multiple',
    question: 'What is the correct earthquake safety procedure?',
    options: [
      { id: 'a', text: 'Run outside immediately', correct: false, points: 0 },
      { id: 'b', text: 'Stand in a doorway', correct: false, points: 0 },
      { id: 'c', text: 'Drop, Cover, and Hold On', correct: true, points: 10 },
      { id: 'd', text: 'Lie flat on the ground', correct: false, points: 0 },
    ],
    explanation:
      'Drop to your hands and knees, Cover your head and neck, and Hold On until shaking stops.',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'earthquakes',
    type: 'yesno',
    question: 'Have you secured heavy furniture to walls in your home?',
    options: [
      {
        id: 'yes',
        text: 'Yes, everything is secured',
        correct: true,
        points: 10,
      },
      { id: 'partial', text: 'Some items', correct: false, points: 5 },
      { id: 'no', text: 'No', correct: false, points: 0 },
    ],
    explanation:
      'Securing heavy furniture can prevent injuries during earthquakes. This is essential preparedness.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },
  {
    category: 'earthquakes',
    type: 'multiple',
    question: "What should you do if you're driving during an earthquake?",
    options: [
      { id: 'a', text: 'Speed up to get away', correct: false, points: 0 },
      {
        id: 'b',
        text: 'Pull over safely and stay inside the vehicle',
        correct: true,
        points: 10,
      },
      {
        id: 'c',
        text: 'Get out and lie on the ground',
        correct: false,
        points: 0,
      },
      {
        id: 'd',
        text: 'Drive under a bridge for protection',
        correct: false,
        points: 0,
      },
    ],
    explanation:
      'Pull over away from buildings and trees, stay in your vehicle. It will protect you from falling objects.',
    points: 10,
    order: 3,
    difficulty: 'medium',
  },

  // FIRES QUIZ
  {
    category: 'fires',
    type: 'multiple',
    question: 'If your clothes catch fire, what should you do?',
    options: [
      { id: 'a', text: 'Run to get help', correct: false, points: 0 },
      { id: 'b', text: 'Stop, Drop, and Roll', correct: true, points: 10 },
      { id: 'c', text: 'Try to pat out the flames', correct: false, points: 0 },
      { id: 'd', text: 'Pour water on yourself', correct: false, points: 0 },
    ],
    explanation:
      'Stop immediately, Drop to the ground, and Roll to smother flames. Running makes fire worse.',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'fires',
    type: 'yesno',
    question: 'Do you have working smoke alarms on every level of your home?',
    options: [
      { id: 'yes', text: 'Yes, tested regularly', correct: true, points: 10 },
      {
        id: 'partial',
        text: 'Have them but not tested',
        correct: false,
        points: 5,
      },
      { id: 'no', text: 'No smoke alarms', correct: false, points: 0 },
    ],
    explanation:
      'Working smoke alarms can save your life. Test them monthly and replace batteries yearly.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },
  {
    category: 'fires',
    type: 'scenario',
    question:
      'You discover a fire in your home. What is the FIRST thing you should do?',
    options: [
      {
        id: 'a',
        text: 'Try to put it out yourself',
        correct: false,
        points: 0,
      },
      {
        id: 'b',
        text: 'Get everyone out and call 101 from outside',
        correct: true,
        points: 10,
      },
      {
        id: 'c',
        text: 'Gather important belongings',
        correct: false,
        points: 0,
      },
      {
        id: 'd',
        text: 'Open windows for ventilation',
        correct: false,
        points: 0,
      },
    ],
    explanation:
      'Get out immediately and call emergency services from outside. Never risk your life for possessions.',
    points: 10,
    order: 3,
    difficulty: 'medium',
  },

  // CYCLONES QUIZ
  {
    category: 'cyclones',
    type: 'multiple',
    question:
      "During a cyclone, why shouldn't you go outside even if it seems calm?",
    options: [
      { id: 'a', text: 'The storm might return', correct: false, points: 0 },
      {
        id: 'b',
        text: 'You could be in the eye of the cyclone',
        correct: true,
        points: 10,
      },
      { id: 'c', text: 'There might be lightning', correct: false, points: 0 },
      { id: 'd', text: 'Roads will be slippery', correct: false, points: 0 },
    ],
    explanation:
      'The eye of a cyclone is calm, but the other side of the storm will hit soon. Stay inside throughout.',
    points: 10,
    order: 1,
    difficulty: 'medium',
  },
  {
    category: 'cyclones',
    type: 'yesno',
    question: 'Have you identified your nearest cyclone shelter location?',
    options: [
      { id: 'yes', text: 'Yes, I know the route', correct: true, points: 10 },
      {
        id: 'partial',
        text: "I know but haven't practiced",
        correct: false,
        points: 5,
      },
      { id: 'no', text: 'No idea', correct: false, points: 0 },
    ],
    explanation:
      'Knowing your evacuation route beforehand saves crucial time during emergencies.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },

  // LANDSLIDES QUIZ
  {
    category: 'landslides',
    type: 'multiple',
    question: 'What is an early warning sign of a potential landslide?',
    options: [
      { id: 'a', text: 'Clear skies', correct: false, points: 0 },
      {
        id: 'b',
        text: 'Cracks appearing in walls or ground',
        correct: true,
        points: 10,
      },
      { id: 'c', text: 'Birds singing', correct: false, points: 0 },
      { id: 'd', text: 'Calm weather', correct: false, points: 0 },
    ],
    explanation:
      'New cracks in walls, foundations, or ground can indicate unstable soil and potential landslide.',
    points: 10,
    order: 1,
    difficulty: 'medium',
  },
  {
    category: 'landslides',
    type: 'scenario',
    question:
      'You hear rumbling sounds from the hillside behind your house during heavy rain. What should you do?',
    options: [
      {
        id: 'a',
        text: 'Go outside to check what it is',
        correct: false,
        points: 0,
      },
      {
        id: 'b',
        text: 'Evacuate immediately away from the hillside',
        correct: true,
        points: 10,
      },
      { id: 'c', text: 'Stay inside and wait', correct: false, points: 0 },
      {
        id: 'd',
        text: 'Call a neighbor to investigate',
        correct: false,
        points: 0,
      },
    ],
    explanation:
      'Rumbling or unusual sounds from hillsides during rain are warning signs. Evacuate immediately away from the slope.',
    points: 10,
    order: 2,
    difficulty: 'medium',
  },

  // MEDICAL EMERGENCY QUIZ
  {
    category: 'medical',
    type: 'multiple',
    question: 'What is the first step in CPR?',
    options: [
      { id: 'a', text: 'Give rescue breaths', correct: false, points: 0 },
      {
        id: 'b',
        text: 'Check for responsiveness and call for help',
        correct: true,
        points: 10,
      },
      { id: 'c', text: 'Start chest compressions', correct: false, points: 0 },
      { id: 'd', text: 'Look for injuries', correct: false, points: 0 },
    ],
    explanation:
      'Always check if person is responsive first and call emergency services before starting CPR.',
    points: 10,
    order: 1,
    difficulty: 'medium',
  },
  {
    category: 'medical',
    type: 'yesno',
    question: 'Do you have a first aid kit easily accessible at home?',
    options: [
      { id: 'yes', text: 'Yes, fully stocked', correct: true, points: 10 },
      { id: 'partial', text: 'Have basic items', correct: false, points: 5 },
      { id: 'no', text: 'No kit', correct: false, points: 0 },
    ],
    explanation:
      'A well-stocked first aid kit is essential for treating minor injuries and emergencies.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },
  {
    category: 'medical',
    type: 'multiple',
    question:
      'What should you do if someone is choking and cannot speak or cough?',
    options: [
      { id: 'a', text: 'Give them water', correct: false, points: 0 },
      { id: 'b', text: 'Perform Heimlich maneuver', correct: true, points: 10 },
      { id: 'c', text: 'Pat their back gently', correct: false, points: 0 },
      { id: 'd', text: 'Wait for it to pass', correct: false, points: 0 },
    ],
    explanation:
      'Perform abdominal thrusts (Heimlich maneuver) to dislodge the obstruction. Call 108 immediately.',
    points: 10,
    order: 3,
    difficulty: 'medium',
  },

  // POWER OUTAGE QUIZ
  {
    category: 'power-outage',
    type: 'multiple',
    question: 'What should you use for light during a power outage?',
    options: [
      {
        id: 'a',
        text: 'Candles throughout the house',
        correct: false,
        points: 0,
      },
      {
        id: 'b',
        text: 'Flashlights or battery-powered lanterns',
        correct: true,
        points: 10,
      },
      { id: 'c', text: 'Gas stove flame', correct: false, points: 0 },
      { id: 'd', text: 'Outdoor bonfire', correct: false, points: 0 },
    ],
    explanation:
      'Flashlights are safest. Candles pose fire risks, especially during emergencies when distractions are common.',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'power-outage',
    type: 'yesno',
    question: 'Do you have a battery-powered or hand-crank radio at home?',
    options: [
      { id: 'yes', text: 'Yes', correct: true, points: 10 },
      { id: 'no', text: 'No', correct: false, points: 0 },
    ],
    explanation:
      'A battery-powered radio helps you stay informed during extended outages when phones may not work.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },

  // HOME SAFETY QUIZ
  {
    category: 'home-safety',
    type: 'multiple',
    question: 'How long should your emergency supply kit last?',
    options: [
      { id: 'a', text: '1 day', correct: false, points: 0 },
      { id: 'b', text: 'At least 3 days', correct: true, points: 10 },
      { id: 'c', text: '1 week minimum', correct: false, points: 0 },
      { id: 'd', text: '1 month', correct: false, points: 0 },
    ],
    explanation:
      'Emergency kits should have at least 3 days of supplies. A week is even better for major disasters.',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'home-safety',
    type: 'yesno',
    question:
      'Does your family have a designated meeting point in case of emergency evacuation?',
    options: [
      { id: 'yes', text: 'Yes, everyone knows it', correct: true, points: 10 },
      {
        id: 'partial',
        text: 'We have one but not practiced',
        correct: false,
        points: 5,
      },
      { id: 'no', text: 'No meeting point', correct: false, points: 0 },
    ],
    explanation:
      'A family meeting point ensures everyone knows where to gather after evacuating. Practice the route regularly.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },

  // ALL DISASTERS (GENERAL) QUIZ
  {
    category: 'all',
    type: 'multiple',
    question: 'What is the emergency services number in India?',
    options: [
      { id: 'a', text: '100', correct: false, points: 0 },
      { id: 'b', text: '101', correct: false, points: 0 },
      { id: 'c', text: '112', correct: true, points: 10 },
      { id: 'd', text: '108', correct: false, points: 0 },
    ],
    explanation:
      '112 is the universal emergency number in India that connects to all emergency services.',
    points: 10,
    order: 1,
    difficulty: 'easy',
  },
  {
    category: 'all',
    type: 'yesno',
    question:
      'Do you have emergency contact numbers written down (not just saved in phone)?',
    options: [
      {
        id: 'yes',
        text: 'Yes, written and accessible',
        correct: true,
        points: 10,
      },
      { id: 'partial', text: 'Only in phone', correct: false, points: 5 },
      { id: 'no', text: 'No written copy', correct: false, points: 0 },
    ],
    explanation:
      'Phones can die or get damaged. Always have physical copies of emergency contacts.',
    points: 10,
    order: 2,
    difficulty: 'easy',
  },
  {
    category: 'all',
    type: 'multiple',
    question:
      'How much water should you store per person per day in an emergency kit?',
    options: [
      { id: 'a', text: '1 liter', correct: false, points: 0 },
      { id: 'b', text: '2 liters', correct: false, points: 0 },
      { id: 'c', text: '3-4 liters', correct: true, points: 10 },
      { id: 'd', text: '5 liters', correct: false, points: 0 },
    ],
    explanation:
      'Store at least 3-4 liters per person per day. Have enough for minimum 3 days.',
    points: 10,
    order: 3,
    difficulty: 'medium',
  },
];
