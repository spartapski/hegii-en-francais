export const ORDER_STATUSES = ["open", "ordered", "confirmed", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const statusLabel: Record<OrderStatus, string> = {
  open: "Panier en cours",
  ordered: "En attente de confirmation",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export const statusClass: Record<OrderStatus, string> = {
  open: "bg-muted text-muted-foreground",
  ordered: "bg-primary text-primary-foreground",
  confirmed: "bg-info text-info-foreground",
  shipped: "bg-info/60 text-info-foreground",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

export const isOrderStatus = (s: string): s is OrderStatus => (ORDER_STATUSES as readonly string[]).includes(s);
