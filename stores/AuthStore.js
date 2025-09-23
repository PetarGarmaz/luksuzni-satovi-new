import { makeAutoObservable, runInAction } from "mobx";
import { supabase } from "@/lib/supabaseClient";

class AuthStore {
	user = null;
	loading = true;

	constructor() {
		makeAutoObservable(this);
		this.loadUser();

		supabase.auth.onAuthStateChange((_event, session) => {
			runInAction(() => {
				this.user = session?.user || null;
			});
		});
	}

	async loadUser() {
		const { data } = await supabase.auth.getUser();
		
		runInAction(() => {
			this.user = data.user;
			this.loading = false;
		});
	}

	async signUp(email, password) {
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;
		return data;
	}

	async signIn(email, password) {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		
		if (error) throw error;
		return data;
	}

	async signOut() {
		await supabase.auth.signOut();
		
		runInAction(() => {
			this.user = null;
		});
	}
}

export const authStore = new AuthStore();
