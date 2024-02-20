declare type AppointmentRepository = any;
// AppointmentScheduler.ts
interface Appointment {
  doctorId: number;
  patientId: number;
  date: Date;
}

interface AppointmentScheduler {
  schedule(appointment: Appointment): Promise<boolean>;
}

class AppointmentServiceImpl implements AppointmentScheduler {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async schedule(appointment: Appointment): Promise<boolean> {
    if (await this.appointmentRepository.existsByDate(appointment.doctorId, appointment.date)) {
      return false; // Slot already booked
    }

    await this.appointmentRepository.create(appointment);

    return true; // Appointment created successfully
  }
}