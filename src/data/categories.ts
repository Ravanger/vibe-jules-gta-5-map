import type { CategoryDefinition, MarkerData } from "../types";

import ammuNationLocations from "./locations/ammu_nation.json";
import atmLocations from "./locations/atm.json";
import automotiveShopLocations from "./locations/automotive_shop.json";
import barberLocations from "./locations/barber.json";
import clothingLocations from "./locations/clothing.json";
import convenienceStoreLocations from "./locations/convenience_store.json";
import foodDrinkLocations from "./locations/food_drink.json";
import tattooLocations from "./locations/tattoo.json";
import dartsActivities from "./activities/darts.json";
import flightSchoolActivities from "./activities/flight_school.json";
import golfingActivities from "./activities/golfing.json";
import huntingActivities from "./activities/hunting.json";
import parachutingActivities from "./activities/parachuting.json";
import racesActivities from "./activities/races.json";
import shootingActivities from "./activities/shooting.json";
import tennisActivities from "./activities/tennis.json";
import triathlonActivities from "./activities/triathlon.json";
import yogaActivities from "./activities/yoga.json";
import cinemaEntertainment from "./entertainment/cinema.json";
import stripClubEntertainment from "./entertainment/strip_club.json";
import carWashServices from "./services/car_wash.json";
import fireStationServices from "./services/fire_station.json";
import hospitalServices from "./services/hospital.json";
import policeStationServices from "./services/police_station.json";
import actionFigureCollectibles from "./collectibles/action_figure.json";
import epsilonTractCollectibles from "./collectibles/epsilon_tract.json";
import hiddenPackageCollectibles from "./collectibles/hidden_package.json";
import knifeFlightCollectibles from "./collectibles/knife_flight.json";
import letterScrapCollectibles from "./collectibles/letter_scrap.json";
import monkeyMosaicCollectibles from "./collectibles/monkey_mosaic.json";
import nuclearWasteCollectibles from "./collectibles/nuclear_waste.json";
import peyotePlantCollectibles from "./collectibles/peyote_plant.json";
import playingCardCollectibles from "./collectibles/playing_card.json";
import spaceshipPartCollectibles from "./collectibles/spaceship_part.json";
import strangersFreaksCollectibles from "./collectibles/strangers_freaks.json";
import stuntLocationCollectibles from "./collectibles/stunt_location.json";
import submarinePartCollectibles from "./collectibles/submarine_part.json";
import underTheBridgeCollectibles from "./collectibles/under_the_bridge.json";
import buildingPlaces from "./places/building.json";
import lookoutPointPlaces from "./places/lookout_point.json";
import mountainPeakPlaces from "./places/mountain_peak.json";
import propertyPlaces from "./places/property.json";
import bodyArmorItems from "./items/body_armor.json";
import healthPackItems from "./items/health_pack.json";
import vehicleSpawnItems from "./items/vehicle_spawn.json";
import weaponPickupItems from "./items/weapon_pickup.json";
import gangAttackQuests from "./quests/gang_attack.json";
import lennyAveryRealtyQuests from "./quests/lenny_avery_realty.json";
import missionQuests from "./quests/mission.json";
import randomEventQuests from "./quests/random_event.json";
import apartmentOnline from "./online/apartment.json";
import bunkerOnline from "./online/bunker.json";
import businessOnline from "./online/business.json";
import clothingScrapOnline from "./online/clothing_scrap.json";
import clubhouseOnline from "./online/clubhouse.json";
import executiveOfficeOnline from "./online/executive_office.json";
import exoticExportOnline from "./online/exotic_export.json";
import facilityOnline from "./online/facility.json";
import garageOnline from "./online/garage.json";
import hangerOnline from "./online/hanger.json";
import nightclubOnline from "./online/nightclub.json";
import peyotePlantOnline from "./collectibles/peyote_plant_online.json";
import signalJammerCollectibles from "./collectibles/signal_jammer.json";
import warehouseOnline from "./online/warehouse.json";
import easterEggOther from "./other/easter_egg.json";
import ldOrganicsProductCollectibles from "./collectibles/ld_organics_product.json";
import miscellaneousOther from "./other/miscellaneous.json";

export const locations: CategoryDefinition[] = [
  {
    id: "ammu_nation",
    name: "Ammu-Nation",
    group: "Locations",
    iconId: "ammu_nation",
    markers: ammuNationLocations as MarkerData[],
    visible: true
  },
  {
    id: "atm",
    name: "ATM",
    group: "Locations",
    iconId: "atm",
    markers: atmLocations as MarkerData[],
    visible: false
  },
  {
    id: "automotive_shop",
    name: "Automotive Shop",
    group: "Locations",
    iconId: "automotive_shop",
    markers: automotiveShopLocations as MarkerData[],
    visible: false
  },
  {
    id: "barber",
    name: "Barber",
    group: "Locations",
    iconId: "barber",
    markers: barberLocations as MarkerData[],
    visible: false
  },
  {
    id: "clothing",
    name: "Clothing",
    group: "Locations",
    iconId: "clothing",
    markers: clothingLocations as MarkerData[],
    visible: false
  },
  {
    id: "convenience_store",
    name: "Convenience Store",
    group: "Locations",
    iconId: "convenience_store",
    markers: convenienceStoreLocations as MarkerData[],
    visible: false
  },
  {
    id: "food_drink",
    name: "Food & Drink",
    group: "Locations",
    iconId: "food_drink",
    markers: foodDrinkLocations as MarkerData[],
    visible: false
  },
  {
    id: "tattoo",
    name: "Tattoo",
    group: "Locations",
    iconId: "tattoo",
    markers: tattooLocations as MarkerData[],
    visible: false
  }
];

export const activities: CategoryDefinition[] = [
  {
    id: "darts",
    name: "Darts",
    group: "Activities",
    iconId: "darts",
    markers: dartsActivities as MarkerData[],
    visible: false
  },
  {
    id: "flight_school",
    name: "Flight School",
    group: "Activities",
    iconId: "flight_school",
    markers: flightSchoolActivities as MarkerData[],
    visible: false
  },
  {
    id: "golfing",
    name: "Golfing",
    group: "Activities",
    iconId: "golfing",
    markers: golfingActivities as MarkerData[],
    visible: false
  },
  {
    id: "hunting",
    name: "Hunting",
    group: "Activities",
    iconId: "hunting",
    markers: huntingActivities as MarkerData[],
    visible: false
  },
  {
    id: "parachuting",
    name: "Parachuting",
    group: "Activities",
    iconId: "parachuting",
    markers: parachutingActivities as MarkerData[],
    visible: false
  },
  {
    id: "races",
    name: "Races",
    group: "Activities",
    iconId: "races",
    markers: racesActivities as MarkerData[],
    visible: false
  },
  {
    id: "shooting",
    name: "Shooting",
    group: "Activities",
    iconId: "ammu_nation",
    markers: shootingActivities as MarkerData[],
    visible: false
  },
  {
    id: "tennis",
    name: "Tennis",
    group: "Activities",
    iconId: "tennis",
    markers: tennisActivities as MarkerData[],
    visible: false
  },
  {
    id: "triathlon",
    name: "Triathlon",
    group: "Activities",
    iconId: "triathlon",
    markers: triathlonActivities as MarkerData[],
    visible: false
  },
  {
    id: "yoga",
    name: "Yoga",
    group: "Activities",
    iconId: "yoga",
    markers: yogaActivities as MarkerData[],
    visible: false
  }
];

export const entertainment: CategoryDefinition[] = [
  {
    id: "cinema",
    name: "Cinema",
    group: "Entertainment",
    iconId: "cinema",
    markers: cinemaEntertainment as MarkerData[],
    visible: false
  },
  {
    id: "strip_club",
    name: "Strip Club",
    group: "Entertainment",
    iconId: "strip_club",
    markers: stripClubEntertainment as MarkerData[],
    visible: false
  }
];

export const services: CategoryDefinition[] = [
  {
    id: "car_wash",
    name: "Car Wash",
    group: "Services",
    iconId: "car_wash",
    markers: carWashServices as MarkerData[],
    visible: false
  },
  {
    id: "fire_station",
    name: "Fire Station",
    group: "Services",
    iconId: "fire_station",
    markers: fireStationServices as MarkerData[],
    visible: false
  },
  {
    id: "hospital",
    name: "Hospital",
    group: "Services",
    iconId: "hospital",
    markers: hospitalServices as MarkerData[],
    visible: false
  },
  {
    id: "police_station",
    name: "Police Station",
    group: "Services",
    iconId: "police_station",
    markers: policeStationServices as MarkerData[],
    visible: false
  }
];

export const collectibles: CategoryDefinition[] = [
  {
    id: "action_figure",
    name: "Action Figure",
    group: "Collectibles",
    iconId: "action_figure",
    markers: actionFigureCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "epsilon_tract",
    name: "Epsilon Tract",
    group: "Collectibles",
    iconId: "epsilon_tract",
    markers: epsilonTractCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "hidden_package",
    name: "Hidden Package",
    group: "Collectibles",
    iconId: "hidden_package",
    markers: hiddenPackageCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "knife_flight",
    name: "Knife Flight",
    group: "Collectibles",
    iconId: "knife_flight",
    markers: knifeFlightCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "ld_organics_product",
    name: "LD Organics Product",
    group: "Collectibles",
    iconId: "ld_organics_product",
    markers: ldOrganicsProductCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "letter_scrap",
    name: "Letter Scrap",
    group: "Collectibles",
    iconId: "letter_scrap",
    markers: letterScrapCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "monkey_mosaic",
    name: "Monkey Mosaic",
    group: "Collectibles",
    iconId: "monkey_mosaic",
    markers: monkeyMosaicCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "nuclear_waste",
    name: "Nuclear Waste",
    group: "Collectibles",
    iconId: "nuclear_waste",
    markers: nuclearWasteCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "peyote_plant",
    name: "Peyote Plant",
    group: "Collectibles",
    iconId: "peyote_plant",
    markers: peyotePlantCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "peyote_plant_online",
    name: "Peyote Plant - Online",
    group: "Collectibles",
    iconId: "peyote_plant",
    markers: peyotePlantOnline as MarkerData[],
    visible: false
  },
  {
    id: "playing_card",
    name: "Playing Card",
    group: "Collectibles",
    iconId: "playing_card",
    markers: playingCardCollectibles as MarkerData[],
    visible: true
  },
  {
    id: "signal_jammer",
    name: "Signal Jammer",
    group: "Collectibles",
    iconId: "signal_jammer",
    markers: signalJammerCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "spaceship_part",
    name: "Spaceship Part",
    group: "Collectibles",
    iconId: "spaceship_part",
    markers: spaceshipPartCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "strangers_freaks",
    name: "Strangers & Freaks",
    group: "Collectibles",
    iconId: "strangers_freaks",
    markers: strangersFreaksCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "stunt_location",
    name: "Stunt Location",
    group: "Collectibles",
    iconId: "stunt_location",
    markers: stuntLocationCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "submarine_part",
    name: "Submarine Part",
    group: "Collectibles",
    iconId: "submarine_part",
    markers: submarinePartCollectibles as MarkerData[],
    visible: false
  },
  {
    id: "under_the_bridge",
    name: "Under The Bridge",
    group: "Collectibles",
    iconId: "under_the_bridge",
    markers: underTheBridgeCollectibles as MarkerData[],
    visible: false
  }
];

export const places: CategoryDefinition[] = [
  {
    id: "building",
    name: "Building",
    group: "Places",
    iconId: "building",
    markers: buildingPlaces as MarkerData[],
    visible: false
  },
  {
    id: "lookout_point",
    name: "Lookout Point",
    group: "Places",
    iconId: "lookout_point",
    markers: lookoutPointPlaces as MarkerData[],
    visible: false
  },
  {
    id: "mountain_peak",
    name: "Mountain Peak",
    group: "Places",
    iconId: "mountain_peak",
    markers: mountainPeakPlaces as MarkerData[],
    visible: false
  },
  {
    id: "property",
    name: "Property",
    group: "Places",
    iconId: "property",
    markers: propertyPlaces as MarkerData[],
    visible: false
  }
];

export const items: CategoryDefinition[] = [
  {
    id: "body_armor",
    name: "Body Armor",
    group: "Items",
    iconId: "body_armor",
    markers: bodyArmorItems as MarkerData[],
    visible: false
  },
  {
    id: "health_pack",
    name: "Health Pack",
    group: "Items",
    iconId: "health_pack",
    markers: healthPackItems as MarkerData[],
    visible: false
  },
  {
    id: "vehicle_spawn",
    name: "Vehicle Spawn",
    group: "Items",
    iconId: "vehicle_spawn",
    markers: vehicleSpawnItems as MarkerData[],
    visible: false
  },
  {
    id: "weapon_pickup",
    name: "Weapon Pickup",
    group: "Items",
    iconId: "ammu_nation",
    markers: weaponPickupItems as MarkerData[],
    visible: false
  }
];

export const quests: CategoryDefinition[] = [
  {
    id: "gang_attack",
    name: "Gang Attack",
    group: "Quests",
    iconId: "gang_attack",
    markers: gangAttackQuests as MarkerData[],
    visible: false
  },
  {
    id: "lenny_avery_realty",
    name: "Lenny Avery Realty",
    group: "Quests",
    iconId: "lenny_avery_realty",
    markers: lennyAveryRealtyQuests as MarkerData[],
    visible: false
  },
  {
    id: "mission",
    name: "Mission",
    group: "Quests",
    iconId: "mission",
    markers: missionQuests as MarkerData[],
    visible: false
  },
  {
    id: "random_event",
    name: "Random Event",
    group: "Quests",
    iconId: "random_event",
    markers: randomEventQuests as MarkerData[],
    visible: false
  }
];

export const online: CategoryDefinition[] = [
  {
    id: "apartment",
    name: "Apartment",
    group: "Online",
    iconId: "building",
    markers: apartmentOnline as MarkerData[],
    visible: false
  },
  {
    id: "bunker",
    name: "Bunker",
    group: "Online",
    iconId: "bunker",
    markers: bunkerOnline as MarkerData[],
    visible: false
  },
  {
    id: "business",
    name: "Business",
    group: "Online",
    iconId: "business",
    markers: businessOnline as MarkerData[],
    visible: false
  },
  {
    id: "clothing_scrap",
    name: "Clothing Scrap",
    group: "Online",
    iconId: "clothing",
    markers: clothingScrapOnline as MarkerData[],
    visible: false
  },
  {
    id: "clubhouse",
    name: "Clubhouse",
    group: "Online",
    iconId: "clubhouse",
    markers: clubhouseOnline as MarkerData[],
    visible: false
  },
  {
    id: "executive_office",
    name: "Executive Office",
    group: "Online",
    iconId: "building",
    markers: executiveOfficeOnline as MarkerData[],
    visible: false
  },
  {
    id: "exotic_export",
    name: "Exotic Export",
    group: "Online",
    iconId: "vehicle_spawn",
    markers: exoticExportOnline as MarkerData[],
    visible: false
  },
  {
    id: "facility",
    name: "Facility",
    group: "Online",
    iconId: "bunker",
    markers: facilityOnline as MarkerData[],
    visible: false
  },
  {
    id: "garage",
    name: "Garage",
    group: "Online",
    iconId: "vehicle_spawn",
    markers: garageOnline as MarkerData[],
    visible: false
  },
  {
    id: "hanger",
    name: "Hanger",
    group: "Online",
    iconId: "clubhouse",
    markers: hangerOnline as MarkerData[],
    visible: false
  },
  {
    id: "nightclub",
    name: "Nightclub",
    group: "Online",
    iconId: "nightclub",
    markers: nightclubOnline as MarkerData[],
    visible: false
  },
  {
    id: "warehouse",
    name: "Warehouse",
    group: "Online",
    iconId: "building",
    markers: warehouseOnline as MarkerData[],
    visible: false
  }
];

export const other: CategoryDefinition[] = [
  {
    id: "easter_egg",
    name: "Easter Egg",
    group: "Other",
    iconId: "easter_egg",
    markers: easterEggOther as MarkerData[],
    visible: false
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    group: "Other",
    iconId: "miscellaneous",
    markers: miscellaneousOther as MarkerData[],
    visible: false
  }
];

export const categories: CategoryDefinition[] = [
  ...locations,
  ...activities,
  ...entertainment,
  ...services,
  ...collectibles,
  ...places,
  ...items,
  ...quests,
  ...online,
  ...other,
];
