import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import Button from '../UI/Button';
import { useAI } from '../../hooks/useAI';

const AIAssistant = ({ section, data, onSuggestion, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { generateSuggestion, isLoading } = useAI();

  const predefinedPrompts = {
    summary: [
      'Write a professional summary for a software engineer',
      'Create a summary highlighting leadership experience',
      'Generate a summary for a career changer',
      'Write a summary emphasizing technical skills'
    ],
    experience: [
      'Improve this job description with action verbs',
      'Add quantifiable achievements to this role',
      'Rewrite this experience for better impact',
      'Optimize this description for ATS systems'
    ],
    skills: [
      'Suggest relevant technical skills for this role',
      'Add soft skills that complement technical abilities',
      'Recommend industry-specific skills',
      'Update skills list with current technologies'
    ]
  };

  const handleGenerateSuggestion = async (customPrompt = prompt) => {
    if (!customPrompt.trim()) return;

    try {
      const suggestion = await generateSuggestion(section, customPrompt, data);
      setSuggestions(prev => [...prev, { prompt: customPrompt, suggestion }]);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate suggestion:', error);
    }
  };

  const applySuggestion = (suggestion) => {
    onSuggestion(section, suggestion);
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Assistant
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Suggestions
        </h4>
        <div className="space-y-2">
          {predefinedPrompts[section]?.map((promptText, index) => (
            <button
              key={index}
              onClick={() => handleGenerateSuggestion(promptText)}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Custom Request
        </h4>
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerateSuggestion()}
            placeholder="Ask AI to help with this section..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => handleGenerateSuggestion()}
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-4">
        <AnimatePresence>
          {suggestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                {item.prompt}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {item.suggestion}
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => applySuggestion(item.suggestion)}
                className="w-full"
              >
                Apply Suggestion
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AIAssistant;