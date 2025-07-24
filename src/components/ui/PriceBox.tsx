import { getTimeAgo } from "../../utils/dateUtils";



interface PriceBoxProps {
  price: number;
  perMonth?: 'month' | 'year';
  label?: string;
  shortenedMonth?: boolean;
  timestamp?: number;
}

export const PriceBox = ({ price, perMonth, label, shortenedMonth, timestamp }: PriceBoxProps) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-3">
        <p className="text-2xl text-[rgb(var(--color-primary))] font-semibold">${price.toFixed(2)}</p>
        <p className="text-sm text-[rgb(var(--color-mono))] font-normal">/ { label ? label : (perMonth === 'month' ? (shortenedMonth ? 'mo' : 'month') : 'year')}</p>
      </div>
      {timestamp && (
        <p className="text-xs text-[rgb(var(--color-neutral))] font-normal">
          Retrieved {getTimeAgo(timestamp)}
        </p>
      )}
    </div>
  );
}
