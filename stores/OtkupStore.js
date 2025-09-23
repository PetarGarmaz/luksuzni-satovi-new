import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from "@/lib/supabaseClient";

class OtkupStore {
	submissions = [];
	loading = false;
	error = null;

	constructor() {
		makeAutoObservable(this);
		this.loadSubmissions();
	}

	async loadSubmissions() {
		this.loading = true;
		const { data, error } = await supabase.from("pawn").select("*");

		runInAction(() => {
			if (error) {
				console.error(error);
			} else {
				this.submissions = data || [];
			}

			this.loading = false;
		});	
	}

	saveToStorage() {
		if (typeof window !== 'undefined' && window.localStorage) {
			try {
				localStorage.setItem('otkup-submissions', JSON.stringify(this.submissions));
			} catch (error) {
				console.error('Error saving submissions:', error);
			}
		}
	}

	async addSubmission(submissionData) {
		const newSubmission = {...submissionData, submittedAt: new Date()};
		const { data, error } = await supabase.from("pawn").insert(newSubmission);

		if (error) {
			console.error(error);
		} else if (data) {
			runInAction(() => {
				console.log(data);
				this.submissions.unshift(data[0]);
			});
		}

		return data;
	}

	updateSubmission(id, updates) {
		const index = this.submissions.findIndex(submission => submission.id === id);
		if (index !== -1) {
		this.submissions[index] = { ...this.submissions[index], ...updates };
		this.saveToStorage();
		}
	}

	async deleteSubmission(id) {
		this.submissions = this.submissions.filter(submission => submission.id !== id);
		const response = await supabase.from('pawn').delete().eq('id', id);
		this.saveToStorage();
	}

	updateStatus(id, status) {
		this.updateSubmission(id, { status });
	}

	addEstimate(id, estimatedValue, notes = '') {
		this.updateSubmission(id, { 
		estimatedValue, 
		notes, 
		status: 'Procijenjena' 
		});
	}

	get newSubmissions() {
		return this.submissions.filter(submission => submission.status === 'Nova');
	}

	get processedSubmissions() {
		return this.submissions.filter(submission => submission.status !== 'Nova');
	}

	getSubmissionsByStatus(status) {
		return this.submissions.filter(submission => submission.status === status);
	}
}

export const otkupStore = new OtkupStore();