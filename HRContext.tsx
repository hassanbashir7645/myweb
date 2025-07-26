import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  createdDate: string;
}

interface TaskRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

interface Recognition {
  id: string;
  employeeName: string;
  recognizedBy: string;
  achievement: string;
  description: string;
  date: string;
  type: 'Employee of the Month' | 'Outstanding Performance' | 'Team Player' | 'Innovation';
}

interface LogisticsItem {
  id: string;
  item: string;
  category: string;
  quantity: number;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Unavailable';
  assignedTo?: string;
  lastUpdated: string;
}

interface OnboardingItem {
  id: string;
  employeeName: string;
  position: string;
  department: string;
  startDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  completionPercentage: number;
}

interface PsychometricTest {
  id: string;
  testName: string;
  employeeName: string;
  testType: string;
  score: number;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Pending';
}

interface HRContextType {
  employees: Employee[];
  departments: Department[];
  tasks: Task[];
  taskRequests: TaskRequest[];
  announcements: Announcement[];
  recognitions: Recognition[];
  logistics: LogisticsItem[];
  onboarding: OnboardingItem[];
  psychometricTests: PsychometricTest[];
  
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, department: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  
  addTask: (task: Omit<Task, 'id' | 'createdDate'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addTaskRequest: (request: Omit<TaskRequest, 'id' | 'requestDate'>) => void;
  updateTaskRequest: (id: string, request: Partial<TaskRequest>) => void;
  deleteTaskRequest: (id: string) => void;
  
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  
  addRecognition: (recognition: Omit<Recognition, 'id' | 'date'>) => void;
  updateRecognition: (id: string, recognition: Partial<Recognition>) => void;
  deleteRecognition: (id: string) => void;
  
  addLogisticsItem: (item: Omit<LogisticsItem, 'id' | 'lastUpdated'>) => void;
  updateLogisticsItem: (id: string, item: Partial<LogisticsItem>) => void;
  deleteLogisticsItem: (id: string) => void;
  
  addOnboardingItem: (item: Omit<OnboardingItem, 'id'>) => void;
  updateOnboardingItem: (id: string, item: Partial<OnboardingItem>) => void;
  deleteOnboardingItem: (id: string) => void;
  
  addPsychometricTest: (test: Omit<PsychometricTest, 'id'>) => void;
  updatePsychometricTest: (id: string, test: Partial<PsychometricTest>) => void;
  deletePsychometricTest: (id: string) => void;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};

export const HRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load data from localStorage or use empty arrays as default
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('hr-employees');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('hr-departments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('hr-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [taskRequests, setTaskRequests] = useState<TaskRequest[]>(() => {
    const saved = localStorage.getItem('hr-taskRequests');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('hr-announcements');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [recognitions, setRecognitions] = useState<Recognition[]>(() => {
    const saved = localStorage.getItem('hr-recognitions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [logistics, setLogistics] = useState<LogisticsItem[]>(() => {
    const saved = localStorage.getItem('hr-logistics');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [onboarding, setOnboarding] = useState<OnboardingItem[]>(() => {
    const saved = localStorage.getItem('hr-onboarding');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [psychometricTests, setPsychometricTests] = useState<PsychometricTest[]>(() => {
    const saved = localStorage.getItem('hr-psychometricTests');
    return saved ? JSON.parse(saved) : [];
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('hr-employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('hr-departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('hr-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('hr-taskRequests', JSON.stringify(taskRequests));
  }, [taskRequests]);

  useEffect(() => {
    localStorage.setItem('hr-announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('hr-recognitions', JSON.stringify(recognitions));
  }, [recognitions]);

  useEffect(() => {
    localStorage.setItem('hr-logistics', JSON.stringify(logistics));
  }, [logistics]);

  useEffect(() => {
    localStorage.setItem('hr-onboarding', JSON.stringify(onboarding));
  }, [onboarding]);

  useEffect(() => {
    localStorage.setItem('hr-psychometricTests', JSON.stringify(psychometricTests));
  }, [psychometricTests]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Employee functions
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    setEmployees(prev => [...prev, { ...employee, id: generateId() }]);
  };

  const updateEmployee = (id: string, employee: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...employee } : emp));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // Department functions
  const addDepartment = (department: Omit<Department, 'id'>) => {
    setDepartments(prev => [...prev, { ...department, id: generateId() }]);
  };

  const updateDepartment = (id: string, department: Partial<Department>) => {
    setDepartments(prev => prev.map(dept => dept.id === id ? { ...dept, ...department } : dept));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  // Task functions
  const addTask = (task: Omit<Task, 'id' | 'createdDate'>) => {
    setTasks(prev => [...prev, { ...task, id: generateId(), createdDate: new Date().toISOString().split('T')[0] }]);
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...task } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Task Request functions
  const addTaskRequest = (request: Omit<TaskRequest, 'id' | 'requestDate'>) => {
    setTaskRequests(prev => [...prev, { ...request, id: generateId(), requestDate: new Date().toISOString().split('T')[0] }]);
  };

  const updateTaskRequest = (id: string, request: Partial<TaskRequest>) => {
    setTaskRequests(prev => prev.map(req => req.id === id ? { ...req, ...request } : req));
  };

  const deleteTaskRequest = (id: string) => {
    setTaskRequests(prev => prev.filter(req => req.id !== id));
  };

  // Announcement functions
  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'date'>) => {
    setAnnouncements(prev => [...prev, { ...announcement, id: generateId(), date: new Date().toISOString().split('T')[0] }]);
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(ann => ann.id === id ? { ...ann, ...announcement } : ann));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
  };

  // Recognition functions
  const addRecognition = (recognition: Omit<Recognition, 'id' | 'date'>) => {
    setRecognitions(prev => [...prev, { ...recognition, id: generateId(), date: new Date().toISOString().split('T')[0] }]);
  };

  const updateRecognition = (id: string, recognition: Partial<Recognition>) => {
    setRecognitions(prev => prev.map(rec => rec.id === id ? { ...rec, ...recognition } : rec));
  };

  const deleteRecognition = (id: string) => {
    setRecognitions(prev => prev.filter(rec => rec.id !== id));
  };

  // Logistics functions
  const addLogisticsItem = (item: Omit<LogisticsItem, 'id' | 'lastUpdated'>) => {
    setLogistics(prev => [...prev, { ...item, id: generateId(), lastUpdated: new Date().toISOString().split('T')[0] }]);
  };

  const updateLogisticsItem = (id: string, item: Partial<LogisticsItem>) => {
    setLogistics(prev => prev.map(log => log.id === id ? { ...log, ...item, lastUpdated: new Date().toISOString().split('T')[0] } : log));
  };

  const deleteLogisticsItem = (id: string) => {
    setLogistics(prev => prev.filter(log => log.id !== id));
  };

  // Onboarding functions
  const addOnboardingItem = (item: Omit<OnboardingItem, 'id'>) => {
    setOnboarding(prev => [...prev, { ...item, id: generateId() }]);
  };

  const updateOnboardingItem = (id: string, item: Partial<OnboardingItem>) => {
    setOnboarding(prev => prev.map(ob => ob.id === id ? { ...ob, ...item } : ob));
  };

  const deleteOnboardingItem = (id: string) => {
    setOnboarding(prev => prev.filter(ob => ob.id !== id));
  };

  // Psychometric Test functions
  const addPsychometricTest = (test: Omit<PsychometricTest, 'id'>) => {
    setPsychometricTests(prev => [...prev, { ...test, id: generateId() }]);
  };

  const updatePsychometricTest = (id: string, test: Partial<PsychometricTest>) => {
    setPsychometricTests(prev => prev.map(t => t.id === id ? { ...t, ...test } : t));
  };

  const deletePsychometricTest = (id: string) => {
    setPsychometricTests(prev => prev.filter(t => t.id !== id));
  };

  const value: HRContextType = {
    employees,
    departments,
    tasks,
    taskRequests,
    announcements,
    recognitions,
    logistics,
    onboarding,
    psychometricTests,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addTask,
    updateTask,
    deleteTask,
    addTaskRequest,
    updateTaskRequest,
    deleteTaskRequest,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addRecognition,
    updateRecognition,
    deleteRecognition,
    addLogisticsItem,
    updateLogisticsItem,
    deleteLogisticsItem,
    addOnboardingItem,
    updateOnboardingItem,
    deleteOnboardingItem,
    addPsychometricTest,
    updatePsychometricTest,
    deletePsychometricTest,
  };

  return <HRContext.Provider value={value}>{children}</HRContext.Provider>;
};