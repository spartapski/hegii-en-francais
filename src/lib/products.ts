import toilet from "@/assets/smart-toilet.jpg";
import vanity from "@/assets/vanity.jpg";
import hero from "@/assets/hero-bathroom.jpg";
import bidet from "@/assets/bidet-seat.jpg";
import dark from "@/assets/banner-dark.jpg";

export type Product = { id: string; name: string; category: string; price: number; oldPrice?: number; img: string; badge?: string };
export const products: Product[] = [
  { id: "s1", name: "WC intelligent Série S1", category: "WC intelligents", price: 1290, oldPrice: 1590, img: toilet, badge: "-19 %" },
  { id: "s2", name: "WC suspendu Nocturne", category: "WC intelligents", price: 1890, img: dark, badge: "Nouveau" },
  { id: "b1", name: "Abattant lavant Douceur", category: "Abattants", price: 449, oldPrice: 529, img: bidet },
  { id: "v1", name: "Meuble vasque Pierre", category: "Meubles", price: 1150, img: vanity },
  { id: "h1", name: "Ensemble Harmonie", category: "Meubles", price: 2490, oldPrice: 2890, img: hero, badge: "Best-seller" },
  { id: "b2", name: "Abattant lavant Essentiel", category: "Abattants", price: 299, img: bidet },
];
export const formatPrice = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
