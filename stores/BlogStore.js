	import { makeAutoObservable, runInAction } from 'mobx';
	import { supabase } from "@/lib/supabaseClient";

	class BlogStore {
	posts = [];
	loading = false;
	error = null;

	constructor() {
		makeAutoObservable(this);
		this.loadPosts();
	}

	async loadPosts() {
		this.loading = true;
		const { data, error } = await supabase.from("blog").select("*").order("publishedAt", { ascending: false });

		runInAction(() => {
			if (error) {
				console.error(error);
			} else {
				this.posts = data || [];
			}

			this.loading = false;
		});		
	}

	async addPost(postData) {
		const newPost = {...postData, publishedAt: new Date(), slug: this.generateSlug(postData.title)};
		const { data, error } = await supabase.from("blog").insert(newPost);

		if (error) {
			console.error(error);
		} else if (data) {
			runInAction(() => {
				this.posts.unshift(data[0]);
			});
		}
	}

	async updatePost(id, updates) {
		const index = this.posts.findIndex(post => post.id === id);
		if (index !== -1) {
			this.posts[index] = { 
				...this.posts[index], 
				...updates,
				slug: updates.title ? this.generateSlug(updates.title) : this.posts[index].slug
			};

			const { error } = await supabase.from('blog').update(this.posts[index]).eq('id', id);
		}
	}

	async deletePost(id) {
		this.posts = this.posts.filter(post => post.id !== id);
		const response = await supabase.from('blog').delete().eq('id', id);
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