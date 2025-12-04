import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from "@/lib/supabaseClient";

class WatchStore {
	watches = [];
	loading = false;
	error = null;

	constructor() {
		makeAutoObservable(this);
		this.loadWatches();
	}

	async loadWatches() {
		this.loading = true;
		const { data, error } = await supabase.from("watch").select("*");

		runInAction(() => {
			if (error) {
				console.error(error);
			} else {
				this.watches = data || [];
			}

			this.loading = false;
		});	
	}

	async addWatch(watchData) {
		const newWatch = {...watchData, createdAt: new Date(), slug: this.generateSlug(watchData.name + "-" + watchData.brand)};
		const { data, error } = await supabase.from("watch").insert(newWatch);

		if (error) {
			console.error(error);
		} else if (data) {
			runInAction(() => {
				console.log(data);
				this.watches.push(newWatch);
			});
		}

		return data;
	}

	async editWatch(watchData) {
		const { data, error } = await supabase.from("watch").update(watchData).eq("id", watchData.id);

		if (error) {
			console.error(error);
		};

		return data;
	}

	updateWatch(id, updates) {
		const index = this.watches.findIndex(watch => watch.id === id);
		if (index !== -1) {
		this.watches[index] = { ...this.watches[index], ...updates };
		}
	}

	async deleteWatch(id) {
		this.watches = this.watches.filter(watch => watch.id !== id);
		const response = await supabase.from('watch').delete().eq('id', id);
	}

	async toggleFeatured(id) {
		const watch = this.watches.find(watch => watch.id === id);
		
		if (watch) {
			watch.featured = !watch.featured;
			const { error } = await supabase.from('watch').update(watch).eq('id', id);

			if(error) {
				console.log("Error: " + error.message);
			}
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