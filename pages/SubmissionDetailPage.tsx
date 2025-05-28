
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormSubmission, ApprovalStatus } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Dialog from '../components/ui/Dialog';
import Input from '../components/ui/Input'; // For rejection reason
import { getAISummary } from '../services/geminiService';
import { CheckCircle, XCircle, ArrowLeft, Download, ExternalLink, Brain, Loader2, Mail } from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../constants'; // Import customer data

interface SubmissionDetailPageProps {
  submissions: FormSubmission[];
  onUpdateStatus: (id: string, status: ApprovalStatus, reason?: string) => void;
}

const SubmissionDetailPage: React.FC<SubmissionDetailPageProps> = ({ submissions, onUpdateStatus }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [showEmailNotification, setShowEmailNotification] = useState<boolean>(false);
  const [emailNotificationMessage, setEmailNotificationMessage] = useState<string>('');

  useEffect(() => {
    const foundSubmission = submissions.find(sub => sub.id === id);
    if (foundSubmission) {
      setSubmission(foundSubmission);
    } else {
      // Handle submission not found, perhaps redirect or show error
      navigate('/submissions'); 
    }
  }, [id, submissions, navigate]);

  const handleApprove = () => {
    if (submission) {
      onUpdateStatus(submission.id, ApprovalStatus.Approved);

      // Simulate sending email to customer
      if (submission.customerName) {
        const customer = INITIAL_CUSTOMERS.find(c => c.name === submission.customerName);
        if (customer && customer.email) {
          setEmailNotificationMessage(`Email notification regarding submission #${submission.id} simulated for ${customer.email}. (PDF generation and actual email not implemented).`);
          setShowEmailNotification(true);
          setTimeout(() => {
            setShowEmailNotification(false);
          }, 5000); // Hide notification after 5 seconds
        } else {
          setEmailNotificationMessage(`Customer "${submission.customerName}" not found or has no email. Email simulation skipped.`);
          setShowEmailNotification(true);
           setTimeout(() => {
            setShowEmailNotification(false);
          }, 5000);
        }
      }
    }
  };

  const handleOpenRejectDialog = () => {
    setIsRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (submission && rejectionReason.trim()) {
      onUpdateStatus(submission.id, ApprovalStatus.Rejected, rejectionReason);
      setIsRejectDialogOpen(false);
      setRejectionReason('');
    } else if (!rejectionReason.trim()) {
        alert("Please provide a reason for rejection.");
    }
  };
  
  const handleFetchAiSummary = async () => {
    if (submission) {
      setIsSummaryLoading(true);
      setAiSummary(null); // Clear previous summary
      // Combine relevant data for summary
      const textToSummarize = `Form: ${submission.formName}. Submitted by: ${submission.submittedBy}. Customer: ${submission.customerName || 'N/A'}. Data: ${JSON.stringify(submission.data, null, 2)}`;
      const summary = await getAISummary(textToSummarize);
      setAiSummary(summary);
      setIsSummaryLoading(false);
    }
  };

  if (!submission) {
    return <div className="text-center p-10">Loading submission details or submission not found...</div>;
  }

  return (
    <div className="space-y-6 relative"> {/* Added relative for positioning notification */}
      {showEmailNotification && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-auto max-w-lg z-50">
          <div className="bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            {emailNotificationMessage}
          </div>
        </div>
      )}

      <Button variant="outline" onClick={() => navigate('/submissions')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
        Back to Submissions
      </Button>

      <Card title={`Submission: ${submission.formName} (#${submission.id})`} className="shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-slate-500">Submitted By</p>
            <p className="text-lg font-medium text-slate-800">{submission.submittedBy}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Submission Date</p>
            <p className="text-lg font-medium text-slate-800">{new Date(submission.submissionDate).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <Badge status={submission.status} className="text-lg px-4 py-1.5" />
          </div>
          {submission.customerName && (
            <div>
                <p className="text-sm text-slate-500">Customer</p>
                <p className="text-lg font-medium text-slate-800">{submission.customerName}</p>
            </div>
          )}
        </div>

        <div className="mb-8">
            <h4 className="text-lg font-semibold text-slate-700 mb-3">Form Data</h4>
            <div className="bg-slate-50 p-4 rounded-2xl space-y-3 max-h-96 overflow-y-auto">
                {Object.entries(submission.data).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
                    <span className="text-sm font-medium text-slate-600 capitalize col-span-1">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <pre className="text-sm text-slate-800 bg-white p-2 rounded-lg shadow-sm col-span-2 whitespace-pre-wrap break-words">
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </pre>
                </div>
                ))}
            </div>
        </div>
        
        {submission.status === ApprovalStatus.Rejected && submission.data.rejectionReason && (
            <Card title="Rejection Reason" className="mb-6 bg-red-50 border-red-200">
                 <p className="text-red-700">{submission.data.rejectionReason}</p>
            </Card>
        )}

        <Card title="AI Powered Summary" className="mb-6 bg-sky-50 border-sky-200 shadow-md">
            {isSummaryLoading && (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-8 w-8 text-sky-600 animate-spin mr-3" />
                    <p className="text-sky-700">Generating summary...</p>
                </div>
            )}
            {aiSummary && !isSummaryLoading && (
                <p className="text-slate-700 whitespace-pre-line">{aiSummary}</p>
            )}
            {!aiSummary && !isSummaryLoading && (
                 <p className="text-slate-500 italic">Click the button below to generate an AI summary of this submission.</p>
            )}
            <div className="mt-4">
                <Button 
                    variant="outline" 
                    onClick={handleFetchAiSummary} 
                    disabled={isSummaryLoading}
                    leftIcon={isSummaryLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                >
                    {isSummaryLoading ? 'Generating...' : (aiSummary ? 'Regenerate Summary' : 'Get AI Summary')}
                </Button>
            </div>
        </Card>


        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200">
          <div className="flex space-x-3">
            {submission.status === ApprovalStatus.Pending && (
              <>
                <Button variant="primary" onClick={handleApprove} leftIcon={<CheckCircle className="h-5 w-5"/>} size="lg">
                  Approve
                </Button>
                <Button variant="danger" onClick={handleOpenRejectDialog} leftIcon={<XCircle className="h-5 w-5"/>} size="lg">
                  Reject
                </Button>
              </>
            )}
            {submission.status === ApprovalStatus.Approved && (
                <p className="text-green-600 font-semibold flex items-center"><CheckCircle className="h-5 w-5 mr-2"/> This submission is Approved.</p>
            )}
             {submission.status === ApprovalStatus.Rejected && (
                <p className="text-red-600 font-semibold flex items-center"><XCircle className="h-5 w-5 mr-2"/> This submission is Rejected.</p>
            )}
          </div>
          <div className="flex space-x-3">
            {submission.pdfUrl && (
                 <Button variant="secondary" onClick={() => window.open(submission.pdfUrl, '_blank')} leftIcon={<Download className="h-4 w-4"/>}>
                    Download PDF
                </Button>
            )}
            {submission.vismaInvoiceId && (
                 <Button variant="secondary" onClick={() => alert(`Navigate to Visma Invoice: ${submission.vismaInvoiceId}`)} leftIcon={<ExternalLink className="h-4 w-4"/>}>
                    View Invoice
                </Button>
            )}
          </div>
        </div>
      </Card>

      <Dialog isOpen={isRejectDialogOpen} onClose={() => setIsRejectDialogOpen(false)} title="Reject Submission">
        <div className="space-y-4">
          <p>Please provide a reason for rejecting this submission. This will be visible to the submitter.</p>
          <Input
            id="rejectionReason"
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="e.g., Missing information, incorrect data"
            // Use a textarea for longer input if needed, or style Input to be multiline. For now, simple input.
          />
        </div>
        <div className="pt-4">
        <Button variant="danger" onClick={handleConfirmReject} className="w-full">Confirm Rejection</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default SubmissionDetailPage;