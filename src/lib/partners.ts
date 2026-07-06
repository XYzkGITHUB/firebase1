/**
 * @fileOverview Defines the list of partner companies and their logos.
 */

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const PARTNERS: Partner[] = [
  { id: 'p1', name: "Tile Time", logo: "/imgs/Partners/tile-time.png" },
  { id: 'p2', name: "Invest Ceramic", logo: "/imgs/Partners/invest-ceramic.png" },
  { id: 'p3', name: "Global Logistics", logo: "/imgs/Partners/global-logistics.png" },
  { id: 'p4', name: "India Tiles", logo: "/imgs/Partners/india-tiles.png" },
  { id: 'p5', name: "China Decor", logo: "/imgs/Partners/china-decor.png" },
  { id: 'p6', name: "Euro Santehnika", logo: "/imgs/Partners/euro-santehnika.png" },
  { id: 'p7', name: "SPS Pro", logo: "/imgs/Partners/sps-pro.png" },
  { id: 'p8', name: "Premium Keramika", logo: "/imgs/Partners/premium-keramika.png" },
];
