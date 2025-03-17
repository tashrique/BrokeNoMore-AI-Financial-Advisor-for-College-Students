import React, { useState } from 'react';
import { ShoppingBag, AlertCircle } from 'lucide-react';

const PurchaseAdvisor = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch('/api/v1/purchase/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_url: url }),
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluation(data);
      } else {
        throw new Error('Evaluation failed');
      }
    } catch (error) {
      alert('Failed to evaluate purchase 😢');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (followed: boolean) => {
    if (!evaluation) return;

    try {
      await fetch('/api/v1/purchase/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          evaluation_id: evaluation.id,
          followed_advice: followed,
          actual_decision: followed ? 'followed' : 'ignored',
          satisfaction: 5,
        }),
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Purchase Advisor 🛍️</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="productUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What are you thinking of buying? 🤔
            </label>
            <input
              type="url"
              id="productUrl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste the product URL here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">🤔</span>
                Analyzing...
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Get Advice
              </>
            )}
          </button>
        </form>

        {evaluation && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Here's what I think 🤓</h3>
            <div className="space-y-4">
              <p className="text-gray-700">{evaluation.recommendation}</p>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleFeedback(true)}
                  className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  I'll follow this advice! 👍
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Thanks, but I'll pass 👎
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium">Pro Tip! 💡</h3>
            <p className="text-gray-600 mt-1">
              Before making a purchase, ask yourself: "Is this a want or a need?"
              Your future self will thank you! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAdvisor