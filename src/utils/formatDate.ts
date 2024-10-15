export const formatDate = (date: string) => {
  const today = new Date(date);
  return today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
