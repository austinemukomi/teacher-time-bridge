
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO, differenceInMinutes } from 'date-fns';

interface Notification {
  id: number;
  lessonId: number;
  message: string;
  type: string;
  createdAt: string;
  lesson: {
    subject: string;
    startTime: string;
    classroom: string;
    date: string;
    description: string;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('teacher_token');
      if (!token) {
        return;
      }

      const response = await fetch('http://localhost:8080/api/lessons/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (lessonDateTime: Date) => {
    const diffMinutes = differenceInMinutes(lessonDateTime, new Date());
    
    if (diffMinutes <= 10 && diffMinutes > 0) {
      return 'bg-red-100 text-red-800';
    } else if (diffMinutes <= 30 && diffMinutes > 10) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityText = (lessonDateTime: Date) => {
    const diffMinutes = differenceInMinutes(lessonDateTime, new Date());
    
    if (diffMinutes <= 10 && diffMinutes > 0) {
      return 'urgent';
    } else if (diffMinutes <= 30 && diffMinutes > 10) {
      return 'soon';
    } else {
      return 'scheduled';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

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
            Lesson Reminders
          </CardTitle>
          <CardDescription>
            Your upcoming lesson notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const lessonDateTime = parseISO(`${notification.lesson.date}T${notification.lesson.startTime}`);
              const diffMinutes = differenceInMinutes(lessonDateTime, new Date());
              const isActive = diffMinutes > 0 && diffMinutes <= 60;
              
              return (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                    isActive 
                      ? 'bg-white border-blue-200 shadow-sm' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium ${
                        isActive ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.lesson.subject} - {notification.lesson.classroom}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={getPriorityColor(lessonDateTime)}
                        >
                          {getPriorityText(lessonDateTime)}
                        </Badge>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${
                      isActive ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {notification.lesson.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <p className="text-xs text-gray-400">
                        {format(lessonDateTime, 'MMM dd, yyyy')} at {notification.lesson.startTime}
                      </p>
                      {diffMinutes > 0 && (
                        <p className="text-xs text-blue-600 font-medium">
                          Starts in {diffMinutes} minutes
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No notifications</p>
              <p className="text-sm text-gray-400">You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
