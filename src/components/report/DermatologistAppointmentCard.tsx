import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, User, Phone, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DetectedDisease } from "@/types/report";

interface DermatologistAppointmentCardProps {
  diseases: DetectedDisease[];
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const specialists = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    location: "Skin Care Clinic, Downtown",
    rating: 4.9,
    available: true,
  },
  {
    name: "Dr. Michael Park",
    specialty: "Cosmetic Dermatologist",
    location: "Beauty Med Center",
    rating: 4.8,
    available: true,
  },
  {
    name: "Dr. Emily Roberts",
    specialty: "Medical Dermatologist",
    location: "City Hospital Dermatology",
    rating: 4.7,
    available: false,
  },
];

export const DermatologistAppointmentCard = ({
  diseases,
}: DermatologistAppointmentCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  // Get unique specialists from detected diseases
  const requiredSpecialists = [...new Set(
    diseases
      .filter((d) => d.requires_medical_attention)
      .map((d) => d.recommended_specialist.replace(/_/g, " "))
  )];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedSpecialist) {
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <Card className="shadow-card border-border/50 bg-gradient-to-br from-score-excellent/5 to-score-good/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-score-excellent/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-score-excellent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Appointment Booked!
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                {selectedTime}
              </p>
              <p className="flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                {selectedSpecialist}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsBooked(false)}
              className="mt-4"
            >
              Reschedule
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-category-medical" />
          Book Dermatologist Appointment
          {requiredSpecialists.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              Recommended
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Required specialists notice */}
        {requiredSpecialists.length > 0 && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <p className="font-medium mb-1">Medical attention recommended for:</p>
            <div className="flex flex-wrap gap-1">
              {requiredSpecialists.map((spec, i) => (
                <Badge key={i} variant="outline" className="capitalize text-destructive border-destructive/30">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Date Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-xs"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Specialists */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Specialist</label>
          <div className="space-y-2">
            {specialists.map((specialist) => (
              <div
                key={specialist.name}
                onClick={() => specialist.available && setSelectedSpecialist(specialist.name)}
                className={cn(
                  "p-3 rounded-xl border transition-all cursor-pointer",
                  selectedSpecialist === specialist.name
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : specialist.available
                    ? "border-border/50 hover:border-primary/50"
                    : "border-border/30 opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{specialist.name}</p>
                    <p className="text-xs text-muted-foreground">{specialist.specialty}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {specialist.location}
                    </p>
                  </div>
                  <Badge
                    variant={specialist.available ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {specialist.available ? `★ ${specialist.rating}` : "Unavailable"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <Button
          className="w-full"
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTime || !selectedSpecialist}
        >
          <Phone className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
};
