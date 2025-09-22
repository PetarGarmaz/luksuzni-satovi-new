'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ArrowLeft, Upload, Check, Clock, Euro, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { otkupStore } from '@/stores/OtkupStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { supabase } from "@/lib/supabaseClient";

const OtkupSatovaPage = observer(() => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	brand: '',
	model: '',
	referenceNumber: '',
	hasBox: '',
	hasDocumentation: '',
	images: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field, value) => {
	setFormData(prev => ({
	  ...prev,
	  [field]: value
	}));
  };

  const handleImageUpload = (files) => {
	const newImages = Array.from(files).slice(0, 5 - formData.images.length);
	setFormData(prev => ({
	  ...prev,
	  images: [...prev.images, ...newImages]
	}));
  };

  const removeImage = (index) => {
	setFormData(prev => ({
	  ...prev,
	  images: prev.images.filter((_, i) => i !== index)
	}));
  };

  const handleDrag = (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (e.type === "dragenter" || e.type === "dragover") {
	  setDragActive(true);
	} else if (e.type === "dragleave") {
	  setDragActive(false);
	}
  };

  const handleDrop = (e) => {
	e.preventDefault();
	e.stopPropagation();
	setDragActive(false);
	
	if (e.dataTransfer.files && e.dataTransfer.files[0]) {
	  handleImageUpload(e.dataTransfer.files);
	}
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	
	if (formData.images.length === 0) {
	  alert('Molimo priložite najmanje jednu fotografiju sata.');
	  return;
	}

	setIsSubmitting(true);

	var processedImages = [];

	//Send images to the database
	for (let i = 0; i < formData.images.length; i++) {
		const file = formData.images[i];
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

	try {
	  // Send email using Formspree
	  const emailData = {
		firstName: formData.firstName,
		lastName: formData.lastName,
		phone: formData.phone,
		email: formData.email,
		brand: formData.brand,
		model: formData.model,
		referenceNumber: formData.referenceNumber,
		hasBox: formData.hasBox,
		hasDocumentation: formData.hasDocumentation,
		imageCount: formData.images.length,
		message: `Upit za otkup sata:

Osobni podaci:
- Ime: ${formData.firstName} ${formData.lastName}
- Telefon: ${formData.phone}
- Email: ${formData.email}

Podaci o satu:
- Brend: ${formData.brand}
- Model: ${formData.model}
- Referentni broj: ${formData.referenceNumber || 'Nije naveden'}
- Ima kutiju: ${formData.hasBox}
- Ima dokumentaciju: ${formData.hasDocumentation}
- Broj fotografija: ${formData.images.length}

Fotografije:
- ${processedImages.join('\n- ')}

Napomena: Korisnik je priložio ${formData.images.length} fotografija koje su spremljene lokalno.`
	  };

	  const response = await fetch('https://formspree.io/f/xblaqeov', {
		method: 'POST',
		body: JSON.stringify(emailData),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}
	  });

	  if (response.ok) {
		otkupStore.addSubmission({...formData, images: processedImages});

		setSubmitSuccess(true);
		// Reset form
		setFormData({
		  firstName: '',
		  lastName: '',
		  phone: '',
		  email: '',
		  brand: '',
		  model: '',
		  referenceNumber: '',
		  hasBox: '',
		  hasDocumentation: '',
		  images: []
		});
	  } else {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || 'Failed to send email');
	  }
	} catch (error) {
		console.error('Error submitting form:', error);
		alert(`Dogodila se greška prilikom slanja upita: ${error.message}. Molimo pokušajte ponovo ili nas kontaktirajte direktno na +385 98 906 0212.`);
	} finally {
		setIsSubmitting(false);
	}
  };

  const processSteps = [
	{
	  icon: Upload,
	  title: t.otkup.process.steps.submit.title,
	  description: t.otkup.process.steps.submit.description
	},
	{
	  icon: Clock,
	  title: t.otkup.process.steps.evaluation.title,
	  description: t.otkup.process.steps.evaluation.description
	},
	{
	  icon: Shield,
	  title: t.otkup.process.steps.inspection.title,
	  description: t.otkup.process.steps.inspection.description
	},
	{
	  icon: Euro,
	  title: t.otkup.process.steps.offer.title,
	  description: t.otkup.process.steps.offer.description
	}
  ];

  if (submitSuccess) {
	return (
	  <div className="min-h-screen bg-white">
		<Header />
		<section className="pt-32 pb-16 px-6">
		  <div className="max-w-4xl mx-auto text-center">
			<div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
			  <Check className="w-16 h-16 mx-auto mb-4 text-green-600" />
			  <h1 className="text-3xl font-light text-gray-900 mb-4">{t.otkup.form.success.title}</h1>
			  <p className="text-gray-700 mb-6">
				{t.otkup.form.success.message}
			  </p>
			  <div className="space-y-2 text-sm text-gray-600 mb-6">
				{t.otkup.form.success.details.map((detail, index) => (
				  <p key={index}>{detail}</p>
				))}
			  </div>
			  <div className="flex flex-col sm:flex-row gap-4 justify-center">
				<Link href="/">
				  <Button variant="outline">
					{t.otkup.form.success.backHome}
				  </Button>
				</Link>
				<Link href="/prodaja-satova">
				  <Button 
					className="text-white hover:opacity-90 transition-opacity"
					style={{backgroundColor: '#bd890f'}}
				  >
					{t.otkup.form.success.viewOffer}
				  </Button>
				</Link>
			  </div>
			</div>
		  </div>
		</section>
		<Footer />
	  </div>
	);
  }

  return (
	<div className="min-h-screen bg-white">
	  <Header />
	  
	  {/* Hero Section */}
	  <section className="pt-32 pb-16 px-6 bg-black text-white">
		<div className="max-w-7xl mx-auto">
		  <div className="flex items-center mb-6">
			<Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors mr-4">
			  <ArrowLeft className="w-4 h-4 mr-2" />
			  {t.otkup.back}
			</Link>
		  </div>
		  <h1 className="text-4xl md:text-5xl font-light mb-4">{t.otkup.title}</h1>
		  <p className="text-xl text-gray-300 max-w-2xl">
			{t.otkup.subtitle}
		  </p>
		</div>
	  </section>

	  {/* Introduction Section */}
	  <section className="py-16 px-6 bg-white">
		<div className="max-w-4xl mx-auto text-center">
		  <h2 className="text-3xl font-light text-gray-900 mb-6">{t.otkup.intro.title}</h2>
		  <p className="text-gray-700 text-lg leading-relaxed mb-8">
			{t.otkup.intro.description}
		  </p>
		  
		  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
			<div className="text-center p-4">
			  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				<Euro className="w-8 h-8" style={{color: '#bd890f'}} />
			  </div>
			  <h3 className="font-medium text-gray-900 mb-2">{t.otkup.intro.features.bestPrices.title}</h3>
			  <p className="text-gray-600 text-sm">{t.otkup.intro.features.bestPrices.description}</p>
			</div>
			<div className="text-center p-4">
			  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				<Clock className="w-8 h-8" style={{color: '#bd890f'}} />
			  </div>
			  <h3 className="font-medium text-gray-900 mb-2">{t.otkup.intro.features.fastProcess.title}</h3>
			  <p className="text-gray-600 text-sm">{t.otkup.intro.features.fastProcess.description}</p>
			</div>
			<div className="text-center p-4">
			  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				<Shield className="w-8 h-8" style={{color: '#bd890f'}} />
			  </div>
			  <h3 className="font-medium text-gray-900 mb-2">{t.otkup.intro.features.expertise.title}</h3>
			  <p className="text-gray-600 text-sm">{t.otkup.intro.features.expertise.description}</p>
			</div>
		  </div>
		</div>
	  </section>
	  {/* Process Explanation */}
	  <section className="py-20 px-6 bg-white">
		<div className="max-w-7xl mx-auto">
		  <div className="text-center mb-16">
			<h2 className="text-4xl font-light text-gray-900 mb-4">{t.otkup.process.title}</h2>
			<p className="text-gray-600 max-w-2xl mx-auto">
			  {t.otkup.process.subtitle}
			</p>
		  </div>

		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
			{processSteps.map((step, index) => (
			  <div key={index} className="text-center">
				<div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				  <step.icon className="w-8 h-8" style={{color: '#bd890f'}} />
				</div>
				<div className="text-sm font-semibold mb-2" style={{color: '#bd890f'}}>
				  {t.otkup.process.steps.submit.title.includes('Korak') ? `KORAK ${index + 1}` : `STEP ${index + 1}`}
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
				<p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
			  </div>
			))}
		  </div>

		  {/* Benefits */}
		  <div className="bg-gray-50 rounded-lg p-8">
			<h3 className="text-2xl font-light text-gray-900 mb-6 text-center">{t.otkup.benefits.title}</h3>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			  <div className="text-center">
				<div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				  <Check className="w-6 h-6" style={{color: '#bd890f'}} />
				</div>
				<h4 className="font-medium text-gray-900 mb-2">{t.otkup.benefits.fairPrices.title}</h4>
				<p className="text-gray-600 text-sm">{t.otkup.benefits.fairPrices.description}</p>
			  </div>
			  <div className="text-center">
				<div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				  <Shield className="w-6 h-6" style={{color: '#bd890f'}} />
				</div>
				<h4 className="font-medium text-gray-900 mb-2">{t.otkup.benefits.security.title}</h4>
				<p className="text-gray-600 text-sm">{t.otkup.benefits.security.description}</p>
			  </div>
			  <div className="text-center">
				<div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#bd890f20'}}>
				  <Clock className="w-6 h-6" style={{color: '#bd890f'}} />
				</div>
				<h4 className="font-medium text-gray-900 mb-2">{t.otkup.benefits.fastEvaluation.title}</h4>
				<p className="text-gray-600 text-sm">{t.otkup.benefits.fastEvaluation.description}</p>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  {/* Form Section */}
	  <section className="py-20 px-6 bg-white">
		<div className="max-w-4xl mx-auto">
		  <div className="text-center mb-12">
			<h2 className="text-4xl font-light text-gray-900 mb-4">{t.otkup.form.title}</h2>
			<p className="text-gray-600 max-w-2xl mx-auto">
			  {t.otkup.form.subtitle}
			</p>
		  </div>

		  <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
			{/* Personal Information */}
			<div className="mb-8">
			  <h3 className="text-xl font-medium text-gray-900 mb-4">{t.otkup.form.personalInfo}</h3>
			  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
				  <Label htmlFor="firstName">{t.otkup.form.firstName} *</Label>
				  <Input
					id="firstName"
					value={formData.firstName}
					onChange={(e) => handleInputChange('firstName', e.target.value)}
					placeholder={t.otkup.form.firstName}
					required
					className="mt-1"
				  />
				</div>
				<div>
				  <Label htmlFor="lastName">{t.otkup.form.lastName} *</Label>
				  <Input
					id="lastName"
					value={formData.lastName}
					onChange={(e) => handleInputChange('lastName', e.target.value)}
					placeholder={t.otkup.form.lastName}
					required
					className="mt-1"
				  />
				</div>
				<div>
				  <Label htmlFor="phone">{t.otkup.form.phone} *</Label>
				  <Input
					id="phone"
					type="tel"
					value={formData.phone}
					onChange={(e) => handleInputChange('phone', e.target.value)}
					placeholder="+385 xx xxx xxxx"
					required
					className="mt-1"
				  />
				</div>
				<div>
				  <Label htmlFor="email">{t.otkup.form.email} *</Label>
				  <Input
					id="email"
					type="email"
					value={formData.email}
					onChange={(e) => handleInputChange('email', e.target.value)}
					placeholder="vaš@email.com"
					required
					className="mt-1"
				  />
				</div>
			  </div>
			</div>

			{/* Watch Information */}
			<div className="mb-8">
			  <h3 className="text-xl font-medium text-gray-900 mb-4">{t.otkup.form.watchInfo}</h3>
			  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
				  <Label htmlFor="brand">{t.otkup.form.brand} *</Label>
				  <Input
					id="brand"
					value={formData.brand}
					onChange={(e) => handleInputChange('brand', e.target.value)}
					placeholder={t.otkup.form.brandPlaceholder}
					required
					className="mt-1"
				  />
				</div>
				<div>
				  <Label htmlFor="model">{t.otkup.form.model} *</Label>
				  <Input
					id="model"
					value={formData.model}
					onChange={(e) => handleInputChange('model', e.target.value)}
					placeholder={t.otkup.form.modelPlaceholder}
					required
					className="mt-1"
				  />
				</div>
				<div className="md:col-span-2">
				  <Label htmlFor="referenceNumber">{t.otkup.form.referenceNumber}</Label>
				  <Input
					id="referenceNumber"
					value={formData.referenceNumber}
					onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
					placeholder={t.otkup.form.referenceNumberPlaceholder}
					className="mt-1"
				  />
				</div>
				<div>
				  <Label htmlFor="hasBox">{t.otkup.form.hasBox} *</Label>
				  <Select value={formData.hasBox} onValueChange={(value) => handleInputChange('hasBox', value)}>
					<SelectTrigger className="mt-1">
					  <SelectValue placeholder={t.common.select} />
					</SelectTrigger>
					<SelectContent>
					  <SelectItem value="da">{t.otkup.form.boxOptions.yes}</SelectItem>
					  <SelectItem value="ne">{t.otkup.form.boxOptions.no}</SelectItem>
					  <SelectItem value="nisam-siguran">{t.otkup.form.boxOptions.unsure}</SelectItem>
					</SelectContent>
				  </Select>
				</div>
				<div>
				  <Label htmlFor="hasDocumentation">{t.otkup.form.hasDocumentation} *</Label>
				  <Select value={formData.hasDocumentation} onValueChange={(value) => handleInputChange('hasDocumentation', value)}>
					<SelectTrigger className="mt-1">
					  <SelectValue placeholder={t.common.select} />
					</SelectTrigger>
					<SelectContent>
					  <SelectItem value="da">{t.otkup.form.documentationOptions.yes}</SelectItem>
					  <SelectItem value="djelomicno">{t.otkup.form.documentationOptions.partial}</SelectItem>
					  <SelectItem value="ne">{t.otkup.form.documentationOptions.no}</SelectItem>
					  <SelectItem value="nisam-siguran">{t.otkup.form.documentationOptions.unsure}</SelectItem>
					</SelectContent>
				  </Select>
				</div>
			  </div>
			</div>

			{/* Image Upload */}
			<div className="mb-8">
			  <h3 className="text-xl font-medium text-gray-900 mb-4">{t.otkup.form.images.title} *</h3>
			  <p className="text-gray-600 mb-4 text-sm">
				{t.otkup.form.images.description}
			  </p>
			  
			  {/* Upload Area */}
			  <div
				className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
				  dragActive 
					? 'border-[#bd890f] bg-[#bd890f]/5' 
					: 'border-gray-300 hover:border-gray-400'
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			  >
				<Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 mb-2">
				  {t.otkup.form.images.dragDrop}
				</p>
				<p className="text-gray-500 text-sm mb-4">
				  {t.otkup.form.images.fileTypes}
				</p>
				<input
				  type="file"
				  multiple
				  accept="image/*"
				  onChange={(e) => handleImageUpload(e.target.files)}
				  className="hidden"
				  id="image-upload"
				/>
				<Button
				  type="button"
				  variant="outline"
				  onClick={() => document.getElementById('image-upload').click()}
				  disabled={formData.images.length >= 5}
				>
				  {t.otkup.form.images.selectFiles}
				</Button>
			  </div>

			  {/* Image Preview */}
			  {formData.images.length > 0 && (
				<div className="mt-4">
				  <p className="text-sm text-gray-600 mb-2">
					{t.otkup.form.images.attached.replace('{count}', formData.images.length)}
				  </p>
				  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{formData.images.map((image, index) => (
					  <div key={index} className="relative">
						<img
						  src={URL.createObjectURL(image)}
						  alt={`Watch ${index + 1}`}
						  className="w-full h-24 object-cover rounded-lg"
						/>
						<button
						  type="button"
						  onClick={() => removeImage(index)}
						  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
						>
						  ×
						</button>
					  </div>
					))}
				  </div>
				</div>
			  )}
			</div>

			{/* Submit Button */}
			<div className="text-center">
			  <Button
				type="submit"
				disabled={isSubmitting || formData.images.length === 0}
				className="text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity"
				style={{backgroundColor: '#bd890f'}}
			  >
				{isSubmitting ? t.otkup.form.submitting : t.otkup.form.submit}
			  </Button>
			  <p className="text-gray-500 text-sm mt-4">
				{t.otkup.form.required}
			  </p>
			</div>
		  </form>
		</div>
	  </section>

	  <Footer />
	</div>
  );
});

export default OtkupSatovaPage;