import type { ReactNode } from "react";

export interface Service {
  title: string;
  icon: ReactNode;
  desc: string;
}

export interface Course {
  id: string;
  title: string;
  abbreviation: string;
  tagline: string;
  description: string;
  icon: ReactNode;
  topics: string[];
  duration: string;
  level: string;
  color: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  course?: string;
  message: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}

export interface CreateContactResponse {
  success: boolean;
  message: string;
  contact?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface GetContactsResponse {
  contacts: Contact[];
}
