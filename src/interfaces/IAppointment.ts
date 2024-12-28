export default interface IAppointment {
  userId: number;
  professionalId: number;
  serviceId: number;
  availabilityId: number;
  details?: string;
  status: string;
}
