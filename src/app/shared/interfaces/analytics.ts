export interface GEvent {
  action?: string;
  category?: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
}

export interface GEventTiming {
  name: string;
  value: string | number;
  category?: string;
  label?: string;
}

export interface GEventException {
  description: string;
  fatal?: boolean;
}

export interface GEventUserID {
  id: string;
}

export interface GEventViewPromotion {
  id?: number;
  name: string;
}

export interface GEventViewItem {
  id: number;
  name: string;
  list_name?: string;
  brand?: string;
  category?: string;
  variant?: string;
  list_position?: number;
  quantity?: number;
  price?: number;
}

export interface GEventPurchase {
  transaction_id: string;
  affiliation: 'Paypal';
  value: number;
  currency: 'EUR' | 'USD';
  tax?: number;
  shipping?: number;
  items: GEventViewItem[];
}
