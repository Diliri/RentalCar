'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBooking } from '@/services/api';
import styles from './RentalForm.module.css';

export default function RentalForm({ carId }: { carId: string }) {
  const SVG_PATH: string = '/symbol-defs.svg';
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.comment) {
      setHasError(true);
      toast.error('Please fill in required fields');
      return;
    }

    setHasError(false);
    setLoading(true);
    try {
      const res = await createBooking(carId, formData);
      toast.success(res.message || 'Car booked successfully!');
      setFormData({ name: '', email: '', comment: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit booking request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <div className={styles.inputThumb}>
        {/* Name Field */}
        <div className={styles.fieldWrapper}>
          <div className={`${styles.inputContainer} ${hasError && !formData.name ? styles.errorInput : ''}`}>
            {hasError && !formData.name && <span className={styles.floatingLabel}>Name*</span>}
            <input
              type="text"
              placeholder={hasError && !formData.name ? '' : 'Name*'}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (hasError) setHasError(false);
              }}
              className={styles.input}
            />
            {hasError && !formData.name && (
              <svg className={styles.errorIcon}>
                <use href={`${SVG_PATH}#icon-warning`}></use>
              </svg>
            )}
          </div>
          {hasError && !formData.name && (
            <p className={styles.errorText}>Please enter your name.</p>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.fieldWrapper}>
          <div className={`${styles.inputContainer} ${hasError && !formData.email ? styles.errorInput : ''}`}>
            {hasError && !formData.email && <span className={styles.floatingLabel}>Email*</span>}
            <input
              type="email"
              placeholder={hasError && !formData.email ? '' : 'Email*'}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (hasError) setHasError(false);
              }}
              className={styles.input}
            />
            {hasError && !formData.email && (
              <svg className={styles.errorIcon}>
                <use href={`${SVG_PATH}#icon-warning`}></use>
              </svg>
            )}
          </div>
          {hasError && !formData.email && (
            <p className={styles.errorText}>Please enter your email.</p>
          )}
        </div>

        {/* Comment Field */}
        <div className={styles.fieldWrapper}>
          <div className={`${styles.textareaContainer} ${hasError && !formData.comment ? styles.errorInput : ''}`}>
            {hasError && !formData.comment && <span className={styles.floatingLabel}>Comment</span>}
            <textarea
              placeholder={hasError && !formData.comment ? '' : 'Comment'}
              value={formData.comment}
              onChange={(e) => {
                setFormData({ ...formData, comment: e.target.value });
                if (hasError) setHasError(false);
              }}
              className={styles.textarea}
            />
            {hasError && !formData.comment && (
              <svg className={styles.errorIconTextarea}>
                <use href={`${SVG_PATH}#icon-warning`}></use>
              </svg>
            )}
          </div>
          {hasError && !formData.comment && (
            <p className={styles.errorText}>Comment is required</p>
          )}
        </div>
      </div>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}