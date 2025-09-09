import { makeAutoObservable } from 'mobx';

class WatchStore {
  watches = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadWatches();
  }

  loadWatches() {
    // Example watches for demonstration
    this.watches = [
      {
        id: 1,
        name: 'Submariner Date',
        brand: 'Rolex',
        model: '116610LN',
        year: 2019,
        price: 12500,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Iconic diving watch with black dial and ceramic bezel',
        featured: true,
        referenceNumber: '116610LN',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '40mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Speedmaster Professional',
        brand: 'Omega',
        model: '311.30.42.30.01.005',
        year: 2020,
        price: 4200,
        condition: 'Vrlo dobro',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'The legendary moonwatch with manual winding movement',
        featured: true,
        referenceNumber: '311.30.42.30.01.005',
        hasBox: false,
        hasPapers: true,
        mechanism: 'Mehanički',
        caseDiameter: '42mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Hesalitno staklo',
        hasWarranty: false,
        isOnSale: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Navitimer 01',
        brand: 'Breitling',
        model: 'AB0120',
        year: 2018,
        price: 3800,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Aviation chronograph with slide rule bezel',
        featured: true,
        referenceNumber: 'AB0120',
        hasBox: true,
        hasPapers: false,
        mechanism: 'Automatski',
        caseDiameter: '46mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Santos de Cartier',
        brand: 'Cartier',
        model: 'WSSA0009',
        year: 2021,
        price: 6200,
        condition: 'Odličo',
        category: 'Ženski',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Elegant square case with Roman numerals',
        featured: true,
        referenceNumber: 'WSSA0009',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '35mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Big Bang Unico',
        brand: 'Hublot',
        model: '411.NM.1170.RX',
        year: 2019,
        price: 15800,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Bold titanium chronograph with skeleton dial',
        featured: true,
        referenceNumber: '411.NM.1170.RX',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '45mm',
        caseMaterial: 'Titanij',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 6,
        name: 'GMT-Master II',
        brand: 'Rolex',
        model: '116710BLNR',
        year: 2017,
        price: 18500,
        condition: 'Vrlo dobro',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Batman GMT with blue and black ceramic bezel',
        featured: false,
        referenceNumber: '116710BLNR',
        hasBox: false,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '40mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 7,
        name: 'Carrera Calibre 16',
        brand: 'TAG Heuer',
        model: 'CV201AH.BA0725',
        year: 2020,
        price: 1850,
        condition: 'Dobro',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Racing-inspired chronograph with tachymeter',
        featured: false,
        referenceNumber: 'CV201AH.BA0725',
        hasBox: true,
        hasPapers: false,
        mechanism: 'Kvarc',
        caseDiameter: '41mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 8,
        name: 'Seamaster Planet Ocean',
        brand: 'Omega',
        model: '215.30.44.21.01.001',
        year: 2019,
        price: 3200,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Professional diving watch with Co-Axial movement',
        featured: false,
        referenceNumber: '215.30.44.21.01.001',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '43.5mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 9,
        name: 'Datejust 36',
        brand: 'Rolex',
        model: '116234',
        year: 2016,
        price: 7800,
        condition: 'Vrlo dobro',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Classic dress watch with white gold fluted bezel',
        featured: false,
        referenceNumber: '116234',
        hasBox: false,
        hasPapers: false,
        mechanism: 'Automatski',
        caseDiameter: '36mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 10,
        name: 'Superocean Heritage',
        brand: 'Breitling',
        model: 'AB2010121B1S1',
        year: 2021,
        price: 2400,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Vintage-inspired diving watch with mesh bracelet',
        featured: false,
        referenceNumber: 'AB2010121B1S1',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '42mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 11,
        name: 'Tank Must',
        brand: 'Cartier',
        model: 'WSTA0041',
        year: 2022,
        price: 2800,
        condition: 'Odličo',
        category: 'Ženski',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Iconic rectangular case with solar movement',
        featured: false,
        referenceNumber: 'WSTA0041',
        hasBox: true,
        hasPapers: false,
        mechanism: 'Kvarc',
        caseDiameter: '29.5mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 12,
        name: 'Lange 1',
        brand: 'A. Lange & Söhne',
        model: '191.032',
        year: 2018,
        price: 28500,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'German haute horlogerie with asymmetric dial',
        featured: false,
        referenceNumber: '191.032',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Mehanički',
        caseDiameter: '38.5mm',
        caseMaterial: 'Bijelo zlato',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 13,
        name: 'Royal Oak',
        brand: 'Audemars Piguet',
        model: '15400ST.OO.1220ST.03',
        year: 2017,
        price: 32000,
        condition: 'Vrlo dobro',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Iconic octagonal bezel with integrated bracelet',
        featured: false,
        referenceNumber: '15400ST.OO.1220ST.03',
        hasBox: true,
        hasPapers: false,
        mechanism: 'Automatski',
        caseDiameter: '41mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 14,
        name: 'Calatrava',
        brand: 'Patek Philippe',
        model: '5196P-001',
        year: 2019,
        price: 45000,
        condition: 'Odličo',
        category: 'Muški',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Ultimate dress watch in platinum with hobnail bezel',
        featured: false,
        referenceNumber: '5196P-001',
        hasBox: true,
        hasPapers: true,
        mechanism: 'Mehanički',
        caseDiameter: '37mm',
        caseMaterial: 'Platina',
        glassType: 'Safirno staklo',
        hasWarranty: true,
        isOnSale: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 15,
        name: 'Monaco Calibre 11',
        brand: 'TAG Heuer',
        model: 'CAW211P.FC6356',
        year: 2020,
        price: 4200,
        condition: 'Odličo',
        category: 'Ostalo',
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Square chronograph worn by Steve McQueen',
        featured: false,
        referenceNumber: 'CAW211P.FC6356',
        hasBox: false,
        hasPapers: true,
        mechanism: 'Automatski',
        caseDiameter: '39mm',
        caseMaterial: 'Nehrđajući čelik',
        glassType: 'Safirno staklo',
        hasWarranty: false,
        isOnSale: false,
        createdAt: new Date().toISOString()
      }
    ];
  }

  addWatch(watchData) {
    const newWatch = {
      id: Date.now(),
      ...watchData,
      createdAt: new Date().toISOString()
    };
    this.watches.push(newWatch);
  }

  updateWatch(id, updates) {
    const index = this.watches.findIndex(watch => watch.id === id);
    if (index !== -1) {
      this.watches[index] = { ...this.watches[index], ...updates };
    }
  }

  deleteWatch(id) {
    this.watches = this.watches.filter(watch => watch.id !== id);
  }

  toggleFeatured(id) {
    const watch = this.watches.find(watch => watch.id === id);
    if (watch) {
      watch.featured = !watch.featured;
    }
  }

  get featuredWatches() {
    return this.watches.filter(watch => watch.featured);
  }

  get categories() {
    const cats = [...new Set(this.watches.map(watch => watch.category))];
    return ['All', ...cats];
  }

  getFilteredWatches(searchTerm = '', category = 'All') {
    return this.watches.filter(watch => {
      const matchesSearch = watch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           watch.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || watch.category === category;
      return matchesSearch && matchesCategory;
    });
  }
}

export const watchStore = new WatchStore();