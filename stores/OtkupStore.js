import { makeAutoObservable } from 'mobx';

class OtkupStore {
  submissions = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadSubmissions();
  }

  loadSubmissions() {
    // Load from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('otkup-submissions');
      if (saved) {
        try {
          this.submissions = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading submissions:', error);
          this.submissions = [];
        }
      }
    }
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

  addSubmission(submissionData) {
    const newSubmission = {
      id: Date.now(),
      ...submissionData,
      status: 'Nova',
      submittedAt: new Date().toISOString(),
      estimatedValue: null,
      notes: ''
    };
    
    this.submissions.unshift(newSubmission); // Add to beginning
    this.saveToStorage();
    return newSubmission;
  }

  updateSubmission(id, updates) {
    const index = this.submissions.findIndex(submission => submission.id === id);
    if (index !== -1) {
      this.submissions[index] = { ...this.submissions[index], ...updates };
      this.saveToStorage();
    }
  }

  deleteSubmission(id) {
    this.submissions = this.submissions.filter(submission => submission.id !== id);
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