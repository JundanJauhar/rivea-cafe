'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('pending');

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? '/api/reviews' 
        : filter === 'approved'
        ? '/api/reviews?approved=true'
        : '/api/reviews?approved=false';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('Gagal memuat review');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  // Approve review
  const handleApprove = async (id: number) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: true })
      });

      if (!response.ok) throw new Error('Failed to approve review');
      
      alert('Review berhasil disetujui');
      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Gagal menyetujui review');
    }
  };

  // Reject/Hide review
  const handleReject = async (id: number) => {
    if (!confirm('Yakin ingin menyembunyikan review ini?')) return;

    try {
      const response = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: false })
      });

      if (!response.ok) throw new Error('Failed to reject review');
      
      alert('Review berhasil disembunyikan');
      fetchReviews();
    } catch (error) {
      console.error('Error rejecting review:', error);
      alert('Gagal menyembunyikan review');
    }
  };

  // Delete review
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus review ini secara permanen?')) return;

    try {
      const response = await fetch('/api/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete review');
      
      alert('Review berhasil dihapus');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Gagal menghapus review');
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Kelola Review Customer</h1>
        <p className="text-gray-600">Approve, sembunyikan, atau hapus review dari customer</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 border-b">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'pending'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending ({reviews.filter(r => !r.isApproved).length})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'approved'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === 'all'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Semua
        </button>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          <p className="mt-2 text-gray-600">Memuat review...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    {renderStars(review.rating)}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      review.isApproved 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {review.isApproved ? 'Disetujui' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(review.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'long',
                      timeStyle: 'short'
                    })}
                  </p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                {!review.isApproved && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✓ Setujui
                  </button>
                )}
                {review.isApproved && (
                  <button
                    onClick={() => handleReject(review.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    ✕ Sembunyikan
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑 Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
