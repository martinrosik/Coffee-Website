import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Mail,
  Phone,
  Clock,
  Users,
  Search,
  Trash2,
} from "lucide-react";

import { useAdminData } from "@/_shared/hooks/useAdminData";

export default function AdminPanelComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    reservations,
    contacts,
    loading,
    error,
    deleteReservation,
    deleteContact,
  } = useAdminData();

  const filteredReservations = reservations.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.includes(searchTerm)
  );

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Banners */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-primary text-white">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm">Total Reservations</p>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </div>
              <Calendar className="w-8 h-8 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardContent className="flex items-center justify-between">
              <div className="text-brown-700">
                <p className="text-sm">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <Mail className="w-8 h-8 opacity-70 text-brown-700" />
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, email, date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reservations">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="reservations"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Reservations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact Messages
            </TabsTrigger>
          </TabsList>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <div className="space-y-4">
              {filteredReservations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reservations found
                </p>
              ) : (
                filteredReservations.map((reservation, index) => (
                  <Card
                    key={reservation.id ?? `reservation-${index}`}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{reservation.name}</p>
                        <div className="text-sm text-muted-foreground flex gap-4">
                          <span>
                            <Calendar className="w-4 h-4" /> {reservation.date}
                          </span>
                          <span>
                            <Clock className="w-4 h-4" /> {reservation.time}
                          </span>
                          <span>
                            <Users className="w-4 h-4" /> {reservation.guests}{" "}
                            guests
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteReservation(reservation.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="space-y-4">
              {filteredContacts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No contact messages found
                </p>
              ) : (
                filteredContacts.map((contact, index) => (
                  <Card
                    key={contact.id ?? `contact-${index}`}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <div className="text-sm text-muted-foreground flex gap-4">
                          <span>
                            <Mail className="w-4 h-4" /> {contact.email}
                          </span>
                          {contact.phone && (
                            <span>
                              <Phone className="w-4 h-4" /> {contact.phone}
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-sm">{contact.subject}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteContact(contact.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
