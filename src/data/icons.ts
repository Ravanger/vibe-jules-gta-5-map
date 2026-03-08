export const GROUP_META: Record<string, { color: string; path: string }> = {
  Locations:     { color: '#60a5fa', path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  Activities:    { color: '#fbbf24', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  Entertainment: { color: '#c084fc', path: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' },
  Services:      { color: '#34d399', path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  Collectibles:  { color: '#fb923c', path: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  Places:        { color: '#6ee7b7', path: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  Items:         { color: '#f472b6', path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  Quests:        { color: '#fde68a', path: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9' },
  Online:        { color: '#38bdf8', path: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9' },
  Other:         { color: '#94a3b8', path: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
  };

export const CATEGORY_ICONS: Record<string, string> = {
  // --- Locations ---
  'ammu_nation': 'M10 5l-2 2H3v9h6l2 5h2l-1-7h10V7H10V5z', // Pistol
  'clothing': 'M20.38 3.46L16 2a4 4 0 00-8 0L3.62 3.46a2 2 0 00-1.34 1.9l.58 14.12A2 2 0 004.85 21h14.3a2 2 0 002-1.52l.58-14.12a2 2 0 00-1.35-1.9z', // T-shirt
  'atm': 'M4 10H20M4 14H20M4 18H20M9 22H15M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z', // ATM
  'convenience_store': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm7 11V14h4v6h4V9l-8-6.22L4 9v11h6z', // Store/Home
  'food_drink': 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z', // Cup
  'automotive_shop': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z', // Wrench
  'barber': 'M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm5 3v4m4-4v4m4-4v4', // Barber pole style
  'tattoo': 'M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z', // Star (common for tattoo)

  // --- Activities ---
  'darts': 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-10l-2 2m2-2l2 2m-2-2l2-2m-2 2l-2-2', // Target
  'flight_school': 'M22 12l-4-4v3H6.83l2.58-2.59L8 7l-5 5 5 5 1.41-1.41L6.83 13H18v3l4-4z', // Plane/Aero
  'golfing': 'M18 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7 19.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zM17 8l-7 12', // Golf
  'hunting': 'M12 12l8-8m-8 8l-8-8m8 8v9', // Bow/Crosshair
  'parachuting': 'M12 2c5.52 0 10 4.48 10 10v1l-2 4-8 5-8-5-2-4v-1c0-5.52 4.48-10 10-10z', // Parachute
  'races': 'M3 21l18-18M3 8l5 5M13 18l5 5', // Flags/Finish
  'shooting': 'M10 5l-2 2H3v9h6l2 5h2l-1-7h10V7H10V5z', // Pistol (shared with ammu_nation)
  'tennis': 'M12 12a6 6 0 100-12 6 6 0 000 12zm0 10a2 2 0 100-4 2 2 0 000 4z', // Tennis ball
  'triathlon': 'M12 2l-2 5h4l-2-5zM4 14h16l-2 6H6l-2-6z', // Triathlon-ish
  'yoga': 'M12 21a9 9 0 110-18 9 9 0 010 18zm0-15v6l4 2', // Zen/Timer

  // --- Entertainment ---
  'cinema': 'M2 8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm4 0v8m12-8v8M10 8l4 4-4 4V8z', // Film/Play
  'strip_club': 'M12 22a2 2 0 100-4 2 2 0 000 4zm0-20v14m-4-7h8', // Pole

  // --- Services ---
  'car_wash': 'M19 11V6a2 2 0 00-2-2H7a2 2 0 00-2 2v5M2 11h20v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6zM6 11v4M10 11v4M14 11v4M18 11v4', // Car
  'fire_station': 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 14a4 4 0 110-8 4 4 0 010 8z', // Shield/Fire
  'hospital': 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z', // Plus
  'police_station': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // Shield

  // --- Collectibles ---
  'action_figure': 'M12 4a4 4 0 100 8 4 4 0 000-8zM6 10l-2 2v6h16v-6l-2-2', // Figure
  'epsilon_tract': 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V5H6.5A2.5 2.5 0 004 7.5v12z', // Book
  'hidden_package': 'M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7ZM16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7', // Briefcase
  'knife_flight': 'M12 2L15 5L22 5L22 12L19 15L12 15L12 22L9 19L2 19L2 12L5 9L5 2L12 2Z', // Plane/Knife
  'letter_scrap': 'M3 8L12 13L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z', // Envelope
  'monkey_mosaic': 'M9 11A3 3 0 1015 11 3 3 0 109 11M5 19H19V21H5V19Z', // Monkey/Human
  'nuclear_waste': 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0zM12 7v5l3 3', // Hazard/Droplet
  'peyote_plant': 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8V8.01', // Plant/Circle
  'playing_card': 'M4 4H20V20H4V4ZM9 9V11H11V9H9ZM13 13V15H15V13H13ZM13 9V11H15V9H13ZM9 13V15H11V13H9Z', // Card
  'spaceship_part': 'M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12', // Spaceship-y
  'strangers_freaks': 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 7l0 5l3 3', // Question/Time
  'stunt_location': 'M13 2L3 14H12V22L22 10H13V2Z', // Bolt
  'submarine_part': 'M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93', // Sub/Radar
  'under_the_bridge': 'M3 11L12 2L21 11M5 11V20H19V11', // Bridge/Arch
  'signal_jammer': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // Shield (Shared)
  'ld_organics_product': 'M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z', // Leaf/Star (Shared)

  // --- Places ---
  'building': 'M3 21h18M9 21V9l3-3 3 3v12', // Building
  'lookout_point': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11 3a3 3 0 100-6 3 3 0 000 6z', // Eye
  'mountain_peak': 'M2 20L12 4l10 16H2z', // Mountain
  'property': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z', // House

  // --- Items ---
  'body_armor': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // Shield (Shared)
  'health_pack': 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z', // Plus (Shared)
  'vehicle_spawn': 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 001 14v2c0 .6.4 1 1 1h2m10 0a2 2 0 104 0 2 2 0 00-4 0zM5 17a2 2 0 104 0 2 2 0 00-4 0z', // Car
  'weapon_pickup': 'M10 5l-2 2H3v9h6l2 5h2l-1-7h10V7H10V5z', // Pistol (Shared)

  // --- Quests ---
  'gang_attack': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Star
  'lenny_avery_realty': 'M3 21h18M3 7l9-4 9 4v14H3V7zm10 4h4v4h-4v-4z', // Real Estate
  'mission': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Star (Shared)
  'random_event': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Star (Shared)

  // --- Online ---
  'apartment': 'M3 21h18M9 21V9l3-3 3 3v12', // Building (Shared)
  'bunker': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // Shield/Fort
  'business': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', // User/CEO
  'clothing_scrap': 'M20.38 3.46L16 2a4 4 0 00-8 0L3.62 3.46a2 2 0 00-1.34 1.9l.58 14.12A2 2 0 004.85 21h14.3a2 2 0 002-1.52l.58-14.12a2 2 0 00-1.35-1.9z', // T-shirt (Shared)
  'clubhouse': 'M12 2L2 7v10l10 5 10-5V7L12 2z', // Shield/Hex
  'executive_office': 'M3 21h18M9 21V9l3-3 3 3v12', // Building (Shared)
  'exotic_export': 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 001 14v2c0 .6.4 1 1 1h2m10 0a2 2 0 104 0 2 2 0 00-4 0zM5 17a2 2 0 104 0 2 2 0 00-4 0z', // Car (Shared)
  'facility': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // Shield (Shared)
  'garage': 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 001 14v2c0 .6.4 1 1 1h2m10 0a2 2 0 104 0 2 2 0 00-4 0zM5 17a2 2 0 104 0 2 2 0 00-4 0z', // Car (Shared)
  'hanger': 'M12 2L2 7v10l10 5 10-5V7L12 2z', // Shield/Hex (Shared)
  'nightclub': 'M12 22a9 9 0 110-18 9 9 0 010 18zm0-15v6l4 2', // Zen/Disc
  'warehouse': 'M3 21h18M9 21V9l3-3 3 3v12', // Building (Shared)

  // --- Other ---
  'easter_egg': 'M12 22a10 10 0 100-20 10 10 0 000 20z', // Egg/Circle
  'miscellaneous': 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z', // Dots
};
