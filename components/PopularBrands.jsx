const PopularBrands = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-light text-gray-900 mb-8">Popularni Brendovi</h3>
        <p className="mb-8" style={{color: '#bd890f'}}>Odaberite brend koji želite pretražiti</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
          {[
            'Rolex', 'Patek Philippe', 'Breitling', 'Cartier', 
            'Tag Heuer', 'Hublot', 'A. Lange & Söhne', 'Audemars Piguet'
          ].map((brand) => (
            <button
              key={brand}
              className="p-3 text-sm text-gray-700 rounded-lg transition-colors duration-200 border border-gray-200"
              style={{
                '--hover-text-color': '#bd890f',
                '--hover-bg-color': '#bd890f20',
                '--hover-border-color': '#bd890f'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#bd890f';
                e.target.style.backgroundColor = '#bd890f20';
                e.target.style.borderColor = '#bd890f';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#374151';
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;