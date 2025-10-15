import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Mail,
  Phone,
  User,
  Clock,
  Users,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function AdminPanelComponent() {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
    fetchContacts();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reservations");
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "new":
        return "default";
      case "replied":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "new":
        return <AlertCircle className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const updateReservationStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      setSelectedReservation(null);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const updateContactStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setContacts(
        contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setSelectedContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const filteredReservations = reservations.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date?.includes(searchTerm)
  );

  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalReservations: reservations.length,
    confirmedReservations: reservations.filter((r) => r.status === "confirmed")
      .length,
    pendingReservations: reservations.filter((r) => r.status === "pending")
      .length,
    newContacts: contacts.filter((c) => c.status === "new").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage reservations and customer inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalReservations}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.confirmedReservations}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary/70">
                {stats.pendingReservations}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.newContacts}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, email, date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="reservations"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Reservations</CardTitle>
                <CardDescription>
                  View and manage all table reservations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReservations.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No reservations found
                    </p>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <Card
                        key={reservation.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold">
                                  {reservation.name}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {reservation.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {reservation.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {reservation.guests} guests
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={getStatusColor(reservation.status)}
                                className="flex items-center gap-1"
                              >
                                {getStatusIcon(reservation.status)}
                                {reservation.status}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSelectedReservation(reservation)
                                }
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>
                  Customer inquiries and messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContacts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No contact messages found
                    </p>
                  ) : (
                    filteredContacts.map((contact) => (
                      <Card
                        key={contact.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold">
                                  {contact.name}
                                </span>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {contact.email}
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {contact.phone}
                                  </div>
                                )}
                              </div>
                              <p className="font-medium text-sm">
                                {contact.subject}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={getStatusColor(contact.status)}
                                className="flex items-center gap-1"
                              >
                                {getStatusIcon(contact.status)}
                                {contact.status}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog
          open={selectedReservation !== null}
          onOpenChange={() => setSelectedReservation(null)}
        >
          <DialogContent className="max-w-2xl">
            {selectedReservation && (
              <>
                <DialogHeader>
                  <DialogTitle>Reservation Details</DialogTitle>
                  <DialogDescription>
                    ID: #{selectedReservation.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">
                          {selectedReservation.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {selectedReservation.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {selectedReservation.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Guests</p>
                        <p className="font-medium">
                          {selectedReservation.guests}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Status
                    </p>
                    <Badge
                      variant={getStatusColor(selectedReservation.status)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getStatusIcon(selectedReservation.status)}
                      {selectedReservation.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateReservationStatus(
                          selectedReservation.id,
                          "confirmed"
                        )
                      }
                      variant="default"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() =>
                        updateReservationStatus(
                          selectedReservation.id,
                          "pending"
                        )
                      }
                      variant="secondary"
                    >
                      Set Pending
                    </Button>
                    <Button
                      onClick={() =>
                        updateReservationStatus(
                          selectedReservation.id,
                          "cancelled"
                        )
                      }
                      variant="destructive"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={selectedContact !== null}
          onOpenChange={() => setSelectedContact(null)}
        >
          <DialogContent className="max-w-2xl">
            {selectedContact && (
              <>
                <DialogHeader>
                  <DialogTitle>Contact Message</DialogTitle>
                  <DialogDescription>
                    ID: #{selectedContact.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedContact.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedContact.email}</p>
                      </div>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{selectedContact.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Subject
                    </p>
                    <p className="font-medium">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Message
                    </p>
                    <p className="text-sm bg-muted p-4 rounded-lg">
                      {selectedContact.message}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge
                      variant={getStatusColor(selectedContact.status)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getStatusIcon(selectedContact.status)}
                      {selectedContact.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateContactStatus(selectedContact.id, "replied")
                      }
                      variant="default"
                    >
                      Mark as Replied
                    </Button>
                    <Button
                      onClick={() =>
                        updateContactStatus(selectedContact.id, "new")
                      }
                      variant="secondary"
                    >
                      Mark as New
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
