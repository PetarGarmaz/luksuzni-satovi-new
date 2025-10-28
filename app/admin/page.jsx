'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { Plus, Search, Eye, Edit, Trash2, Star, ArrowLeft, Mail, Lock, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { watchStore } from '@/stores/WatchStore';
import { blogStore } from '@/stores/BlogStore';
import { referralStore } from '@/stores/ReferralStore';
import { otkupStore } from '@/stores/OtkupStore';
import { authStore } from '@/stores/AuthStore';
import { supabase } from "@/lib/supabaseClient";

const AdminPage = observer(() => {
const searchParams = useSearchParams();
const [showLogin, setShowLogin] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const [activeTab, setActiveTab] = useState('watches');
const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false);
const [isAddRecommendationDialogOpen, setIsAddRecommendationDialogOpen] = useState(false);
const [selectedSubmission, setSelectedSubmission] = useState(null);
const [isSubmissionDetailOpen, setIsSubmissionDetailOpen] = useState(false);
const [password, setPassword] = useState('');
const [newWatch, setNewWatch] = useState({
	name: '',
	brand: '',
	model: '',
	year: new Date().getFullYear(),
	price: '',
	condition: 'Novo',
	category: 'Muški',
	images: '',
	description: '',
	featured: false,
	referenceNumber: '',
	hasBox: false,
	hasPapers: false,
	mechanism: 'Automatski',
	caseDiameter: '',
	caseMaterial: '',
	glassType: 'Safirno staklo',
	hasWarranty: false,
	isOnSale: false
});
const [newPost, setNewPost] = useState({
	title: '',
	excerpt: '',
	content: '',
	image: '',
	author: '',
	featured: false,
	tags: '',
	metaDescription: ''
});
const [newRecommendation, setNewRecommendation] = useState({
	name: '',
	rating: 5,
	text: '',
	location: ''
});

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loginData, setLoginData] = useState({
	email: '',
	password: ''
});
const [showPassword, setShowPassword] = useState(false);
const [loginError, setLoginError] = useState('');
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
	if (authStore.user) {
	setIsAuthenticated(true);
	setShowLogin(false);
	console.log(authStore.user);
	}
}, []);

const handleLogin = async (e) => {
	e.preventDefault();
	setIsLoading(true);
	setLoginError('');

	try {
		const response = await authStore.signIn(loginData.email, loginData.password);

		if(response) {
			setIsAuthenticated(true);
			setLoginError('');
			otkupStore.loadSubmissions();
		}
	} catch (err) {
		setLoginError('Neispravni podaci za prijavu. Molimo pokušajte ponovo.');
	}

	setIsLoading(false);
};

const handleInputChange = (field, value) => {
	setLoginData(prev => ({
	...prev,
	[field]: value
	}));
	// Clear error when user starts typing
	if (loginError) {
	setLoginError('');
	}
};

const handleLogout = () => {
		authStore.signOut();
		setIsAuthenticated(false);
		setLoginData({ email: '', password: '' });
};

const categories = ['Muški', 'Ženski', 'Ostalo'];
const conditions = ['Novo', 'Odlično', 'Vrlo dobro', 'Dobro'];
const mechanisms = ['Automatski', 'Kvarc', 'Mehanički'];
const caseMaterials = ['Nehrđajući čelik', 'Zlato', 'Bijelo zlato', 'Ružičasto zlato', 'Platina', 'Titanij', 'Keramika'];
const glassTypes = ['Safirno staklo', 'Mineralno staklo', 'Hesalitno staklo'];
const allCategories = watchStore.categories;
const filteredWatches = watchStore.getFilteredWatches(searchTerm, selectedCategory);

const formatPrice = (price) => {
	return new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
	}).format(price);
};

const handleAddWatch = async () => {
	if (newWatch.model && newWatch.brand && newWatch.price) {
	var processedImages = [];

	//Send images to the database
	for (let i = 0; i < newWatch.images.length; i++) {
		const file = newWatch.images[i];
		const filePath = file.name;

		const { error } = await supabase.storage.from("Images").upload(filePath, file, {cacheControl: '3600',upsert: true});

		if (error) {
			console.error("Upload failed:", error.message);
		} else {
			console.log(`Uploaded: ${filePath}`);

			// Get public URL
			const { data } = supabase.storage.from("Images").getPublicUrl(filePath);
			processedImages.push(data.publicUrl);
			
			console.log("File available at:", data.publicUrl);
		}
	}

	watchStore.addWatch({
		...newWatch,
		name: newWatch.model, // Use model as name
		price: parseFloat(newWatch.price),
		year: parseInt(newWatch.year),
		images: processedImages
	});
	setNewWatch({
		brand: '',
		model: '',
		year: new Date().getFullYear(),
		price: '',
		condition: 'Novo',
		category: 'Muški',
		image: '',
		description: '',
		featured: false,
		referenceNumber: '',
		hasBox: false,
		hasPapers: false,
		mechanism: 'Automatski',
		caseDiameter: '',
		caseMaterial: '',
		glassType: 'Safirno staklo',
		hasWarranty: false,
		isOnSale: false
	});
	setIsAddDialogOpen(false);
	}
};

const handleAddPost = () => {
	if (newPost.title && newPost.excerpt && newPost.author) {
	blogStore.addPost({
		...newPost,
		tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
	});
	setNewPost({
		title: '',
		excerpt: '',
		content: '',
		image: '',
		author: '',
		featured: false,
		tags: '',
		metaDescription: ''
	});
	setIsAddPostDialogOpen(false);
	}
};

const handleAddRecommendation = () => {
	if (newRecommendation.name && newRecommendation.text) {
	referralStore.addRecommendation(newRecommendation);
	setNewRecommendation({
		name: '',
		rating: 5,
		text: '',
		location: ''
	});
	setIsAddRecommendationDialogOpen(false);
	}
};

const handleDeleteWatch = (id) => {
	if (confirm('Are you sure you want to delete this watch?')) {
	watchStore.deleteWatch(id);
	}
};

const handleDeletePost = (id) => {
	if (confirm('Jeste li sigurni da želite obrisati ovaj članak?')) {
	blogStore.deletePost(id);
	}
};

const handleDeleteReferral = (id) => {
	if (confirm('Jeste li sigurni da želite obrisati ovaj referral?')) {
	referralStore.deleteRecommendation(id);
	}
};

const handleDeleteSubmission = (id) => {
	if (confirm('Jeste li sigurni da želite obrisati ovaj upit?')) {
	otkupStore.deleteSubmission(id);
	}
};

const handleUpdateSubmissionStatus = (id, status) => {
	otkupStore.updateStatus(id, status);
};

const handleViewSubmission = (submission) => {
	setSelectedSubmission(submission);
	setIsSubmissionDetailOpen(true);
};

const handleToggleFeatured = (id) => {
	watchStore.toggleFeatured(id);
};

const handleTogglePostFeatured = (id) => {
	blogStore.toggleFeatured(id);
};

const handleImageUpload = (files) => {
	const newImages = Array.from(files).slice(0, 5 - newWatch.images.length);
	setNewWatch(prev => ({
	...prev,
	images: [...prev.images, ...newImages]
	}));
};

if (!isAuthenticated) {
	return (
	<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
		<Card className="w-full max-w-md">
		<CardHeader className="text-center">
			<CardTitle className="text-2xl font-light text-gray-900">
			Admin Prijava
			</CardTitle>
			<CardDescription>
			Prijavite se za pristup admin panelu
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form onSubmit={handleLogin} className="space-y-4">
			{/* Email Field */}
			<div className="space-y-2">
				<Label htmlFor="email">Email adresa</Label>
				<div className="relative">
				<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<Input
					id="email"
					type="email"
					value={loginData.email}
					onChange={(e) => handleInputChange('email', e.target.value)}
					placeholder="primjer@email.com"
					className="pl-10"
					required
				/>
				</div>
			</div>

			{/* Password Field */}
			<div className="space-y-2">
				<Label htmlFor="password">Lozinka</Label>
				<div className="relative">
				<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<Input
					id="password"
					type={showPassword ? 'text' : 'password'}
					value={loginData.password}
					onChange={(e) => handleInputChange('password', e.target.value)}
					placeholder="Unesite lozinku"
					className="pl-10 pr-10"
					required
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
				>
					{showPassword ? (
					<EyeOff className="w-4 h-4" />
					) : (
					<Eye className="w-4 h-4" />
					)}
				</button>
				</div>
			</div>

			{/* Error Message */}
			{loginError && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-3">
				<p className="text-red-700 text-sm">{loginError}</p>
				</div>
			)}

			{/* Login Button */}
			<Button
				type="submit"
				disabled={isLoading || !loginData.email || !loginData.password}
				className="w-full text-white hover:opacity-90 transition-opacity"
				style={{backgroundColor: '#bd890f'}}

			>
				{isLoading ? 'Prijavljivanje...' : 'Prijavite se'}
			</Button>
			</form>
		</CardContent>
		</Card>
	</div>
	);
}

return (
	<div className="min-h-screen bg-gray-50">
	{/* Header */}
	<header className="bg-white border-b border-gray-200">
		<div className="max-w-7xl mx-auto px-6 py-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-4">
			<Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
				<ArrowLeft className="w-4 h-4 mr-2" />
				Back to Site
			</Link>
			<div className="h-6 w-px bg-gray-300"></div>
			<h1 className="text-xl font-medium text-gray-900">Admin Dashboard</h1>
			</div>
			<div className="flex items-center space-x-4">
			<span className="text-sm text-gray-600">Dobrodošli u admin panel</span>
			<Button 
				variant="outline" 
				size="sm"
				onClick={handleLogout}
				className="text-sm"
			>
				Odjavi se
			</Button>
			</div>
		</div>
		</div>
	</header>

	{/* Main Content */}
	<main className="max-w-7xl mx-auto px-6 py-8">
		{/* Tabs */}
		<div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
		<button
			onClick={() => setActiveTab('watches')}
			className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
			activeTab === 'watches' 
				? 'bg-white text-gray-900 shadow-sm' 
				: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			Satovi
		</button>
		<button
			onClick={() => setActiveTab('blog')}
			className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
			activeTab === 'blog' 
				? 'bg-white text-gray-900 shadow-sm' 
				: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			Blog
		</button>
		<button
			onClick={() => setActiveTab('recommendations')}
			className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
			activeTab === 'recommendations' 
				? 'bg-white text-gray-900 shadow-sm' 
				: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			Preporuke
		</button>
		<button
			onClick={() => setActiveTab('otkup')}
			className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
			activeTab === 'otkup' 
				? 'bg-white text-gray-900 shadow-sm' 
				: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			Upiti
		</button>
		</div>

		{/* Stats */}
		{activeTab === 'watches' && (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">{watchStore.watches.length}</div>
				<p className="text-sm text-gray-600">Ukupno Satova</p>
			</CardContent>
			</Card>
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">{watchStore.featuredWatches.length}</div>
				<p className="text-sm text-gray-600">Istaknuti</p>
			</CardContent>
			</Card>
		</div>
		)}

		{activeTab === 'blog' && (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">{blogStore.posts.length}</div>
				<p className="text-sm text-gray-600">Ukupno Članaka</p>
			</CardContent>
			</Card>
		
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">
				{new Date().toLocaleDateString('hr-HR', { month: 'long', year: 'numeric' })}
				</div>
				<p className="text-sm text-gray-600">Trenutni Mjesec</p>
			</CardContent>
			</Card>
		</div>
		)}

		{activeTab === 'recommendations' && (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">{referralStore.recommendations.length}</div>
				<p className="text-sm text-gray-600">Ukupno Preporuka</p>
			</CardContent>
			</Card>
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">
				{referralStore.recommendations.filter(r => r.rating === 5).length}
				</div>
				<p className="text-sm text-gray-600">5-Zvjezdica</p>
			</CardContent>
			</Card>
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">
				{(referralStore.recommendations.reduce((sum, r) => sum + r.rating, 0) / referralStore.recommendations.length || 0).toFixed(1)}
				</div>
				<p className="text-sm text-gray-600">Prosječna Ocjena</p>
			</CardContent>
			</Card>
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">
				{referralStore.latestRecommendations.length}
				</div>
				<p className="text-sm text-gray-600">Najnovije</p>
			</CardContent>
			</Card>
		</div>
		)}

		{activeTab === 'otkup' && (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
			<Card>
			<CardContent className="p-6">
				<div className="text-2xl font-light text-gray-900">{otkupStore.submissions.length}</div>
				<p className="text-sm text-gray-600">Ukupno Upita</p>
			</CardContent>
			</Card>
		
		</div>
		)}

		{/* Add Button */}
		<div className="flex justify-end mb-8">
		{activeTab === 'watches' && (
			<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
			<DialogTrigger asChild>
				<Button className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
				<Plus className="w-4 h-4 mr-2" />
				Dodaj Sat
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
				<DialogTitle>Dodaj Novi Sat</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto">
				<div className="space-y-2">
					<Label htmlFor="brand">Brend</Label>
					<Input
					id="brand"
					value={newWatch.brand}
					onChange={(e) => setNewWatch({...newWatch, brand: e.target.value})}
					placeholder="npr., Rolex"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="referenceNumber">Referentni broj</Label>
					<Input
					id="referenceNumber"
					value={newWatch.referenceNumber}
					onChange={(e) => setNewWatch({...newWatch, referenceNumber: e.target.value})}
					placeholder="npr., 116610LN"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="model">Model</Label>
					<Input
					id="model"
					value={newWatch.model}
					onChange={(e) => setNewWatch({...newWatch, model: e.target.value})}
					placeholder="npr., Submariner Date"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="year">Godina</Label>
					<Input
					id="year"
					type="number"
					value={newWatch.year}
					onChange={(e) => setNewWatch({...newWatch, year: e.target.value})}
					min="1900"
					max={new Date().getFullYear()}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="price">Cijena (EUR)</Label>
					<Input
					id="price"
					type="number"
					value={newWatch.price}
					onChange={(e) => setNewWatch({...newWatch, price: e.target.value})}
					placeholder="npr., 12500"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="condition">Stanje</Label>
					<Select value={newWatch.condition} onValueChange={(value) => setNewWatch({...newWatch, condition: value})}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{conditions.map((condition) => (
						<SelectItem key={condition} value={condition}>
							{condition}
						</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="mechanism">Mehanizam</Label>
					<Select value={newWatch.mechanism} onValueChange={(value) => setNewWatch({...newWatch, mechanism: value})}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{mechanisms.map((mechanism) => (
						<SelectItem key={mechanism} value={mechanism}>
							{mechanism}
						</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="caseDiameter">Promjer kućišta</Label>
					<Input
					id="caseDiameter"
					value={newWatch.caseDiameter}
					onChange={(e) => setNewWatch({...newWatch, caseDiameter: e.target.value})}
					placeholder="npr., 40mm"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="caseMaterial">Materijal kućišta</Label>
					<Select value={newWatch.caseMaterial} onValueChange={(value) => setNewWatch({...newWatch, caseMaterial: value})}>
					<SelectTrigger>
						<SelectValue placeholder="Odaberite materijal" />
					</SelectTrigger>
					<SelectContent>
						{caseMaterials.map((material) => (
						<SelectItem key={material} value={material}>
							{material}
						</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="glassType">Tip stakla</Label>
					<Select value={newWatch.glassType} onValueChange={(value) => setNewWatch({...newWatch, glassType: value})}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{glassTypes.map((glass) => (
						<SelectItem key={glass} value={glass}>
							{glass}
						</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="category">Kategorija</Label>
					<Select value={newWatch.category} onValueChange={(value) => setNewWatch({...newWatch, category: value})}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
						))}
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="image">Slike</Label>
					<input
					type="file"
					multiple
					accept="image/*"
					onChange={(e) => handleImageUpload(e.target.files)}
					id="image"
					/>
				</div>
				<div className="col-span-2 space-y-2">
					<Label htmlFor="description">Opis</Label>
					<Input
					id="description"
					value={newWatch.description}
					onChange={(e) => setNewWatch({...newWatch, description: e.target.value})}
					placeholder="Kratki opis sata"
					/>
				</div>
				<div className="col-span-2 flex items-center space-x-2">
					<input
					type="checkbox"
					id="hasBox"
					checked={newWatch.hasBox}
					onChange={(e) => setNewWatch({...newWatch, hasBox: e.target.checked})}
					className="rounded border-gray-300"
					/>
					<Label htmlFor="hasBox">Ima kutiju</Label>
				</div>
				<div className="col-span-2 flex items-center space-x-2">
					<input
					type="checkbox"
					id="hasPapers"
					checked={newWatch.hasPapers}
					onChange={(e) => setNewWatch({...newWatch, hasPapers: e.target.checked})}
					className="rounded border-gray-300"
					/>
					<Label htmlFor="hasPapers">Ima dokumentaciju</Label>
				</div>
				<div className="col-span-2 flex items-center space-x-2">
					<input
					type="checkbox"
					id="hasWarranty"
					checked={newWatch.hasWarranty}
					onChange={(e) => setNewWatch({...newWatch, hasWarranty: e.target.checked})}
					className="rounded border-gray-300"
					/>
					<Label htmlFor="hasWarranty">Ima garanciju</Label>
				</div>
				<div className="col-span-2 flex items-center space-x-2">
					<input
					type="checkbox"
					id="featured"
					checked={newWatch.featured}
					onChange={(e) => setNewWatch({...newWatch, featured: e.target.checked})}
					className="rounded border-gray-300"
					/>
					<Label htmlFor="featured">Istaknuti sat</Label>
				</div>
				<div className="col-span-2 flex items-center space-x-2">
					<input
					type="checkbox"
					id="isOnSale"
					checked={newWatch.isOnSale}
					onChange={(e) => setNewWatch({...newWatch, isOnSale: e.target.checked})}
					className="rounded border-gray-300"
					/>
					<Label htmlFor="isOnSale">Na rasprodaji</Label>
				</div>
				</div>
				<div className="flex justify-end space-x-2">
				<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
					Odustani
				</Button>
				<Button onClick={handleAddWatch} className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
					Dodaj Sat
				</Button>
				</div>
			</DialogContent>
			</Dialog>
		)}

		{activeTab === 'blog' && (
			<Dialog open={isAddPostDialogOpen} onOpenChange={setIsAddPostDialogOpen}>
			<DialogTrigger asChild>
				<Button className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
				<Plus className="w-4 h-4 mr-2" />
				Dodaj Članak
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
				<DialogTitle>Dodaj Novi Članak</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
				<div className="space-y-2">
					<Label htmlFor="postTitle">Naslov</Label>
					<Input
					id="postTitle"
					value={newPost.title}
					onChange={(e) => setNewPost({...newPost, title: e.target.value})}
					placeholder="Naslov članka"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postExcerpt">Kratki opis</Label>
					<Input
					id="postExcerpt"
					value={newPost.excerpt}
					onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
					placeholder="Kratki opis članka"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postContent">Sadržaj</Label>
					<textarea
					id="postContent"
					value={newPost.content}
					onChange={(e) => setNewPost({...newPost, content: e.target.value})}
					placeholder="Sadržaj članka (HTML podržan)"
					className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postImage">URL Slike</Label>
					<Input
					id="postImage"
					value={newPost.image}
					onChange={(e) => setNewPost({...newPost, image: e.target.value})}
					placeholder="https://example.com/image.jpg"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postAuthor">Autor</Label>
					<Input
					id="postAuthor"
					value={newPost.author}
					onChange={(e) => setNewPost({...newPost, author: e.target.value})}
					placeholder="Ime autora"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postTags">Tagovi (odvojeni zarezom)</Label>
					<Input
					id="postTags"
					value={newPost.tags}
					onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
					placeholder="Rolex, Savjeti, Investicije"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="postMeta">Meta opis</Label>
					<Input
					id="postMeta"
					value={newPost.metaDescription}
					onChange={(e) => setNewPost({...newPost, metaDescription: e.target.value})}
					placeholder="SEO opis članka"
					/>
				</div>
				</div>
				<div className="flex justify-end space-x-2">
				<Button variant="outline" onClick={() => setIsAddPostDialogOpen(false)}>
					Odustani
				</Button>
				<Button onClick={handleAddPost} className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
					Dodaj Članak
				</Button>
				</div>
			</DialogContent>
			</Dialog>
		)}

		{activeTab === 'recommendations' && (
			<Dialog open={isAddRecommendationDialogOpen} onOpenChange={setIsAddRecommendationDialogOpen}>
			<DialogTrigger asChild>
				<Button className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
				<Plus className="w-4 h-4 mr-2" />
				Dodaj Preporuku
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
				<DialogTitle>Dodaj Novu Preporuku</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
				<div className="space-y-2">
					<Label htmlFor="recName">Ime i prezime</Label>
					<Input
					id="recName"
					value={newRecommendation.name}
					onChange={(e) => setNewRecommendation({...newRecommendation, name: e.target.value})}
					placeholder="Ime i prezime"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="recLocation">Lokacija</Label>
					<Input
					id="recLocation"
					value={newRecommendation.location}
					onChange={(e) => setNewRecommendation({...newRecommendation, location: e.target.value})}
					placeholder="Zagreb, Split, Osijek..."
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="recRating">Ocjena</Label>
					<Select value={newRecommendation.rating.toString()} onValueChange={(value) => setNewRecommendation({...newRecommendation, rating: parseInt(value)})}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="5">5 zvjezdica</SelectItem>
						<SelectItem value="4">4 zvjezdice</SelectItem>
						<SelectItem value="3">3 zvjezdice</SelectItem>
						<SelectItem value="2">2 zvjezdice</SelectItem>
						<SelectItem value="1">1 zvjezdica</SelectItem>
					</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="recText">Preporuka</Label>
					<textarea
					id="recText"
					value={newRecommendation.text}
					onChange={(e) => setNewRecommendation({...newRecommendation, text: e.target.value})}
					placeholder="Tekst preporuke..."
					className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none"
					/>
				</div>
				</div>
				<div className="flex justify-end space-x-2">
				<Button variant="outline" onClick={() => setIsAddRecommendationDialogOpen(false)}>
					Odustani
				</Button>
				<Button onClick={handleAddRecommendation} className="text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#bd890f'}}>
					Dodaj Preporuku
				</Button>
				</div>
			</DialogContent>
			</Dialog>
		)}
		</div>

		{/* Controls for Watches */}
		{activeTab === 'watches' && (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
			<Input
				placeholder="Pretraži satove..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="pl-10"
			/>
			</div>
			<div className="flex gap-2">
			{allCategories.map((category) => (
				<Button
				key={category}
				variant={selectedCategory === category ? "default" : "outline"}
				size="sm"
				onClick={() => setSelectedCategory(category)}
				className="text-xs"
				>
				{category}
				</Button>
			))}
			</div>
		</div>
		)}

		{/* Content based on active tab */}
		{activeTab === 'watches' && (
		<>
			{/* Watch Grid */}
			{filteredWatches.length > 0 ? (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredWatches.map((watch) => (
				<Card key={watch.id} className="group hover:shadow-lg transition-shadow">
					<CardContent className="p-0">
					<div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden relative">
						<img
						src={watch.images[0] || 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'}
						alt={watch.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						{watch.featured && (
						<div className="absolute top-2 right-2">
							<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
							<Star className="w-3 h-3 mr-1" />
							Featured
							</Badge>
						</div>
						)}
					</div>
					<div className="p-4">
						<div className="flex items-start justify-between mb-3">
						<div className="flex-1">
							<h3 className="font-medium text-gray-900 mb-1 text-sm">{watch.name}</h3>
							<p className="text-xs text-gray-600">{watch.brand} • {watch.year}</p>
						</div>
						</div>
						<div className="flex items-center gap-1 mb-3 flex-wrap">
						<Badge variant="secondary" className="text-xs">
							{watch.category}
						</Badge>
						<Badge variant="outline" className="text-xs">
							{watch.condition}
						</Badge>
						</div>
						<p className="text-sm font-medium text-gray-900 mb-3">{formatPrice(watch.price)}</p>
						<div className="flex gap-1">
						{/*<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
							<Eye className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
							<Edit className="w-4 h-4" />
						</Button>*/}
						<Button 
							variant="ghost" 
							size="sm" 
							className={`h-8 w-8 p-0 ${watch.featured ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`}
							onClick={() => handleToggleFeatured(watch.id)}
							title={watch.featured ? "Remove from featured" : "Add to featured"}
						>
							<Star className={`w-4 h-4 ${watch.featured ? 'fill-current' : ''}`} />
						</Button>
						<Button 
							variant="ghost" 
							size="sm" 
							className="h-8 w-8 p-0 text-red-600 hover:text-red-700" 
							onClick={() => handleDeleteWatch(watch.id)}
							title="Delete"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
						</div>
					</div>
					</CardContent>
				</Card>
				))}
			</div>
			) : (
			<div className="text-center py-12">
			<p className="text-gray-500">Nema satova koji odgovaraju vašim kriterijima.</p>
			</div>
			)}
		</>
		)}

		{activeTab === 'blog' && (
		<>
			{/* Blog Posts Grid */}
			{blogStore.posts.length > 0 ? (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogStore.posts.map((post) => (
				<Card key={post.id} className="group hover:shadow-lg transition-shadow">
					<CardContent className="p-0">
					<div className="aspect-[16/10] bg-gray-50 rounded-t-lg overflow-hidden relative">
						<img
						src={post.image || 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'}
						alt={post.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						{post.featured && (
						<div className="absolute top-2 right-2">
							<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
							<Star className="w-3 h-3 mr-1" />
							Istaknuto
							</Badge>
						</div>
						)}
					</div>
					<div className="p-4">
						<h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2">{post.title}</h3>
						<p className="text-xs text-gray-600 mb-2">{post.author} • {post.publishedAt}</p>
						<p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
						<div className="flex items-center gap-1 mb-3 flex-wrap">
						{post.tags.slice(0, 2).map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
							{tag}
							</Badge>
						))}
						</div>
						<div className="flex gap-1">
						{/*<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
							<Eye className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
							<Edit className="w-4 h-4" />
						</Button>*/}
						<Button 
							variant="ghost" 
							size="sm" 
							className={`h-8 w-8 p-0 ${post.featured ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`}
							onClick={() => handleTogglePostFeatured(post.id)}
							title={post.featured ? "Remove from featured" : "Add to featured"}
						>
							<Star className={`w-4 h-4 ${post.featured ? 'fill-current' : ''}`} />
						</Button>
						<Button 
							variant="ghost" 
							size="sm" 
							className="h-8 w-8 p-0 text-red-600 hover:text-red-700" 
							onClick={() => handleDeletePost(post.id)}
							title="Delete"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
						</div>
					</div>
					</CardContent>
				</Card>
				))}
			</div>
			) : (
			<div className="text-center py-12">
			<p className="text-gray-500">Još nema objavljenih članaka.</p>
			</div>
			)}
		</>
		)}

		{activeTab === 'recommendations' && (
		<>
			{/* Recommendations Grid */}
			{referralStore.recommendations.length > 0 ? (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{referralStore.recommendations.map((recommendation) => (
				<Card key={recommendation.id} className="group hover:shadow-lg transition-shadow">
					<CardContent className="p-6">
					<div className="flex items-start justify-between mb-3">
						<div className="flex-1">
						<h3 className="font-medium text-gray-900 mb-1">{recommendation.name}</h3>
						<p className="text-sm text-gray-500">{recommendation.location}</p>
						</div>
						<div className="flex items-center gap-1">
						{Array.from({ length: 5 }, (_, index) => (
							<Star
							key={index}
							className={`w-4 h-4 ${
								index < recommendation.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
							}`}
							/>
						))}
						</div>
					</div>
					<p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
						"{recommendation.text}"
					</p>
					<div className="flex items-center justify-between">
						<p className="text-xs text-gray-500">
						{recommendation.createdAt}
						</p>
						<div className="flex gap-1">
						{/*<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
							<Eye className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
							<Edit className="w-4 h-4" />
						</Button>*/}
						<Button 
							variant="ghost" 
							size="sm" 
							className="h-8 w-8 p-0 text-red-600 hover:text-red-700" 
							onClick={() => handleDeleteRecommendation(recommendation.id)}
							title="Delete"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
						</div>
					</div>
					</CardContent>
				</Card>
				))}
			</div>
			) : (
			<div className="text-center py-12">
			<p className="text-gray-500">Još nema dodanih preporuka.</p>
			</div>
			)}
		</>
		)}

		{/* Otkup Submissions */}
		{activeTab === 'otkup' && (
		<>
			{otkupStore.submissions.length > 0 ? (
			<div className="grid grid-cols-1 gap-6">
				{otkupStore.submissions.map((submission) => (
				<Card key={submission.id} className="group hover:shadow-lg transition-shadow">
					<CardContent className="p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
						<h3 className="font-medium text-gray-900 mb-1">
							{submission.firstName} {submission.lastName}
						</h3>
						<p className="text-sm text-gray-600 mb-2">
							{submission.brand} {submission.model}
							{submission.referenceNumber && ` (${submission.referenceNumber})`}
						</p>
						<div className="flex items-center gap-2 mb-2">
							<Badge 
							variant={submission.status === 'Nova' ? 'default' : 'secondary'}
							className="text-xs"
							>
							{submission.status}
							</Badge>
							<span className="text-xs text-gray-500">
							{submission.submittedAt}
							</span>
						</div>
						<div className="flex items-center gap-4 text-xs text-gray-500">
							<a href={`mailto:${submission.email}?subject=${submission.message == "" ? ("Otkup - " + submission.brand + " " + submission.model) : ""}`}>📧 {submission.email}</a>
							<span>📱 {submission.phone}</span>
							<span>📷 {submission.images.length} slika</span>
						</div>
						</div>
						
					</div>
					<div className="flex gap-2">
						<Button 
						variant="ghost" 
						size="sm" 
						className="h-8 px-3 text-xs" 
						onClick={() => handleViewSubmission(submission)}
						>
						<Eye className="w-4 h-4 mr-1" />
						Detalji
						</Button>
						<Button 
						variant="ghost" 
						size="sm" 
						className="h-8 px-3 text-xs text-red-600 hover:text-red-700" 
						onClick={() => handleDeleteSubmission(submission.id)}
						>
						<Trash2 className="w-4 h-4 mr-1" />
						Obriši
						</Button>
					</div>
					</CardContent>
				</Card>
				))}
			</div>
			) : (
			<div className="text-center py-12">
			<p className="text-gray-500">Još nema upita za otkup.</p>
			</div>
			)}
		</>
		)}

		{/* Submission Detail Dialog */}
		<Dialog open={isSubmissionDetailOpen} onOpenChange={setIsSubmissionDetailOpen}>
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
			<DialogHeader>
			<DialogTitle>Detalji Upita</DialogTitle>
			</DialogHeader>
			{selectedSubmission && (
			<div className="space-y-6">
				{/* Personal Info */}
				<div>
				<h3 className="text-lg font-medium mb-3">Osobni Podaci</h3>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
					<span className="font-medium">Ime i prezime:</span>
					<p>{selectedSubmission.firstName} {selectedSubmission.lastName}</p>
					</div>
					<div>
					<span className="font-medium">Email:</span>
					<p></p>
					<a href={`mailto:${selectedSubmission.email}?subject=${selectedSubmission.message == "" ? ("Otkup - " + selectedSubmission.brand + " " + selectedSubmission.model) : ""}`}>{selectedSubmission.email}</a>
					</div>
					<div>
					<span className="font-medium">Telefon:</span>
					<p>{selectedSubmission.phone}</p>
					</div>
					<div>
					<span className="font-medium">Datum upita:</span>
					<p>{selectedSubmission.submittedAt}</p>
					</div>
				</div>
				</div>

				{/* Watch Info */}
				{selectedSubmission.message == "" ? (
					<div>
						<h3 className="text-lg font-medium mb-3">Podaci o Satu</h3>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
							<span className="font-medium">Brend:</span>
							<p>{selectedSubmission.brand}</p>
							</div>
							<div>
							<span className="font-medium">Model:</span>
							<p>{selectedSubmission.model}</p>
							</div>
							<div>
							<span className="font-medium">Referentni broj:</span>
							<p>{selectedSubmission.referenceNumber || 'Nije naveden'}</p>
							</div>
							<div>
							<span className="font-medium">Status:</span>
							<Badge variant="secondary">{selectedSubmission.status}</Badge>
							</div>
							<div>
							<span className="font-medium">Ima kutiju:</span>
							<p>{selectedSubmission.hasBox}</p>
							</div>
							<div>
							<span className="font-medium">Ima dokumentaciju:</span>
							<p>{selectedSubmission.hasDocumentation}</p>
							</div>
						</div>
					</div>
				) : (
					<div>
						<h3 className="text-lg font-medium mb-3">Poruka:</h3>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<p>{selectedSubmission.message}</p>
						</div>
					</div>
				)}

				{/* Images */}
				{selectedSubmission.images.length > 0 && (
					<div>
						<h3 className="text-lg font-medium mb-3">Fotografije ({selectedSubmission.images.length})</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{selectedSubmission.images.map((image, index) => (
							<div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
								<img
								src={image}
								alt={`Watch ${index + 1}`}
								className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
								onClick={() => window.open(image, '_blank')}
								/>
							</div>
							))}
						</div>
					</div>
				)}

				{/* Notes */}
				{selectedSubmission.notes && (
				<div>
					<h3 className="text-lg font-medium mb-3">Napomene</h3>
					<p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
					{selectedSubmission.notes}
					</p>
				</div>
				)}
			</div>
			)}
		</DialogContent>
		</Dialog>
	</main>
	</div>
);
});

export default AdminPage;