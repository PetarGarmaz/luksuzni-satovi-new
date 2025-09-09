import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Catalogue = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-6">
          Kompletna Kolekcija Satova
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Istražite naš cjelokupni inventar luksuznih satova najuglednijih svjetskih proizvođača. 
          Svaki sat je pažljivo autentificiran i dolazi s našim jamstvom kvalitete.
        </p>
        <Link href="/prodaja-satova">
          <Button 
            className="text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#bd890f'}}
          >
            Pregledaj Cijeli Katalog
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Catalogue;