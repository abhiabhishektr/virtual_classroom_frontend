// src/components/Shared/Loader.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import '../../styles/loader.css';

const Loader = () => {
  const isLoading = useSelector((state: RootState) => state.profile.loading);
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader">
        <span className="loader-text">Loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loader;