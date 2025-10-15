import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useReservation } from "@/_shared/hooks/useReservation";

const formatDateToString = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function ReservationComponent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState("");
  const [date, setDate] = useState<string>("");

  const { loading, error, data, submitReservation } = useReservation();

  const handleSubmit = async () => {
    await submitReservation({
      name,
      phone,
      guests: Number(guests),
      time,
      date,
    });

    if (!error) {
      setName("");
      setPhone("");
      setGuests("2");
      setTime("");
      setDate("");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaRegCalendarAlt className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Reservations</h1>
          </div>
          <p className="text-muted-foreground">Book your table in advance</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Reserve a Table
            </CardTitle>
            <CardDescription>
              Fill in your details to reserve a table at our coffee shop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {error && (
                <div className="p-2 text-red-600 text-sm text-center border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name*
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone*
                </Label>
                <Input
                  id="phone"
                  placeholder="111 111 111"
                  value={phone}
                  onChange={(e) => {
                    const input = e.target.value;
                    const formatted = input
                      .replace(/\D/g, "")
                      .substring(0, 9)
                      .replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
                        [a, b, c].filter(Boolean).join(" ")
                      );
                    setPhone(formatted);
                  }}
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-10 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date || <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date ? new Date(date) : undefined}
                        onSelect={(d) => d && setDate(formatDateToString(d))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time*
                  </Label>
                  <Select onValueChange={setTime} value={time}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "9:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 PM",
                        "1:00 PM",
                        "2:00 PM",
                        "3:00 PM",
                        "4:00 PM",
                        "5:00 PM",
                        "6:00 PM",
                      ].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm font-medium">
                  Number of Guests*
                </Label>
                <Select onValueChange={setGuests} value={guests}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(6)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        {i + 1} {i === 0 ? "guest" : "guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-11 text-base"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Confirm Reservation"}
              </Button>

              {data && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-primary text-sm font-medium text-center flex items-center justify-center gap-2">
                    <span className="text-lg">✓</span>
                    Your table has been reserved successfully!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
