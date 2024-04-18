import { useState } from 'react';
import ShowArtworks from '../ShowArtworks';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div style={{ width: '18rem', margin: '10px auto' }}>
        <input
          style={{ margin: '0px auto', display: 'block' }}
          type="text"
          className="input"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <ShowArtworks search={searchQuery} />
    </>
  );
}
