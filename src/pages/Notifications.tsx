
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'Upcoming Lesson Reminder',
      message: 'Mathematics lesson starts in 30 minutes in Room 201',
      time: '30 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'schedule',
      title: 'Schedule Updated',
      message: 'Your Physics lesson has been moved to Lab 2',
      time: '2 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'completed',
      title: 'Lesson Completed',
      message: 'Chemistry lesson in Lab 1 has been marked as completed',
      time: '5 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Weekly Summary',
      message: 'Your teaching summary for this week is ready to view',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'schedule':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Notifications
        </h1>
        <p className="text-gray-600">
          Stay updated with your latest activities and reminders.
        </p>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Recent Notifications
          </CardTitle>
          <CardDescription>
            Your latest updates and reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-blue-200 shadow-sm'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium ${
                    notification.read ? 'text-gray-700' : 'text-gray-900'
                  }`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={getPriorityColor(notification.priority)}
                    >
                      {notification.priority}
                    </Badge>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${
                  notification.read ? 'text-gray-500' : 'text-gray-700'
                }`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
