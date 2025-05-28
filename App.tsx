
import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import SubmissionsListPage from './pages/SubmissionsListPage';
import SubmissionDetailPage from './pages/SubmissionDetailPage';
import CustomersListPage from './pages/CustomersListPage';
import ProductsListPage from './pages/ProductsListPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import FormBuilderPage from './pages/FormBuilderPage';
import SelectFormPage from './pages/SelectFormPage';
import FillFormPage from './pages/FillFormPage';
import { FormSubmission, ApprovalStatus, FormDefinition } from './types';
import { INITIAL_SUBMISSIONS } from './constants';

const App: React.FC = () => {
  const location = useLocation();
  const [submissions, setSubmissions] = useState<FormSubmission[]>(INITIAL_SUBMISSIONS);
  const [savedFormDefinitions, setSavedFormDefinitions] = useState<FormDefinition[]>([]);

  const updateSubmissionStatus = useCallback((id: string, status: ApprovalStatus, reason?: string) => {
    setSubmissions(prevSubmissions =>
      prevSubmissions.map(sub =>
        sub.id === id ? { ...sub, status, data: { ...sub.data, rejectionReason: reason } } : sub
      )
    );
  }, []);

  const handleSaveFormDefinition = useCallback((formDefinition: FormDefinition) => {
    setSavedFormDefinitions(prevDefinitions => {
      const existingIndex = prevDefinitions.findIndex(def => def.id === formDefinition.id);
      if (existingIndex > -1) {
        const updatedDefinitions = [...prevDefinitions];
        updatedDefinitions[existingIndex] = { ...formDefinition, updatedAt: new Date().toISOString() };
        return updatedDefinitions;
      }
      return [...prevDefinitions, { ...formDefinition, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
    });
  }, []);

  const handleAddNewSubmission = useCallback((submissionData: { formId: string; formName: string; data: Record<string, any> }) => {
    const newSubmission: FormSubmission = {
      id: uuidv4(),
      formName: submissionData.formName,
      submittedBy: 'Current User', // Placeholder, replace with actual user later
      submissionDate: new Date().toISOString(),
      status: ApprovalStatus.Pending,
      // customerName: findCustomerName(submissionData.data), // Placeholder for actual customer logic
      data: submissionData.data,
    };
    setSubmissions(prevSubmissions => [newSubmission, ...prevSubmissions]); // Add to top of list
  }, []);


  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/submissions" element={<SubmissionsListPage submissions={submissions} />} />
          <Route path="/submissions/:id" element={<SubmissionDetailPage submissions={submissions} onUpdateStatus={updateSubmissionStatus} />} />
          <Route path="/customers" element={<CustomersListPage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route 
            path="/form-builder" 
            element={<FormBuilderPage onSaveFormDefinition={handleSaveFormDefinition} />} 
          />
          <Route 
            path="/select-form" 
            element={<SelectFormPage savedFormDefinitions={savedFormDefinitions} />} 
          />
          <Route 
            path="/fill-form/:formId" 
            element={<FillFormPage savedFormDefinitions={savedFormDefinitions} onAddNewSubmission={handleAddNewSubmission} />} 
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;