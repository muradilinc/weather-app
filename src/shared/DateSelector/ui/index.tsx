import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import { Form } from 'react-bootstrap';

interface Props {
  dates: string[];
  selectedDate: string;
  onDateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Компонент для выбора даты
export const DateSelector: React.FC<Props> = ({
  dates,
  selectedDate,
  onDateChange,
}) => (
  <Form.Select onChange={onDateChange} value={selectedDate} className="w-25">
    <option value="">Выбрать день</option>
    {dates.map((date) => (
      <option key={date} value={date}>
        {formatDate(date).split(',')[0]}
      </option>
    ))}
  </Form.Select>
);
