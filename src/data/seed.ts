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

export type DemoRole = "Guest" | "Client Demo" | "Internal Demo";
export type InvoiceStatus = "Unpaid" | "Pending Review" | "Paid";
export interface DemoInvoice {
  id: string;
  number: string;
  title: string;
  amount: number;
  due: string;
  status: InvoiceStatus;
  proof?: string;
}

export const seedClientPortal = {
  projectId: "3",
  client: "Dewi & Arif Santoso",
  lead: "Rana Pradipta",
  progress: 62,
  nextMilestone: "Roof & enclosure · 12 November 2026",
  milestones: [
    { title: "Brief & site study", date: "12 May 2026", status: "Completed", note: "Site survey and family brief agreed." },
    { title: "Concept design", date: "18 June 2026", status: "Completed", note: "Courtyard layout and material palette approved." },
    { title: "Technical drawings", date: "24 July 2026", status: "Completed", note: "Construction drawing set issued." },
    { title: "Structure & masonry", date: "27 October 2026", status: "In Progress", note: "Upper-level structure complete; masonry underway." },
    { title: "Roof & enclosure", date: "12 November 2026", status: "Upcoming", note: "Roof installation and window frames." },
    { title: "Interior & handover", date: "18 February 2027", status: "Upcoming", note: "Finishes, final inspection and handover." },
  ],
  reports: [
    { id: "r1", date: "27 October 2026", title: "Masonry and opening checks", note: "Courtyard wall masonry is 80% complete. Window openings checked against the approved drawings. Roof delivery scheduled for next week.", imageIndex: 0, caption: "Illustrative design reference — not a site photograph" },
    { id: "r2", date: "20 October 2026", title: "Upper-level structure complete", note: "Concrete works inspected. The next site meeting will review roof connections and external drainage.", imageIndex: 1, caption: "Illustrative design reference — not a site photograph" },
  ],
  designs: [
    { id: "d1", title: "Courtyard perspective", revision: "Concept · Revision 03", imageIndex: 0 },
    { id: "d2", title: "Garden & living spaces", revision: "Concept · Revision 02", imageIndex: 1 },
    { id: "d3", title: "Material & light study", revision: "Design development · Revision 01", imageIndex: 2 },
  ],
  documents: [
    { id: "doc1", title: "Architectural drawing set", kind: "Drawing", revision: "Rev. 04 · 24 July 2026", content: "Sample drawing register: site plan, ground-floor plan, upper-floor plan, sections and elevations. Issued for coordination only. No actual drawing file is attached." },
    { id: "doc2", title: "Design agreement", kind: "Agreement", revision: "Rev. 01 · 12 May 2026", content: "Fictional agreement summary: architecture design and site supervision for Omah Sunyi. This sample has no legal effect and contains no signatures or private records." },
    { id: "doc3", title: "Finish schedule", kind: "Schedule", revision: "Rev. 02 · 18 October 2026", content: "Sample finishes: exposed concrete walls, sustainably sourced timber screens and natural stone flooring. All specifications are illustrative." },
  ],
  materials: [
    { item: "Timber screens", spec: "Reclaimed teak · natural oil", quantity: "48 m²", status: "Approved" },
    { item: "Stone flooring", spec: "Andesite · honed finish", quantity: "120 m²", status: "Ordered" },
    { item: "Window frames", spec: "Powder-coated aluminium", quantity: "18 sets", status: "In review" },
    { item: "Roof panels", spec: "Standing seam · charcoal", quantity: "210 m²", status: "Ordered" },
    { item: "Wall finish", spec: "Mineral lime wash", quantity: "340 m²", status: "Approved" },
  ],
  invoices: [
    { id: "inv1", number: "AR-2026-041", title: "01 · Design retainer", amount: 45000000, due: "12 May 2026", status: "Paid" },
    { id: "inv2", number: "AR-2026-067", title: "02 · Technical design", amount: 65000000, due: "24 July 2026", status: "Paid" },
    { id: "inv3", number: "AR-2026-092", title: "03 · Construction supervision", amount: 35000000, due: "5 November 2026", status: "Unpaid" },
    { id: "inv4", number: "AR-2027-008", title: "04 · Final handover", amount: 25000000, due: "18 February 2027", status: "Unpaid" },
  ] as DemoInvoice[],
};
