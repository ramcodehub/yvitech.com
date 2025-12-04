import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import chatIcon from '../../assets/img/aiassistant.png';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle window resize and mobile-specific behaviors
  useEffect(() => {
    const handleResize = () => {
      // On mobile devices, close chat when resizing to prevent UI issues
      if (window.innerWidth < 768 && isOpen) {
        // Optionally close chat on resize for better mobile experience
        // setIsOpen(false);
      }
      
      // Adjust chat window size based on screen dimensions
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow && isOpen) {
        // Ensure chat window fits within viewport
        const maxHeight = window.innerHeight * 0.8;
        chatWindow.style.maxHeight = `${maxHeight}px`;
      }
    };

    // Handle virtual keyboard on mobile devices
    const handleFocusIn = () => {
      if (isOpen && window.innerWidth < 768) {
        // Scroll chat window to bottom when input is focused
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    };

    // Handle escape key to close chat
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeyDown);
    
    // Initial setup
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Initialize chat with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Focus management for accessibility
    if (!isOpen) {
      // Chat is opening, focus on input
      setTimeout(() => {
        const input = document.querySelector('.chat-input-container textarea');
        if (input) {
          input.focus();
        }
      }, 100);
    } else {
      // Chat is closing, focus back on toggle button
      setTimeout(() => {
        const toggleButton = document.querySelector('.chat-toggle-button');
        if (toggleButton) {
          toggleButton.focus();
        }
      }, 100);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple function to convert markdown bold to HTML bold
  const renderMarkdown = (text) => {
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await fetch('/api/chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Set session ID if provided
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }

        // Add bot response with typing effect
        const botMessage = {
          id: Date.now() + 1,
          text: '',
          fullText: data.response,
          isBot: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Simulate typing effect
        let i = 0;
        const intervalId = setInterval(() => {
          if (i < data.response.length) {
            setMessages(prevMessages => {
              const updatedMessages = [...prevMessages];
              const lastMessage = updatedMessages[updatedMessages.length - 1];
              if (lastMessage.isBot) {
                updatedMessages[updatedMessages.length - 1] = {
                  ...lastMessage,
                  text: data.response.slice(0, i + 1)
                };
              }
              return updatedMessages;
            });
            i++;
          } else {
            clearInterval(intervalId);
            setIsLoading(false);
          }
        }, 20); // Adjust typing speed here (lower = faster)
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  // Common suggestions based on YVI Tech services (shortened for horizontal display)
  const commonSuggestions = [
    { display: "Oracle", full: "Tell me about your Oracle services" },
    { display: "SAP", full: "What SAP solutions do you offer?" },
    { display: "AI", full: "What AI solutions do you provide?" },
    { display: "Web", full: "What web development services do you offer?" }
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.full);
    // Auto-focus the input and send the message
    setTimeout(() => {
      const sendButton = document.querySelector('.send-button');
      if (sendButton) {
        sendButton.click();
      }
    }, 100);
  };

  const getRelevantSuggestions = (lastMessage) => {
    // Use AI-generated suggestions if available
    if (lastMessage && lastMessage.isBot && lastMessage.suggestions && lastMessage.suggestions.length > 0) {
      return lastMessage.suggestions;
    }
    
    // Fallback to static suggestions if no AI suggestions
    return commonSuggestions;
  };

  const renderSuggestions = () => {
    // Only show suggestions when not loading and there are messages
    if (isLoading || messages.length === 0) return null;
    
    // Get the last message to determine context
    const lastMessage = messages[messages.length - 1];
    const suggestions = getRelevantSuggestions(lastMessage);
    
    return (
      <div className="suggestions-container">
        {suggestions.slice(0, 4).map((suggestion, index) => (
          <button
            key={index}
            className="suggestion-button"
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading}
          >
            {suggestion.display}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChat();
          }
        }}
        tabIndex={0}
        aria-label="Toggle chat"
        aria-expanded={isOpen}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <img src={chatIcon} alt="Chat" className="chat-icon" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chat-window" 
          role="dialog" 
          aria-labelledby="chat-header"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="chat-header" id="chat-header">
            <h3>YVI Tech Assistant</h3>
            <button 
              className="close-button" 
              onClick={toggleChat}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleChat();
                }
              }}
              aria-label="Close chat"
              tabIndex={0}
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.isBot ? 'bot' : 'user'}`}
              >
                <div className="message-content">
                  {message.isBot ? (
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }} />
                  ) : (
                    message.text
                  )}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && !(messages.length > 0 && messages[messages.length - 1].isBot) && (
              <div className="message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggestions Container */}
          {renderSuggestions()}
          
          <div className="chat-input-container">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              rows="1"
              aria-label="Type your message"
              // Mobile-friendly attributes
              inputMode="text"
              enterKeyHint="send"
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
              aria-label="Send message"
              // Prevent form submission on Enter in button
              type="button"
            >
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;