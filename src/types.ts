import { Category } from './constants';
export type { Category };

export interface WorkerProfile {
  id?: string;
  uid: string;
  name: string;
  mobile: string;
  category: Category;
  skills: string;
  pincode: string;
  village: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
}

export interface SearchFilters {
  category: Category | '';
  keyword: string;
}

export type TargetLevel = 'India' | 'State' | 'District' | 'Tehsil';
export type AdPlan = 7 | 15 | 30;
export type AdType = 'Local' | 'Corporate';

export interface PendingAd {
  id?: string;
  uid: string;
  text: string;
  image: string; // base64
  adType: AdType;
  websiteUrl?: string;
  targetLevel: TargetLevel;
  targetValue: string; // e.g., "Rajasthan" or "Global"
  plan: AdPlan;
  price: number;
  paymentScreenshot: string; // base64
  status: 'pending' | 'active' | 'expired';
  createdAt: string;
}

export interface ActiveBanner extends PendingAd {
  expiryDate: string;
}

export interface AdStats {
  adId: string;
  views_count: number;
  click_count: number;
  call_action_count: number;
  daily_stats: {
    [date: string]: {
      views: number;
      clicks: number;
      calls: number;
    };
  };
  lastUpdated: string;
}

export interface AdRequest {
  id?: string;
  name: string;
  mobile: string;
  message: string;
  createdAt: string;
}
