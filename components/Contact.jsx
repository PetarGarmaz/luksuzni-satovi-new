'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { otkupStore } from '@/stores/OtkupStore';

const Contact = () => {
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
		message: '',
		images: []
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const { language } = useLanguage();
	const t = translations[language];

	const handleInputChange = (field, value) => {
		setFormData(prev => ({
		...prev,
		[field]: value
		}));
	};

	const handleSubmit = async (e) => {
		otkupStore.addSubmission(formData);

		e.preventDefault();
		setIsSubmitting(true);

		try {
		// Send email using Formspree
		const emailData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			phone: formData.phone,
			email: formData.email,
			subject: "Upit",
			textMessage: `Upit s glavne stranice:\nOsobni podaci:\n- Ime: ${formData.firstName} ${formData.lastName}\n- Telefon: ${formData.phone}\n- Email: ${formData.email}\n\nPoruka klijenta:\n${formData.message}`,
			htmlMessage: `<b>Upit s glavne stranice:</b><br/><br/><b>Osobni podaci:</b><br/>- Ime: ${formData.firstName} ${formData.lastName}<br/>- Telefon: ${formData.phone}<br/>- Email: ${formData.email}<br/><br/><b>Poruka klijenta:</b><br/>${formData.message}`
		};

		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(emailData),
		});

		if (response.ok) {
			setSubmitSuccess(true);
			// Reset form
			setFormData({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: ''
			});
		} else {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error || 'Failed to send email');
		}
		} catch (error) {
			console.error('Error submitting form:', error.message);
			alert(`Dogodila se greška prilikom slanja upita: ${error.message}. Molimo pokušajte ponovo ili nas kontaktirajte direktno na +385 98 906 0212.`);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitSuccess) {
		return (
		<section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
			<div className="max-w-7xl mx-auto">
			<div className="text-center">
				<div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
				<div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
					<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">Upit Uspješno Poslan!</h2>
				<p className="text-gray-700 mb-6">
					{t.contact.form.success.message}
				</p>
				<button
					onClick={() => setSubmitSuccess(false)}
					className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
					style={{backgroundColor: '#bd890f'}}
				>
					{t.contact.form.success.newInquiry}
				</button>
				</div>
			</div>
			</div>
		</section>
		);
	}

	return (
		<section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
		<div className="max-w-7xl mx-auto">
			<div className="text-center mb-8 sm:mb-16">
			<h2 className="text-2xl sm:text-4xl font-light text-gray-900 mb-4 uppercase">
				{t.contact.title}
			</h2>
			<p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
				{t.contact.subtitle}
			</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
			{/* Contact Information */}
			<div className="space-y-6 sm:space-y-8">
				<div>
				<h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">{t.contact.howToContact}</h3>
				<div className="space-y-4 sm:space-y-6">
					<div className="flex items-start space-x-4">
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
						<svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">{t.contact.email}</h4>
						<p className="text-sm sm:text-base text-gray-600">info@luksuzni-satovi.com</p>
						<p className="text-xs sm:text-sm text-gray-500 mt-1">{t.contact.emailResponse}</p>
					</div>
					</div>

					<div className="flex items-start space-x-4">
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
						<svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
					</div>
					<div>
						<h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">{t.contact.phone} (Zagreb)</h4>
						<p className="text-sm sm:text-base text-gray-600">+385 99 888 9999</p>
						
					</div>
					
					</div>

					<div className="flex items-start space-x-4">
					<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
						<svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
					</div>
					<div>
						<h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">{t.contact.phone} (Osijek)</h4>
						<p className="text-sm sm:text-base text-gray-600">+385 98 906 0212</p>
					
					</div>
					
					</div>

					
				</div>
				</div>

				<div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
				<h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3">{t.contact.whyChoose}</h4>
				<ul className="space-y-2 text-xs sm:text-sm text-gray-600">
					{t.contact.benefits.map((benefit, index) => (
					<li key={index} className="flex items-center">
						<span style={{backgroundColor: '#bd890f'}} className="w-4 h-4 mr-2 inline-block rounded-full" />
						{benefit}
					</li>
					))}
				</ul>
				</div>
			</div>

			{/* Contact Form */}
			<div className="bg-gray-50 p-4 sm:p-8 rounded-lg">
				<h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">{t.contact.form.title}</h3>
				<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
					<label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
						{t.contact.form.firstName} *
					</label>
					<input
						type="text"
						id="firstName"
						value={formData.firstName}
						onChange={(e) => handleInputChange('firstName', e.target.value)}
						className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
						style={{'--tw-ring-color': '#bd890f'}}
						placeholder="Vaše ime"
						required
					/>
					</div>
					<div>
					<label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
						{t.contact.form.lastName} *
					</label>
					<input
						type="text"
						id="lastName"
						value={formData.lastName}
						onChange={(e) => handleInputChange('lastName', e.target.value)}
						className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
						style={{'--tw-ring-color': '#bd890f'}}
						placeholder="Vaše prezime"
						required
					/>
					</div>
				</div>
				
				<div>
					<label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
					{t.contact.form.email} *
					</label>
					<input
					type="email"
					id="email"
					value={formData.email}
					onChange={(e) => handleInputChange('email', e.target.value)}
					className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
					style={{'--tw-ring-color': '#bd890f'}}
					placeholder="vaš@email.com"
					required
					/>
				</div>
				
				<div>
					<label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
					{t.contact.form.phone} *
					</label>
					<input
					type="tel"
					id="phone"
					value={formData.phone}
					onChange={(e) => handleInputChange('phone', e.target.value)}
					className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
					style={{'--tw-ring-color': '#bd890f'}}
					placeholder="+385 xx xxx xxxx"
					required
					/>
				</div>
				
				<div>
					<label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
					{t.contact.form.message} *
					</label>
					<textarea
					id="message"
					rows={4}
					value={formData.message}
					onChange={(e) => handleInputChange('message', e.target.value)}
					className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-none"
					style={{'--tw-ring-color': '#bd890f'}}
					placeholder={t.contact.form.messagePlaceholder}
					required
					></textarea>
				</div>
				
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:opacity-90 transition-opacity font-medium"
					style={{backgroundColor: '#bd890f'}}
				>
					{isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
				</button>
				<p className="text-gray-500 text-xs sm:text-sm text-center mt-2">
					{t.contact.form.required}
				</p>
				</form>
			</div>
			</div>
		</div>
		</section>
	);
};

export default Contact;