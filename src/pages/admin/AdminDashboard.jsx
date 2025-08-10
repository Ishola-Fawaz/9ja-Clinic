import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Edit,
  Eye,
  Trash2,
  User,
} from "lucide-react";


const AppointmentChartWeekly = () => {
  const data = [
    { day: 'Mon', scheduled: 45, completed: 42 },
    { day: 'Tue', scheduled: 52, completed: 48 },
    { day: 'Wed', scheduled: 38, completed: 35 },
    { day: 'Thu', scheduled: 61, completed: 58 },
    { day: 'Fri', scheduled: 55, completed: 51 },
    { day: 'Sat', scheduled: 28, completed: 25 },
    { day: 'Sun', scheduled: 15, completed: 14 },
  ];

  const maxValue = Math.max(...data.flatMap(d => [d.scheduled, d.completed]));

  return (
    <div className="flex items-end justify-between h-full space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1 h-full">
          <div className="flex-1 flex flex-col justify-end w-full space-y-1">
            <div 
              className="bg-blue-500 rounded-t-sm min-h-[4px]" 
              style={{height: `${(item.scheduled / maxValue) * 80}%`}}
              title={`Scheduled: ${item.scheduled}`}
            ></div>
            <div 
              className="bg-emerald-500 rounded-t-sm min-h-[4px]" 
              style={{height: `${(item.completed / maxValue) * 80}%`}}
              title={`Completed: ${item.completed}`}
            ></div>
          </div>
          <span className="text-xs text-gray-600 mt-2">{item.day}</span>
        </div>
      ))}
    </div>
  );
};

const UserRow = ({ name, email, role, status, lastLogin, avatar }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-indigo-600 font-medium text-sm">{avatar}</span>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        role === 'Administrator' ? 'bg-red-100 text-red-800' :
        role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
        'bg-emerald-100 text-emerald-800'
      }`}>
        {role}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {lastLogin}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </div>
    </td>
  </tr>
);

const RoleCard = ({ title, description, permissions, color }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex items-center mb-2">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
        {title}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-3">{description}</p>
    <div className="space-y-1">
      {permissions.map((permission, index) => (
        <div key={index} className="flex items-center text-xs text-gray-500">
          <CheckCircle size={12} className="text-emerald-500 mr-2" />
          {permission}
        </div>
      ))}
    </div>
  </div>
);

const NotificationToggle = ({ title, description, defaultChecked }) => (
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <h5 className="text-sm font-medium text-gray-900">{title}</h5>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <label className="flex items-center ml-4">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
      />
    </label>
  </div>
);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "John Doe", date: "2025-08-12", time: "10:00 AM", healthConcern: "Fever & Cough", status: "Pending", priority: "Medium" },
    { id: 2, patientName: "Jane Smith", date: "2025-08-13", time: "2:30 PM", healthConcern: "Back Pain", status: "Pending", priority: "High" },
    { id: 3, patientName: "Michael Johnson", date: "2025-08-14", time: "11:15 AM", healthConcern: "High Blood Pressure", status: "Pending", priority: "Low" },
    { id: 4, patientName: "Sarah Wilson", date: "2025-08-15", time: "9:00 AM", healthConcern: "Routine Checkup", status: "Approved", priority: "Low" },
    { id: 5, patientName: "Robert Brown", date: "2025-08-16", time: "3:45 PM", healthConcern: "Chest Pain", status: "Approved", priority: "High" },
  ]);

  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      age: 32, 
      gender: "Male", 
      phone: "+1 (555) 123-4567", 
      email: "john.doe@email.com",
      address: "123 Main St, New York, NY 10001",
      bloodType: "O+",
      allergies: "Penicillin, Peanuts",
      lastVisit: "2025-07-15",
      status: "Active",
      totalAppointments: 8,
      emergencyContact: "Jane Doe - +1 (555) 987-6543"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      age: 28, 
      gender: "Female", 
      phone: "+1 (555) 234-5678", 
      email: "jane.smith@email.com",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      bloodType: "A+",
      allergies: "None",
      lastVisit: "2025-08-01",
      status: "Active",
      totalAppointments: 5,
      emergencyContact: "Mark Smith - +1 (555) 876-5432"
    },
    { 
      id: 3, 
      name: "Michael Johnson", 
      age: 45, 
      gender: "Male", 
      phone: "+1 (555) 345-6789", 
      email: "michael.j@email.com",
      address: "789 Pine St, Chicago, IL 60601",
      bloodType: "B+",
      allergies: "Shellfish",
      lastVisit: "2025-06-20",
      status: "Active",
      totalAppointments: 12,
      emergencyContact: "Lisa Johnson - +1 (555) 765-4321"
    },
    { 
      id: 4, 
      name: "Sarah Wilson", 
      age: 35, 
      gender: "Female", 
      phone: "+1 (555) 456-7890", 
      email: "sarah.wilson@email.com",
      address: "321 Elm St, Houston, TX 77001",
      bloodType: "AB+",
      allergies: "Latex",
      lastVisit: "2025-08-05",
      status: "Active",
      totalAppointments: 6,
      emergencyContact: "David Wilson - +1 (555) 654-3210"
    },
    { 
      id: 5, 
      name: "Robert Brown", 
      age: 52, 
      gender: "Male", 
      phone: "+1 (555) 567-8901", 
      email: "robert.brown@email.com",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      bloodType: "O-",
      allergies: "Aspirin",
      lastVisit: "2025-07-30",
      status: "Inactive",
      totalAppointments: 15,
      emergencyContact: "Mary Brown - +1 (555) 543-2109"
    },
    { 
      id: 6, 
      name: "Emily Davis", 
      age: 29, 
      gender: "Female", 
      phone: "+1 (555) 678-9012", 
      email: "emily.davis@email.com",
      address: "987 Cedar Ln, Seattle, WA 98101",
      bloodType: "A-",
      allergies: "None",
      lastVisit: "2025-08-08",
      status: "Active",
      totalAppointments: 3,
      emergencyContact: "Tom Davis - +1 (555) 432-1098"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [patientStatusFilter, setPatientStatusFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appt.healthConcern.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || appt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
                           patient.phone.includes(patientSearchTerm);
      const matchesStatus = patientStatusFilter === "All" || patient.status === patientStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [patients, patientSearchTerm, patientStatusFilter]);

  // Dynamic counts
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const approvedCount = appointments.filter((a) => a.status === "Approved").length;
  const declinedCount = appointments.filter((a) => a.status === "Declined").length;
  const rescheduledCount = appointments.filter((a) => a.status === "Rescheduled").length;

  // Patient stats
  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === "Active").length;
  const inactivePatients = patients.filter((p) => p.status === "Inactive").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Approved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Declined": return "bg-red-100 text-red-800 border-red-200";
      case "Rescheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Active": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  const closePatientModal = () => {
    setSelectedPatient(null);
    setShowPatientModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">HealthCare Admin</h1>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeSection === "Dashboard"} onClick={() => setActiveSection("Dashboard")} />
          <SidebarLink icon={<CalendarCheck size={20} />} label="Appointments" active={activeSection === "Appointments"} onClick={() => setActiveSection("Appointments")} />
          <SidebarLink icon={<Users size={20} />} label="Patients" active={activeSection === "Patients"} onClick={() => setActiveSection("Patients")} />
          <SidebarLink icon={<FileText size={20} />} label="Reports" active={activeSection === "Reports"} onClick={() => setActiveSection("Reports")} />
          <SidebarLink icon={<Settings size={20} />} label="Settings" active={activeSection === "Settings"} onClick={() => setActiveSection("Settings")} />
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          <SidebarLink icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{activeSection}</h2>
              <p className="text-sm text-gray-600 mt-1">Welcome back, Dr. Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Dr. Admin</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
                <img
                  src="../src/assets/myimage.jpg"
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {activeSection === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <SummaryCard title="Total Appointments" value={totalAppointments} icon={<Calendar className="w-6 h-6 text-blue-600" />} trend="+12%" trendUp={true} />
              <SummaryCard title="Pending Requests" value={pendingCount} icon={<Clock className="w-6 h-6 text-amber-600" />} trend="+3" trendUp={false} />
              <SummaryCard title="Approved" value={approvedCount} icon={<CheckCircle className="w-6 h-6 text-emerald-600" />} trend="+8%" trendUp={true} />
              <SummaryCard title="Rescheduled" value={rescheduledCount} icon={<TrendingUp className="w-6 h-6 text-blue-600" />} trend="0" trendUp={true} />
              <SummaryCard title="Declined" value={declinedCount} icon={<XCircle className="w-6 h-6 text-red-600" />} trend="-2%" trendUp={true} />
            </div>
          )}

          {activeSection === "Appointments" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h3 className="text-lg font-semibold text-gray-900">Appointment Management</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-gray-400" />
                    <select
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="Rescheduled">Rescheduled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Concern</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-600 font-medium text-sm">
                                {appt.patientName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{appt.patientName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appt.date}</div>
                          <div className="text-sm text-gray-500">{appt.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{appt.healthConcern}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(appt.priority)}`}></div>
                            <span className="text-sm text-gray-600">{appt.priority}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(appt.status)}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {appt.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(appt.id, "Approved")}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateStatus(appt.id, "Rescheduled")}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                                >
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => updateStatus(appt.id, "Declined")}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
                                >
                                  Decline
                                </button>
                              </>
                            )}
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-sm">No appointments found matching your criteria.</div>
                </div>
              )}
            </div>
          )}

          {activeSection === "Patients" && (
            <div className="space-y-6">
              {/* Patient Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard title="Total Patients" value={totalPatients} icon={<Users className="w-6 h-6 text-blue-600" />} trend="+5%" trendUp={true} />
                <SummaryCard title="Active Patients" value={activePatients} icon={<CheckCircle className="w-6 h-6 text-emerald-600" />} trend="+3%" trendUp={true} />
                <SummaryCard title="Inactive Patients" value={inactivePatients} icon={<XCircle className="w-6 h-6 text-red-600" />} trend="-1%" trendUp={true} />
              </div>

              {/* Patients Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Management</h3>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        value={patientSearchTerm}
                        onChange={(e) => setPatientSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter size={16} className="text-gray-400" />
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={patientStatusFilter}
                        onChange={(e) => setPatientStatusFilter(e.target.value)}
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors">
                      <UserPlus size={16} className="mr-2" />
                      Add Patient
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Info</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 font-medium">
                                  {patient.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                <div className="text-sm text-gray-500">{patient.age} years old • {patient.gender}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 flex items-center mb-1">
                              <Phone size={14} className="mr-2 text-gray-400" />
                              {patient.phone}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail size={14} className="mr-2 text-gray-400" />
                              {patient.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 mb-1">Blood Type: {patient.bloodType}</div>
                            <div className="text-sm text-gray-500">Allergies: {patient.allergies}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{patient.lastVisit}</div>
                            <div className="text-sm text-gray-500">{patient.totalAppointments} total visits</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => viewPatientDetails(patient)}
                                className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Edit Patient"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Patient"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredPatients.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-sm">No patients found matching your criteria.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "Reports" && (
            <div className="space-y-6">
              {/* Report Filter Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">Healthcare Reports & Analytics</h3>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                    </select>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 transition-colors">
                      <FileText size={16} className="mr-2" />
                      Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title="Total Consultations" 
                  value="1,247" 
                  icon={<Users className="w-6 h-6 text-indigo-600" />} 
                  trend="+12%" 
                  trendUp={true}
                  description="This month"
                />
                <MetricCard 
                  title="Patient Satisfaction" 
                  value="4.8/5" 
                  icon={<CheckCircle className="w-6 h-6 text-blue-600" />} 
                  trend="+0.2" 
                  trendUp={true}
                  description="Average rating"
                />
                <MetricCard 
                  title="Appointment Rate" 
                  value="87%" 
                  icon={<Calendar className="w-6 h-6 text-purple-600" />} 
                  trend="+5%" 
                  trendUp={true}
                  description="Show-up rate"
                />
                <MetricCard 
                  title="Avg Wait Time" 
                  value="12 min" 
                  icon={<Clock className="w-6 h-6 text-amber-600" />} 
                  trend="-2 min" 
                  trendUp={true}
                  description="Patient wait time"
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointments Trend Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">Appointments Trend</h4>
                    <div className="flex space-x-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                        Scheduled
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-1"></div>
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="h-64">
                    <AppointmentChart />
                  </div>
                </div>

                {/* Patient Demographics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Patient Demographics</h4>
                  <div className="space-y-4">
                    <DemographicBar label="Age 18-30" percentage={35} color="bg-blue-500" />
                    <DemographicBar label="Age 31-50" percentage={42} color="bg-emerald-500" />
                    <DemographicBar label="Age 51-70" percentage={18} color="bg-amber-500" />
                    <DemographicBar label="Age 70+" percentage={5} color="bg-red-500" />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">58%</p>
                      <p className="text-sm text-gray-600">Female</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">42%</p>
                      <p className="text-sm text-gray-600">Male</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue and Health Conditions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Flow & Capacity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Monthly Patient Flow</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">January</span>
                      <span className="text-sm font-semibold text-gray-900">2,450 patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">February</span>
                      <span className="text-sm font-semibold text-gray-900">2,180 patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '76%'}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">March</span>
                      <span className="text-sm font-semibold text-gray-900">2,680 patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">April</span>
                      <span className="text-sm font-semibold text-gray-900">2,890 patients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Patient visits increased by 18% this month</span>
                    </div>
                  </div>
                </div>

                {/* Common Health Conditions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Common Health Conditions</h4>
                  <div className="space-y-4">
                    <ConditionItem condition="Hypertension" count={124} percentage={28} />
                    <ConditionItem condition="Diabetes" count={98} percentage={22} />
                    <ConditionItem condition="Respiratory Issues" count={87} percentage={20} />
                    <ConditionItem condition="Heart Disease" count={65} percentage={15} />
                    <ConditionItem condition="Mental Health" count={43} percentage={10} />
                    <ConditionItem condition="Others" count={22} percentage={5} />
                  </div>
                </div>
              </div>

                              {/* Doctor Performance & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Doctor Performance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Doctor Performance</h4>
                  <div className="space-y-4">
                    <DoctorPerformance 
                      name="Dr. Sarah Johnson" 
                      appointments={156} 
                      rating={4.9} 
                      patients="98 patients"
                      avatar="SJ"
                    />
                    <DoctorPerformance 
                      name="Dr. Michael Chen" 
                      appointments={142} 
                      rating={4.8} 
                      patients="89 patients"
                      avatar="MC"
                    />
                    <DoctorPerformance 
                      name="Dr. Emily Davis" 
                      appointments={138} 
                      rating={4.7} 
                      patients="85 patients"
                      avatar="ED"
                    />
                    <DoctorPerformance 
                      name="Dr. Robert Wilson" 
                      appointments={129} 
                      rating={4.8} 
                      patients="76 patients"
                      avatar="RW"
                    />
                  </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h4>
                  <div className="space-y-4">
                    <ActivityItem 
                      action="New patient registered"
                      patient="John Smith"
                      time="2 hours ago"
                      type="success"
                    />
                    <ActivityItem 
                      action="Appointment completed"
                      patient="Sarah Wilson"
                      time="4 hours ago"
                      type="info"
                    />
                    <ActivityItem 
                      action="Payment received"
                      patient="Michael Brown"
                      time="6 hours ago"
                      type="success"
                    />
                    <ActivityItem 
                      action="Appointment cancelled"
                      patient="Emily Johnson"
                      time="8 hours ago"
                      type="warning"
                    />
                    <ActivityItem 
                      action="Medical report generated"
                      patient="Robert Davis"
                      time="1 day ago"
                      type="info"
                    />
                  </div>
                  <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    View all activities →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Settings" && (
            <div className="space-y-6">
              {/* Settings Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Settings">
                    <button
                      onClick={() => setActiveSettingsTab("general")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeSettingsTab === "general"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      General
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("users")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeSettingsTab === "users"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      User Management
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("notifications")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeSettingsTab === "notifications"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Notifications
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("security")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeSettingsTab === "security"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Security
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("system")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeSettingsTab === "system"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      System
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {/* General Settings */}
                  {activeSettingsTab === "general" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Clinic Name
                            </label>
                            <input
                              type="text"
                              defaultValue="9ja Healthcare Center"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              defaultValue="+234 123 456 7890"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Address
                            </label>
                            <textarea
                              rows={3}
                              defaultValue="123 Health Street, Abuja, FCT, Nigeria"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
                        <div className="space-y-4">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <div key={day} className="flex items-center space-x-4">
                              <div className="w-24 text-sm font-medium text-gray-700">{day}</div>
                              <input
                                type="time"
                                defaultValue="09:00"
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                              <span className="text-gray-500">to</span>
                              <input
                                type="time"
                                defaultValue={day === "Saturday" ? "14:00" : day === "Sunday" ? "12:00" : "17:00"}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={day !== "Sunday"}
                                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Open</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* User Management */}
                  {activeSettingsTab === "users" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors flex items-center">
                          <UserPlus size={16} className="mr-2" />
                          Add User
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <UserRow
                              name="Dr. Sarah Johnson"
                              email="sarah.johnson@9ja-clinic.com"
                              role="Doctor"
                              status="Active"
                              lastLogin="2 hours ago"
                              avatar="SJ"
                            />
                            <UserRow
                              name="Nurse Mary Okafor"
                              email="mary.okafor@9ja-clinic.com"
                              role="Nurse"
                              status="Active"
                              lastLogin="1 hour ago"
                              avatar="MO"
                            />
                            <UserRow
                              name="Admin John Doe"
                              email="admin@9ja-clinic.com"
                              role="Administrator"
                              status="Active"
                              lastLogin="30 min ago"
                              avatar="JD"
                            />
                            <UserRow
                              name="Dr. Michael Chen"
                              email="michael.chen@9ja-clinic.com"
                              role="Doctor"
                              status="Inactive"
                              lastLogin="2 days ago"
                              avatar="MC"
                            />
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Role Permissions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <RoleCard
                            title="Administrator"
                            description="Full system access and user management"
                            permissions={["All Permissions", "User Management", "System Settings", "Reports Access"]}
                            color="bg-red-100 text-red-800"
                          />
                          <RoleCard
                            title="Doctor"
                            description="Patient management and medical records"
                            permissions={["Patient Records", "Appointments", "Medical Reports", "Prescriptions"]}
                            color="bg-blue-100 text-blue-800"
                          />
                          <RoleCard
                            title="Nurse"
                            description="Patient care and appointment assistance"
                            permissions={["Patient Info", "Appointments", "Basic Reports", "Schedule Management"]}
                            color="bg-emerald-100 text-emerald-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {activeSettingsTab === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
                          <div className="space-y-3">
                            <NotificationToggle
                              title="New Appointment Requests"
                              description="Get notified when patients book new appointments"
                              defaultChecked={true}
                            />
                            <NotificationToggle
                              title="Appointment Cancellations"
                              description="Receive alerts when appointments are cancelled"
                              defaultChecked={true}
                            />
                            <NotificationToggle
                              title="System Updates"
                              description="Stay informed about system maintenance and updates"
                              defaultChecked={false}
                            />
                            <NotificationToggle
                              title="Daily Reports"
                              description="Receive daily summary reports via email"
                              defaultChecked={true}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-3">SMS Notifications</h4>
                          <div className="space-y-3">
                            <NotificationToggle
                              title="Emergency Appointments"
                              description="SMS alerts for urgent medical appointments"
                              defaultChecked={true}
                            />
                            <NotificationToggle
                              title="Patient No-Shows"
                              description="Get SMS when patients miss appointments"
                              defaultChecked={false}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
                          <div className="space-y-3">
                            <NotificationToggle
                              title="Real-time Updates"
                              description="Instant notifications for important events"
                              defaultChecked={true}
                            />
                            <NotificationToggle
                              title="Appointment Reminders"
                              description="Push reminders before scheduled appointments"
                              defaultChecked={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSettingsTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Password Policy</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Require 8+ characters</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Require numbers</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Require special characters</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Session Security</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Session Timeout (minutes)
                              </label>
                              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                <option>15</option>
                                <option selected>30</option>
                                <option>60</option>
                                <option>120</option>
                              </select>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Enable two-factor authentication</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">Log all user activities</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-2">Data Privacy & HIPAA Compliance</h4>
                        <div className="space-y-2">
                          <div>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="rounded border-red-300 text-red-600 focus:ring-red-500" />
                              <span className="ml-2 text-sm text-red-700">Enable audit logging for patient data access</span>
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="rounded border-red-300 text-red-600 focus:ring-red-500" />
                              <span className="ml-2 text-sm text-red-700">Encrypt all patient data at rest</span>
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="rounded border-red-300 text-red-600 focus:ring-red-500" />
                              <span className="ml-2 text-sm text-red-700">Automatic data backup every 6 hours</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors">
                          Update Security Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {/* System Settings */}
                  {activeSettingsTab === "system" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Appearance</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Theme
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                              <option selected>Light</option>
                              <option>Dark</option>
                              <option>Auto (System)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Language
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                              <option selected>English</option>
                              <option>Hausa</option>
                              <option>Yoruba</option>
                              <option>Igbo</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Regional Settings</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timezone
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                              <option selected>West Africa Time (WAT)</option>
                              <option>Greenwich Mean Time (GMT)</option>
                              <option>Central European Time (CET)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date Format
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                              <option>DD/MM/YYYY</option>
                              <option selected>MM/DD/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">System Maintenance</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-medium text-blue-800 mb-2">Database Backup</h5>
                            <p className="text-sm text-blue-700 mb-3">Last backup: 2 hours ago</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                              Run Backup Now
                            </button>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-medium text-green-800 mb-2">System Health</h5>
                            <p className="text-sm text-green-700 mb-3">All systems operational</p>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors">
                          Save System Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium text-lg">
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h3>
                  <p className="text-sm text-gray-500">Patient ID: #{selectedPatient.id}</p>
                </div>
              </div>
              <button
                onClick={closePatientModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-gray-900">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Age</label>
                      <p className="text-gray-900">{selectedPatient.age} years old</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gender</label>
                      <p className="text-gray-900">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                      <p className="text-gray-900 flex items-center">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {selectedPatient.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <p className="text-gray-900 flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        {selectedPatient.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="text-gray-900 flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {selectedPatient.address}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                      <p className="text-gray-900">{selectedPatient.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Medical Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Blood Type</label>
                      <p className="text-gray-900">{selectedPatient.bloodType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Allergies</label>
                      <p className="text-gray-900">{selectedPatient.allergies}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Visit</label>
                      <p className="text-gray-900">{selectedPatient.lastVisit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Total Appointments</label>
                      <p className="text-gray-900">{selectedPatient.totalAppointments}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                      <Calendar size={16} className="mr-2" />
                      Schedule Appointment
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <FileText size={16} className="mr-2" />
                      View Medical Records
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit size={16} className="mr-2" />
                      Edit Patient Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
      active 
        ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600" 
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const SummaryCard = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
            {trendUp ? '↗' : '↘'} {trend} from last month
          </p>
        )}
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const MetricCard = ({ title, value, icon, trend, trendUp, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trendUp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const DemographicBar = ({ label, percentage, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">{label}</span>
    <div className="flex items-center ml-4">
      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
        <div className={`h-2 rounded-full ${color}`} style={{width: `${percentage}%`}}></div>
      </div>
      <span className="text-sm font-semibold text-gray-900 min-w-0">{percentage}%</span>
    </div>
  </div>
);

const ConditionItem = ({ condition, count, percentage }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center">
      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
      <span className="text-sm font-medium text-gray-700">{condition}</span>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-500">{count} patients</span>
      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
    </div>
  </div>
);

const DoctorPerformance = ({ name, appointments, rating, patients, avatar }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
        <span className="text-indigo-600 font-medium text-sm">{avatar}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{appointments} appointments</p>
      </div>
    </div>
    <div className="text-right">
      <div className="flex items-center mb-1">
        <span className="text-sm font-semibold text-gray-900 mr-1">{rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-indigo-600 font-medium">{patients}</p>
    </div>
  </div>
);

const ActivityItem = ({ action, patient, time, type }) => {
  const getTypeColor = () => {
    switch(type) {
      case 'success': return 'bg-emerald-100 text-emerald-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-start space-x-3 py-2">
      <div className={`w-2 h-2 rounded-full mt-2 ${
        type === 'success' ? 'bg-emerald-500' : 
        type === 'warning' ? 'bg-amber-500' : 
        type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
      }`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-medium">{action}</span>
          {patient && <span className="text-gray-600"> - {patient}</span>}
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

const AppointmentChart = () => {
  const data = [
    { day: 'Mon', scheduled: 45, completed: 42 },
    { day: 'Tue', scheduled: 52, completed: 48 },
    { day: 'Wed', scheduled: 38, completed: 35 },
    { day: 'Thu', scheduled: 61, completed: 58 },
    { day: 'Fri', scheduled: 55, completed: 51 },
    { day: 'Sat', scheduled: 28, completed: 25 },
    { day: 'Sun', scheduled: 15, completed: 14 },
  ];

  const maxValue = Math.max(...data.flatMap(d => [d.scheduled, d.completed]));

  return (
    <div className="flex items-end justify-between h-full space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1 h-full">
          <div className="flex-1 flex flex-col justify-end w-full space-y-1">
            <div 
              className="bg-blue-500 rounded-t-sm min-h-[4px]" 
              style={{height: `${(item.scheduled / maxValue) * 80}%`}}
              title={`Scheduled: ${item.scheduled}`}
            ></div>
            <div 
              className="bg-emerald-500 rounded-t-sm min-h-[4px]" 
              style={{height: `${(item.completed / maxValue) * 80}%`}}
              title={`Completed: ${item.completed}`}
            ></div>
          </div>
          <span className="text-xs text-gray-600 mt-2">{item.day}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;