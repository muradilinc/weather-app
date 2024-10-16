import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import { Form } from 'react-bootstrap';

interface Props {
  type: string;
  dates: string[];
  selectedDate: string;
  onDateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Компонент для выбора даты
export const DateSelector: React.FC<Props> = ({
  type,
  dates,
  selectedDate,
  onDateChange,
}) => (
  <Form.Select onChange={onDateChange} value={selectedDate} className="w-25">
    <option value="">
      {type === 'single' ? 'Выбрать другой день' : '5 дней'}
    </option>
    {dates.map((date) => (
      <option key={date} value={date}>
        {formatDate(date).split(',')[0]}
      </option>
    ))}
  </Form.Select>
);
