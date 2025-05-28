
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Calendar, Bell, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const teacherName = localStorage.getItem('teacher_name') || 'Teacher';

  // Sample data for demonstration
  const upcomingLessons = [
    {
      id: 1,
      subject: 'Mathematics',
      time: '10:00 AM',
      classroom: 'Room 201',
      description: 'Algebra fundamentals',
      timeUntil: '2 hours'
    },
    {
      id: 2,
      subject: 'Physics',
      time: '2:00 PM',
      classroom: 'Lab 1',
      description: 'Newton\'s Laws',
      timeUntil: '6 hours'
    }
  ];

  const todayStats = {
    totalLessons: 3,
    completed: 1,
    upcoming: 2,
    nextLesson: 'Mathematics at 10:00 AM'
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {teacherName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your schedule today.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/add-lesson')}
          className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Lessons
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{todayStats.totalLessons}</div>
            <p className="text-xs text-gray-600 mt-1">
              {todayStats.completed} completed, {todayStats.upcoming} upcoming
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Next Lesson
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">10:00 AM</div>
            <p className="text-xs text-gray-600 mt-1">
              Mathematics - Room 201
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Week
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-gray-600 mt-1">
              Total lessons scheduled
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Reminders
            </CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <p className="text-xs text-gray-600 mt-1">
              Upcoming notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Lessons */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Upcoming Lessons
            </CardTitle>
            <CardDescription>
              Your next scheduled classes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lesson.subject}</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.time}
                        </span>
                        <span className="text-sm text-gray-500">
                          {lesson.classroom}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="ml-4">
                  in {lesson.timeUntil}
                </Badge>
              </div>
            ))}
            {upcomingLessons.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No upcoming lessons today</p>
                <Button 
                  onClick={() => navigate('/add-lesson')}
                  variant="outline"
                >
                  Schedule Your First Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-600" />
              Notifications
            </CardTitle>
            <CardDescription>
              Recent updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Mathematics lesson starting soon
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Your next class begins in 2 hours
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Week summary ready
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Your teaching report is available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
