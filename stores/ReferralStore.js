import { makeAutoObservable } from 'mobx';

class RecommendationStore {
  recommendations = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadRecommendations();
  }

  loadRecommendations() {
    // Example recommendations for demonstration
    this.recommendations = [
      {
        id: 1,
        name: 'Marko Novak',
        rating: 5,
        text: 'Odličan servis i profesionalan pristup. Kupio sam Rolex Submariner i sve je prošlo savršeno. Preporučujem svima!',
        location: 'Zagreb',
        createdAt: new Date('2024-01-10').toISOString()
      },
      {
        id: 2,
        name: 'Ana Horvat',
        rating: 5,
        text: 'Stručno osoblje koje zna svoj posao. Prodala sam svoj Omega sat po odličnoj cijeni. Hvala na transparentnosti!',
        location: 'Split',
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        id: 3,
        name: 'Petar Babić',
        rating: 4,
        text: 'Brza i efikasna usluga. Našli su mi točno sat koji sam tražio. Jedino što bi moglo biti bolje je dostava.',
        location: 'Osijek',
        createdAt: new Date('2023-12-20').toISOString()
      },
      {
        id: 4,
        name: 'Marija Jurić',
        rating: 5,
        text: 'Nevjerojatno iskustvo! Kupila sam Cartier sat za rođendan i sve je bilo savršeno organizirano.',
        location: 'Rijeka',
        createdAt: new Date('2024-01-20').toISOString()
      },
      {
        id: 5,
        name: 'Tomislav Kovač',
        rating: 5,
        text: 'Profesionalnost na najvišoj razini. Procjena mog Breitling sata bila je fer i točna.',
        location: 'Zadar',
        createdAt: new Date('2024-01-08').toISOString()
      }
    ];
  }

  addRecommendation(recommendationData) {
    const newRecommendation = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...recommendationData
    };
    this.recommendations.push(newRecommendation);
  }

  updateRecommendation(id, updates) {
    const index = this.recommendations.findIndex(recommendation => recommendation.id === id);
    if (index !== -1) {
      this.recommendations[index] = { ...this.recommendations[index], ...updates };
    }
  }

  deleteRecommendation(id) {
    this.recommendations = this.recommendations.filter(recommendation => recommendation.id !== id);
  }

  get latestRecommendations() {
    return this.recommendations
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }
}

export const referralStore = new RecommendationStore();