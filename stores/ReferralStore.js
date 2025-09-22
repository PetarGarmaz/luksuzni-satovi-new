import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from "@/lib/supabaseClient";

class RecommendationStore {
	recommendations = [];
	loading = false;
	error = null;

	constructor() {
		makeAutoObservable(this);
		this.loadRecommendations();
	}

	async loadRecommendations() {
		// Example recommendations for demonstration
		const { data, error } = await supabase.from("referral").select("*").order("createdAt", { ascending: false });
		
		runInAction(() => {
			if (error) {
				console.error(error);
			} else {
				this.recommendations = data || [];
			}

			this.loading = false;
		});	
	}

	async addRecommendation(recommendationData) {
		const newRecommendation = {...recommendationData, createdAt: new Date()};
		const { data, error } = await supabase.from("referral").insert(newRecommendation);

		if (error) {
			console.error(error);
		} else if (data) {
			runInAction(() => {
				this.recommendations.unshift(data[0]);
			});
		}
	}

	updateRecommendation(id, updates) {
		const index = this.recommendations.findIndex(recommendation => recommendation.id === id);
		if (index !== -1) {
		this.recommendations[index] = { ...this.recommendations[index], ...updates };
		}
	}

	async deleteRecommendation(id) {
		this.recommendations = this.recommendations.filter(recommendation => recommendation.id !== id);
		const response = await supabase.from('referral').delete().eq('id', id);
	}

	get latestRecommendations() {
		return this.recommendations
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
	}
}

export const referralStore = new RecommendationStore();