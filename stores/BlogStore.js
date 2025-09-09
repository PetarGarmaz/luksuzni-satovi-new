import { makeAutoObservable } from 'mobx';

class BlogStore {
  posts = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadPosts();
  }

  loadPosts() {
    // Example blog posts for demonstration
    this.posts = [
      {
        id: 1,
        title: 'Kako Prepoznati Originalni Rolex Sat',
        slug: 'kako-prepoznati-originalni-rolex-sat',
        excerpt: 'Naučite ključne znakove koji razlikuju originalni Rolex od falsifikata. Vodič za kupce luksuznih satova.',
        content: `
          <p>Kupnja Rolex sata je značajna investicija, stoga je ključno znati kako prepoznati originalni sat od falsifikata. Evo najvažnijih znakova na koje trebate obratiti pozornost:</p>
          
          <h3>1. Težina i Materijali</h3>
          <p>Originalni Rolex satovi izrađeni su od visokokvalitetnih materijala. Sat mora biti težak i čvrst u ruci. Falsifikati često koriste lakše metale.</p>
          
          <h3>2. Pokret Sekundne Kazaljke</h3>
          <p>Kod originalnog Rolex sata, sekundna kazaljka se kreće glatko, gotovo bez prekida. Falsifikati često imaju "tikajući" pokret.</p>
          
          <h3>3. Serijski Brojevi</h3>
          <p>Svaki originalni Rolex ima jedinstveni serijski broj ugraviraan između naušnica na 6 sati. Broj mora biti jasno čitljiv i duboko ugraviran.</p>
          
          <h3>4. Cyclops Leća</h3>
          <p>Datum na originalnom Rolex-u uvećan je 2.5 puta pomoću cyclops leće. Falsifikati često imaju slabije uvećanje.</p>
        `,
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
        author: 'Stručni Tim',
        publishedAt: new Date('2024-01-15').toISOString(),
        featured: true,
        tags: ['Rolex', 'Autentifikacija', 'Savjeti'],
        metaDescription: 'Vodič za prepoznavanje originalnih Rolex satova - ključni znakovi i savjeti za kupce luksuznih satova.'
      },
      {
        id: 2,
        title: 'Investiranje u Luksuzne Satove: Što Trebate Znati',
        slug: 'investiranje-u-luksuzne-satove',
        excerpt: 'Luksuzni satovi mogu biti odličnu investiciju. Saznajte koji brendovi i modeli najbolje zadržavaju vrijednost.',
        content: `
          <p>Luksuzni satovi nisu samo modni dodatak - mogu biti i pametna investicija. Evo što trebate znati o investiranju u satove:</p>
          
          <h3>Najbolji Brendovi za Investiciju</h3>
          <ul>
            <li><strong>Patek Philippe</strong> - Često se smatra najboljom investicijom</li>
            <li><strong>Rolex</strong> - Stabilna vrijednost i visoka potražnja</li>
            <li><strong>Audemars Piguet</strong> - Posebno Royal Oak modeli</li>
            <li><strong>A. Lange & Söhne</strong> - Njemačka preciznost</li>
          </ul>
          
          <h3>Faktori Koji Utječu na Vrijednost</h3>
          <p>Rijetkoća, stanje, kompletnost (kutija i papiri), te povijesni značaj modela ključni su faktori.</p>
        `,
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
        author: 'Marko Horvat',
        publishedAt: new Date('2024-01-10').toISOString(),
        featured: false,
        tags: ['Investicije', 'Patek Philippe', 'Rolex'],
        metaDescription: 'Vodič za investiranje u luksuzne satove - najbolji brendovi i modeli za investiciju.'
      },
      {
        id: 3,
        title: 'Održavanje Luksuznih Satova: Praktični Savjeti',
        slug: 'odrzavanje-luksuznih-satova',
        excerpt: 'Pravilno održavanje produžuje životni vijek vašeg luksuznog sata. Saznajte kako čuvati svoju investiciju.',
        content: `
          <p>Luksuzni sat je precizni instrument koji zahtijeva pravilno održavanje. Evo kako produžiti životni vijek vašeg sata:</p>
          
          <h3>Redovito Servisiranje</h3>
          <p>Preporučuje se servisiranje svakih 3-5 godina, ovisno o modelu i korištenju.</p>
          
          <h3>Čuvanje</h3>
          <p>Čuvajte sat u suhom mjestu, daleko od magnetskih polja i ekstremnih temperatura.</p>
          
          <h3>Čišćenje</h3>
          <p>Koristite meku krpu za čišćenje kućišta. Izbjegavajte kemikalije i abrazivne materijale.</p>
        `,
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
        author: 'Ana Petrović',
        publishedAt: new Date('2024-01-05').toISOString(),
        featured: true,
        tags: ['Održavanje', 'Savjeti', 'Servis'],
        metaDescription: 'Praktični savjeti za održavanje luksuznih satova - kako produžiti životni vijek vašeg sata.'
      }
    ];
  }

  addPost(postData) {
    const newPost = {
      id: Date.now(),
      slug: this.generateSlug(postData.title),
      publishedAt: new Date().toISOString(),
      ...postData
    };
    this.posts.unshift(newPost); // Add to beginning
  }

  updatePost(id, updates) {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts[index] = { 
        ...this.posts[index], 
        ...updates,
        slug: updates.title ? this.generateSlug(updates.title) : this.posts[index].slug
      };
    }
  }

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  toggleFeatured(id) {
    const post = this.posts.find(post => post.id === id);
    if (post) {
      post.featured = !post.featured;
    }
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[čć]/g, 'c')
      .replace(/[đ]/g, 'd')
      .replace(/[š]/g, 's')
      .replace(/[ž]/g, 'z')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  get latestPosts() {
    return this.posts
      .slice()
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);
  }

  get featuredPosts() {
    return this.posts.filter(post => post.featured);
  }

  getFilteredPosts(searchTerm = '') {
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

}

export const blogStore = new BlogStore();