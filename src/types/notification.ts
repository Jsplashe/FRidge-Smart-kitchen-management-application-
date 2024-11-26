export interface Notification {
  id: string;
  type: 'low-stock' | 'expiring' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  itemId?: string;
}