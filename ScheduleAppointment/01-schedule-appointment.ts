declare function makeSecurePaymentRequest(url: string, payment: Payment): Promise<{ success: boolean, errorMessage: string }>;
declare function findAppointmentByDate(doctorId: number, date: Date): boolean;
declare function createAppointment(doctorId: number, patientId: number, date: Date): void;

function scheduleAppointment(doctorId: number, patientId: number, date: Date) {
  // Direct database access (not recommended)
  const existingAppointment = findAppointmentByDate(doctorId, date);

  if (existingAppointment) {
    throw new Error("Slot already booked");
  }

  createAppointment(doctorId, patientId, date);

  return true; // Appointment created successfully
}