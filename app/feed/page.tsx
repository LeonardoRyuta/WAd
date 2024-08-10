export default function Feed() {
  const ads = [
    { id: 1, title: 'Ad 1', thumbnail: 'https://via.placeholder.com/150', link: 'feed/1' },
    { id: 2, title: 'Ad 2', thumbnail: 'https://via.placeholder.com/150', link: 'feed/2' },
    { id: 3, title: 'Ad 3', thumbnail: 'https://via.placeholder.com/150', link: 'feed/3' },
    { id: 4, title: 'Ad 4', thumbnail: 'https://via.placeholder.com/150', link: 'feed/4' },
    { id: 5, title: 'Ad 5', thumbnail: 'https://via.placeholder.com/150', link: 'feed/5' },
    { id: 6, title: 'Ad 6', thumbnail: 'https://via.placeholder.com/150', link: 'feed/6' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Ad Feed</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ads.map(ad => (
          <a
            key={ad.id}
            href={ad.link}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
          >
            <img
              src={ad.thumbnail}
              alt={ad.title}
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-700">{ad.title}</h2>
              <p className="text-sm text-gray-500">Click to watch and earn rewards!</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}