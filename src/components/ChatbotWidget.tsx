
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatbotWidget: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowChatbot(false);
      }
    };

    if (showChatbot) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showChatbot]);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-700 text-white btn-circle shadow-xl z-40 animate-pulse"
        aria-label="Open chatbot"
      >
        {showChatbot ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chatbot Widget */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-80 h-[70vh] bg-white rounded-2xl shadow-2xl z-50 animate-scale-in border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Alpha Quads Assistant</h3>
              <p className="text-xs opacity-90">How can I help you today?</p>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="hover:bg-blue-700 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chatbot Content - Placeholder for future integration */}
          <div className="flex-1 p-4 flex items-center justify-center bg-gray-50 h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Chatbot Coming Soon!</h4>
              <p className="text-sm text-gray-600 mb-4">
                We're working on an intelligent assistant to help you with bookings and questions.
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/385915555555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors block"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+385915555555"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors block"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-100 text-center">
            <p className="text-xs text-gray-500">
              For immediate assistance, use WhatsApp or call us directly.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
