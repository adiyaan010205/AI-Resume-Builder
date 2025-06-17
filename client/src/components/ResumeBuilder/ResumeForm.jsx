import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, Sparkles, Eye } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import AIAssistant from './AIAssistant';
import { useResumeData } from '../../hooks/useResumeData';
import { useAI } from '../../hooks/useAI';
import toast from 'react-hot-toast';

const ResumeForm = ({ onPreview }) => {
  const { resumeData, updateResumeData, saveResume } = useResumeData();
  const { generateSuggestion, isLoading } = useAI();
  const [activeSection, setActiveSection] = useState('personal');
  const [showAI, setShowAI] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: resumeData
  });

  const watchedData = watch();

  useEffect(() => {
    updateResumeData(watchedData);
  }, [watchedData, updateResumeData]);

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ];

  const onSubmit = async (data) => {
    try {
      await saveResume(data);
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume');
    }
  };

  const handleAISuggestion = async (section, prompt) => {
    try {
      const suggestion = await generateSuggestion(section, prompt, watchedData);
      setValue(section, suggestion);
      toast.success('AI suggestion applied!');
    } catch (error) {
      toast.error('Failed to generate AI suggestion');
    }
  };

  return (
    <div className="flex h-full">
      {/* Section Navigation */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Resume Sections
          </h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Build Your Resume
            </h1>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAI(!showAI)}
                className="flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onPreview}
                className="flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                type="submit"
                disabled={!isDirty}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </form>
      </div>

      {/* AI Assistant Panel */}
      {showAI && (
        <AIAssistant
          section={activeSection}
          data={watchedData}
          onSuggestion={handleAISuggestion}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );

  function renderSection() {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection register={register} errors={errors} />;
      case 'summary':
        return <SummarySection register={register} errors={errors} />;
      case 'experience':
        return <ExperienceSection register={register} errors={errors} />;
      case 'education':
        return <EducationSection register={register} errors={errors} />;
      case 'skills':
        return <SkillsSection register={register} errors={errors} />;
      case 'projects':
        return <ProjectsSection register={register} errors={errors} />;
      default:
        return null;
    }
  }
};

// Section Components
const PersonalInfoSection = ({ register, errors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input
      label="Full Name"
      {...register('personal.fullName', { required: 'Full name is required' })}
      error={errors.personal?.fullName?.message}
    />
    <Input
      label="Email"
      type="email"
      {...register('personal.email', { required: 'Email is required' })}
      error={errors.personal?.email?.message}
    />
    <Input
      label="Phone"
      {...register('personal.phone')}
      error={errors.personal?.phone?.message}
    />
    <Input
      label="Location"
      {...register('personal.location')}
      error={errors.personal?.location?.message}
    />
    <Input
      label="LinkedIn"
      {...register('personal.linkedin')}
      error={errors.personal?.linkedin?.message}
    />
    <Input
      label="Website/Portfolio"
      {...register('personal.website')}
      error={errors.personal?.website?.message}
    />
  </div>
);

const SummarySection = ({ register, errors }) => (
  <div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Professional Summary
      </label>
      <textarea
        {...register('summary', { required: 'Summary is required' })}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Write a compelling summary of your professional background..."
      />
      {errors.summary && (
        <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
      )}
    </div>
  </div>
);

export default ResumeForm;