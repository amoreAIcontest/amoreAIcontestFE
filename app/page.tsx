import SearchBar from './components/SearchBar';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
        <SearchBar />
      </div>
    </div>
  );
}
