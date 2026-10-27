// Fictional demo data only. Replace via src/services when a real backend exists.
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export type Category = "Commercial" | "Residential" | "Common";
export type Status = "Completed" | "In Progress";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: Category;
  status: Status;
  location: string;
  landArea: number;
  buildingArea: number;
  year: number;
  description: string;
  images: string[];
  isPublic: boolean;
}

export const seedProjects: Project[] = [
  { id: "1", slug: "rumah-teduh", title: "Rumah Teduh", category: "Residential", status: "Completed", location: "Bintaro, Tangerang", landArea: 420, buildingArea: 310, year: 2024, description: "A family house organised around a shaded courtyard. Deep overhangs and timber screens temper the tropical sun while long sightlines connect every room to the garden.", images: [p1, p3, p4], isPublic: true },
  { id: "2", slug: "kantor-garis", title: "Kantor Garis", category: "Commercial", status: "Completed", location: "Kuningan, Jakarta", landArea: 1200, buildingArea: 4800, year: 2023, description: "A six-storey office with a rhythm of vertical fins that filter western light and give the street a calm, ordered face.", images: [p2, p3, p1], isPublic: true },
  { id: "3", slug: "omah-sunyi", title: "Omah Sunyi", category: "Residential", status: "In Progress", location: "Ubud, Bali", landArea: 800, buildingArea: 260, year: 2026, description: "A retreat of raw concrete and light, stepping down a terraced slope toward the river valley.", images: [p3, p1, p4], isPublic: true },
  { id: "4", slug: "balai-warga", title: "Balai Warga", category: "Common", status: "In Progress", location: "Depok, West Java", landArea: 950, buildingArea: 540, year: 2026, description: "A community pavilion with a breathing brick screen and a single light roof sheltering markets, gatherings and classes.", images: [p4, p2, p3], isPublic: true },
  { id: "5", slug: "studio-kemang", title: "Studio Kemang", category: "Commercial", status: "Completed", location: "Kemang, Jakarta", landArea: 300, buildingArea: 520, year: 2022, description: "A compact creative studio and gallery, its ground floor opening fully to the street.", images: [p2, p1], isPublic: true },
  { id: "6", slug: "rumah-batu", title: "Rumah Batu", category: "Residential", status: "Completed", location: "Bandung, West Java", landArea: 600, buildingArea: 380, year: 2021, description: "A stone-based house set into a cool hillside, with a timber upper level floating above.", images: [p1, p4], isPublic: true },
  { id: "7", slug: "taman-baca", title: "Taman Baca", category: "Common", status: "Completed", location: "Yogyakarta", landArea: 500, buildingArea: 220, year: 2023, description: "A neighbourhood reading garden: shelves, benches and shade in one continuous low structure.", images: [p4, p3], isPublic: true },
  { id: "8", slug: "pasar-pagi", title: "Pasar Pagi", category: "Commercial", status: "In Progress", location: "Surabaya, East Java", landArea: 2100, buildingArea: 3200, year: 2026, description: "A renewed morning market with cross-ventilated halls and a generous public forecourt.", images: [p2, p4], isPublic: true },
];
