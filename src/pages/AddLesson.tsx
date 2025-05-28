
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AddLesson = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [classroom, setClassroom] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !date || !startTime || !endTime || !classroom) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving the lesson
    const lessonData = {
      subject,
      description,
      date: date.toISOString(),
      startTime,
      endTime,
      classroom,
      id: Date.now()
    };

    // In a real app, this would be sent to an API
    const existingLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    existingLessons.push(lessonData);
    localStorage.setItem('lessons', JSON.stringify(existingLessons));

    toast({
      title: "Lesson scheduled!",
      description: `${subject} has been added to your schedule.`,
    });

    navigate('/dashboard');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 mx-auto">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Schedule New Lesson</CardTitle>
            <CardDescription className="text-lg">
              Add a new lesson to your teaching schedule
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-12 text-base rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the lesson topic..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-20 text-base rounded-lg resize-none"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal rounded-lg",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-base font-medium">
                    Start Time *
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="h-12 pl-10 text-base rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-base font-medium">
                    End Time *
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="h-12 pl-10 text-base rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Classroom */}
              <div className="space-y-2">
                <Label htmlFor="classroom" className="text-base font-medium">
                  Classroom *
                </Label>
                <Input
                  id="classroom"
                  placeholder="e.g., Room 201, Lab 1, Auditorium"
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                  className="h-12 text-base rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium rounded-lg"
                >
                  Schedule Lesson
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddLesson;
