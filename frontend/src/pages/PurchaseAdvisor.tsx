import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Send,
  AlertCircle,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  DollarSign,
  ShoppingCart,
  FileText,
} from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "purchase-analysis";
  purchaseDetails?: {
    productName?: string;
    price?: number;
    recommendation?: "buy" | "avoid" | "consider";
    reasoning?: string;
    alternatives?: string[];
  };
};

const PurchaseAdvisor = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your Purchase Advisor. Tell me about something you're thinking of buying, and I'll help you decide if it's a good financial decision.",
      sender: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => processUserMessage(userMessage), 1000);
  };

  const processUserMessage = (userMessage: Message) => {
    // Detect if message contains a product inquiry
    const isPurchaseInquiry =
      /buy|purchase|worth|should i get|looking at|thinking about|considering/i.test(
        userMessage.content
      );

    let response: Message;

    if (isPurchaseInquiry) {
      // Extract potential product and price from message
      const priceMatch = userMessage.content.match(/\$(\d+(\.\d{1,2})?)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : null;

      // Generate a randomized but helpful response about the purchase
      const randomValue = Math.random();
      const randomRecommendation =
        randomValue > 0.6 ? "buy" : randomValue > 0.3 ? "consider" : "avoid";

      response = {
        id: Date.now().toString(),
        content: "Based on your financial situation, here's my analysis:",
        sender: "assistant",
        timestamp: new Date(),
        type: "purchase-analysis",
        purchaseDetails: {
          productName: extractProductName(userMessage.content),
          price: price || generateRandomPrice(),
          recommendation: randomRecommendation,
          reasoning: generateReasoning(randomRecommendation),
          alternatives:
            randomRecommendation === "avoid" ? generateAlternatives() : [],
        },
      };
    } else {
      // Generic conversation response
      const genericResponses = [
        "I'm here to help with purchase decisions. Tell me what you're thinking of buying and I can analyze if it's a good financial choice for you.",
        "I'd be happy to give you advice on a potential purchase. What are you considering buying?",
        "I can help evaluate if a purchase aligns with your financial goals. What product are you interested in?",
        "To help you make a smart financial decision, I'll need to know what you're thinking of buying and approximately how much it costs.",
      ];

      response = {
        id: Date.now().toString(),
        content:
          genericResponses[Math.floor(Math.random() * genericResponses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };
    }

    setMessages((prev) => [...prev, response]);
    setIsTyping(false);
  };

  const extractProductName = (message: string): string => {
    // Simple extraction - in a real app, this would use NLP
    const productPhrases = [
      /thinking about (?:buying|getting) (?:a|an|the) ([^.,]+)/i,
      /want to (?:buy|get) (?:a|an|the) ([^.,]+)/i,
      /considering (?:a|an|the) ([^.,]+)/i,
      /looking at (?:a|an|the) ([^.,]+)/i,
    ];

    for (const phrase of productPhrases) {
      const match = message.match(phrase);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Fallback to a generic name
    return "item";
  };

  const generateRandomPrice = (): number => {
    // Generate a random price between $20 and $500
    return Math.floor(Math.random() * 48000 + 2000) / 100;
  };

  const generateReasoning = (recommendation: string): string => {
    if (recommendation === "buy") {
      const reasons = [
        "This appears to be a good value for the money. Based on your spending patterns, this fits within your budget.",
        "This purchase aligns with your financial goals. You've been saving consistently and have the funds available.",
        "The price is reasonable and you've mentioned needing this before. This would be a practical purchase.",
        "This seems like a quality item that would last a long time, making it a good investment.",
      ];
      return reasons[Math.floor(Math.random() * reasons.length)];
    } else if (recommendation === "avoid") {
      const reasons = [
        "This seems expensive relative to your current budget. You might want to wait until after your next paycheck.",
        "Based on your recent spending, this would put you over your monthly budget for non-essentials.",
        "You have upcoming bills that should take priority over this purchase.",
        "There are similar products available at a lower price point that would serve the same purpose.",
      ];
      return reasons[Math.floor(Math.random() * reasons.length)];
    } else {
      const reasons = [
        "This could be a good purchase, but consider waiting for a sale or discount if possible.",
        "The item seems reasonably priced, but make sure it fits into your monthly entertainment/personal budget.",
        "This purchase would be fine financially, but consider if you really need this or if it's just a want.",
        "While you can afford this, remember your savings goals for the semester.",
      ];
      return reasons[Math.floor(Math.random() * reasons.length)];
    }
  };

  const generateAlternatives = (): string[] => {
    // This would ideally be more specific to the product in question
    return [
      "Look for a similar item from a different brand",
      "Check if there's a used or refurbished option available",
      "Wait for an upcoming sale or discount event",
      "Consider a subscription or rental instead of purchasing",
    ];
  };

  const clearConversation = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hi there! I'm your Purchase Advisor. Tell me about something you're thinking of buying, and I'll help you decide if it's a good financial decision.",
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100 font-display flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          Purchase Advisor
        </h1>
      </div>

      <div className="flex-1 flex flex-col min-h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
        {/* Messages Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              PA
            </div>
            <div>
              <h3 className="font-medium text-slate-200">Purchase Advisor</h3>
              <p className="text-xs text-slate-400">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                Active now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearConversation}
              className="p-2 bg-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="w-full flex"
              style={{
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                className="flex items-end max-w-[80%]"
                style={{
                  flexDirection:
                    message.sender === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  className={`rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold
                  ${
                    message.sender === "user"
                      ? "w-8 h-8 ml-2 bg-slate-600"
                      : "w-8 h-8 mr-2 bg-gradient-to-r from-blue-500 to-cyan-400"
                  }`}
                >
                  {message.sender === "user" ? "You" : "PA"}
                </div>

                <div
                  className={`p-3 rounded-xl shadow-sm min-w-[60px]
                    ${
                      message.sender === "user"
                        ? "bg-green-500 text-white rounded-tr-none"
                        : "bg-slate-700 text-slate-100 rounded-tl-none"
                    }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {isTyping && (
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold mr-2">
                PA
              </div>
              <div className="bg-slate-700 text-white p-3 rounded-xl rounded-tl-none">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div>
          <div className="p-4 border-t border-slate-700 bg-slate-800">
            <div className="relative">
              <textarea
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about a purchase decision..."
                className="w-full h-16 bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              ></textarea>
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-lg ${
                  !input.trim()
                    ? "bg-slate-600/50 text-slate-400"
                    : "bg-cyan-500 text-white hover:bg-cyan-600"
                } transition-colors`}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-green-500 rounded-lg text-white">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-100 text-sm">
                    How to use the Purchase Advisor
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Tell me about products you want to buy (price, details) •
                    Ask for budget alternatives • I'll analyze based on your
                    finances and goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Conversations Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" />
            Previous Conversations
          </h2>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
            View All
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50 hover:border-green-500/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-slate-200">
                PlayStation 5 Purchase
              </h3>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
              I'm considering buying a PS5 for $499. Is it a good...
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
              <span className="text-xs text-slate-500">4 messages</span>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                Consider
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50 hover:border-green-500/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-slate-200">
                New Laptop Research
              </h3>
              <span className="text-xs text-slate-400">3 days ago</span>
            </div>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
              Should I buy a MacBook Air for $999 or wait for a sale?
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
              <span className="text-xs text-slate-500">7 messages</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                Recommended
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/50 hover:border-green-500/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-slate-200">Concert Tickets</h3>
              <span className="text-xs text-slate-400">Last week</span>
            </div>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
              I want to buy concert tickets for $120. What do you think?
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
              <span className="text-xs text-slate-500">5 messages</span>
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                Not Recommended
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Load More Conversations
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.8);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 1);
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.8) rgba(15, 23, 42, 0.3);
        }
        
        /* Animation for bubble appearance */
        @keyframes bubbleIn {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .rounded-xl {
          animation: bubbleIn 0.3s ease-out;
        }
        
        /* Typing indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 2px 6px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default PurchaseAdvisor;
