
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { submissionStatsData, INITIAL_SUBMISSIONS, INITIAL_CUSTOMERS, INITIAL_PRODUCTS } from '../constants';
import { CheckCircle, AlertTriangle, Clock, Users, PackageIcon, FileText } from 'lucide-react';
import { ApprovalStatus } from '../types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const totalSubmissions = INITIAL_SUBMISSIONS.length;
  const pendingSubmissions = INITIAL_SUBMISSIONS.filter(s => s.status === ApprovalStatus.Pending).length;
  const approvedSubmissions = INITIAL_SUBMISSIONS.filter(s => s.status === ApprovalStatus.Approved).length;
  const totalCustomers = INITIAL_CUSTOMERS.length;
  const totalProducts = INITIAL_PRODUCTS.length;

  const kpiData = [
    { title: 'Total Submissions', value: totalSubmissions, icon: FileText, color: 'text-blue-500' },
    { title: 'Pending Approval', value: pendingSubmissions, icon: Clock, color: 'text-yellow-500' },
    { title: 'Approved Submissions', value: approvedSubmissions, icon: CheckCircle, color: 'text-green-500' },
    { title: 'Total Customers', value: totalCustomers, icon: Users, color: 'text-purple-500' },
    { title: 'Managed Products', value: totalProducts, icon: PackageIcon, color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {kpiData.map(kpi => (
          <Card key={kpi.title} className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className={`p-3 bg-opacity-10 rounded-full mr-4 ${kpi.color.replace('text-', 'bg-')}`}>
                <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{kpi.title}</p>
                <p className="text-3xl font-bold text-slate-800">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Submission Trends (Last 6 Months)" className="shadow-xl">
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={submissionStatsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', borderColor: '#e2e8f0' }}
                labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ color: '#334155' }} />
              <Bar dataKey="submitted" fill="#38bdf8" name="Submitted" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" fill="#22c55e" name="Approved" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity (Placeholder)" className="shadow-xl">
          <ul className="space-y-3">
            {[...INITIAL_SUBMISSIONS].slice(0,3).map(sub => (
                 <li key={sub.id} className="flex items-center p-3 bg-slate-50 rounded-xl">
                    {sub.status === ApprovalStatus.Approved && <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>}
                    {sub.status === ApprovalStatus.Pending && <Clock className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0"/>}
                    {sub.status === ApprovalStatus.Rejected && <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0"/>}
                    <div className="flex-grow">
                        <p className="text-sm font-medium text-slate-700">{sub.formName} by {sub.submittedBy}</p>
                        <p className="text-xs text-slate-500">{new Date(sub.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs text-slate-400">{sub.customerName || 'N/A'}</span>
                 </li>
            ))}
          </ul>
        </Card>
        <Card title="Quick Links (Placeholder)" className="shadow-xl">
            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/form-builder')}
                  className="p-4 bg-sky-50 hover:bg-sky-100 rounded-2xl text-sky-700 font-medium transition-colors text-center"
                >
                  Create New Form
                </button>
                <button 
                  onClick={() => navigate('/submissions')}
                  className="p-4 bg-sky-50 hover:bg-sky-100 rounded-2xl text-sky-700 font-medium transition-colors text-center"
                >
                  View All Submissions
                </button>
                <button 
                  onClick={() => navigate('/customers')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-2xl text-green-700 font-medium transition-colors text-center"
                >
                  Add New Customer
                </button>
                <button 
                  onClick={() => alert('Visma.NET Sync (not implemented)')}
                  className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl text-indigo-700 font-medium transition-colors text-center"
                >
                  Sync with Visma.NET
                </button>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;