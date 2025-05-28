
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSubmission, ApprovalStatus } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import { Search, Filter, PlusCircle, Eye, Mail, CheckCircle } from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../constants'; // Import customer data

interface SubmissionsListPageProps {
  submissions: FormSubmission[];
}

const SubmissionsListPage: React.FC<SubmissionsListPageProps> = ({ submissions }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmailNotification, setShowEmailNotification] = useState<boolean>(false);
  const [emailNotificationMessage, setEmailNotificationMessage] = useState<string>('');

  const filteredSubmissions = submissions.filter(submission =>
    submission.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (submission.customerName && submission.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSendEmail = useCallback((submission: FormSubmission) => {
    if (!submission.customerName) {
      setEmailNotificationMessage(`Submission #${submission.id} has no associated customer. Email simulation skipped.`);
      setShowEmailNotification(true);
      setTimeout(() => setShowEmailNotification(false), 5000);
      return;
    }

    const customer = INITIAL_CUSTOMERS.find(c => c.name === submission.customerName);
    if (customer && customer.email) {
      setEmailNotificationMessage(`Email for submission #${submission.id} simulated to ${customer.email}. (Actual email not sent).`);
    } else {
      setEmailNotificationMessage(`Customer "${submission.customerName}" not found or has no email. Email simulation skipped for submission #${submission.id}.`);
    }
    setShowEmailNotification(true);
    setTimeout(() => setShowEmailNotification(false), 5000);
  }, []);

  const columns = [
    { key: 'formName', header: 'Form Name', sortable: true },
    { key: 'submittedBy', header: 'Submitted By', sortable: true },
    { key: 'customerName', header: 'Customer', sortable: true, render: (item: FormSubmission) => item.customerName || 'N/A'},
    { 
      key: 'submissionDate', 
      header: 'Date', 
      sortable: true, 
      render: (item: FormSubmission) => new Date(item.submissionDate).toLocaleDateString() 
    },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true, 
      render: (item: FormSubmission) => <Badge status={item.status} /> 
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: FormSubmission) => (
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/submissions/${item.id}`);}} leftIcon={<Eye className="h-4 w-4"/>}>
          View
        </Button>
      ),
    },
    {
      key: 'emailAction',
      header: 'Email',
      render: (item: FormSubmission) => {
        if (item.status === ApprovalStatus.Approved) {
          return (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); handleSendEmail(item); }} 
              leftIcon={<Mail className="h-4 w-4 text-sky-600"/>}
              className="text-sky-600 hover:bg-sky-50"
              title="Send Email Notification"
            >
              Send Email
            </Button>
          );
        }
        return null; // Or a disabled placeholder
      },
    },
  ];

  return (
    <div className="space-y-6 relative"> {/* Added relative for notification positioning */}
      {showEmailNotification && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-auto max-w-lg z-50">
          <div className="bg-sky-500 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" /> {/* Changed icon to CheckCircle or Mail */}
            {emailNotificationMessage}
          </div>
        </div>
      )}

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <Input 
              id="search-submissions"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search />}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4"/>}>
              Filter
            </Button>
            <Button variant="primary" leftIcon={<PlusCircle className="h-4 w-4"/>} onClick={() => navigate('/select-form')}>
              New Submission
            </Button>
          </div>
        </div>
      </Card>

      <Table<FormSubmission>
        columns={columns}
        data={filteredSubmissions}
        onRowClick={(item) => navigate(`/submissions/${item.id}`)}
      />
    </div>
  );
};

export default SubmissionsListPage;
