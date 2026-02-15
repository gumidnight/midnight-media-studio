'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses = [
  "Hi there! 👋 Thanks for reaching out to Midnight Media Studio. How can I help you today?",
  "Great question! We specialize in modern web development using Next.js, React, and TypeScript.",
  "Our typical project timeline is 2-4 weeks depending on complexity. Would you like to schedule a consultation?",
  "Absolutely! We offer custom pricing based on your project requirements. Feel free to share more details.",
  "You can reach us directly at hello@midnightclub.media or fill out the contact form above.",
  "Thanks for your interest! I'll make sure someone from our team gets back to you within 24 hours.",
];

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial bot greeting
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: botResponses[0],
            isBot: true,
            timestamp: new Date(),
          },
        ]);
        responseIndex.current = 1;
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[responseIndex.current % botResponses.length],
        isBot: true,
        timestamp: new Date(),
      };
      responseIndex.current += 1;
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Hidden on mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg shadow-accent-primary/30 hidden sm:flex items-center justify-center hover:scale-110 transition-transform ${
          isOpen ? 'sm:hidden' : ''
        }`}
      >
        <MessageCircle size={28} className="text-white" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-midnight-950" />
      </motion.button>

      {/* Chat Window - Desktop only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[60] w-[380px] h-[500px] card-glass rounded-2xl overflow-hidden shadow-2xl shadow-black/50 hidden sm:flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-primary to-accent-secondary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/livechat-avatar.png" alt="Support" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Midnight Support</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white/10 text-gray-200 rounded-tl-none'
                        : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-[10px] mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary transition-colors text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="px-4 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Demo chat • Responses are automated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
