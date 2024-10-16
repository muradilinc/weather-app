import { Spinner } from 'react-bootstrap';

export const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
