import "dotenv/config";
import { getDb } from "./src/db/client"; // adjust path if needed
import { tours } from "./src/db/schema";

async function seed() {
  const db = getDb();

  await db.insert(tours).values([
    {
      title: "Cape Coast & Elmina Slave Castles Tour",
      description:
        "A deeply moving journey through Ghana’s slave trade history with expert local guides.",
      itinerary:
        "Accra → Cape Coast Castle → Elmina Castle → Kakum canopy walkway → return to Accra.",
      price: "$120",
      duration: "1 Day",
      category: "Historical",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?cape-coast-castle",
      featured: true,
    },
    {
      title: "Kakum National Park Canopy Walk",
      description:
        "Experience the famous canopy walkway suspended above lush rainforest.",
      itinerary:
        "Accra → Kakum National Park → canopy walk → guided nature hike.",
      price: "$90",
      duration: "1 Day",
      category: "Nature",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?rainforest",
      featured: true,
    },
    {
      title: "Ashanti Kingdom Cultural Tour (Kumasi)",
      description:
        "Explore the rich traditions of the Ashanti Kingdom, including kente weaving and royal history.",
      itinerary:
        "Accra → Kumasi → Manhyia Palace → Kejetia Market → Bonwire kente village.",
      price: "$250",
      duration: "2 Days",
      category: "Cultural",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?kente",
      featured: true,
    },
    {
      title: "Mole National Park Safari Experience",
      description:
        "Ghana’s top safari destination with elephants, antelope, and birdlife.",
      itinerary:
        "Tamale → Mole National Park → walking safari → jeep safari → overnight stay.",
      price: "$400",
      duration: "3 Days",
      category: "Wildlife",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?safari",
      featured: false,
    },
    {
      title: "Wli Waterfalls & Mount Afadjato Adventure",
      description:
        "Visit West Africa’s highest waterfall and hike Ghana’s tallest mountain.",
      itinerary:
        "Accra → Hohoe → Wli Waterfalls → Mount Afadjato hike.",
      price: "$150",
      duration: "2 Days",
      category: "Nature",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?waterfall",
      featured: false,
    },
    {
      title: "Accra City Highlights Tour",
      description:
        "Discover Ghana’s capital through culture, history, and vibrant markets.",
      itinerary:
        "Kwame Nkrumah Mausoleum → Independence Square → Makola Market → Arts Centre.",
      price: "$70",
      duration: "1 Day",
      category: "City",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?accra",
      featured: true,
    },
    {
      title: "Elmina Fishing Village Experience",
      description:
        "Immerse yourself in coastal life with fishing communities and local cuisine.",
      itinerary:
        "Elmina harbor → fishing village walk → seafood tasting → cultural storytelling.",
      price: "$110",
      duration: "1 Day",
      category: "Cultural",
      country: "Ghana",
      imageUrl: "https://source.unsplash.com/featured/?fishing-village",
      featured: false,
    },
    {
      title: "Gorée Island Slave Route Tour",
      description:
        "A historic journey through Senegal’s slave trade past on Gorée Island.",
      itinerary:
        "Dakar → ferry → House of Slaves → guided historical tour.",
      price: "$200",
      duration: "1 Day",
      category: "Historical",
      country: "Senegal",
      imageUrl: "https://source.unsplash.com/featured/?goree-island",
      featured: false,
    },
  ]);

  console.log("✅ Seeded tours successfully");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});