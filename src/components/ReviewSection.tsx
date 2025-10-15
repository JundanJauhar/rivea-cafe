"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
};

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const res = await fetch('/api/reviews?approved=true');
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          id: String(Date.now()),
          name: form.name,
          rating: form.rating,
          comment: form.comment
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      setForm({ name: '', rating: 5, comment: '' });
      setShowForm(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Gagal mengirim review. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={() => interactive && onChange && onChange(star)}
            className={`text-2xl ${interactive ? 'cursor-pointer hover:scale-110 transition' : ''} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-700 mb-3">
            ⭐ Review Customer
          </h2>
          <p className="text-amber-600 max-w-2xl mx-auto text-sm sm:text-base">
            Apa kata mereka tentang Rivea Coffee Shop
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            ✓ Review Anda telah dikirim dan menunggu persetujuan admin. Terima kasih!
          </div>
        )}

        {/* Write Review Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition font-medium shadow-lg hover:shadow-xl"
          >
            {showForm ? '✕ Tutup Form' : '✍️ Tulis Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Tulis Review Anda</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                {renderStars(form.rating, true, (rating) => setForm({ ...form, rating }))}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Komentar *
                </label>
                <textarea
                  required
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Bagikan pengalaman Anda di Rivea Coffee..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 transition font-medium"
                >
                  {submitting ? 'Mengirim...' : 'Kirim Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-8 text-amber-600">Memuat review...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-500 text-lg">Belum ada review</p>
            <p className="text-gray-400 text-sm mt-2">Jadilah yang pertama memberikan review!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                {/* Rating */}
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>

                {/* Name & Date */}
                <div className="border-t pt-3">
                  <p className="font-semibold text-amber-700">{review.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
